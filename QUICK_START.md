# Quick Start Guide

## ✅ What's Already Done

1. ✅ Application code created (`index.html`, `app.js`, `styles.css`)
2. ✅ Backend API server created (`backend/server.js`)
3. ✅ Supabase configuration added
4. ✅ Google Sheets ID and Sheet Name configured
5. ✅ Google Drive folder ID configured
6. ✅ Column structure adjusted (Timestamp in Column A)
7. ✅ **No OAuth required** - uses Service Account backend

## 🔧 What You Need to Do

### 1. Set Up Backend Server (REQUIRED)

**Follow these steps:**

1. **Install Node.js** (if not installed): [nodejs.org](https://nodejs.org/)

2. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Get Service Account JSON key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **APIs & Services** → **Credentials**
   - Find service account: `payment-form-service`
   - Click on it → **Keys** tab → **Add Key** → **Create new key** → **JSON**
   - Download the file

5. **Place JSON key in backend folder:**
   - Rename downloaded file to `service-account-key.json`
   - Place it in the `backend` folder

6. **Start backend server:**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`

### 2. Verify Frontend Config

Check that `config.js` has the correct backend URL:
```javascript
const BACKEND_API_URL = 'http://localhost:3000/api';
```

### 3. Verify Service Account Access

Make sure Service Account email has access:
- **Google Drive Folder**: Share with `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
- **Google Sheet**: Share with the same email

1. Open: https://drive.google.com/drive/folders/1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92
2. Click **Share**
3. Add **your Google account email** (the one you'll use to sign in)
4. Give **Editor** permissions
5. Click **Send**

### 4. Verify Google Sheet Sharing (Already Done)

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A
2. Click **Share**
3. Add **your Google account email**
4. Give **Editor** permissions
5. Click **Send**

### 5. Verify Sheet Column Headers

Make sure your sheet has these headers in Row 1:

| Column | Header |
|--------|--------|
| A | Submission Timestamp |
| B | Submission ID |
| C | Employee Email |
| D | Customer Code |
| E | Company Trade Name |
| F | Customer Email ID |
| G | Customer Contact Number |
| H | Mode of Payment |
| I | Date of Payment |
| J | Payment Reference Number |
| K | Payment Amount |
| L | Remarks |
| M | Payment Confirmation File URL |
| N | Deposit Receipt File URL |

## 🚀 Running the Application

### Step 1: Start Backend Server

```bash
cd backend
npm start
```

Backend will run on `http://localhost:3000`

### Step 2: Start Frontend Server

**Option 1: Python**
```bash
python -m http.server 8000
```

**Option 2: Node.js**
```bash
npx http-server -p 8000
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Step 3: Open in Browser

Navigate to: `http://localhost:8000`

## 📝 Testing Checklist

- [ ] Backend server is running (`http://localhost:3000/api/health` should work)
- [ ] Enter employee email and click "Fetch Details"
- [ ] Verify authentication works (email must be in `emp_record` with `status='Active'` and `team='Sales'`)
- [ ] Select a customer from dropdown
- [ ] Verify customer details auto-populate (read-only)
- [ ] Select "Mode of Payment"
- [ ] Verify "Deposit Receipt Image" field appears only for "Cheque"
- [ ] Select date (should not allow future dates)
- [ ] Enter payment amount (should format in Indian currency)
- [ ] Upload payment confirmation file
- [ ] Upload deposit receipt (if Cheque)
- [ ] Submit form
- [ ] Verify data appears in Google Sheet
- [ ] Verify files appear in Google Drive folder

## ⚠️ Important Notes

1. **No User Authentication Required**: Users don't need to sign in with Google - the backend uses Service Account
2. **Backend is Required**: The backend server must be running for the app to work
3. **Service Account**: All Google API calls are handled by the backend using Service Account
4. **First Submission**: The first submission will create ID `K8PC00001`
5. **File Uploads**: Images are compressed before upload to reduce size
6. **Mobile Support**: Camera capture works on mobile devices

## 🐛 Common Issues

### Backend not running
- Make sure you started the backend: `cd backend && npm start`
- Check that port 3000 is not in use
- Verify backend is accessible: `http://localhost:3000/api/health`

### "Permission denied"
- Share Google Drive folder with Service Account email: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
- Share Google Sheet with the same Service Account email
- Verify Service Account has Editor permissions

### "No customers found"
- Verify employee email exists in `order_form_k8_25_26` table
- Check `zm_email_id` is set correctly
- Ensure customers are mapped to the ZM

## 📚 Need More Help?

- See `BACKEND_SETUP.md` for detailed backend setup
- See `WORKFLOW.md` for application flow
- See `README.md` for full documentation
- See `backend/README.md` for backend API documentation

