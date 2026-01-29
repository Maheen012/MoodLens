import json
import os
from dotenv import load_dotenv
from google import genai
from datetime import date

load_dotenv()
JSON_FILE = "backend/entries.json"
client = genai.Client()

# Load entries from JSON
def load_entries():
    if not os.path.exists(JSON_FILE):
        return []  
    with open(JSON_FILE, "r") as f:
        return json.load(f)

# Loads current entries and updates JSON with new entries entered
def save_entry(entry):
    entries = load_entries()
    entries.append(entry)
    with open(JSON_FILE, "w") as f:
        json.dump(entries, f, indent=4)

# Send user's journal entry to gemini and return a response
def call_gemini(journal_text):
    # the prompt
    prompt = (
        "Reflect empathetically on this journal entry. " "Do not diagnose. Suggest gentle coping strategies:\n"
        f"{journal_text}"
    )
    
    # Call gemini
    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )
        return response.text
    except Exception as e:
        print("Error calling Gemini:", e)
        return "AI unavailable at the moment."


# create dict of entries then save and return the entry
def create_entry(mood, journal_text):
    ai_reflection = call_gemini(journal_text)
    entry = {
        "mood": mood,
        "journal": journal_text,
        "ai_reflection": ai_reflection,
        "date": str(date.today())
    }
    save_entry(entry)
    return entry

