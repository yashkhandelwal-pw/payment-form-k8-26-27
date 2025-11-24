# Deployment Information

## Current Setup: Local Development Only

This application is configured for **local development only** and is not set up for deployment to cloud platforms.

## Architecture

The application consists of:
- **Frontend**: Static HTML/CSS/JS files served via local server (port 8000)
- **Backend**: Node.js/Express server running locally (port 3000)

## Running Locally

### Backend Server
```bash
cd backend
npm install
npm start
```
Backend runs on: `http://localhost:3000`

### Frontend Server
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: VS Code Live Server
# Right-click index.html → Open with Live Server
```
Frontend runs on: `http://localhost:8000`

## Why Not Deployed?

This application is designed for internal use within a local network or development environment. It requires:
- Direct access to Google Sheets and Google Drive via Service Account
- Local backend server with Service Account credentials
- No need for public internet access

## Future Deployment Considerations

If you decide to deploy this application in the future, you would need to:

1. **Choose a backend hosting platform** (e.g., Railway, Render, Heroku, VPS)
2. **Deploy backend first** and get its public URL
3. **Update frontend configuration** with deployed backend URL
4. **Deploy frontend** to static hosting (e.g., Netlify, Vercel, GitHub Pages)
5. **Configure environment variables** securely on the hosting platform
6. **Set up CORS** properly if frontend and backend are on different domains
7. **Enable HTTPS** for secure data transmission

## Current Configuration

All configuration is set for local development:
- Backend API URL: `http://localhost:3000/api`
- Frontend URL: `http://localhost:8000`
- Service Account credentials: Stored locally in `backend/service-account-key.json`

## Support

For local development setup instructions, see:
- `README.md` - Complete setup guide
- `BACKEND_SETUP.md` - Backend configuration
- `START_HERE.md` - Quick start guide
- `QUICK_START.md` - Quick reference

---

**Note**: This application is currently configured for local development only. No deployment setup is included.
