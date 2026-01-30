#!/bin/bash

# Navigate to the script's directory
cd "$(dirname "$0")"

echo "Starting MoodLens Services..."

# start server and simultaneously run following script commands
npm start &

# Save pid of npm start to kill later
NPM_PID=$!

echo "Waiting for servers to wake up (5 seconds)..."
sleep 5

# open browser
echo "Opening Browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:5500
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:5500
fi

echo "MoodLens is running! Close this terminal to stop the servers."

# keep script alive so background process doesn't get orphaned
wait $NPM_PID