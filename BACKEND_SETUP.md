# Backend Setup Guide - No OAuth Required

## Overview

The backend API uses **Service Account** authentication, which means:
- ✅ **No user authentication required** - users don't need to sign in with Google
- ✅ **Automatic access** - Service Account handles all Google API calls
- ✅ **More secure** - Credentials are stored on the server, not in the browser

## Quick Setup

### Step 1: Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/) (version 16 or higher)

### Step 2: Set Up Backend

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Step 3: Configure Service Account

**You already have the Service Account email:**
`payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`

**Now you need the JSON key file:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your service account: `payment-form-service`
4. Click on it → Go to **Keys** tab
5. Click **Add Key** → **Create new key**
6. Select **JSON** format
7. Download the file

**Option A: Use JSON File (Easier for Development)**

1. Rename the downloaded file to `service-account-key.json`
2. Place it in the `backend` folder
3. The server will automatically use it

**Option B: Use Environment Variable (Better for Production)**

1. Open the JSON file
2. Copy its entire contents
3. Set as environment variable:
   ```bash
   # Linux/Mac
   export GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
   
   # Windows PowerShell
   $env:GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
   ```

### Step 4: Verify Sharing

Make sure you've shared:
- ✅ **Google Drive Folder** with: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
- ✅ **Google Sheet** with: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`

### Step 5: Start Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Step 6: Verify Frontend Config

Open `config.js` in the root folder and verify:

```javascript
const BACKEND_API_URL = 'http://localhost:3000/api';
```

## Testing

1. **Test health endpoint:**
   Open browser: `http://localhost:3000/api/health`
   Should return: `{"status":"ok","message":"Payment Form API is running"}`

2. **Test the frontend:**
   - Start your frontend server
   - Try submitting a form
   - Check that data appears in Google Sheet
   - Check that files appear in Google Drive

## Troubleshooting

### "Cannot find module" errors
- Run `npm install` in the backend folder
- Make sure you're in the correct directory

### "Permission denied" when accessing Google resources
- Verify Service Account email has Editor access to:
  - Google Drive folder
  - Google Sheet

### "Invalid credentials" error
- Check that Service Account JSON file is correct
- Verify the JSON is valid (no syntax errors)
- Make sure private_key is not corrupted

### Backend not starting
- Check that port 3000 is not already in use
- Change PORT in `.env` or environment variables if needed

### CORS errors in browser
- Make sure backend is running
- Check that `BACKEND_API_URL` in `config.js` matches your backend URL
- Verify CORS is enabled in backend (it is by default)

## Security Reminders

- ⚠️ **Never commit** `service-account-key.json` to Git
- ✅ Use environment variables in production
- ✅ Keep your Service Account key secure
- ✅ Only share Google resources with the Service Account email

## Next Steps

1. ✅ Backend is running locally
2. ✅ Frontend config is verified
3. ✅ Test the complete flow
4. ✅ Application ready for local use

Your application now works **without any user authentication** - users just enter their email and submit forms directly!


