from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router
from app.routes.upload import router as upload_router
from app.routes.travel import router as travel_router

from app.db.database import create_table

app = FastAPI()

create_table()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ INCLUDE ALL ROUTES
app.include_router(chat_router)
app.include_router(upload_router)
app.include_router(travel_router)   # 🔥 THIS WAS MISSING

@app.get("/")
def home():
    return {"message": "AI Travel Concierge Running 🚀"}