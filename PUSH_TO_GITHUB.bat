@echo off
echo ========================================
echo   Push to GitHub
echo ========================================
echo.

echo Checking Git status...
git status
echo.

echo ========================================
echo   Authentication Required
echo ========================================
echo.
echo To push to GitHub, you need a Personal Access Token.
echo.
echo Steps:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Click "Generate new token" -^> "Generate new token (classic)"
echo 3. Name: Payment Form Push
echo 4. Select scope: repo (full control)
echo 5. Click "Generate token"
echo 6. Copy the token (you'll only see it once!)
echo.
echo ========================================
echo.

set /p token="Enter your Personal Access Token: "

if "%token%"=="" (
    echo [ERROR] Token cannot be empty!
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
echo.

REM Use token for authentication
git push https://%token%@github.com/yashkhandelwal-pw/payment-form-k8-26-27.git main

if errorlevel 1 (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo Possible reasons:
    echo - Invalid token
    echo - Token doesn't have 'repo' scope
    echo - Repository doesn't exist or you don't have access
    echo.
    pause
    exit /b 1
) else (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub!
    echo ========================================
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
)

pause

