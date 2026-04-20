from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI

from app.services.tools import search_tool, get_weather
from app.services.rag_service import query_pdf
from app.services.agent.state import AgentState
from app.services.tools import currency_converter
from app.services.agent.logger import log_start, log_end


import os
from dotenv import load_dotenv

load_dotenv()

# ✅ LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-flash-latest",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.3
)

# =========================
# ✅ TOOL NODES
# =========================

# def search_node(state: AgentState):
#     try:
#         result = search_tool.run(state["input"])
#         return {"output": result}
#     except Exception as e:
#         print("SEARCH ERROR:", e)
#         return {"output": "Search failed"}


def search_node(state: AgentState):
    start = log_start("SEARCH")
    try:
        result = search_tool.run(state["input"])
        return {"output": result}
    except Exception as e:
        print("SEARCH ERROR:", e)
        return {"output": "Search failed"}
    finally:
        log_end("SEARCH", start)


# def weather_node(state: AgentState):
#     try:
#         result = get_weather(state["input"])  # 🔥 full query passed
#         return {"output": result}
#     except Exception as e:
#         print("WEATHER ERROR:", e)
#         return {"output": "Weather not available"}

def weather_node(state: AgentState):
    start = log_start("WEATHER")
    try:
        return {"output": get_weather(state["input"])}
    except:
        print("Weather failed → fallback search")
        return {"output": search_tool.run(state["input"])}
    finally:
        log_end("WEATHER", start)


def rag_node(state: AgentState):
    try:
        result = query_pdf(state["input"])
        return {"output": result or "No document data found"}
    except Exception as e:
        print("RAG ERROR:", e)
        return {"output": "Document search failed"}


# =========================
# ✅ LLM ROUTER (INTELLIGENT)
# =========================

# def router(state: AgentState):
#     query = state["input"]

#     try:
#         decision = llm.invoke(f"""
# Classify the user query into ONE of these categories:
# - weather → for weather related questions
# - rag → for document/pdf related questions
# - search → for general travel or place search

# Query: {query}

# Only return one word.
# """).content.strip().lower()

#         print("ROUTER DECISION:", decision)

#         if "weather" in decision:
#             return "weather"
#         elif "rag" in decision:
#             return "rag"
#         else:
#             return "search"

#     except Exception as e:
#         print("ROUTER ERROR:", e)
#         return "search"  # fallback

def router(state: AgentState):
    query = state["input"]

    try:
        response = llm.invoke(f"""
Classify the user query into ONE word:
- weather
- rag
- search
- currency

Query: {query}

Return only one word.
""")

        decision = response.content

        if isinstance(decision, list):
            decision = decision[0]

        if isinstance(decision, dict):
            decision = decision.get("text", "")

        decision = str(decision).strip().lower()

        print("ROUTER DECISION:", decision)

        if "weather" in decision:
            return "weather"
        elif "rag" in decision:
            return "rag"
        elif "currency" in decision or "convert" in decision:
            return "currency"
        else:
            return "search"

    except Exception as e:
        print("ROUTER ERROR:", e)
        return "search"  


def currency_node(state: AgentState):
    return {"output": currency_converter(state["input"])}

# =========================
# ✅ GRAPH SETUP
# =========================

workflow = StateGraph(AgentState)

workflow.add_node("search", search_node)
workflow.add_node("weather", weather_node)
workflow.add_node("rag", rag_node)
workflow.add_node("currency", currency_node)
workflow.set_conditional_entry_point(router)

workflow.add_edge("search", END)
workflow.add_edge("weather", END)
workflow.add_edge("rag", END)
workflow.add_edge("currency",END)

# ✅ COMPILE
app_graph = workflow.compile()
