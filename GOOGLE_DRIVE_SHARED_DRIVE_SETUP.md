# Google Drive Shared Drive Setup Guide

## Problem
Service Accounts cannot upload files to regular Google Drive folders. They need to use **Shared Drives** (formerly Team Drives).

## Solution Options

### Option 1: Use Shared Drive (Recommended - If you have Google Workspace)

If you have Google Workspace, you can create a Shared Drive:

1. **Create Shared Drive:**
   - Go to [Google Drive](https://drive.google.com)
   - Click "Shared drives" in the left sidebar
   - Click "New" → "Shared drive"
   - Name it: `Payment Form Files`
   - Click "Create"

2. **Add Service Account to Shared Drive:**
   - Open the Shared Drive
   - Click "Manage members" (top right)
   - Add: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
   - Give it "Content Manager" or "Manager" role
   - Click "Send"

3. **Get Shared Drive ID:**
   - Open the Shared Drive
   - Look at the URL: `https://drive.google.com/drive/folders/[DRIVE_ID]`
   - Copy the `[DRIVE_ID]` part
   - Update `GOOGLE_DRIVE_FOLDER_ID` in `config.js` with this ID

4. **Update Backend:**
   - The backend code already supports Shared Drives (with `supportsAllDrives: true`)
   - Just update the folder ID in your config

### Option 2: Use Regular Folder with Domain-Wide Delegation (Advanced)

This requires Google Workspace admin access:

1. **Enable Domain-Wide Delegation:**
   - Go to Google Cloud Console
   - APIs & Services → Credentials
   - Find your Service Account
   - Enable "Domain-wide delegation"
   - Note the Client ID

2. **Configure in Google Workspace Admin:**
   - Go to Google Workspace Admin Console
   - Security → API Controls → Domain-wide Delegation
   - Add new → Enter Service Account Client ID
   - Add scopes: `https://www.googleapis.com/auth/drive.file`

3. **Share Folder with Service Account:**
   - Share your regular Drive folder with the Service Account email
   - Give it "Editor" permissions

### Option 3: Use OAuth 2.0 (User Authentication)

This requires users to sign in with Google, but allows uploading to regular folders.

**Note:** We removed OAuth earlier because you wanted no user authentication. If you want to use this option, we'll need to add OAuth back.

### Option 4: Use Google Cloud Storage (Alternative)

Instead of Google Drive, use Google Cloud Storage buckets:

1. Create a Cloud Storage bucket
2. Grant Service Account access
3. Upload files to the bucket
4. Get public URLs

## Recommended: Option 1 (Shared Drive)

If you have Google Workspace, use Shared Drive. It's the simplest solution.

## Quick Setup Steps for Shared Drive:

1. **Create Shared Drive:**
   ```
   Google Drive → Shared drives → New → "Payment Form Files"
   ```

2. **Add Service Account:**
   ```
   Manage members → Add: payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com
   Role: Content Manager
   ```

3. **Get Drive ID:**
   ```
   Copy ID from URL: https://drive.google.com/drive/folders/[DRIVE_ID]
   ```

4. **Update Config:**
   ```javascript
   // In config.js
   const GOOGLE_DRIVE_FOLDER_ID = 'YOUR_SHARED_DRIVE_ID';
   ```

5. **Restart Backend:**
   ```bash
   cd backend
   npm start
   ```

## Testing

After setup, test the upload:
1. Go to: `http://localhost:8000/test-backend.html`
2. Click "Upload File"
3. Select a test file
4. Should upload successfully

## Troubleshooting

### "Service Accounts do not have storage quota"
- **Solution:** Use Shared Drive (Option 1)

### "Permission denied"
- **Solution:** Make sure Service Account is added to Shared Drive with proper role

### "File not found"
- **Solution:** Verify Shared Drive ID is correct

---

**Which option do you want to use?** I recommend Option 1 (Shared Drive) if you have Google Workspace.

