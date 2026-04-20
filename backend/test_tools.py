from app.services.ai_service import get_ai_response

tests = [
    "weather in delhi",
    "best places in goa",
    "convert usd to inr",
    "what is in my pdf",
    "",                     # edge case
    "asdfghjkl",            # invalid input
]

for t in tests:
    print("\n====================")
    print("QUERY:", t)
    print(get_ai_response([{"role": "user", "content": t}]))