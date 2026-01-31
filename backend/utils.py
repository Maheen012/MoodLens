import json
import os
from dotenv import load_dotenv
from google import genai
from datetime import datetime
from datetime import date
import boto3

load_dotenv()
JSON_FILE = "backend/entries.json"
ANALYSIS_CACHE_FILE = "backend/analysis.json"
client = genai.Client()

# Initialize Polly Client
polly = boto3.client(
    'polly',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION', 'us-east-1')
)

def generate_speech_stream(text: str):
    try:
        response = polly.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId='Joanna', 
            Engine='neural'  
        )
        return response['AudioStream'].read()
    except Exception as e:
        print(f"Polly Error: {e}")
        return None

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
        "1. Role: Supportive, empathetic peer. Validate the user's feelings specifically based on their text.\n"
        "2. Logic: If the entry expresses stress, sadness, anxiety, or overwhelm, suggest 2-3 concrete grounding "
        "exercises (e.g., Box Breathing, 5-4-3-2-1 technique, or Thought Challenging). Briefly explain how to do them.\n"
        "3. Style: Use warm, human language. Avoid clinical jargon, 'AI-speak,' or diagnosing the user.\n"
        "4. Safety First: If the content indicates a severe crisis or self-harm, prioritize a gentle "
        "encouragement to use the resources on the Support page as the very first part of your response.\n"
        "5. Format: Use Markdown (bolding and bullet points) to make suggestions easy to read under stress."
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
    now = datetime.now()
    entry = {
        "mood": mood,
        "stress": stress,
        "journal": journal_text,
        "ai_reflection": ai_reflection,
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%I:%M %p")
    }
    save_entry(entry)
    return entry

# to check for consistent low mood/high stress
def check_crisis_status():
    entries = load_entries()
    if len(entries) < 7:
        return False
    
    # Analyze the last 7 entries
    recent = entries[-7:]
    # Crisis if mood is consistently <= 4 OR stress is consistently >= 7
    critical_count = sum(1 for e in recent if e['mood'] <= 4 or e['stress'] >= 7)
    
    return critical_count >= 5  # Returns true if 5 out of last 7 are bad

def analyze_patterns():
    entries = load_entries()
    if len(entries) < 3:
        return "I'll be able to spot patterns once you've logged a few more entries!"

    # Take the last 10 entries
    recent_history = entries[-10:]
    
    # Format history for the AI
    history_str = "\n".join([
        f"Date: {e['date']}, Mood: {e['mood']}, Stress: {e['stress']}, Journal: {e['journal']}"
        for e in recent_history
    ])

    prompt = f"""
        Analyze these mood logs and give one specific, helpful pattern observation 
        and one actionable tip. Keep it under 30 words.
        Logs: {history_str}
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )
        return response.text
    except Exception as e:
        return "Patterns are emerging, but I need a moment to process them."
    
""" test for checking connection
def test_polly_connection():
    try:
        polly = boto3.client(
            'polly',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION', 'us-east-1')
        )
        response = polly.describe_voices(LanguageCode='en-US')
        print(SUCCESS: Connection established!")
        
    except Exception as e:
        print("FAILED: Could not access AWS.")
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_polly_connection()
"""