import os
import requests
from dotenv import load_dotenv

load_dotenv()

RAPID_API_KEY = os.getenv("RAPID_API_KEY")


def search_hotels(
    city_dest_id,
    arrival_date,
    departure_date
):
    url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels"

    querystring = {
        "dest_id": city_dest_id,
        "search_type": "CITY",
        "arrival_date": arrival_date,
        "departure_date": departure_date,
        "adults": "1",
        "room_qty": "1",
        "page_number": "1",
        "units": "metric",
        "temperature_unit": "c",
        "languagecode": "en-us",
        "currency_code": "INR"
    }

    headers = {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
    }

    try:
        response = requests.get(
            url,
            headers=headers,
            params=querystring
        )

        data = response.json()

        results = data.get("data", {}).get("hotels", [])

        hotels = []

        for item in results[:10]:

            property_data = item.get("property", {})

            gross_price = (
                property_data
                .get("priceBreakdown", {})
                .get("grossPrice", {})
            )

            hotels.append({
                "name": property_data.get("name"),
                "rating": property_data.get("reviewScore"),
                "price": gross_price.get("value"),
                "currency": gross_price.get("currency"),
                "address": property_data.get("wishlistName"),
                "image": (
                    property_data.get("photoUrls", [None])[0]
                )
            })

        return {
            "status": True,
            "hotels": hotels
        }

    except Exception as e:
        print("HOTEL ERROR:", e)

        return {
            "status": False,
            "hotels": []
        }