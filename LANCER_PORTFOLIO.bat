@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERREUR : Node.js et npm ne sont pas disponibles sur cet ordinateur.
  echo Installez Node.js depuis https://nodejs.org puis relancez ce fichier.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installation initiale des dependances...
  call npm install
  if errorlevel 1 (
    echo.
    echo L'installation a echoue. Verifiez votre connexion Internet.
    pause
    exit /b 1
  )
)

echo Compilation de la derniere version...
call npm run build
if errorlevel 1 (
  echo.
  echo La compilation a echoue.
  pause
  exit /b 1
)

echo Demarrage du portfolio 3D...
echo Adresse : http://127.0.0.1:4173
echo Pour arreter le portfolio, fermez cette fenetre.
echo.

if /i not "%~1"=="--no-open" (
  start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:4173'"
)

call npm run preview -- --host 127.0.0.1 --port 4173
