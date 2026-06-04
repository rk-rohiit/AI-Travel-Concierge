import os
import requests
from dotenv import load_dotenv

load_dotenv()

RAPID_API_KEY = os.getenv("RAPID_API_KEY")


def get_destination_id(city):
    url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination"

    headers = {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
    }

    params = {
        "query": city
    }

    try:
        response = requests.get(
            url,
            headers=headers,
            params=params
        )

        data = response.json()

        print("DESTINATION DATA:", data)

        destinations = data.get("data", [])

        if not destinations:
            return None

        return destinations[0]["dest_id"]

    except Exception as e:
        print("DESTINATION ERROR:", e)
        return None