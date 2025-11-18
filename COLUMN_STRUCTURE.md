# Google Sheets Column Structure

## Sheet Details
- **Sheet ID**: `1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A`
- **Sheet Name**: `Form Responses`

## Column Mapping (Row 1 Headers)

| Column | Letter | Field Name | Data Source |
|--------|--------|------------|-------------|
| A | A | Submission Timestamp | Auto-generated (MM/DD/YYYY HH:MM:SS format) |
| B | B | Submission ID | Generated (K8PC00001, K8PC00002, etc.) |
| C | C | Employee Email | From login validation |
| D | D | RM Email ID | From `order_form_k8_25_26.rm_email_id` (auto-fetched) |
| E | E | ZM Email ID | From `order_form_k8_25_26.zm_email_id` (auto-fetched) |
| F | F | Customer Code | From `order_form_k8_25_26.customer_code` |
| G | G | Company Trade Name | From `order_form_k8_25_26.company_trade_name` |
| H | H | Customer Email ID | From `order_form_k8_25_26.customer_email` |
| I | I | Customer Contact Number | From `order_form_k8_25_26.contact_number` |
| J | J | Mode of Payment | User input (Cheque/Razorpay/NEFT/RTGS) |
| K | K | Date of Payment | User input (date picker) |
| L | L | Payment Reference Number | User input (Cheque No./UTR No.) |
| M | M | Payment Amount | User input (formatted as number) |
| N | N | Remarks | User input (optional) |
| O | O | Payment Confirmation File URL | Google Drive file URL |
| P | P | Deposit Receipt File URL | Google Drive file URL (Cheque only) |

## Data Submission Order
When submitting to Google Sheets, data will be inserted in this order:
```
[Timestamp (MM/DD/YYYY HH:MM:SS), SubmissionID, EmployeeEmail, RMEmailID, ZMEmailID,
 CustomerCode, CompanyTradeName, CustomerEmailID, ContactNumber, ModeOfPayment, 
 DateOfPayment, PaymentRefNumber, PaymentAmount, Remarks, 
 PaymentConfirmationURL, DepositReceiptURL]
```

## Notes
- **RM Email ID** and **ZM Email ID** are automatically fetched from the database
- These fields are **NOT visible** in the form - they're added automatically during submission
- **Timestamp** format: `MM/DD/YYYY HH:MM:SS` (e.g., "11/13/2025 17:20:14")


