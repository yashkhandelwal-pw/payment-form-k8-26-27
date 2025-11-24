# Payment Form - K8 26-27

A native web application for payment form submission with employee authentication, customer selection, and Google Sheets integration.

## Features

- ✅ Employee email authentication via Supabase
- ✅ Customer selection based on Zone Manager (ZM) mapping
- ✅ Auto-populated customer details (read-only)
- ✅ Payment form with multiple payment modes
- ✅ Image compression and Google Drive upload
- ✅ Google Sheets integration for data storage
- ✅ Unique submission ID generation (K8PC00001, K8PC00002, etc.)
- ✅ Indian currency formatting
- ✅ Responsive design (mobile & desktop)
- ✅ Camera support for file uploads

## Prerequisites

1. **Node.js** (version 16 or higher) - for backend server

2. **Google Cloud Project** with:
   - Google Sheets API enabled
   - Google Drive API enabled
   - Service Account created and JSON key downloaded

3. **Supabase Project** with:
   - `emp_record` table
   - `order_form_k8_25_26` table

4. **Google Drive Folder** shared with service account email

5. **Google Sheet** with proper column structure

## Setup Instructions

### Step 1: Set Up Backend Server

**Follow the detailed guide in `BACKEND_SETUP.md`**

Quick steps:
1. Navigate to `backend` folder
2. Run `npm install`
3. Place your Service Account JSON key file as `service-account-key.json`
4. Start server: `npm start`

The backend will run on `http://localhost:3000`

### Step 2: Update Frontend Configuration

1. Open `config.js`
2. Verify the backend API URL is set correctly:

```javascript
const BACKEND_API_URL = 'http://localhost:3000/api';
```

### Step 3: Verify Service Account Access

Make sure you've shared:
- **Google Drive Folder** with Service Account email: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
- **Google Sheet** with the same Service Account email

### Step 4: Verify Google Sheet Structure

Ensure your Google Sheet (`Form Responses`) has the following columns in order:

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

### Step 5: Share Google Drive Folder (Already Done)

1. Open your Google Drive folder: [https://drive.google.com/drive/folders/1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92](https://drive.google.com/drive/folders/1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92)
2. Click "Share"
3. Add your Google account email (the one you'll use to sign in)
4. Give it "Editor" permissions
5. Click "Send"

### Step 6: Share Google Sheet (Already Done)

1. Open your Google Sheet
2. Click "Share"
3. Add your Google account email
4. Give it "Editor" permissions
5. Click "Send"

## Running the Application

### Option 1: Using a Local Server (Recommended)

1. **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

3. **Using VS Code Live Server:**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

4. Open browser: `http://localhost:8000`

### Option 2: Direct File Opening

⚠️ **Note**: Some features may not work due to CORS restrictions when opening files directly.

## Usage

1. **Start Backend Server**: Make sure backend is running (`npm start` in backend folder)
2. **Enter Email**: Enter your employee email address
3. **Fetch Details**: Click "Fetch Details" to validate your email
4. **Select Customer**: Choose a customer from the dropdown
5. **Fill Payment Details**: Complete all required fields
6. **Upload Files**: Upload payment confirmation and deposit receipt (if Cheque)
7. **Submit**: Click "Submit" to submit the form (no Google sign-in required!)

## File Structure

```
Payment Form - K8 26-27/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── app.js                  # Main JavaScript application
├── config.js               # Configuration file
├── WORKFLOW.md             # Application workflow documentation
├── GOOGLE_SHEETS_SETUP_GUIDE.md  # Google setup guide
├── OAUTH_SETUP_GUIDE.md    # OAuth 2.0 setup guide
├── CONFIG.md               # Configuration details
├── COLUMN_STRUCTURE.md     # Google Sheets column structure
├── IMPLEMENTATION_CHECKLIST.md  # Development checklist
└── README.md               # This file
```

## Configuration Details

- **Supabase URL**: `https://kfkcohosbpaeuzxuohrm.supabase.co`
- **Google Sheet ID**: `1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A`
- **Sheet Name**: `Form Responses`
- **Google Drive Folder ID**: `1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92`

## Troubleshooting

### Backend not running
- Make sure backend server is started: `cd backend && npm start`
- Check that port 3000 is available
- Verify backend is accessible at `http://localhost:3000/api/health`

### "Permission denied" errors
- Ensure Google Drive folder is shared with your Google account
- Ensure Google Sheet is shared with your Google account
- Verify OAuth scopes include Sheets and Drive permissions

### "Email not found" error
- Verify email exists in `emp_record` table
- Check that `status = 'Active'` and `team = 'Sales'`

### "No customers found"
- Verify employee email exists in `order_form_k8_25_26` table
- Check that `zm_email_id` is properly set
- Ensure customers are mapped to the ZM

### Submission ID generation fails
- Make sure Google Sheet is accessible
- Verify column B contains Submission IDs
- Check that you have write permissions on the sheet

## Security Notes

- ⚠️ **Never commit** `service-account-key.json` to repositories
- Keep your Service Account credentials secure
- The backend API handles all Google API authentication
- Supabase credentials in `config.js` are for read-only access

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For issues or questions, refer to:
- `WORKFLOW.md` for application flow
- `OAUTH_SETUP_GUIDE.md` for OAuth setup
- `GOOGLE_SHEETS_SETUP_GUIDE.md` for Google APIs setup

## License

This project is for internal use only.

