# Configuration Details

## Supabase Configuration
```javascript
const SUPABASE_URL = 'https://kfkcohosbpaeuzxuohrm.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtma2NvaG9zYnBhZXV6eHVvaHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDgyODgsImV4cCI6MjA2OTc4NDI4OH0.0f5ux3Z1B2Y8acpn7ZC40HiLeW3QhZcvZkr758ySivk';
```

## Google Sheets Configuration
```javascript
const GOOGLE_SHEET_ID = '1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A';
const GOOGLE_SHEET_NAME = 'Form Responses';
```

## Google Drive Configuration
```javascript
const GOOGLE_DRIVE_FOLDER_ID = '1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92';
```

## Service Account Email
```javascript
const SERVICE_ACCOUNT_EMAIL = 'payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com';
```

## Google Sheets Column Structure
Since Submission Timestamp is in Column A, the structure is:
- **Column A**: Submission Timestamp
- **Column B**: Submission ID
- **Column C**: Employee Email
- **Column D**: Customer Code
- **Column E**: Company Trade Name
- **Column F**: Customer Email ID
- **Column G**: Customer Contact Number
- **Column H**: Mode of Payment
- **Column I**: Date of Payment
- **Column J**: Payment Reference Number
- **Column K**: Payment Amount
- **Column L**: Remarks
- **Column M**: Payment Confirmation File URL
- **Column N**: Deposit Receipt File URL


