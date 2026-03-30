import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.services.rag_service import query_pdf

# Load env
load_dotenv()

# Configure API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")


def get_ai_response(chat_history):
    try:
        # ✅ Get latest user message
        user_query = chat_history[-1]["content"]

        # 🔥 Get context from PDF (RAG)
        context = query_pdf(user_query)

        # ✅ Convert history into conversation string
        conversation = ""
        for msg in chat_history:
            role = "User" if msg["role"] == "user" else "Assistant"
            conversation += f"{role}: {msg['content']}\n"

        # ✅ HANDLE EMPTY CONTEXT
        if context:
            context_block = f"""
Relevant information from uploaded document:
{context}
"""
        else:
            context_block = "No document context available."

        # ✅ FINAL PROMPT WITH RAG (MAIN FIX)
        response = model.generate_content(
            f"""
You are a professional AI travel planner ✈️

Instructions:
- Use document context if relevant
- Otherwise answer normally
- Maintain conversation memory

------------------------
{context_block}
------------------------

Conversation:
{conversation}

Now respond to the latest user query.

Format:
- Headings
- Bullet points
- Clean spacing
"""
        )

        if response and hasattr(response, "text"):
            return response.text.strip()
        else:
            return "No response from AI"

    except Exception as e:
        print("AI ERROR:", e)
        return "AI service error"