// Project-wide emoji, ahh the current approach i could think of. Ofc this file not completely written by me
export const PROJECT_EMOJI = '🧪'; // this ain't used

// Comprehensive emoji mapping for elements
const elementEmojiMap: Record<string, string> = {
  // Basic elements
  'water': '💧',
  'fire': '🔥',
  'wind': '💨',
  'earth': '🌍',
  'air': '💨',
  
  // Common combinations
  'steam': '💨',
  'plant': '🌱',
  'lightning': '⚡',
  'dust': '🟤',
  'lava': '🌋',
  'wave': '🌊',
  'cloud': '☁️',
  'crystal': '💎',
  'pearl': '🦪',
  'obsidian': '🪨',
  'coral': '🪸',
  'phoenix': '🔥',
  'rebirth': '🔄',
  'thunder': '⛈️',
  'prism': '🌈',
  'luminescence': '✨',
  'mirror': '🪞',
  'warmth': '🤗',
  'hope': '🌟',
  'mountain': '⛰️',
  'rainbow': '🌈',
  'aurora': '🌌',
  'vision': '👁️',
  'garden': '🌺',
  'passion': '❤️‍🔥',
  'serenity': '🧘',
  'wonder': '😍',
  'magic': '🪄',
  'prophecy': '🔮',
  'paradise': '🏝️',
  'creation': '🎨',
  'peace': '☮️',
  'inspiration': '💡',
  'potion': '🧪',
  'destiny': '🌠',
  'bliss': '😇',
  'universe': '🌌',
  'harmony': '☯️',
  'art': '🎨',
  'divine': '👼',
  'legend': '📜',
  'eternity': '♾️',
  
  // Animals
  'cat': '🐱',
  'dog': '🐶',
  'bird': '🐦',
  'fish': '🐟',
  'dragon': '🐉',
  'tiger': '🐅',
  'lion': '🦁',
  'bear': '🐻',
  'wolf': '🐺',
  'eagle': '🦅',
  'whale': '🐋',
  'turtle': '🐢',
  'elephant': '🐘',
  'monkey': '🐵',
  'rabbit': '🐰',
  'mouse': '🐭',
  'horse': '🐴',
  'cow': '🐄',
  'pig': '🐷',
  'sheep': '🐑',
  'chicken': '🐔',
  'duck': '🦆',
  
  // Mythological
  'unicorn': '🦄',
  'griffin': '🦅',
  'pegasus': '🦄',
  'chimera': '🐉',
  'hydra': '🐍',
  'kraken': '🐙',
  'sphinx': '🗿',
  'minotaur': '🐂',
  'centaur': '🏹',
  'fairy': '🧚',
  'elf': '🧝',
  'dwarf': '🧙',
  'giant': '🗿',
  'troll': '👹',
  'goblin': '👺',
  'orc': '👹',
  'demon': '😈',
  'angel': '👼',
  'spirit': '👻',
  'ghost': '👻',
  'vampire': '🧛',
  'werewolf': '🐺',
  
  // Greek Gods
  'zeus': '⚡',
  'poseidon': '🔱',
  'hades': '💀',
  'apollo': '☀️',
  'artemis': '🏹',
  'athena': '🦉',
  'aphrodite': '💕',
  'ares': '⚔️',
  'hephaestus': '🔨',
  'demeter': '🌾',
  'dionysus': '🍇',
  'hermes': '👟',
  
  // Norse Gods
  'odin': '👁️',
  'thor': '🔨',
  'loki': '🎭',
  'freya': '💎',
  'balder': '☀️',
  'tyr': '⚔️',
  'heimdall': '👁️',
  'frigg': '👑',
  
  // Egyptian Gods
  'ra': '☀️',
  'anubis': '🐺',
  'isis': '👑',
  'osiris': '👑',
  'horus': '🦅',
  'thoth': '📜',
  'bastet': '🐱',
  'sobek': '🐊',
  
  // Science & Technology
  'robot': '🤖',
  'cyborg': '🦾',
  'android': '🤖',
  'ai': '🧠',
  'quantum': '⚛️',
  'atom': '⚛️',
  'molecule': '🧬',
  'dna': '🧬',
  'rna': '🧬',
  'cell': '🦠',
  'virus': '🦠',
  'bacteria': '🦠',
  'laser': '🔴',
  'hologram': '👻',
  'plasma': '⚡',
  'fusion': '💥',
  'fission': '💥',
  'energy': '⚡',
  'force': '💪',
  'gravity': '🌍',
  'magnetism': '🧲',
  'electricity': '⚡',
  'radiation': '☢️',
  'sound': '🔊',
  'light': '💡',
  'dark': '🌑',
  'shadow': '👤',
  'void': '⚫',
  
  // Space & Astronomy
  'star': '⭐',
  'planet': '🪐',
  'moon': '🌙',
  'sun': '☀️',
  'galaxy': '🌌',
  'nebula': '🌌',
  'blackhole': '⚫',
  'comet': '☄️',
  'meteor': '☄️',
  'asteroid': '🪨',
  'satellite': '🛰️',
  'rocket': '🚀',
  'spaceship': '🛸',
  'astronaut': '👨‍🚀',
  
  // Colors
  'red': '🔴',
  'blue': '🔵',
  'green': '🟢',
  'yellow': '🟡',
  'purple': '🟣',
  'orange': '🟠',
  'black': '⚫',
  'white': '⚪',
  'pink': '🩷',
  'brown': '🟤',
  'gray': '⚪',
  'silver': '⚪',
  'gold': '🟡',
  
  // Materials
  'wood': '🪵',
  'metal': '⚙️',
  'glass': '🪟',
  'stone': '🪨',
  'plastic': '🧱',
  'paper': '📄',
  'cloth': '🧵',
  'leather': '🦬',
  'rubber': '⚫',
  'ceramic': '🏺',
  'diamond': '💎',
  'steel': '⚙️',
  'iron': '⚙️',
  'copper': '🟤',
  'bronze': '🟤',
  'marble': '⚪',
  'granite': '🪨',
  'quartz': '💎',
  'jade': '💚',
  'amber': '🟡',
  
  // Weather
  'rain': '🌧️',
  'snow': '❄️',
  'storm': '⛈️',
  'tornado': '🌪️',
  'hurricane': '🌀',
  'blizzard': '🌨️',
  'fog': '🌫️',
  'mist': '🌫️',
  'hail': '🧊',
  'avalanche': '🏔️',
  
  // Nature
  'tree': '🌳',
  'flower': '🌸',
  'grass': '🌱',
  'forest': '🌲',
  'desert': '🏜️',
  'ocean': '🌊',
  'river': '🏞️',
  'lake': '🏞️',
  'valley': '🏞️',
  'hill': '🏔️',
  'cave': '🕳️',
  'beach': '🏖️',
  'island': '🏝️',
  'volcano': '🌋',
  'waterfall': '💦',
  'seed': '🌰',
  'leaf': '🍃',
  'branch': '🌿',
  'root': '🌱',
  
  // Emotions & Concepts
  'love': '❤️',
  'hate': '💔',
  'joy': '😊',
  'sadness': '😢',
  'anger': '😡',
  'fear': '😨',
  'surprise': '😲',
  'disgust': '🤢',
  'trust': '🤝',
  'anticipation': '🤔',
  'excitement': '🤩',
  'calm': '😌',
  'courage': '🦁',
  'wisdom': '🦉',
  'justice': '⚖️',
  'truth': '💯',
  'beauty': '🌺',
  'strength': '💪',
  'speed': '💨',
  'time': '⏰',
  'space': '🌌',
  'mind': '🧠',
  'heart': '❤️',
  'soul': '👻',
  'life': '🌱',
  'death': '💀',
  'birth': '👶',
  'dream': '💭',
  'reality': '🌍',
  'fantasy': '🦄',
  'memory': '🧠',
  'thought': '💭',
  
  // Powers & Abilities
  'flight': '🕊️',
  'invisibility': '👻',
  'telepathy': '🧠',
  'telekinesis': '🤏',
  'healing': '💚',
  'regeneration': '🔄',
  'immortality': '♾️',
  'shapeshifting': '🔄',
  'phasing': '👻',
  'cloning': '👥',
  'precognition': '🔮',
  
  // Pop Culture
  'superman': '🦸',
  'batman': '🦇',
  'spiderman': '🕷️',
  'ironman': '🤖',
  'captain': '🛡️',
  'hulk': '💚',
  'flash': '⚡',
  'wonderwoman': '👸',
  'aquaman': '🔱',
  'wolverine': '🗡️',
  'wizard': '🧙',
  'mage': '🧙‍♂️',
  'paladin': '⚔️',
  'ranger': '🏹',
  'rogue': '🗡️',
  'barbarian': '🪓',
  'necromancer': '💀',
  'ninja': '🥷',
  'samurai': '⚔️',
  'jedi': '⚔️',
  'sith': '⚔️',
  'alien': '👽',
  'terminator': '🤖',
  'predator': '👹',
  'transformer': '🚗',
  
  // Food & Cooking
  'bread': '🍞',
  'meat': '🥩',
  'fruit': '🍎',
  'vegetable': '🥕',
  'milk': '🥛',
  'cheese': '🧀',
  'egg': '🥚',
  'rice': '🍚',
  'pasta': '🍝',
  'pizza': '🍕',
  'cake': '🎂',
  'cookie': '🍪',
  'chocolate': '🍫',
  'candy': '🍬',
  'soup': '🍲',
  'salad': '🥗',
  'sandwich': '🥪',
  'burger': '🍔',
  'toast': '🍞',
  'barbecue': '🍖',
  'smoothie': '🥤',
  
  // Tools & Objects
  'hammer': '🔨',
  'saw': '🪚',
  'knife': '🔪',
  'sword': '⚔️',
  'shield': '🛡️',
  'bow': '🏹',
  'arrow': '➡️',
  'spear': '🗡️',
  'axe': '🪓',
  'staff': '🪄',
  'wand': '🪄',
  'orb': '🔮',
  'gem': '💎',
  'ring': '💍',
  'crown': '👑',
  'throne': '🪑',
  'book': '📚',
  'scroll': '📜',
  'map': '🗺️',
  'key': '🗝️',
  'lock': '🔒',
  'chest': '📦',
  'bottle': '🍼',
  'elixir': '🧪',
  'medicine': '💊',
  'poison': '☠️',
  'antidote': '💚',
  
  // Buildings & Places
  'house': '🏠',
  'castle': '🏰',
  'tower': '🗼',
  'bridge': '🌉',
  'temple': '🏛️',
  'church': '⛪',
  'school': '🏫',
  'hospital': '🏥',
  'market': '🏪',
  'farm': '🚜',
  'city': '🏙️',
  'town': '🏘️',
  'village': '🏡',
  'palace': '🏰',
  'fortress': '🏰',
  'sanctuary': '⛪',
  'library': '📚',
  'laboratory': '🧪',
  'workshop': '🔧',
  'arena': '🏟️',
  'dungeon': '🕳️',
  
  // Vehicles
  'car': '🚗',
  'bike': '🚲',
  'plane': '✈️',
  'boat': '⛵',
  'train': '🚂',
  'bus': '🚌',
  'truck': '🚚',
  'motorcycle': '🏍️',
  'helicopter': '🚁',
  'submarine': '🚤',
  'skateboard': '🛹',
  'scooter': '🛴',
  'tank': '🚗',
  'airplane': '✈️',
  'glider': '🪂',
  
  // Professions
  'doctor': '👨‍⚕️',
  'teacher': '👨‍🏫',
  'farmer': '👨‍🌾',
  'cook': '👨‍🍳',
  'artist': '👨‍🎨',
  'musician': '👨‍🎤',
  'writer': '✍️',
  'scientist': '👨‍🔬',
  'engineer': '👨‍💻',
  'pilot': '👨‍✈️',
  'driver': '👨‍💼',
  'builder': '👷',
  'soldier': '👨‍💼',
  'guard': '💂',
  'hunter': '🏹',
  'fisher': '🎣',
  'miner': '⛏️',
  'smith': '🔨',
  'merchant': '👨‍💼',
  'trader': '💰',
  'explorer': '🧭',
  'adventurer': '🎒',
  'hero': '🦸',
  'warrior': '⚔️',
  'priest': '👨‍💼',
  'monk': '🧘',
  'sage': '🧙',
  'prophet': '🔮',
};

// Function to get emoji for an element
export const getElementEmoji = (elementName: string): string => {
  const normalizedName = elementName.toLowerCase().trim();
  
  // Direct match
  if (elementEmojiMap[normalizedName]) {
    return elementEmojiMap[normalizedName];
  }
  
  // Partial matches for compound words - prefer longest keys first
  const keysByLength = Object.keys(elementEmojiMap).sort((a, b) => b.length - a.length);
  for (const key of keysByLength) {
    const emoji = elementEmojiMap[key];
    if (normalizedName === key || normalizedName.includes(key) || key.includes(normalizedName)) {
      return emoji;
    }
  }
  
  // Category-based fallbacks
  if (normalizedName.includes('fire') || normalizedName.includes('flame') || normalizedName.includes('burn')) {
    return '🔥';
  }
  if (normalizedName.includes('water') || normalizedName.includes('aqua') || normalizedName.includes('hydro')) {
    return '💧';
  }
  if (normalizedName.includes('earth') || normalizedName.includes('ground') || normalizedName.includes('soil')) {
    return '🌍';
  }
  if (normalizedName.includes('air') || normalizedName.includes('wind') || normalizedName.includes('breeze')) {
    return '💨';
  }
  if (normalizedName.includes('light') || normalizedName.includes('bright') || normalizedName.includes('glow')) {
    return '✨';
  }
  if (normalizedName.includes('dark') || normalizedName.includes('shadow') || normalizedName.includes('black')) {
    return '🌑';
  }
  if (normalizedName.includes('magic') || normalizedName.includes('spell') || normalizedName.includes('enchant')) {
    return '🪄';
  }
  if (normalizedName.includes('metal') || normalizedName.includes('steel') || normalizedName.includes('iron')) {
    return '⚙️';
  }
  if (normalizedName.includes('crystal') || normalizedName.includes('gem') || normalizedName.includes('diamond')) {
    return '💎';
  }
  if (normalizedName.includes('god') || normalizedName.includes('divine') || normalizedName.includes('holy')) {
    return '👼';
  }
  if (normalizedName.includes('dragon') || normalizedName.includes('wyrm')) {
    return '🐉';
  }
  if (normalizedName.includes('phoenix') || normalizedName.includes('firebird')) {
    return '🔥';
  }
  if (normalizedName.includes('robot') || normalizedName.includes('cyber') || normalizedName.includes('android')) {
    return '🤖';
  }
  if (normalizedName.includes('star') || normalizedName.includes('stellar')) {
    return '⭐';
  }
  if (normalizedName.includes('moon') || normalizedName.includes('lunar')) {
    return '🌙';
  }
  if (normalizedName.includes('sun') || normalizedName.includes('solar')) {
    return '☀️';
  }
  if (normalizedName.includes('storm') || normalizedName.includes('thunder') || normalizedName.includes('lightning')) {
    return '⛈️';
  }
  if (normalizedName.includes('ice') || normalizedName.includes('frost') || normalizedName.includes('frozen')) {
    return '🧊';
  }
  if (normalizedName.includes('tree') || normalizedName.includes('wood') || normalizedName.includes('forest')) {
    return '🌳';
  }
  if (normalizedName.includes('flower') || normalizedName.includes('bloom') || normalizedName.includes('petal')) {
    return '🌸';
  }
  if (normalizedName.includes('mountain') || normalizedName.includes('peak') || normalizedName.includes('summit')) {
    return '⛰️';
  }
  if (normalizedName.includes('ocean') || normalizedName.includes('sea') || normalizedName.includes('wave')) {
    return '🌊';
  }
  if (normalizedName.includes('love') || normalizedName.includes('heart') || normalizedName.includes('romance')) {
    return '❤️';
  }
  if (normalizedName.includes('energy') || normalizedName.includes('power') || normalizedName.includes('force')) {
    return '⚡';
  }
  if (normalizedName.includes('time') || normalizedName.includes('temporal') || normalizedName.includes('chrono')) {
    return '⏰';
  }
  if (normalizedName.includes('space') || normalizedName.includes('cosmic') || normalizedName.includes('universe')) {
    return '🌌';
  }
  
  // Prefix-based emojis
  if (normalizedName.startsWith('super')) return '🦸';
  if (normalizedName.startsWith('mega')) return '💥';
  if (normalizedName.startsWith('ultra')) return '🌟';
  if (normalizedName.startsWith('neo')) return '🔮';
  if (normalizedName.startsWith('cyber')) return '🤖';
  if (normalizedName.startsWith('quantum')) return '⚛️';
  if (normalizedName.startsWith('cosmic')) return '🌌';
  if (normalizedName.startsWith('divine')) return '👼';
  if (normalizedName.startsWith('shadow')) return '👤';
  if (normalizedName.startsWith('crystal')) return '💎';
  if (normalizedName.startsWith('golden')) return '🟡';
  if (normalizedName.startsWith('silver')) return '⚪';
  if (normalizedName.startsWith('dark')) return '🌑';
  if (normalizedName.startsWith('light')) return '✨';
  if (normalizedName.startsWith('ancient')) return '🏛️';
  if (normalizedName.startsWith('future')) return '🚀';
  if (normalizedName.startsWith('eternal')) return '♾️';
  
  // Default fallback emoji (project branding)
  return PROJECT_EMOJI;
};

// Function to assign emoji to element when created
export const assignEmojiToElement = (elementName: string): { name: string; emoji: string } => {
  const emoji = getElementEmoji(elementName);
  return {
    name: elementName,
    emoji: emoji
  };
};

// Function to get element display name with emoji
export const getElementDisplayName = (elementName: string): string => {
  const emoji = getElementEmoji(elementName);
  return `${emoji} ${elementName}`;
};