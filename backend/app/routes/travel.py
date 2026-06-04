from fastapi import APIRouter, Query

from app.services.travel_service import search_hotels
from app.services.ai_service import generate_itinerary
from app.services.weather_service import get_weather
from app.services.location_service import get_destination_id

router = APIRouter(
    prefix="/travel",
    tags=["Travel"]
)

# =========================
# 🏨 HOTELS
# =========================
@router.get("/hotels")
def get_hotels(
    city: str = Query(..., description="Enter city name"),
    arrival_date: str = Query(..., description="YYYY-MM-DD"),
    departure_date: str = Query(..., description="YYYY-MM-DD")
):
    dest_id = get_destination_id(city)

    if not dest_id:
        return {
            "status": False,
            "message": f"No destination found for {city}"
        }

    return search_hotels(
        city_dest_id=dest_id,
        arrival_date=arrival_date,
        departure_date=departure_date
    )


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
# 🚀 FULL TRAVEL PLAN
# =========================
@router.get("/plan")
def travel_plan(
    city: str = Query(...),
    arrival_date: str = Query(...),
    departure_date: str = Query(...)
):
    dest_id = get_destination_id(city)

    if not dest_id:
        return {
            "status": False,
            "message": f"No destination found for {city}"
        }

    weather_data = get_weather(city)

    hotels_data = search_hotels(
        city_dest_id=dest_id,
        arrival_date=arrival_date,
        departure_date=departure_date
    )

    itinerary_data = generate_itinerary(city)

    return {
        "status": True,
        "city": city,
        "destination_id": dest_id,
        "weather": weather_data,
        "hotels": hotels_data.get("hotels", []),
        "itinerary": itinerary_data.get("itinerary", {})
    }