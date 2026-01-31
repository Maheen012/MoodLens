from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from backend.utils import create_entry, load_entries, check_crisis_status, analyze_patterns, generate_speech_stream
import json
import os
import io
from fastapi.responses import StreamingResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JournalEntry(BaseModel):
    mood: int
    stress: int
    journal: str

# POST endpoint to submit a journal entry
@app.post("/submit")
def submit_entry(entry: JournalEntry):
    full_entry = create_entry(entry.mood, entry.stress, entry.journal)
    
    show_resources = check_crisis_status() 
    
    return {
        "ai_reflection": full_entry["ai_reflection"],
        "crisis_warning": show_resources
    }

# GET endpoint to fetch mood trends
@app.get("/trends")
def get_trends():
    entries = load_entries()
    return {"trends": entries}

@app.get("/analyze")
def get_analysis():
    insight = analyze_patterns()
    return {"insight": insight}

@app.delete("/clear")
def clear_history():
    # Clear entries
    with open("backend/entries.json", "w") as f:
        json.dump([], f)
    # Remove cached analysis if exists
    if os.path.exists("backend/analysis.json"):
        os.remove("backend/analysis.json")
    return {"message": "History cleared successfully"}

@app.get("/speak")
async def speak(text: str):
    from backend.utils import generate_speech_stream
    import io
    from fastapi.responses import StreamingResponse

    audio_data = generate_speech_stream(text)
    if audio_data:
        return StreamingResponse(io.BytesIO(audio_data), media_type="audio/mpeg")
    
    return {"error": "Voice synthesis failed"}, 500