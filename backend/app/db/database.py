import sqlite3

conn = sqlite3.connect("travel.db", check_same_thread=False)

def create_table():
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS searches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()

def save_search(city: str):
    cursor = conn.cursor()
    cursor.execute("INSERT INTO searches (city) VALUES (?)", (city,))
    conn.commit()