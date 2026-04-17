from app.services.tools import search_tool, get_weather

print("=== SEARCH TEST ===")
print(search_tool.run("best places in Goa"))

print("\n=== WEATHER TEST ===")
print(get_weather("Manali"))