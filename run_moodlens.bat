@echo off
title MoodLens Launcher
echo Starting MoodLens Services...

:: Start the servers in the background
start /b npm run start

:: Wait 5 seconds for servers to wake up
echo Waiting for servers to initialize...
timeout /t 5 /nobreak > NUL

:: Force open the browser
echo Opening MoodLens UI...
start http://localhost:5500

echo.
echo MoodLens is now running! 
echo Keep this window open to stay connected.
echo Close the window to terminate server.
