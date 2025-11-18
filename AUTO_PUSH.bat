@echo off
echo ========================================
echo   Automatic GitHub Push
echo ========================================
echo.

REM Check if GitHub CLI is installed
where gh >nul 2>&1
if %errorlevel% equ 0 (
    echo [1/3] GitHub CLI detected!
    echo.
    echo Attempting authentication...
    gh auth login --web --git-protocol https
    echo.
    echo [2/3] Pushing code...
    git push -u origin main
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo   SUCCESS! Code pushed to GitHub!
        echo ========================================
        goto :success
    )
)

echo.
echo [1/3] Checking for stored credentials...
git credential-manager-core --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Credential Manager found.
    echo.
    echo [2/3] Attempting push with stored credentials...
    git push -u origin main
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo   SUCCESS! Code pushed to GitHub!
        echo ========================================
        goto :success
    )
)

echo.
echo [2/3] No stored credentials found.
echo.
echo ========================================
echo   Authentication Required
echo ========================================
echo.
echo Please provide your GitHub Personal Access Token.
echo.
echo Get token from: https://github.com/settings/tokens
echo.
echo Steps:
echo 1. Click "Generate new token" -^> "Generate new token (classic)"
echo 2. Name: Payment Form Push
echo 3. Select scope: repo (full control)
echo 4. Click "Generate token"
echo 5. Copy the token
echo.
echo ========================================
echo.

set /p token="Enter your Personal Access Token: "

if "%token%"=="" (
    echo.
    echo [ERROR] Token cannot be empty!
    pause
    exit /b 1
)

echo.
echo [3/3] Pushing code with token...
echo.

git push https://%token%@github.com/yashkhandelwal-pw/payment-form-k8-26-27.git main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo Possible reasons:
    echo - Invalid or expired token
    echo - Token doesn't have 'repo' scope
    echo - Repository doesn't exist or access denied
    echo.
    pause
    exit /b 1
)

:success
echo.
echo Repository: https://github.com/yashkhandelwal-pw/payment-form-k8-26-27
echo.
echo Next steps:
echo 1. Go to your repository on GitHub
echo 2. Add SERVICE_ACCOUNT_KEY secret:
echo    Settings -^> Secrets -^> Actions -^> New secret
echo    Name: SERVICE_ACCOUNT_KEY
echo    Value: (paste contents of backend/service-account-key.json)
echo.
pause

