# Payment Form - K8 26-27

Secure payment form application for Sales team members.

## Quick Start

### 1. Start Servers

```bash
# Windows:
START_SERVERS.bat

# OR Manually:
# Terminal 1 - Backend:
cd backend
npm install
node server.js

# Terminal 2 - Frontend:
npx http-server -p 8000
```

### 2. Open Application

```
http://localhost:8000
```

## Configuration

### Backend Environment Variables

Edit `backend/server.js` or create `.env` file to configure:
- Supabase credentials
- Google Sheet ID
- Google Drive Folder ID
- Service account key location

### Frontend Configuration

Edit `config.js` to set:
- Backend API URL (default: http://localhost:3000/api)

## Security

✅ **Secure Architecture:**
- All credentials stored in backend
- Frontend has no direct database access
- All requests validated by backend
- Service account key hidden from users

## Requirements

- Node.js 16+
- npm
- Service account key file (place in `backend/service-account-key.json`)

## File Structure

```
payment-form-k8-26-27/
├── index.html              # Main application
├── app.js                  # Frontend logic
├── styles.css              # Styling
├── config.js               # Frontend config (backend URL only)
├── backend/
│   ├── server.js           # Backend API
│   ├── package.json        # Dependencies
│   └── service-account-key.json  # Google credentials
└── START_SERVERS.bat       # Start script
```

## Features

- ✅ Email authentication
- ✅ Auto-populated customer data
- ✅ Payment form with file uploads
- ✅ Google Sheets integration
- ✅ Google Drive file storage
- ✅ Auto-incrementing submission IDs
- ✅ Indian currency formatting
- ✅ Mobile responsive
- ✅ Beautiful light theme UI

## Support

For issues, check browser console (F12) for error messages.

## About

Payment Form for K8 26-27 Sales Team
