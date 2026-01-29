from fastapi import FastAPI
from pydantic import BaseModel
from .utils import create_entry, load_entries

app = FastAPI()

class JournalEntry(BaseModel):
    mood: int
    journal: str

# POST endpoint to submit a journal entry
@app.post("/submit")
def submit_entry(entry: JournalEntry):
    full_entry = create_entry(entry.mood, entry.journal)
    return {"message": "Entry saved", "ai_reflection": full_entry["ai_reflection"]}

# GET endpoint to fetch mood trends
@app.get("/trends")
def get_trends():
    entries = load_entries()
    moods = [{"date": e["date"], "mood": e["mood"]} for e in entries]
    return {"moods": moods}
