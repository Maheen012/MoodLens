const API_URL = "http://127.0.0.1:8000"; 
// Submit journal entry
async function submitEntry() {
    const mood = document.getElementById("mood").value;
    const journal = document.getElementById("journal").value;

    const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: parseInt(mood), journal })
    });

    const data = await response.json();
    document.getElementById("aiReflection").innerText = data.ai_reflection;
    fetchTrends(); // Refresh trends
}

// Fetch mood trends
async function fetchTrends() {
    const response = await fetch(`${API_URL}/trends`);
    const data = await response.json();
    const trendsDiv = document.getElementById("trends");
    trendsDiv.innerHTML = "<h3>Mood Trends</h3>";

    data.moods.forEach(entry => {
        const p = document.createElement("p");
        p.innerText = `${entry.date}: Mood ${entry.mood}`;
        trendsDiv.appendChild(p);
    });
}

// Event listener for button
document.getElementById("submitBtn").addEventListener("click", submitEntry);

// Load trends on page load
window.onload = fetchTrends;

