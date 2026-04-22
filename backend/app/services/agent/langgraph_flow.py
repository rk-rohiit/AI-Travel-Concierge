from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI

from app.services.tools import search_tool
from app.services.rag_service import query_pdf
from app.services.agent.state import AgentState
from app.services.tools import currency_converter
from app.services.agent.logger import log_start, log_end

import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-flash-latest",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.3
)

# =========================
# TOOL NODES
# =========================

def search_node(state: AgentState):
    start = log_start("SEARCH")
    try:
        return {"output": search_tool.run(state["input"])}
    except:
        return {"output": "Search failed"}
    finally:
        log_end("SEARCH", start)


def rag_node(state: AgentState):
    try:
        return {"output": query_pdf(state["input"]) or "No document found"}
    except:
        return {"output": "RAG failed"}


def currency_node(state: AgentState):
    return {"output": currency_converter(state["input"])}

# =========================
# ROUTER
# =========================

def router(state: AgentState):
    query = state["input"]

    try:
        response = llm.invoke(f"""
Classify into one:
- rag
- search
- currency

Query: {query}
""")

        decision = str(response.content).lower()

        print("ROUTER:", decision)

        if "rag" in decision:
            return "rag"
        elif "currency" in decision:
            return "currency"
        else:
            return "search"

    except:
        return "search"

# =========================
# GRAPH
# =========================

workflow = StateGraph(AgentState)

workflow.add_node("search", search_node)
workflow.add_node("rag", rag_node)
workflow.add_node("currency", currency_node)

workflow.set_conditional_entry_point(router)

workflow.add_edge("search", END)
workflow.add_edge("rag", END)
workflow.add_edge("currency", END)

app_graph = workflow.compile()