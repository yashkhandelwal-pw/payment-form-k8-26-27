# Payment Form K8 26-27 - Workflow Documentation

## Overview
A native web application (mobile & desktop compatible) for payment form submission with employee authentication, customer selection, and payment details capture.

---

## Application Workflow

### Phase 1: Authentication & Validation

1. **Initial Screen**
   - User opens the application
   - Email input field is displayed
   - "Fetch Details" button below the email field

2. **Email Validation Process**
   ```
   User enters email → Clicks "Fetch Details" → 
   Query Supabase "emp_record" table:
   - Check if email exists in "email" column
   - Verify "status" = "Active"
   - Verify "team" = "Sales"
   - If all conditions pass → Show Payment Form
   - If validation fails → Show error message
   ```

---

### Phase 2: Customer Selection

3. **Customer Dropdown Population**
   ```
   After successful login:
   - Query "order_form_k8_25_26" table
   - Find logged-in employee's record by "employee_email_id"
   - Extract their "zm_email_id" (Zone Manager Email ID)
   - Find all records where "zm_email_id" matches
   - Extract unique "customer_code_name" values
   - Populate dropdown with unique customer names
   ```

4. **Customer Selection**
   - User selects a customer from dropdown
   - Trigger data fetch for selected customer

---

### Phase 3: Payment Details Form

5. **Auto-populated Fields (Read-only/Frozen)**
   - **Customer Code**: From "customer_code" column (selected customer)
   - **Company Trade Name**: From "company_trade_name" column
   - **Customer Email ID**: From "customer_email" column
   - **Customer Contact Number**: From "contact_number" column

6. **User Input Fields**
   - **Mode of Payment**: Dropdown with options:
     - Cheque
     - Razorpay
     - NEFT / RTGS
   
   - **Date of Payment**: Date picker (max date = today, no future dates)
   
   - **Payment Reference Number**: Text input (Cheque No./UTR No.)
   
   - **Payment Amount**: Number input with Indian currency formatting (₹)
     - Format: ₹ 1,23,456.78 (Indian numbering system)
   
   - **Remarks, If Any**: Textarea input
   
   - **Payment Confirmation Screenshot/Cheque Image**: File input
     - Accept: Images (jpg, png, jpeg, webp)
     - Accept: PDF files
     - Camera capture support (mobile)
   
   - **Deposit Receipt Image (for Cheque only)**: File input
     - **Conditional Field**: Only visible when "Mode of Payment" = "Cheque"
     - Accept: Images (jpg, png, jpeg, webp)
     - Accept: PDF files
     - Camera capture support (mobile)

---

### Phase 4: Form Submission

7. **Pre-submission Processing**
   ```
   User clicks "Submit" →
   1. Validate all required fields
   2. Generate unique Submission ID (format: K8PC00001, K8PC00002, etc.)
   3. Compress image files (if any)
   4. Upload files to Google Drive folder
   5. Get Google Drive file URLs/IDs
   6. Prepare form data payload
   7. Submit to Google Sheets
   8. Show success/error message
   ```

8. **Submission ID Generation**
   - Format: `K8PC` + 5-digit sequential number
   - First submission: `K8PC00001`
   - Second submission: `K8PC00002`
   - Store last used ID (can use Supabase table or Google Sheets to track)

9. **Image Processing**
   - Compress images before upload (reduce file size)
   - Maintain acceptable quality
   - Support multiple formats (jpg, png, pdf)

10. **Google Drive Upload**
    - Upload to folder: `1fAMH_LqksEVvT9J72-ahdmaNDxeXgY92`
    - Store file IDs or URLs for reference
    - Organize files by submission ID (optional)

11. **Google Sheets Submission**
    - Submit all form data to designated Google Sheet
    - Include: Submission ID, all form fields, file URLs
    - Handle errors gracefully

---

## Database Schema Reference

### Table: `emp_record`
- `email` (string) - Employee email
- `status` (string) - Must be "Active"
- `team` (string) - Must be "Sales"

### Table: `order_form_k8_25_26`
- `employee_email_id` (string) - Employee email
- `zm_email_id` (string) - Zone Manager email
- `customer_code_name` (string) - Customer name for dropdown
- `customer_code` (string) - Customer code
- `company_trade_name` (string) - Company name
- `customer_email` (string) - Customer email
- `contact_number` (string) - Contact number

---

## Technical Stack Recommendations

1. **Frontend Framework**: 
   - Vanilla JavaScript (for simplicity) OR
   - React/Vue (for better state management)

2. **Styling**: 
   - CSS with responsive design (mobile-first)
   - Media queries for desktop/mobile

3. **Libraries**:
   - Supabase JS Client (for database queries)
   - Google Drive API (for file uploads)
   - Google Sheets API (for data submission)
   - Image compression library (e.g., browser-image-compression)
   - Date picker library (e.g., flatpickr or native HTML5)

4. **APIs Required**:
   - Supabase REST API (already configured)
   - Google Drive API v3
   - Google Sheets API v4

---

## Data Flow Diagram

```
[User Email Input]
    ↓
[Validate in emp_record]
    ↓
[Fetch ZM Email ID]
    ↓
[Load Customers for ZM]
    ↓
[User Selects Customer]
    ↓
[Auto-fill Customer Details]
    ↓
[User Fills Payment Details]
    ↓
[Compress Images]
    ↓
[Upload to Google Drive]
    ↓
[Generate Submission ID]
    ↓
[Submit to Google Sheets]
    ↓
[Success/Error Response]
```

---

## Error Handling Points

1. **Authentication Errors**
   - Email not found
   - Status not "Active"
   - Team not "Sales"

2. **Data Fetch Errors**
   - No customers found for ZM
   - Supabase connection issues

3. **File Upload Errors**
   - File size too large
   - Unsupported file format
   - Google Drive upload failure

4. **Submission Errors**
   - Google Sheets API errors
   - Network failures
   - Validation errors

---

## Next Steps

1. Set up Google Sheets API credentials
2. Set up Google Drive API credentials
3. Create Google Sheet with proper column headers
4. Implement the application code
5. Test each phase independently
6. Deploy the application


