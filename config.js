// Configuration File
// DO NOT commit sensitive data to public repositories

// Supabase Configuration
const SUPABASE_URL = 'https://kfkcohosbpaeuzxuohrm.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtma2NvaG9zYnBhZXV6eHVvaHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDgyODgsImV4cCI6MjA2OTc4NDI4OH0.0f5ux3Z1B2Y8acpn7ZC40HiLeW3QhZcvZkr758ySivk';

// Google Sheets Configuration
const GOOGLE_SHEET_ID = '1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A';
const GOOGLE_SHEET_NAME = 'Form Responses';

// Google Drive Configuration (Shared Drive ID)
const GOOGLE_DRIVE_FOLDER_ID = '0AO4PzvJNGviNUk9PVA';

// Backend API Configuration
// Backend server URL - update if running on different port or domain
const BACKEND_API_URL = 'http://localhost:3000/api';

// For production, update to your deployed backend URL:
// const BACKEND_API_URL = 'https://your-backend-domain.com/api';

// Submission ID Configuration
const SUBMISSION_ID_PREFIX = 'K8PC';
const SUBMISSION_ID_START = 1; // Starting number (00001)

// Image Compression Settings
const IMAGE_COMPRESSION_OPTIONS = {
    maxSizeMB: 1, // Maximum file size in MB
    maxWidthOrHeight: 1920, // Maximum width or height
    useWebWorker: true,
    fileType: 'image/jpeg' // Convert to JPEG for better compression
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUPABASE_URL,
        SUPABASE_API_KEY,
        GOOGLE_SHEET_ID,
        GOOGLE_SHEET_NAME,
        GOOGLE_DRIVE_FOLDER_ID,
        BACKEND_API_URL,
        SUBMISSION_ID_PREFIX,
        SUBMISSION_ID_START,
        IMAGE_COMPRESSION_OPTIONS
    };
}

