# <img src="frontend/public/Blixlogo.ico" alt="Blix Logo" width="32" height="32" style="vertical-align: middle;"> Blix

Combine elements, discover magic. Start with Water, Fire, Wind, and Earth—then craft your way to infinite possibilities.

> Inspired by [Infinite Craft](https://neal.fun/infinite-craft/) and the [Infinite Craft Wiki](https://infinibrowser.wiki/)

## 🎮 Live at

**Play Now:** [https://blix-beige.vercel.app](https://blix-beige.vercel.app)

## ✨ Features

- **AI-Powered Combinations** - Uses Cerebras AI (Llama 3.3 70B) for creative element generation
- **Drag & Drop Interface** - Smooth desktop and mobile touch support
- **Smart Caching** - 24-hour cache for instant responses on repeated combinations
- **Dark/Light Mode** - Toggle between themes
- **Sound Effects** - Pleasant audio feedback for interactions
- **Progress Persistence** - LocalStorage saves your discoveries
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Core Combinations** - Instant responses for basic element pairs

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **TanStack Query** - Data fetching

### Backend
- **FastAPI** - Python web framework
- **Cerebras Cloud SDK** - AI inference
- **Docker** - Containerization
- **Uvicorn** - ASGI server

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (optional, for backend)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend Setup

**Option 1: Local Python**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Option 2: Docker**
```bash
cd backend
docker-compose up
```

Create `backend/.env`:
```env
CEREBRAS_API_KEY=your_cerebras_api_key_here
ALLOW_ORIGINS=http://localhost:3000
```

Get your Cerebras API key from [Cerebras Cloud](https://cloud.cerebras.ai/)

## How to Play

1. Start with 4 basic elements: Water 💧, Fire 🔥, Wind 💨, Earth 🌍
2. Drag elements from the sidebar onto the canvas
3. Drop one element onto another to combine them
4. Discover new elements and build your collection
5. Experiment with different combinations!

## 📁 Project Structure

```
blix/
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities (sounds, emoji)
│   │   └── store/        # Zustand state management
│   └── public/           # Static assets
│
├── backend/              # FastAPI backend
│   ├── app/
│   │   └── services/     # Business logic
│   ├── main.py           # API endpoints
│   ├── Dockerfile        # Container config
│   └── requirements.txt  # Python dependencies
│
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Frontend (`frontend/.env.local`):**
- `NEXT_PUBLIC_API_URL` - Backend API URL

**Backend (`backend/.env`):**
- `CEREBRAS_API_KEY` - Cerebras Cloud API key
- `ALLOW_ORIGINS` - CORS allowed origins (comma-separated)

## 🎨 Features in Detail

### AI Generation
- Uses Cerebras for ultra-fast inference (~200ms response time)
- Generates creative element names and relevant emojis
- Falls back to curated emoji mappings when needed

### Caching System
- 24-hour TTL for combination results
- Reduces API calls and improves response time
- Core combinations (Fire+Water=Steam) are instant

### Sound Design
- Soft "boop" for pickup
- Gentle "plop" for drop
- Magical chime for new discoveries
- Subtle "whoosh" for cached combinations

## 📝 Development Timeline

**Week 1:** Tech stack research and project setup  
**Week 2:** Core functionality, UI implementation, AI integration  
**Week 3:** Polish, optimization, and production deployment

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Infinite Craft](https://neal.fun/infinite-craft/) by Neal Agarwal
- AI powered by [Cerebras Cloud](https://cloud.cerebras.ai/)
- Deployed on [Vercel](https://vercel.com) and [Render](https://render.com)

---

Built with ❤️ using Next.js and FastAPI
