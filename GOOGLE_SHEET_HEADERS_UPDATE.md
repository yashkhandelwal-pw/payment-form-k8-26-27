# Google Sheet Headers Update Guide

## ⚠️ IMPORTANT: Update Your Google Sheet Headers

You need to add two new columns to your Google Sheet after "Employee Email".

## Current Column Structure (Row 1)

Update your Google Sheet headers in Row 1 to match this structure:

| Column | Header Name |
|--------|-------------|
| A | Submission Timestamp |
| B | Submission ID |
| C | Employee Email |
| **D** | **RM Email ID** ← **ADD THIS** |
| **E** | **ZM Email ID** ← **ADD THIS** |
| F | Customer Code |
| G | Company Trade Name |
| H | Customer Email ID |
| I | Customer Contact Number |
| J | Mode of Payment |
| K | Date of Payment |
| L | Payment Reference Number |
| M | Payment Amount |
| N | Remarks |
| O | Payment Confirmation File URL |
| P | Deposit Receipt File URL |

## Steps to Update

1. **Open your Google Sheet:**
   - https://docs.google.com/spreadsheets/d/1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A

2. **Go to "Form Responses" sheet**

3. **Insert two new columns after Column C (Employee Email):**
   - Right-click on Column D header
   - Select "Insert 1 column left" (this will shift existing columns)
   - Do this twice to create columns D and E

4. **Add headers:**
   - **Column D**: `RM Email ID`
   - **Column E**: `ZM Email ID`

5. **Verify the order:**
   - A: Submission Timestamp
   - B: Submission ID
   - C: Employee Email
   - D: RM Email ID ← New
   - E: ZM Email ID ← New
   - F: Customer Code
   - G: Company Trade Name
   - ... (rest of columns)

## What Happens

- **RM Email ID** and **ZM Email ID** are automatically fetched from the database
- They are **NOT visible** in the form
- They are automatically added when the form is submitted
- **Timestamp** is now formatted as: `MM/DD/YYYY HH:MM:SS` (e.g., "11/13/2025 17:20:14")

## After Updating Headers

1. Restart backend server
2. Test form submission
3. Verify data appears in correct columns

---

**Make sure to update the headers before testing!**

