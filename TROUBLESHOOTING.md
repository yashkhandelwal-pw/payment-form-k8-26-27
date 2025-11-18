# Troubleshooting Guide

## Issue: Page Goes Blank When Clicking "Fetch Details"

### Possible Causes & Solutions:

### 1. **Supabase Library Not Loaded**
**Symptoms:** Blank page, console shows "Supabase library not loaded"

**Solution:**
- Check internet connection
- Verify CDN is accessible: https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2
- Refresh the page (Ctrl+F5 to clear cache)

### 2. **Database Connection Error**
**Symptoms:** Error message appears, page doesn't switch

**Solution:**
- Check browser console (F12) for error details
- Verify Supabase URL and API key in `config.js`
- Check if Supabase project is active

### 3. **Email Not Found in Database**
**Symptoms:** Error message "Email not found in records"

**Solution:**
- Verify email exists in `emp_record` table
- Check email spelling
- Ensure email is in Supabase database

### 4. **Employee Record Not Found**
**Symptoms:** Error message "Employee record not found"

**Solution:**
- Verify employee email exists in `order_form_k8_25_26` table
- Check `employee_email_id` column matches the email entered
- Ensure employee has a `zm_email_id` assigned

### 5. **No Customers Found**
**Symptoms:** Error message "No customers found for your Zone Manager"

**Solution:**
- Verify customers exist in `order_form_k8_25_26` table
- Check that customers are mapped to the employee's ZM
- Verify `zm_email_id` is correctly set

### 6. **JavaScript Errors**
**Symptoms:** Blank page, errors in browser console

**Solution:**
1. Open browser console (F12)
2. Check for red error messages
3. Look for:
   - "Cannot read property of undefined"
   - "TypeError"
   - "ReferenceError"
4. Share error message for help

## How to Debug:

### Step 1: Open Browser Console
- Press **F12** or **Right-click → Inspect**
- Go to **Console** tab

### Step 2: Check for Errors
- Look for red error messages
- Note the error message and line number

### Step 3: Check Network Tab
- Go to **Network** tab
- Click "Fetch Details"
- Look for failed requests (red)
- Check if Supabase requests are successful

### Step 4: Verify Configuration
- Check `config.js` has correct:
  - `SUPABASE_URL`
  - `SUPABASE_API_KEY`
  - `BACKEND_API_URL`

## Common Error Messages:

### "Database connection error. Please refresh the page."
- **Cause:** Supabase library not loaded
- **Fix:** Refresh page, check internet connection

### "Email not found in records"
- **Cause:** Email doesn't exist in `emp_record` table
- **Fix:** Verify email in database

### "Your account is not active"
- **Cause:** Employee status is not "Active"
- **Fix:** Update status in database to "Active"

### "Access denied. This form is only for Sales team members."
- **Cause:** Employee team is not "Sales"
- **Fix:** Update team in database to "Sales"

### "Employee record not found"
- **Cause:** Email not in `order_form_k8_25_26` table
- **Fix:** Add employee record with `employee_email_id`

### "No customers found for your Zone Manager"
- **Cause:** No customers mapped to employee's ZM
- **Fix:** Add customers with matching `zm_email_id`

## Still Having Issues?

1. **Check Browser Console** (F12) for specific errors
2. **Verify Database Tables:**
   - `emp_record` table exists
   - `order_form_k8_25_26` table exists
   - Data is present in both tables
3. **Test Backend:**
   - Open: `http://localhost:8000/test-backend.html`
   - Verify backend is working
4. **Check Network:**
   - Ensure internet connection is working
   - Verify Supabase CDN is accessible

## Quick Fixes:

### Clear Browser Cache
- Press **Ctrl+Shift+Delete**
- Clear cached images and files
- Refresh page (Ctrl+F5)

### Hard Refresh
- **Windows:** Ctrl+F5
- **Mac:** Cmd+Shift+R

### Check Server Status
- Backend: `http://localhost:3000/api/health`
- Should return: `{"status":"ok"}`

---

**Need more help?** Share the error message from browser console (F12)!

