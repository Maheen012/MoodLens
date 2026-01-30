#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"

echo "Starting MoodLens Services..."

npm start &

# Save pid of the process to kill later
NPM_PID=$!

echo "Waiting for Vite & Uvicorn to initialize (5s)..."
sleep 5

# Open browser based on OS
echo "Opening MoodLens..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:5173
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows (Git Bash)
    start http://localhost:5173
fi

echo "✅ MoodLens is running at http://localhost:5173"
echo "💡 Close this terminal to stop the servers."

# Keep script alive
wait $NPM_PID