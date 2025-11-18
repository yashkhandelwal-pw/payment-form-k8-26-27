# File Upload Fix - Quick Guide

## The Problem
Service Accounts cannot upload to regular Google Drive folders. Error:
```
Service Accounts do not have storage quota. Leverage shared drives...
```

## The Solution
Use a **Google Shared Drive** (Team Drive) instead of a regular folder.

## Quick Fix Steps

### Step 1: Create Shared Drive (If you have Google Workspace)

1. Go to [Google Drive](https://drive.google.com)
2. Click **"Shared drives"** in left sidebar
3. Click **"New"** → **"Shared drive"**
4. Name: `Payment Form Files`
5. Click **"Create"**

### Step 2: Add Service Account

1. Open the Shared Drive you just created
2. Click **"Manage members"** (top right)
3. Click **"Add members"**
4. Enter: `payment-form-service@payment-form-k8-26-27.iam.gserviceaccount.com`
5. Role: **"Content Manager"** or **"Manager"**
6. **Uncheck** "Notify people"
7. Click **"Send"**

### Step 3: Get Shared Drive ID

1. While in the Shared Drive, look at the URL:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
   ```
2. Copy the ID part: `1a2b3c4d5e6f7g8h9i0j`

### Step 4: Update Configuration

Open `config.js` and update:

```javascript
// Change this:
const GOOGLE_DRIVE_FOLDER_ID = '1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92';

// To your Shared Drive ID:
const GOOGLE_DRIVE_FOLDER_ID = 'YOUR_SHARED_DRIVE_ID_HERE';
```

### Step 5: Restart Backend

1. Stop the backend server (Ctrl+C in the terminal)
2. Restart it:
   ```bash
   cd backend
   npm start
   ```

### Step 6: Test Upload

1. Go to: `http://localhost:8000/test-backend.html`
2. Click **"Upload File"**
3. Select a test file
4. Should work now! ✅

## Alternative: If You Don't Have Google Workspace

If you don't have Google Workspace (can't create Shared Drives), you have two options:

### Option A: Use OAuth 2.0 (User Signs In)
- Users sign in with Google
- Files upload to their Drive or a shared folder
- **I can help set this up if needed**

### Option B: Use Google Cloud Storage
- Create a Cloud Storage bucket
- Upload files there instead
- **I can help set this up if needed**

## Current Status

✅ Backend code updated to support Shared Drives  
✅ Ready to use once you create Shared Drive and update folder ID  

## Need Help?

1. **Have Google Workspace?** → Use Shared Drive (Steps above)
2. **Don't have Workspace?** → Let me know, I'll set up OAuth or Cloud Storage

---

**Next Step:** Create the Shared Drive and update the folder ID in `config.js`!

