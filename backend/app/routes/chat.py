from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import get_ai_response

router = APIRouter()

# ✅ store chat per session
chat_sessions = {}


class ChatRequest(BaseModel):
    message: str
    session_id: str


@router.post("/chat")
def chat(req: ChatRequest):
    try:
        session_id = req.session_id

        if session_id not in chat_sessions:
            chat_sessions[session_id] = []

        chat_history = chat_sessions[session_id]

        # Add user message
        chat_history.append({
            "role": "user",
            "content": req.message
        })

        # Get AI reply
        reply = get_ai_response(chat_history)

        # Store reply
        chat_history.append({
            "role": "assistant",
            "content": reply
        })

        return {"reply": reply}

    except Exception as e:
        print("CHAT ERROR:", e)
        return {"reply": "Something went wrong"}