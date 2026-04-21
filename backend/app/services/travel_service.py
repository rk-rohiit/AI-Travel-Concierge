import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()

RAPID_API_KEY = os.getenv("RAPID_API_KEY")

def search_hotels(city_dest_id: str, arrival_date: str, departure_date: str):
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
        print("\n🔍 REQUEST DATA")
        print("DEST ID:", city_dest_id)
        print("ARRIVAL:", arrival_date)
        print("DEPARTURE:", departure_date)

        response = requests.get(url, headers=headers, params=querystring)

        print("\n📡 STATUS:", response.status_code)

        data = response.json()

        print("\n📦 RAW API RESPONSE:")
        print(json.dumps(data, indent=2))

        if response.status_code != 200:
            return {"error": "API failed", "details": data}

        results = data.get("data", {}).get("hotels", [])
        hotels = []

        for item in results[:10]:
            property_data = item.get("property", {})
            price_data = property_data.get("priceBreakdown", {}).get("grossPrice", {})

            hotel_info = {
                "name": property_data.get("name"),
                "rating": property_data.get("reviewScore"),
                "price": price_data.get("value"),
                "currency": price_data.get("currency"),
                "address": property_data.get("wishlistName"),
            }

            hotels.append(hotel_info)

        print("\n✅ CLEANED HOTEL DATA:")
        for hotel in hotels:
            print(hotel)

        return {
            "status": True,
            "count": len(hotels),
            "hotels": hotels
        }

    except Exception as e:
        print("\n❌ ERROR:", str(e))
        return {
            "error": "Something went wrong",
            "message": str(e)
        }