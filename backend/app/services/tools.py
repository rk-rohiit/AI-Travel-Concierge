import os
import requests
from dotenv import load_dotenv

load_dotenv()

# 🌐 Web search
from langchain_community.tools import DuckDuckGoSearchRun
search_tool = DuckDuckGoSearchRun()

# 🌦️ Weather
def get_weather(city: str):
    try:
        api_key = os.getenv("OPENWEATHER_API_KEY")

        if not api_key:
            return "Weather API key missing"

        # 🔥 Fix location ambiguity
        city_map = {
            "manali": "Manali,HP,IN",
            "goa": "Goa,IN",
            "delhi": "Delhi,IN"
        }

        city_query = city_map.get(city.lower(), f"{city},IN")

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city_query}&appid={api_key}&units=metric"

        res = requests.get(url, timeout=5).json()

        print("WEATHER API RESPONSE:", res)

        if res.get("cod") != 200:
            return f"Weather error: {res.get('message')}"

        weather = res.get("weather", [{}])[0].get("description", "unknown")
        temp = res.get("main", {}).get("temp", "N/A")
        feels_like = res.get("main", {}).get("feels_like", "N/A")
        location = res.get("name", city)

        return f"{location}: {weather}, {temp}°C (feels like {feels_like}°C)"

    except Exception as e:
        print("WEATHER ERROR:", e)
        return "Weather not available"