#!/bin/bash

cd "$(dirname "$0")"
echo "Starting MoodLens Services..."

# Start frontend
npm start &
NPM_PID=$!

# Start backend
cd backend
uvicorn main:app --reload &
UVICORN_PID=$!

cd ..

echo "Waiting for servers to initialize (5s)..."
sleep 5

# Open browser
echo "Opening MoodLens..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:5173
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:5173
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start http://localhost:5173
fi

echo "MoodLens is running at http://localhost:5173"
echo "Close this terminal to stop the servers."

# Wait for both processes
wait $NPM_PID $UVICORN_PID
