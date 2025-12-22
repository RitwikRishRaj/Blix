"""Craft Service for generating AI coombinations, although it might act dumb sometimes"""
import os
import time
import httpx
from typing import Optional, Dict, Tuple

class CraftService:
    """Crafting service using OpenRouter AI."""
    
    def __init__(self):
        self._cache: Dict[str, Tuple[str, str, float]] = {}  # key -> (result, emoji, timestamp)
        self._cache_ttl = 86400
        self.basic_elements = ["Water", "Fire", "Wind", "Earth"]
        self.api_key = os.getenv("OPENROUTER_API_KEY", "")
        self.model = os.getenv("OPENROUTER_MODEL", "xiaomi/mimo-v2-flash:free")
        
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
            self._cache[key] = (result, emoji, time.time())
            return (result, emoji, 'ai', False)
        
        return (None, None, 'nothing', False)
    
    async def _ai_combine(self, e1: str, e2: str) -> Tuple[Optional[str], Optional[str]]:
        """Use OpenRouter AI to generate combination result."""
        if not self.api_key:
            print("No OpenRouter API key configured")
            return (None, None)
        
        prompt = f"""You are an Infinite Craft game engine. Combine these two elements creatively:

Element 1: {e1}
Element 2: {e2}

Rules:
- Return a single new element that makes logical/creative sense
- Be creative but logical (Fire + Water = Steam, Earth + Water = Plant)
- Return "Nothing" only if combination truly makes no sense
- Include a RELEVANT emoji that represents the result (not 🧪 unless it's actually a potion/chemical)

Examples of good emoji choices:
- Steam = 💨, Plant = 🌱, Lava = 🌋, Ocean = 🌊
- Dragon = 🐉, Robot = 🤖, Star = ⭐, Moon = 🌙
- Love = ❤️, Magic = 🪄, Crystal = 💎, Fire = 🔥

Respond in EXACTLY this format (no extra text):
RESULT: [element name]
EMOJI: [single relevant emoji]"""

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:3000",
                    },
                    json={
                        "model": self.model,
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": 50,
                        "temperature": 0.7,
                    }
                )
                
                if response.status_code == 200:
                    data = response.json()
                    content = data["choices"][0]["message"]["content"].strip()
                    return self._parse_ai_response(content)
                else:
                    print(f"OpenRouter error: {response.status_code} - {response.text}")
                    return (None, None)
                    
        except Exception as e:
            print(f"AI request failed: {e}")
            return (None, None)
    
    def _parse_ai_response(self, content: str) -> Tuple[Optional[str], Optional[str]]:
        """Parse AI response to extract result and emoji."""
        result = None
        emoji = None
        
        for line in content.split('\n'):
            line = line.strip()
            if line.startswith('RESULT:'):
                result = line.replace('RESULT:', '').strip()
            elif line.startswith('EMOJI:'):
                emoji = line.replace('EMOJI:', '').strip()
        
        if result and result.lower() != 'nothing':
            # here i am used sparkeles as the fallback emoji as a fallback incase it fails to relate 
            return (result, emoji or "✨")
        
        return (None, None)
    
    def get_basic_elements(self) -> list:
        return self.basic_elements.copy()


_service = None

def get_craft_service() -> CraftService:
    global _service
    if _service is None:
        _service = CraftService()
    return _service
