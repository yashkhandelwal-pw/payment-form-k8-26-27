# 🚀 START HERE - Quick Setup Guide

## Step 1: Start Backend Server

Open a terminal/command prompt and run:

```bash
cd backend
npm install
npm start
```

You should see:
```
Payment Form API server running on port 3000
Health check: http://localhost:3000/api/health
```

**Keep this terminal window open!** The backend must be running.

## Step 2: Test Backend Connection

Open in your browser:
```
http://localhost:3000/api/health
```

You should see:
```json
{"status":"ok","message":"Payment Form API is running"}
```

## Step 3: Test Backend API

Open the test page:
```
test-backend.html
```

Or if using a local server:
```
http://localhost:8000/test-backend.html
```

Click each test button to verify:
1. ✅ Health Check - Should show success
2. ✅ Generate Submission ID - Should generate K8PC00001 (or next number)
3. ✅ Upload File - Upload a test image/PDF
4. ✅ Submit Form Data - Submit test data to Google Sheets
5. ✅ Full Flow Test - Test complete workflow

## Step 4: Start Frontend Application

Open a **new terminal/command prompt** and run:

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Option 3: VS Code Live Server
# Right-click index.html → Open with Live Server
```

## Step 5: Open Payment Form

Open in your browser:
```
http://localhost:8000
```

Or:
```
http://localhost:8000/index.html
```

## ✅ Verification Checklist

- [ ] Backend server is running (port 3000)
- [ ] Health check returns success
- [ ] Test page shows all tests passing
- [ ] Frontend server is running (port 8000)
- [ ] Payment form loads correctly
- [ ] Can enter email and fetch details
- [ ] Can select customer
- [ ] Can submit form

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is already in use
- Verify `service-account-key.json` is in the `backend` folder
- Check Node.js is installed: `node --version`

### "Cannot find module" error
- Run `npm install` in the `backend` folder
- Make sure you're in the correct directory

### "Permission denied" errors
- Verify Service Account email has access to:
  - Google Drive folder: `1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92`
  - Google Sheet: `1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A`

### Frontend can't connect to backend
- Make sure backend is running on port 3000
- Check `config.js` has correct `BACKEND_API_URL`
- Check browser console for CORS errors

## 📝 Next Steps

Once everything is working:
1. Test with real employee email
2. Submit a test payment form
3. Verify data appears in Google Sheet
4. Verify files appear in Google Drive folder

## 📚 Documentation

- `BACKEND_SETUP.md` - Detailed backend setup
- `README.md` - Full documentation
- `QUICK_START.md` - Quick reference guide

---

**Need help?** Check the browser console (F12) for error messages!


