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
def call_gemini(mood, stress, journal_text):
    # the prompt
    prompt = (
            f"Context: The user logged a mood of {mood}/10 and stress of {stress}/10.\n"
            f"Journal: \"{journal_text}\"\n\n"
            "Instructions:\n"
            "1. Act as a supportive, empathetic peer. Validate their specific feelings mentioned in the journal.\n"
            "2. Analyze the journal content to suggest ONE specific cognitive tool or grounding exercise (e.g., box breathing, 5-4-3-2-1, cognitive reframing, or a short walk) that directly addresses the situation they described.\n"
            "3. Do not use medical jargon or provide a diagnosis.\n"
            "4. If the entry sounds like a severe crisis, prioritize warmth and a suggestion to reach out for support."
        )
    
    # Call gemini
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )
        return response.text
    except Exception as e:
        print("Error calling Gemini:", e)
        return "AI unavailable at the moment."


# create dict of entries then save and return the entry
def create_entry(mood, stress, journal_text):
    ai_reflection = call_gemini(mood, stress, journal_text)
    entry = {
        "mood": mood,
        "stress": stress,
        "journal": journal_text,
        "ai_reflection": ai_reflection,
        "date": str(date.today())
    }
    save_entry(entry)
    return entry

# New logic to check for consistent low mood/high stress
def check_crisis_status():
    entries = load_entries()
    if len(entries) < 7:
        return False
    
    # Analyze the last 7 entries
    recent = entries[-7:]
    # Crisis if mood is consistently <= 4 OR stress is consistently >= 7
    critical_count = sum(1 for e in recent if e['mood'] <= 3 or e['stress'] >= 7)
    
    return critical_count >= 5  # Returns true if 5 out of last 7 are bad