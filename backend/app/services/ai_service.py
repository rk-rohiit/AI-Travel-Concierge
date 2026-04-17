import google.generativeai as genai
import os
from dotenv import load_dotenv
from app.services.rag_service import query_pdf
from app.services.tools import search_tool, get_weather

# Load env
load_dotenv()

# Configure API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")


def get_ai_response(chat_history):
    try:
        # ✅ Get latest user message
        user_query = chat_history[-1]["content"].lower()

        # 🔥 TOOL LOGIC (IMPROVED)
        tool_output = ""

        if "weather" in user_query:
            # better extraction (simple)
            words = user_query.split()
            city = words[-1].capitalize()

            try:
                weather = get_weather(city)
                tool_output = f"Weather in {city}: {weather}"
            except:
                tool_output = f"Weather data not available for {city}"

        elif "search" in user_query or "best" in user_query:
            try:
                search = search_tool.run(user_query)
                tool_output = f"Search Results:\n{search}"
            except:
                tool_output = "Search tool failed"

        # 🔥 DEBUG (VERY IMPORTANT)
        print("USER QUERY:", user_query)
        print("TOOL OUTPUT:", tool_output)

        # 🔥 HARD RULE → RETURN TOOL DIRECTLY (NO GEMINI CALL)
        if tool_output:
            return f"""
### 🔧 Tool-Based Response

{tool_output}

---
Generated using real-time tool data.
"""

        # 🔥 RAG (only if no tool used)
        context = query_pdf(user_query)

        # ✅ Convert history into conversation string
        conversation = ""
        for msg in chat_history:
            role = "User" if msg["role"] == "user" else "Assistant"
            conversation += f"{role}: {msg['content']}\n"

        # ✅ HANDLE EMPTY CONTEXT
        if context:
            context_block = f"Document Context:\n{context}"
        else:
            context_block = "No document context available."

        # 🔥 GEMINI CALL (ONLY WHEN NO TOOL)
        response = model.generate_content(
            f"""
You are a professional AI travel planner ✈️

Instructions:
- Use document context if relevant
- Maintain conversation memory
- Give structured, clean answers

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

        if "429" in str(e):
            return "⚠️ Too many requests. Please wait and try again."

        return "AI service temporarily unavailable"