const API_URL = "http://127.0.0.1:8000"; 

async function submitEntry() {
    const mood = document.getElementById("mood").value;
    const stress = document.getElementById("stress").value;
    const journal = document.getElementById("journal").value;
    const submitBtn = document.getElementById("submitBtn");

    if (!journal.trim()) {
        alert("Please write something in your journal!");
        return;
    }

    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                mood: parseInt(mood), 
                stress: parseInt(stress), 
                journal 
            })
        });

        const data = await response.json();
        
        const aiSection = document.getElementById("aiResponseSection");
        const aiBox = document.getElementById("aiReflection");
        aiSection.classList.remove("hidden");
        aiBox.innerHTML = marked.parse(data.ai_reflection);

        if (data.crisis_warning) {
            document.getElementById("crisisModal").style.display = "flex";
        }

        fetchTrends(); 
        document.getElementById("journal").value = ""; 
    } catch (err) {
        console.error("Error:", err);
        alert("Connection Error. Check if your backend terminal is open!");
    } finally {
        submitBtn.innerText = "Save & Analyze";
        submitBtn.disabled = false;
    }
}

// Fetch and display history
async function fetchTrends() {
    try {
        const response = await fetch(`${API_URL}/trends`);
        const data = await response.json();
        const trendsDiv = document.getElementById("trends");
        trendsDiv.innerHTML = "";

        // Show last 5 entries
        data.trends.reverse().slice(0, 5).forEach(entry => {
            const item = document.createElement("div");
            item.className = "trend-item";
            item.innerHTML = `
                <span><strong>${entry.date}</strong></span>
                <span>Mood: ${entry.mood} | Stress: ${entry.stress}</span>
            `;
            trendsDiv.appendChild(item);
        });
    } catch (err) {
        console.log("Trends currently unavailable.");
    }
}

function closeModal() {
    document.getElementById("crisisModal").style.display = "none";
}

document.getElementById("submitBtn").addEventListener("click", submitEntry);
window.onload = fetchTrends;