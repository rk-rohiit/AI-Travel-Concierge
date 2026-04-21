from fastapi import APIRouter, Query
from app.services.travel_service import search_hotels
from app.services.ai_service import generate_itinerary

router = APIRouter(prefix="/travel", tags=["Travel"])

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


@router.get("/itinerary")
def get_itinerary(city: str):
    return generate_itinerary(city)