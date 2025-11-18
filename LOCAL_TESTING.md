# 🧪 Local Testing Instructions

## Quick Start (3 Steps)

### Step 1: Start Backend Server

Open terminal/command prompt:

```bash
cd backend
npm start
```

**Expected Output:**
```
Payment Form API server running on port 3000
Health check: http://localhost:3000/api/health
```

✅ **Keep this terminal open!**

### Step 2: Test Backend

**Option A: Use Test Page (Recommended)**

Open in browser:
```
test-backend.html
```

Or if using a server:
```
http://localhost:8000/test-backend.html
```

**Option B: Direct API Test**

Open in browser:
```
http://localhost:3000/api/health
```

Should return:
```json
{"status":"ok","message":"Payment Form API is running"}
```

### Step 3: Start Frontend & Test Application

**Open a NEW terminal/command prompt:**

```bash
# Navigate to project root (not backend folder)
cd "D:\Scripts for web apps\Payment FOrm - K8 26-27"

# Start frontend server
python -m http.server 8000
```

Then open in browser:
```
http://localhost:8000
```

## Test Checklist

### ✅ Backend Tests (test-backend.html)

1. **Health Check** - Should show ✅ success
2. **Generate Submission ID** - Should generate K8PC00001
3. **Upload File** - Upload test image, should return file URL
4. **Submit Form Data** - Should submit to Google Sheet
5. **Full Flow Test** - Complete workflow test

### ✅ Frontend Tests (index.html)

1. **Email Authentication**
   - Enter valid employee email
   - Click "Fetch Details"
   - Should show payment form

2. **Customer Selection**
   - Select customer from dropdown
   - Customer details should auto-fill

3. **Form Fields**
   - Mode of Payment: Select "Cheque" → Deposit Receipt field appears
   - Date: Should not allow future dates
   - Amount: Should format in Indian currency (₹)

4. **File Upload**
   - Upload payment confirmation
   - Upload deposit receipt (if Cheque)
   - Preview should appear

5. **Form Submission**
   - Fill all fields
   - Click Submit
   - Should show success message
   - Check Google Sheet for new row
   - Check Google Drive for uploaded files

## Verification

### Check Google Sheet

1. Open: https://docs.google.com/spreadsheets/d/1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A
2. Go to "Form Responses" sheet
3. Verify new row was added
4. Check Submission ID is sequential

### Check Google Drive

1. Open: https://drive.google.com/drive/folders/1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92
2. Verify uploaded files appear
3. Check file names include Submission ID

## Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Or try different port
# Edit backend/server.js, change PORT to 3001
# Update config.js: BACKEND_API_URL = 'http://localhost:3001/api'
```

### "Cannot find module" error
```bash
cd backend
npm install
```

### "Permission denied" errors
- Verify `service-account-key.json` exists in `backend` folder
- Check Service Account email has access to:
  - Google Drive folder
  - Google Sheet

### Frontend can't connect
- Make sure backend is running
- Check `config.js` has correct `BACKEND_API_URL`
- Open browser console (F12) to see errors

### CORS errors
- Backend has CORS enabled by default
- If issues persist, check backend is running on correct port

## Files to Test

1. **test-backend.html** - Backend API testing
2. **index.html** - Main payment form application

## Expected Results

✅ Backend responds to all API calls  
✅ Frontend connects to backend  
✅ Form submission works  
✅ Data appears in Google Sheet  
✅ Files appear in Google Drive  
✅ No console errors  

## Next Steps

Once local testing passes:
1. Test with real employee emails
2. Test all payment modes
3. Test file uploads (images and PDFs)
4. Verify submission IDs are sequential
5. Test on mobile devices

---

**Ready to test?** Start with `test-backend.html` to verify backend is working! 🚀


