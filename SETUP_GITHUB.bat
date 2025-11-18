@echo off
echo ========================================
echo   GitHub Setup Script
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Initializing Git repository...
if exist .git (
    echo Git repository already exists.
) else (
    git init
    echo Git repository initialized.
)
echo.

echo [2/5] Adding files to staging...
git add .
echo Files added.
echo.

echo [3/5] Creating initial commit...
git commit -m "Initial commit: Payment Form K8 26-27"
echo Commit created.
echo.

echo [4/5] Checking for remote repository...
git remote -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo ========================================
    echo   NEXT STEPS:
    echo ========================================
    echo.
    echo 1. Create a new repository on GitHub:
    echo    https://github.com/new
    echo.
    echo 2. Repository name: payment-form-k8-26-27
    echo    Set to PRIVATE (important!)
    echo.
    echo 3. After creating, run these commands:
    echo    git remote add origin https://github.com/YOUR_USERNAME/payment-form-k8-26-27.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    echo 4. Add Service Account Key as GitHub Secret:
    echo    Repository -^> Settings -^> Secrets -^> Actions
    echo    Name: SERVICE_ACCOUNT_KEY
    echo    Value: (paste entire contents of backend/service-account-key.json)
    echo.
) else (
    echo Remote repository already configured.
    echo.
    echo To push to GitHub, run:
    echo   git push -u origin main
    echo.
)

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo See GITHUB_SETUP.md for detailed instructions.
echo.
pause

