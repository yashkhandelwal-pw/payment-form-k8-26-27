// Backend API Server for Payment Form
// This server handles Google Sheets and Drive operations using Service Account

const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Auth with Service Account
let authClient;
function initializeGoogleAuth() {
    try {
        // Load service account credentials from environment variable or file
        const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON 
            ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
            : require(path.join(__dirname, 'service-account-key.json'));

        authClient = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file'
            ]
        );

        console.log('Google Auth initialized with Service Account');
    } catch (error) {
        console.error('Error initializing Google Auth:', error);
        throw error;
    }
}

// Initialize on startup
initializeGoogleAuth();

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Payment Form API is running' });
});

// Generate Submission ID
app.post('/api/generate-submission-id', async (req, res) => {
    try {
        const { sheetId, sheetName, prefix, startNumber } = req.body;

        const sheets = google.sheets({ version: 'v4', auth: authClient });

        // Get existing submission IDs from column B
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}!B:B`
        });

        const values = response.data.values || [];
        let lastNumber = startNumber - 1;

        // Find the highest submission number
        if (values.length > 1) { // Skip header row
            for (let i = 1; i < values.length; i++) {
                const id = values[i] && values[i][0];
                if (id && id.startsWith(prefix)) {
                    const number = parseInt(id.replace(prefix, ''), 10);
                    if (!isNaN(number) && number > lastNumber) {
                        lastNumber = number;
                    }
                }
            }
        }

        const nextNumber = lastNumber + 1;
        const submissionID = `${prefix}${String(nextNumber).padStart(5, '0')}`;

        res.json({ submissionID });
    } catch (error) {
        console.error('Error generating submission ID:', error);
        res.status(500).json({ 
            error: 'Failed to generate submission ID',
            message: error.message 
        });
    }
});

// Upload file to Google Drive
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const { fileName, folderId } = req.body;
        const file = req.file;

        const drive = google.drive({ version: 'v3', auth: authClient });

        // Check if folder is a Shared Drive (requires supportsAllDrives)
        let fileMetadata = {
            name: fileName || file.originalname
        };

        // If folderId is provided, add it as parent
        if (folderId) {
            fileMetadata.parents = [folderId];
        }

        const media = {
            mimeType: file.mimetype,
            body: require('stream').Readable.from(file.buffer)
        };

        // Upload file to Google Drive with supportsAllDrives for Shared Drives
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink, name',
            supportsAllDrives: true, // Required for Shared Drives
            supportsTeamDrives: true // Legacy support
        });

        // Get file URL - try to get webViewLink, fallback to constructing URL
        let fileUrl = response.data.webViewLink;
        
        if (!fileUrl) {
            // If webViewLink is not available, construct it
            fileUrl = `https://drive.google.com/file/d/${response.data.id}/view`;
        }

        res.json({
            fileId: response.data.id,
            fileUrl: fileUrl,
            webViewLink: response.data.webViewLink || fileUrl,
            fileName: response.data.name
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        console.error('Error details:', error.response?.data || error.message);
        
        let errorMessage = 'Failed to upload file';
        if (error.message) {
            errorMessage = error.message;
        }
        
        res.status(500).json({ 
            error: 'Failed to upload file',
            message: errorMessage,
            details: error.response?.data || null
        });
    }
});

// Format timestamp to MM/DD/YYYY HH:MM:SS
function formatTimestamp(date) {
    const d = date || new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

// Submit form data to Google Sheets
app.post('/api/submit', async (req, res) => {
    try {
        const { sheetId, sheetName, data } = req.body;

        if (!data) {
            return res.status(400).json({ error: 'No data provided' });
        }

        const sheets = google.sheets({ version: 'v4', auth: authClient });

        // Format timestamp to MM/DD/YYYY HH:MM:SS
        let timestamp;
        if (data.timestamp) {
            timestamp = formatTimestamp(new Date(data.timestamp));
        } else {
            timestamp = formatTimestamp(new Date());
        }
        console.log('Formatted timestamp:', timestamp);

        // Log received data for debugging
        console.log('Received submission data:');
        console.log('  Employee Email:', data.employeeEmail);
        console.log('  RM Email ID:', data.rmEmailID);
        console.log('  ZM Email ID:', data.zmEmailID);
        
        // Prepare row data in correct column order
        const values = [[
            timestamp, // A: Submission Timestamp (MM/DD/YYYY HH:MM:SS)
            data.submissionID || '', // B: Submission ID
            data.employeeEmail || '', // C: Employee Email
            data.rmEmailID || '', // D: RM Email ID
            data.zmEmailID || '', // E: ZM Email ID
            data.customerCode || '', // F: Customer Code
            data.companyTradeName || '', // G: Company Trade Name
            data.customerEmail || '', // H: Customer Email ID
            data.contactNumber || '', // I: Customer Contact Number
            data.modeOfPayment || '', // J: Mode of Payment
            data.dateOfPayment || '', // K: Date of Payment
            data.paymentRefNumber || '', // L: Payment Reference Number
            data.paymentAmount || '', // M: Payment Amount
            data.remarks || '', // N: Remarks
            data.paymentConfirmationURL || '', // O: Payment Confirmation File URL
            data.depositReceiptURL || '' // P: Deposit Receipt File URL
        ]];
        
        console.log('Prepared values for sheet:', values[0]);

        // Append row to sheet (updated range to include new columns)
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${sheetName}!A:P`,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: values
            }
        });

        res.json({
            success: true,
            message: 'Form submitted successfully',
            updatedRows: response.data.updates?.updatedRows || 1
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ 
            error: 'Failed to submit form',
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Payment Form API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;


