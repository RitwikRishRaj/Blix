"""Infinite Craft API - FastAPI Backend with OpenRouter AI"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os
import time

from app.services.craft_service import get_craft_service

load_dotenv()

app = FastAPI(title="Infinite Craft API", version="1.0.0")

# CORS
origins = os.getenv("ALLOW_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CraftRequest(BaseModel):
    element1: str
    element2: str

class CraftResponse(BaseModel):
    result: Optional[str]
    emoji: Optional[str] = None
    element1: str
    element2: str
    success: bool
    cached: bool = False
    source: Optional[str] = None
    response_time: float = 0.0

@app.get("/")
async def root():
    return {"message": "Infinite Craft API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/elements")
async def get_elements():
    service = get_craft_service()
    return {
        "basic_elements": service.get_basic_elements(),
        "discovered_elements": service.get_basic_elements()
    }

@app.get("/stats")
async def get_stats():
    service = get_craft_service()
    return {
        "total_elements": len(service.basic_elements),
        "total_combinations": len(service._cache),
        "cache_size": len(service._cache),
        "basic_elements": service.get_basic_elements()
    }

@app.post("/craft", response_model=CraftResponse)
async def craft_elements(request: CraftRequest):
    start = time.time()
    service = get_craft_service()
    
    result, emoji, source, cached = await service.combine_elements(request.element1, request.element2)
    
    return CraftResponse(
        result=result,
        emoji=emoji,
        element1=request.element1,
        element2=request.element2,
        success=result is not None,
        cached=cached,
        source=source,
        response_time=round(time.time() - start, 3)
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
