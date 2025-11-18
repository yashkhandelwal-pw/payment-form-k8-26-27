@echo off
echo Starting Payment Form Servers...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && node server.js"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0 && npx --yes http-server -p 8000 -c-1"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Servers Started!
echo ========================================
echo.
echo Backend:  http://localhost:3000/api/health
echo Frontend: http://localhost:8000
echo.
echo Press any key to exit...
pause >nul

