from app.services.agent.langgraph_flow import app_graph
import json
import re

def get_ai_response(chat_history):
    try:
        user_query = chat_history[-1]["content"].strip()

        # ✅ FIX: empty input handling
        if not user_query:
            return "⚠️ Please enter a valid query."

        print("USER QUERY:", user_query)

        result = app_graph.invoke({
            "input": user_query,
            "chat_history": chat_history,
            "intermediate_steps": [],
            "output": ""
        })

        return result["output"]

    except Exception as e:
        print("AGENT ERROR:", e)
        return "⚠️ Something went wrong. Please try again."



def generate_itinerary(city: str):
    return {
        "city": city,
        "itinerary": {
            "day1": [f"Explore {city} main attractions", "Try local food"],
            "day2": ["Visit historical places", "Shopping"],
            "day3": ["Relax at popular spots", "Enjoy cafes"]
        }
    }