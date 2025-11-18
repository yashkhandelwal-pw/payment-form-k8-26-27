# Payment Form K8 26-27 - Implementation Checklist

## Pre-Development Setup

### Google Cloud Setup
- [ ] Create Google Cloud Project
- [ ] Enable Google Sheets API
- [ ] Enable Google Drive API
- [ ] Create Service Account (or OAuth credentials)
- [ ] Download Service Account JSON key file
- [ ] Share Google Drive folder with service account email
- [ ] Create Google Sheet with proper column headers
- [ ] Share Google Sheet with service account email
- [ ] Save Sheet ID and Sheet Name

### Supabase Setup
- [x] Supabase URL: `https://kfkcohosbpaeuzxuohrm.supabase.co`
- [x] Supabase API Key: Already provided
- [ ] Verify `emp_record` table structure
- [ ] Verify `order_form_k8_25_26` table structure

---

## Development Phases

### Phase 1: Authentication Screen
- [ ] Create email input field
- [ ] Create "Fetch Details" button
- [ ] Implement Supabase query for email validation
- [ ] Check `status = "Active"` and `team = "Sales"`
- [ ] Display error messages for invalid credentials
- [ ] Show payment form on successful validation

### Phase 2: Customer Selection
- [ ] Query `order_form_k8_25_26` table
- [ ] Find employee's `zm_email_id` from `employee_email_id`
- [ ] Filter customers by `zm_email_id`
- [ ] Extract unique `customer_code_name` values
- [ ] Populate dropdown with customer names
- [ ] Handle case when no customers found

### Phase 3: Payment Form Fields

#### Auto-populated Fields (Read-only)
- [ ] Customer Code (from `customer_code`)
- [ ] Company Trade Name (from `company_trade_name`)
- [ ] Customer Email ID (from `customer_email`)
- [ ] Customer Contact Number (from `contact_number`)

#### User Input Fields
- [ ] Mode of Payment dropdown (Cheque, Razorpay, NEFT/RTGS)
- [ ] Date of Payment (calendar, max date = today)
- [ ] Payment Reference Number input
- [ ] Payment Amount input with Indian currency formatting
- [ ] Remarks textarea
- [ ] Payment Confirmation file upload (image/PDF, camera support)
- [ ] Deposit Receipt file upload (conditional - only for Cheque)

### Phase 4: Form Submission
- [ ] Form validation (required fields)
- [ ] Generate unique Submission ID (K8PC00001, K8PC00002, etc.)
- [ ] Image compression before upload
- [ ] Upload files to Google Drive
- [ ] Get file URLs/IDs from Google Drive
- [ ] Submit data to Google Sheets
- [ ] Success/error message display
- [ ] Form reset after successful submission

---

## Technical Features

### Responsive Design
- [ ] Mobile-first CSS approach
- [ ] Desktop layout optimization
- [ ] Touch-friendly buttons and inputs
- [ ] Responsive file upload interface

### Image Handling
- [ ] Image compression library integration
- [ ] Support for multiple image formats (jpg, png, jpeg, webp)
- [ ] PDF file support
- [ ] Camera capture support (mobile)
- [ ] File size validation

### Currency Formatting
- [ ] Indian currency format (₹ 1,23,456.78)
- [ ] Real-time formatting as user types
- [ ] Proper number parsing for submission

### Conditional Fields
- [ ] Show/hide "Deposit Receipt Image" based on Mode of Payment
- [ ] Dynamic form validation based on selected mode

### Error Handling
- [ ] Network error handling
- [ ] API error handling
- [ ] User-friendly error messages
- [ ] Loading states for async operations

---

## Testing Checklist

### Authentication Testing
- [ ] Test with valid email (Active, Sales team)
- [ ] Test with invalid email
- [ ] Test with inactive status
- [ ] Test with non-Sales team

### Customer Selection Testing
- [ ] Test customer dropdown population
- [ ] Test with employee having multiple customers
- [ ] Test with employee having no customers
- [ ] Test unique customer names display

### Form Validation Testing
- [ ] Test all required fields
- [ ] Test date picker (no future dates)
- [ ] Test currency formatting
- [ ] Test file upload (images and PDFs)
- [ ] Test conditional field visibility

### Submission Testing
- [ ] Test image compression
- [ ] Test Google Drive upload
- [ ] Test Google Sheets submission
- [ ] Test Submission ID generation
- [ ] Test error handling for failed submissions

### Cross-Device Testing
- [ ] Test on mobile devices
- [ ] Test on desktop browsers
- [ ] Test camera capture on mobile
- [ ] Test file upload on different devices

---

## Data to Collect

### From User
- [ ] Employee Email (from login)
- [ ] Selected Customer
- [ ] Mode of Payment
- [ ] Date of Payment
- [ ] Payment Reference Number
- [ ] Payment Amount
- [ ] Remarks
- [ ] Payment Confirmation File
- [ ] Deposit Receipt File (if Cheque)

### Auto-generated
- [ ] Submission ID (K8PC00001 format)
- [ ] Submission Timestamp
- [ ] Customer Code (from database)
- [ ] Company Trade Name (from database)
- [ ] Customer Email ID (from database)
- [ ] Customer Contact Number (from database)

---

## Google Sheets Column Structure

Ensure your Google Sheet has these columns (in order):
1. Submission ID
2. Employee Email
3. Customer Code
4. Company Trade Name
5. Customer Email ID
6. Customer Contact Number
7. Mode of Payment
8. Date of Payment
9. Payment Reference Number
10. Payment Amount
11. Remarks
12. Payment Confirmation File URL
13. Deposit Receipt File URL
14. Submission Timestamp

---

## Security Checklist

- [ ] Never expose Service Account JSON in client-side code
- [ ] Use environment variables for sensitive data
- [ ] Implement input sanitization
- [ ] Validate file types and sizes
- [ ] Use HTTPS in production
- [ ] Implement rate limiting (if needed)
- [ ] Secure Supabase API key (consider Row Level Security)

---

## Deployment Checklist

- [ ] Choose hosting platform (Netlify, Vercel, GitHub Pages, etc.)
- [ ] Set up environment variables
- [ ] Configure CORS if needed
- [ ] Test in production environment
- [ ] Set up error monitoring
- [ ] Create backup of Service Account credentials
- [ ] Document deployment process

---

## Next Steps After Setup

1. Complete Google Sheets setup (follow `GOOGLE_SHEETS_SETUP_GUIDE.md`)
2. Share Sheet ID and Sheet Name
3. Confirm authentication method preference
4. Begin code implementation
5. Test each phase independently
6. Deploy to production


