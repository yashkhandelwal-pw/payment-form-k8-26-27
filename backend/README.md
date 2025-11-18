# Payment Form Backend API

Backend server that handles Google Sheets and Drive operations using Service Account authentication.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Service Account

**Option A: Using Environment Variable (Recommended for Production)**

1. Get your Service Account JSON key file from Google Cloud Console
2. Convert the JSON to a single-line string (or use base64 encoding)
3. Set environment variable:
   ```bash
   export GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
   ```

**Option B: Using JSON File (For Development)**

1. Download your Service Account JSON key file from Google Cloud Console
2. Rename it to `service-account-key.json`
3. Place it in the `backend` folder
4. **IMPORTANT**: Add `service-account-key.json` to `.gitignore` (never commit this file!)

### 3. Share Google Resources

Make sure you've shared:
- **Google Drive Folder** with Service Account email: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
- **Google Sheet** with Service Account email

### 4. Configure Environment Variables (Optional)

Create a `.env` file in the `backend` folder:

```env
PORT=3000
GOOGLE_SERVICE_ACCOUNT_JSON=your-json-string-here
```

### 5. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Generate Submission ID
```
POST /api/generate-submission-id
Body: {
  "sheetId": "your-sheet-id",
  "sheetName": "Form Responses",
  "prefix": "K8PC",
  "startNumber": 1
}
```

### Upload File to Google Drive
```
POST /api/upload
Content-Type: multipart/form-data
Body: {
  "file": <file>,
  "fileName": "K8PC00001_payment_confirmation.jpg",
  "folderId": "1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92"
}
```

### Submit Form Data
```
POST /api/submit
Content-Type: application/json
Body: {
  "sheetId": "your-sheet-id",
  "sheetName": "Form Responses",
  "data": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "submissionID": "K8PC00001",
    "employeeEmail": "user@example.com",
    ...
  }
}
```

## Deployment Options

### Option 1: Deploy to Heroku

1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Set environment variable: `heroku config:set GOOGLE_SERVICE_ACCOUNT_JSON='...'`
4. Deploy: `git push heroku main`

### Option 2: Deploy to Railway

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Option 3: Deploy to Render

1. Create new Web Service
2. Connect your repository
3. Set environment variables
4. Deploy

### Option 4: Deploy to Vercel (Serverless Functions)

See `vercel-functions/` folder for serverless function setup.

## Security Notes

- ⚠️ **Never commit** `service-account-key.json` to version control
- Use environment variables for production
- Enable CORS only for your frontend domain
- Consider adding rate limiting
- Add authentication/authorization if needed

## Troubleshooting

### "Permission denied" errors
- Verify Service Account email has access to Drive folder and Sheet
- Check that Service Account JSON is correct

### "Invalid credentials" error
- Verify Service Account JSON is valid
- Check that private key is not corrupted

### CORS errors
- Make sure CORS is enabled in the server
- Check that frontend URL is allowed


