# Testing Guide - Payment Form K8 26-27

## Prerequisites

✅ Backend server is running on `http://localhost:3000`  
✅ Service Account JSON key is in `backend/service-account-key.json`  
✅ Google Drive folder and Sheet are shared with Service Account email  

## Quick Test (5 minutes)

### 1. Test Backend Connection

Open: `test-backend.html` in your browser

Or visit: `http://localhost:3000/api/health`

**Expected Result:**
```json
{
  "status": "ok",
  "message": "Payment Form API is running"
}
```

### 2. Test All Backend Endpoints

Use the test page (`test-backend.html`) to test:

1. **Health Check** ✅
   - Should return success immediately

2. **Generate Submission ID** ✅
   - Should generate: `K8PC00001` (or next sequential number)
   - Check Google Sheet column B to verify

3. **Upload File** ✅
   - Select any image or PDF
   - Should return file URL
   - Check Google Drive folder to verify file appears

4. **Submit Form Data** ✅
   - Should submit test data to Google Sheet
   - Check Google Sheet to verify new row added

5. **Full Flow Test** ✅
   - Tests complete workflow end-to-end
   - Should complete all steps successfully

## Full Application Test

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
python -m http.server 8000
# or
npx http-server -p 8000
```

### Step 2: Open Application

Navigate to: `http://localhost:8000`

### Step 3: Test Authentication

1. Enter a valid employee email (from `emp_record` table)
2. Click "Fetch Details"
3. **Expected:** Form should appear (if email is Active and team is Sales)
4. **If error:** Check Supabase connection and table data

### Step 4: Test Customer Selection

1. After authentication, customer dropdown should populate
2. Select a customer
3. **Expected:** Customer details should auto-fill (read-only fields)

### Step 5: Test Form Fields

1. **Mode of Payment:**
   - Select "Cheque" → Deposit Receipt field should appear
   - Select "Razorpay" or "NEFT/RTGS" → Deposit Receipt field should hide

2. **Date of Payment:**
   - Should not allow future dates
   - Should be in YYYY-MM-DD format

3. **Payment Amount:**
   - Enter: `1000`
   - **Expected:** Should format as `₹ 1,000` (Indian currency)

4. **File Uploads:**
   - Upload payment confirmation file
   - Upload deposit receipt (if Cheque)
   - **Expected:** File preview should appear

### Step 6: Test Form Submission

1. Fill all required fields
2. Click "Submit"
3. **Expected:**
   - Loading indicator appears
   - Success message with Submission ID
   - Form resets after 2 seconds

4. **Verify in Google Sheet:**
   - New row should be added
   - All data should be in correct columns
   - Submission ID should be sequential

5. **Verify in Google Drive:**
   - Files should be uploaded
   - File names should include Submission ID
   - Files should be in the correct folder

## Test Cases

### Test Case 1: Valid Submission
- ✅ Employee email: Valid, Active, Sales team
- ✅ All required fields filled
- ✅ Files uploaded
- ✅ **Expected:** Successful submission

### Test Case 2: Invalid Email
- ❌ Employee email: Not in database
- ✅ **Expected:** Error message "Email not found"

### Test Case 3: Inactive Employee
- ❌ Employee email: Status = "Inactive"
- ✅ **Expected:** Error message "Account is not active"

### Test Case 4: Wrong Team
- ❌ Employee email: Team ≠ "Sales"
- ✅ **Expected:** Error message "Access denied"

### Test Case 5: Missing Required Fields
- ✅ Employee email: Valid
- ❌ Missing required fields
- ✅ **Expected:** Validation errors shown

### Test Case 6: Cheque Mode
- ✅ Mode of Payment: "Cheque"
- ✅ Deposit Receipt field visible
- ✅ Both files uploaded
- ✅ **Expected:** Successful submission

### Test Case 7: Non-Cheque Mode
- ✅ Mode of Payment: "Razorpay" or "NEFT/RTGS"
- ✅ Deposit Receipt field hidden
- ✅ Only payment confirmation uploaded
- ✅ **Expected:** Successful submission

### Test Case 8: Image Compression
- ✅ Upload large image (>1MB)
- ✅ **Expected:** Image compressed before upload
- ✅ **Verify:** File size reduced in Google Drive

## Browser Console Testing

Open browser console (F12) and check for:

1. **No errors** in console
2. **Network tab** shows:
   - Successful API calls to backend
   - Status 200 for all requests
   - Response times are reasonable

3. **Application tab** (if using):
   - No storage errors
   - No CORS errors

## Mobile Testing

1. Open application on mobile device
2. Test camera capture for file uploads
3. Verify responsive design works
4. Test form submission on mobile

## Performance Testing

1. **Submission Time:**
   - Should complete in < 5 seconds
   - Image compression should be < 2 seconds

2. **File Upload:**
   - Small files (< 1MB): < 3 seconds
   - Large files (> 1MB): < 10 seconds

## Error Scenarios

### Backend Not Running
- **Symptom:** All API calls fail
- **Fix:** Start backend server

### Service Account Not Configured
- **Symptom:** "Permission denied" errors
- **Fix:** Verify JSON key file exists and is correct

### Google Resources Not Shared
- **Symptom:** "Permission denied" when accessing Sheets/Drive
- **Fix:** Share folder and sheet with Service Account email

### Invalid Sheet ID
- **Symptom:** "Sheet not found" error
- **Fix:** Verify Sheet ID in `config.js`

### Network Issues
- **Symptom:** Timeout errors
- **Fix:** Check internet connection, verify backend is accessible

## Success Criteria

✅ All backend endpoints work  
✅ Frontend connects to backend  
✅ Authentication works correctly  
✅ Customer selection works  
✅ Form validation works  
✅ File uploads work  
✅ Form submission works  
✅ Data appears in Google Sheet  
✅ Files appear in Google Drive  
✅ Submission IDs are sequential  
✅ No console errors  
✅ Mobile responsive  

## Reporting Issues

If you find issues, note:
1. What you were doing
2. What you expected
3. What actually happened
4. Browser console errors (if any)
5. Backend server logs (if any)

---

**Happy Testing!** 🎉


