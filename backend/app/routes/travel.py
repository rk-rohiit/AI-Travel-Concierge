from fastapi import APIRouter, Query

from app.services.travel_service import search_hotels
from app.services.ai_service import generate_itinerary
from app.services.weather_service import get_weather   # ✅ ADD

router = APIRouter(prefix="/travel", tags=["Travel"])

# =========================
# 🏨 HOTELS
# =========================
@router.get("/hotels")
def get_hotels(
    city: str = Query(..., description="Enter city name (e.g. mumbai)"),
    arrival_date: str = Query(..., description="YYYY-MM-DD"),
    departure_date: str = Query(..., description="YYYY-MM-DD")
):
    city_map = {
        "delhi": "-2092174",
        "mumbai": "-2092174",
        "goa": "-2092174"
    }

    dest_id = city_map.get(city.lower(), "-2092174")

    return search_hotels(dest_id, arrival_date, departure_date)


# =========================
# 🌦 WEATHER
# =========================
@router.get("/weather")
def get_weather_route(city: str):
    return get_weather(city)


# =========================
# 📅 ITINERARY
# =========================
@router.get("/itinerary")
def get_itinerary(city: str):
    return generate_itinerary(city)


# =========================
# 🚀 FULL TRAVEL PLAN (IMPORTANT 🔥)
# =========================
@router.get("/plan")
def travel_plan(
    city: str = Query(...),
    arrival_date: str = Query(...),
    departure_date: str = Query(...)
):
    city_map = {
        "delhi": "-2092174",
        "mumbai": "-2092174",
        "goa": "-2092174"
    }

    dest_id = city_map.get(city.lower(), "-2092174")

    # ✅ Call all services
    weather_data = get_weather(city)
    hotels_data = search_hotels(dest_id, arrival_date, departure_date)
    itinerary_data = generate_itinerary(city)

    return {
        "city": city,
        "weather": weather_data,
        "hotels": hotels_data.get("hotels", []),
        "itinerary": itinerary_data["itinerary"]
    }