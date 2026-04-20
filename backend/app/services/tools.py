import os
import requests
from dotenv import load_dotenv

load_dotenv()

# 🌐 Web search
from langchain_community.tools import DuckDuckGoSearchRun
search_tool = DuckDuckGoSearchRun()

# 🌦️ Weather
# def get_weather(city: str):
#     try:
#         api_key = os.getenv("OPENWEATHER_API_KEY")

#         if not api_key:
#             return "Weather API key missing"

#         # 🔥 Fix location ambiguity
#         city_map = {
#             "manali": "Manali,HP,IN",
#             "goa": "Goa,IN",
#             "delhi": "Delhi,IN"
#         }

#         city_query = city_map.get(city.lower(), f"{city},IN")

#         url = f"https://api.openweathermap.org/data/2.5/weather?q={city_query}&appid={api_key}&units=metric"

#         res = requests.get(url, timeout=5).json()

#         print("WEATHER API RESPONSE:", res)

#         if res.get("cod") != 200:
#             return f"Weather error: {res.get('message')}"

#         weather = res.get("weather", [{}])[0].get("description", "unknown")
#         temp = res.get("main", {}).get("temp", "N/A")
#         feels_like = res.get("main", {}).get("feels_like", "N/A")
#         location = res.get("name", city)

#         return f"{location}: {weather}, {temp}°C (feels like {feels_like}°C)"

#     except Exception as e:
#         print("WEATHER ERROR:", e)
#         return "Weather not available"

def get_weather(input_text: str):
    try:
        api_key = os.getenv("OPENWEATHER_API_KEY")

        if not api_key:
            return "Weather API key missing"

        # 🔥 Extract city intelligently
        words = input_text.lower().replace("?", "").split()

        city = None
        for w in words:
            if w in ["delhi", "goa", "manali", "mumbai", "bangalore"]:
                city = w
                break

        # fallback → last word
        if not city:
            city = words[-1]

        # 🔥 Normalize city
        city_map = {
            "manali": "Manali,HP,IN",
            "goa": "Goa,IN",
            "delhi": "Delhi,IN",
            "mumbai": "Mumbai,IN",
            "bangalore": "Bangalore,IN"
        }

        city_query = city_map.get(city, f"{city},IN")

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city_query}&appid={api_key}&units=metric"

        res = requests.get(url, timeout=5)

        if res.status_code != 200:
            return "Weather API failed"

        data = res.json()

        if data.get("cod") != 200:
            return f"Weather error: {data.get('message')}"

        weather = data["weather"][0]["description"]
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        location = data["name"]

        return f"{location}: {weather}, {temp}°C (feels like {feels_like}°C)"

    except requests.exceptions.Timeout:
        return "Weather service timeout"
    except Exception as e:
        print("WEATHER ERROR:", e)
        return "Weather not available"
    

def currency_converter(input_text: str):
    try:
        return "1 USD = 83 INR (approx)"
    except:
        return "Currency conversion failed"