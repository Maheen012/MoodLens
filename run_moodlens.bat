@echo off
title MoodLens Launcher
echo Starting MoodLens Services...

:: Start the servers in the bg
start /b npm run start

:: Wait 5 seconds for Vite and Uvicorn to wake up
echo Waiting for servers to initialize...
timeout /t 5 /nobreak > NUL

:: Open the server
echo Opening MoodLens UI...
start http://localhost:5173

echo.
echo MoodLens is now running! 
echo Keep this window open to stay connected.