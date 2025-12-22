"""Craft Service for generating AI coombinations, although it might act dumb sometimes"""
import os
import time
from typing import Optional, Dict, Tuple
from cerebras.cloud.sdk import Cerebras

class CraftService:
    """Crafting service using OpenRouter AI."""
    
    def __init__(self):
        self._cache: Dict[str, Tuple[str, str, float]] = {}  # key -> (result, emoji, timestamp)
        self._cache_ttl = 86400
        self.basic_elements = ["Water", "Fire", "Wind", "Earth"]
        self.api_key = os.getenv("CEREBRAS_API_KEY", "")
        self.model = "llama-3.3-70b"
        
        # Initialize Cerebras client
        if self.api_key:
            self.cerebras_client = Cerebras(api_key=self.api_key)
        else:
            self.cerebras_client = None
        
        # core combinations, to guide the recipies in order to give results similar to infinitecraft wiki
        self.core_combinations = {
            "fire+water": ("Steam", "💨"),
            "water+fire": ("Steam", "💨"),
            "earth+water": ("Plant", "🌱"),
            "water+earth": ("Plant", "🌱"),
            "fire+earth": ("Lava", "🌋"),
            "earth+fire": ("Lava", "🌋"),
            "wind+water": ("Wave", "🌊"),
            "water+wind": ("Wave", "🌊"),
            "wind+fire": ("Smoke", "💨"),
            "fire+wind": ("Smoke", "💨"),
            "wind+earth": ("Dust", "🌫️"),
            "earth+wind": ("Dust", "🌫️"),
            "steam+water": ("Cloud", "☁️"),
            "water+steam": ("Cloud", "☁️"),
            "plant+fire": ("Ash", "🔥"),
            "fire+plant": ("Ash", "🔥"),
            "lava+water": ("Stone", "🪨"),
            "water+lava": ("Stone", "🪨"),
            "cloud+water": ("Rain", "🌧️"),
            "water+cloud": ("Rain", "🌧️"),
            "plant+earth": ("Tree", "🌳"),
            "earth+plant": ("Tree", "🌳"),
            "fire+fire": ("Inferno", "🔥"),
            "water+water": ("Ocean", "🌊"),
            "wind+wind": ("Tornado", "🌪️"),
            "earth+earth": ("Mountain", "⛰️"),
        }
    
    def _cache_key(self, e1: str, e2: str) -> str:
        return "+".join(sorted([e1.lower().strip(), e2.lower().strip()]))
    
    async def combine_elements(self, element1: str, element2: str) -> Tuple[Optional[str], Optional[str], str, bool]:
        """Combine two elements. Returns (result, emoji, source, cached)."""
        e1, e2 = element1.strip(), element2.strip()
        
        if not e1 or not e2:
            return (None, None, 'invalid', False)
        
        key = self._cache_key(e1, e2)
        
        # To check cache first
        if key in self._cache and time.time() - self._cache[key][2] < self._cache_ttl:
            cached = self._cache[key]
            return (cached[0], cached[1], 'cached', True)
        
        # To check core combinations
        core_key = f"{e1.lower()}+{e2.lower()}"
        if core_key in self.core_combinations:
            result, emoji = self.core_combinations[core_key]
            self._cache[key] = (result, emoji, time.time())
            return (result, emoji, 'core', False)
        
        # using AI for get results of combinations (unknown)
        result, emoji = await self._ai_combine(e1, e2)
        if result:
            # Use AI emoji or fallback to sparkles
            if not emoji:
                emoji = "✨"
            self._cache[key] = (result, emoji, time.time())
            return (result, emoji, 'ai', False)
        
        return (None, None, 'nothing', False)
    
    async def _ai_combine(self, e1: str, e2: str) -> Tuple[Optional[str], Optional[str]]:
        """Use Cerebras AI to generate combination result."""
        if not self.cerebras_client:
            print("No Cerebras API key configured")
            return (None, None)
        
        prompt = f"""Combine {e1} + {e2} in Infinite Craft style.

Reply format: ElementName Emoji
Examples:
- Steam 💨
- Plant 🌱
- Dragon 🐉
- Robot 🤖

Your turn: {e1} + {e2} ="""

        try:
            completion = self.cerebras_client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.model,
                max_completion_tokens=20,
                temperature=0.7,
                top_p=1,
                stream=False
            )
            
            result_text = completion.choices[0].message.content.strip()
            
            # Extract element name and emoji
            element_name = []
            emoji = None
            
            for char in result_text:
                if ord(char) > 127:  # Non-ASCII = emoji
                    if not emoji:
                        emoji = char
                else:
                    if not emoji:  # Only collect chars before emoji
                        element_name.append(char)
            
            result = ''.join(element_name).strip()
            
            # Clean up common prefixes/suffixes
            for prefix in ["Result:", "Answer:", "=", "-", ":", "Element:", "is", "equals"]:
                if result.lower().startswith(prefix.lower()):
                    result = result[len(prefix):].strip()
            
            if result and result.lower() != 'nothing':
                return (result, emoji or "✨")
            return (None, None)
                    
        except Exception as e:
            print(f"Cerebras error: {e}")
            return (None, None)
    
    def get_basic_elements(self) -> list:
        return self.basic_elements.copy()


_service = None

def get_craft_service() -> CraftService:
    global _service
    if _service is None:
        _service = CraftService()
    return _service
