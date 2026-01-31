from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from .utils import create_entry, load_entries, check_crisis_status

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
    data = [{"date": e["date"], "mood": e["mood"], "stress": e.get("stress", 5)} for e in entries]
    return {"trends": data}