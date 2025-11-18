// Main Application JavaScript

// Check if configuration is loaded
if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_API_KEY === 'undefined') {
    console.error('Configuration not loaded! SUPABASE_URL or SUPABASE_API_KEY is undefined.');
    alert('Error: Configuration not loaded. Please ensure config.js is loaded before app.js');
}

// Initialize Supabase Client
let supabase;
try {
    if (typeof window !== 'undefined' && window.supabase) {
        if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_API_KEY !== 'undefined') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);
            console.log('Supabase client initialized');
        } else {
            console.error('Supabase configuration missing');
        }
    } else {
        console.error('Supabase library not loaded from CDN');
    }
} catch (error) {
    console.error('Error initializing Supabase:', error);
}

// Global State
let currentUserEmail = '';
let currentUserZM = '';
let customersData = [];

// DOM Elements - Will be initialized in DOMContentLoaded
let authScreen;
let formScreen;
let employeeEmailInput;
let fetchDetailsBtn;
let logoutBtn;
let loggedInEmail;
let customerSelect;
let paymentForm;
let modeOfPayment;
let depositReceiptGroup;
let dateOfPayment;
let paymentAmount;
let paymentConfirmationFile;
let depositReceiptFile;
let paymentConfirmationPreview;
let depositReceiptPreview;

// Initialize Date Picker
let datePicker;
function initDatePicker() {
    datePicker = flatpickr(dateOfPayment, {
        maxDate: 'today',
        dateFormat: 'Y-m-d',
        allowInput: false
    });
}

// Email Authentication
async function authenticateEmployee() {
    console.log('=== authenticateEmployee START ===');
    try {
        console.log('Checking employeeEmailInput...');
        if (!employeeEmailInput) {
            console.error('employeeEmailInput is null');
            alert('Error: Email input field not found. Please refresh the page.');
            return false;
        }
        
        const email = employeeEmailInput.value.trim();
        console.log('Email entered:', email);
        
        if (!email) {
            console.log('No email entered');
            showError('emailError', 'Please enter your email address');
            return false;
        }

        // Check if Supabase is initialized
        console.log('Checking Supabase...');
        if (!supabase) {
            console.error('Supabase not initialized');
            showError('emailError', 'Database connection error. Please refresh the page.');
            return false;
        }
        console.log('Supabase is initialized');

        console.log('Showing loading...');
        showLoading(true);
        
        console.log('Querying emp_record table...');
        // Query emp_record table
        const { data, error } = await supabase
            .from('emp_record')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        console.log('Query result - data:', data);
        console.log('Query result - error:', error);
        
        if (error) {
            console.error('Supabase query error:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            throw error;
        }

        if (!data) {
            console.log('No data returned - email not found');
            showError('emailError', 'Email not found in records');
            showLoading(false);
            return false;
        }

        console.log('Employee data found:', data);
        console.log('Status:', data.status);
        console.log('Team:', data.team);

        // Validate status and team
        if (data.status !== 'Active') {
            console.log('Account is not active');
            showError('emailError', 'Your account is not active. Please contact administrator.');
            showLoading(false);
            return false;
        }

        if (data.team !== 'Sales') {
            console.log('Team is not Sales');
            showError('emailError', 'Access denied. This form is only for Sales team members.');
            showLoading(false);
            return false;
        }
        
        console.log('✅ Authentication successful!');

        // Authentication successful
        currentUserEmail = email;
        
        if (loggedInEmail) {
            loggedInEmail.textContent = email;
        }
        
        clearError('emailError');
        
        // Load customers for this employee
        console.log('Loading customers for email:', email);
        const customersLoaded = await loadCustomers();
        
        if (!customersLoaded) {
            // If customers failed to load, show error but don't switch screens
            console.error('Failed to load customers');
            showLoading(false);
            return false;
        }
        
        console.log('Customers loaded successfully, switching to form screen');
        
        // Switch to form screen
        try {
            if (!authScreen) {
                throw new Error('Auth screen element not found');
            }
            if (!formScreen) {
                throw new Error('Form screen element not found');
            }
            
            console.log('Removing active from authScreen...');
            authScreen.classList.remove('active');
            console.log('Auth screen classes:', authScreen.className);
            
            console.log('Removing hidden from formScreen (if exists)...');
            formScreen.classList.remove('hidden');
            console.log('Adding active to formScreen...');
            formScreen.classList.add('active');
            console.log('Form screen classes:', formScreen.className);
            
            // Force a reflow to ensure display change
            void formScreen.offsetHeight;
            
            // Double check and force display
            const computedStyle = window.getComputedStyle(formScreen);
            console.log('formScreen display style:', computedStyle.display);
            
            if (computedStyle.display === 'none') {
                console.warn('Form screen still hidden, forcing display...');
                formScreen.style.display = 'block';
            }
            
            console.log('Successfully switched to form screen');
        } catch (screenError) {
            console.error('Error switching screens:', screenError);
            showError('emailError', 'Error displaying form: ' + screenError.message + '. Please refresh the page.');
            showLoading(false);
            return false;
        }
        
        showLoading(false);
        return true;

    } catch (error) {
        console.error('❌ Authentication error:', error);
        console.error('Error type:', typeof error);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error stack:', error.stack);
        
        let errorMessage = 'Error authenticating. Please try again.';
        
        if (error.message) {
            errorMessage = error.message;
        } else if (error.code) {
            errorMessage = `Database error: ${error.code}`;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        console.log('Showing error message:', errorMessage);
        showError('emailError', errorMessage);
        showLoading(false);
        console.log('=== authenticateEmployee END (ERROR) ===');
        return false;
    }
    console.log('=== authenticateEmployee END (SUCCESS) ===');
}

// Load Customers based on ZM
async function loadCustomers() {
    try {
        showLoading(true);

        if (!supabase) {
            throw new Error('Database connection not available');
        }
        
        if (!currentUserEmail) {
            throw new Error('User email not set');
        }

        // First, find the employee's RM and ZM email
        const { data: employeeData, error: empError } = await supabase
            .from('order_form_k8_25_26')
            .select('rm_email_id, zm_email_id')
            .eq('employee_email_id', currentUserEmail)
            .limit(1)
            .maybeSingle();

        if (empError) {
            console.error('Error finding employee ZM:', empError);
            throw new Error('Error finding employee record: ' + empError.message);
        }

        if (!employeeData || !employeeData.zm_email_id) {
            const errorMsg = 'Employee record not found in order_form_k8_25_26 table. Please contact administrator.';
            console.error('Employee ZM not found for email:', currentUserEmail);
            showError('emailError', errorMsg);
            showLoading(false);
            return false;
        }

        currentUserZM = employeeData.zm_email_id || '';
        // Store RM email ID for submission (will be sent to backend)
        window.currentUserRM = employeeData.rm_email_id || '';
        
        console.log('Stored RM Email ID:', window.currentUserRM);
        console.log('Stored ZM Email ID:', currentUserZM);

        // Get all customers for this ZM (also fetch rm_email_id and zm_email_id for submission)
        const { data: customers, error: custError } = await supabase
            .from('order_form_k8_25_26')
            .select('customer_code_name, customer_code, company_trade_name, customer_email, contact_number, rm_email_id, zm_email_id')
            .eq('zm_email_id', currentUserZM);

        if (custError) {
            console.error('Error loading customers:', custError);
            throw new Error('Error loading customers: ' + custError.message);
        }

        // Get unique customer names
        const uniqueCustomers = {};
        if (customers && customers.length > 0) {
            customers.forEach(customer => {
                if (customer.customer_code_name && !uniqueCustomers[customer.customer_code_name]) {
                    uniqueCustomers[customer.customer_code_name] = customer;
                }
            });
        }

        customersData = Object.values(uniqueCustomers);

        // Populate dropdown
        if (!customerSelect) {
            throw new Error('Customer select dropdown not found');
        }
        
        customerSelect.innerHTML = '<option value="">-- Select Customer --</option>';
        customersData.forEach(customer => {
            if (customer && customer.customer_code_name) {
                const option = document.createElement('option');
                option.value = customer.customer_code_name;
                option.textContent = customer.customer_code_name;
                customerSelect.appendChild(option);
            }
        });

        if (customersData.length === 0) {
            showError('emailError', 'No customers found for your Zone Manager. Please contact administrator.');
            showLoading(false);
            return false;
        }

        showLoading(false);
        return true;

    } catch (error) {
        console.error('Error loading customers:', error);
        console.error('Error stack:', error.stack);
        const errorMsg = error.message || 'Error loading customers. Please try again.';
        showError('emailError', errorMsg);
        showLoading(false);
        // Don't switch screens if customers failed to load
        return false;
    }
}

// Handle Customer Selection
function handleCustomerSelection() {
    const selectedCustomerName = customerSelect.value;
    const customer = customersData.find(c => c.customer_code_name === selectedCustomerName);

    if (customer) {
        document.getElementById('customerCode').value = customer.customer_code || '';
        document.getElementById('companyTradeName').value = customer.company_trade_name || '';
        document.getElementById('customerEmail').value = customer.customer_email || '';
        document.getElementById('contactNumber').value = customer.contact_number || '';
        clearError('customerError');
    } else {
        // Clear fields
        document.getElementById('customerCode').value = '';
        document.getElementById('companyTradeName').value = '';
        document.getElementById('customerEmail').value = '';
        document.getElementById('contactNumber').value = '';
    }
}

// Handle Mode of Payment Change
function handleModeOfPaymentChange() {
    const mode = modeOfPayment.value;
    if (mode === 'Cheque') {
        depositReceiptGroup.classList.remove('hidden');
        depositReceiptFile.setAttribute('required', 'required');
    } else {
        depositReceiptGroup.classList.add('hidden');
        depositReceiptFile.removeAttribute('required');
        depositReceiptFile.value = '';
        depositReceiptPreview.innerHTML = '';
    }
}

// Format Indian Currency
function formatIndianCurrency(value) {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, '');
    
    if (!numericValue) return '';
    
    // Convert to number and format
    const number = parseInt(numericValue, 10);
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(number);
    
    return formatted;
}

// Handle Payment Amount Input
function handlePaymentAmountInput() {
    const value = paymentAmount.value;
    const formatted = formatIndianCurrency(value);
    
    // Update display but keep raw value for submission
    if (formatted && value) {
        paymentAmount.value = formatted;
    }
}

// Compress Image
async function compressImage(file) {
    if (file.type === 'application/pdf') {
        return file; // Don't compress PDFs
    }

    try {
        const options = {
            maxSizeMB: IMAGE_COMPRESSION_OPTIONS.maxSizeMB,
            maxWidthOrHeight: IMAGE_COMPRESSION_OPTIONS.maxWidthOrHeight,
            useWebWorker: IMAGE_COMPRESSION_OPTIONS.useWebWorker,
            fileType: file.type.startsWith('image/') ? file.type : 'image/jpeg'
        };

        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error('Image compression error:', error);
        return file; // Return original if compression fails
    }
}

// Upload File to Google Drive via Backend API
async function uploadToGoogleDrive(file, fileName) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('folderId', GOOGLE_DRIVE_FOLDER_ID);

    try {
        const response = await fetch(`${BACKEND_API_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        const result = await response.json();
        return result.fileUrl || result.webViewLink;
    } catch (error) {
        console.error('Drive upload error:', error);
        throw error;
    }
}

// Generate Submission ID via Backend API
async function generateSubmissionID() {
    try {
        const response = await fetch(`${BACKEND_API_URL}/generate-submission-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sheetId: GOOGLE_SHEET_ID,
                sheetName: GOOGLE_SHEET_NAME,
                prefix: SUBMISSION_ID_PREFIX,
                startNumber: SUBMISSION_ID_START
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate submission ID');
        }

        const result = await response.json();
        return result.submissionID;
    } catch (error) {
        console.error('Error generating submission ID:', error);
        // Fallback: Use timestamp-based ID
        const timestamp = Date.now();
        return `${SUBMISSION_ID_PREFIX}${String(timestamp).slice(-5)}`;
    }
}

// Submit Form to Google Sheets via Backend API
async function submitToGoogleSheets(formData) {
    try {
        const response = await fetch(`${BACKEND_API_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sheetId: GOOGLE_SHEET_ID,
                sheetName: GOOGLE_SHEET_NAME,
                data: {
                    timestamp: new Date().toISOString(), // Will be formatted in backend
                    submissionID: formData.submissionID, // B: Submission ID
                    employeeEmail: formData.employeeEmail, // C: Employee Email
                    rmEmailID: formData.rmEmailID || '', // D: RM Email ID
                    zmEmailID: formData.zmEmailID || '', // E: ZM Email ID
                    customerCode: formData.customerCode, // F: Customer Code
                    companyTradeName: formData.companyTradeName, // G: Company Trade Name
                    customerEmail: formData.customerEmail, // H: Customer Email ID
                    contactNumber: formData.contactNumber, // I: Customer Contact Number
                    modeOfPayment: formData.modeOfPayment, // J: Mode of Payment
                    dateOfPayment: formData.dateOfPayment, // K: Date of Payment
                    paymentRefNumber: formData.paymentRefNumber, // L: Payment Reference Number
                    paymentAmount: formData.paymentAmount, // M: Payment Amount
                    remarks: formData.remarks || '', // N: Remarks
                    paymentConfirmationURL: formData.paymentConfirmationURL || '', // O: Payment Confirmation File URL
                    depositReceiptURL: formData.depositReceiptURL || '' // P: Deposit Receipt File URL
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Submission failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Sheets submission error:', error);
        throw error;
    }
}

// Handle File Preview
function handleFilePreview(input, previewElement) {
    const file = input.files[0];
    if (!file) {
        previewElement.innerHTML = '';
        return;
    }

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewElement.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <p>${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>
            `;
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        previewElement.innerHTML = `
            <p>📄 ${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>
        `;
    }
}

// Validate Form
function validateForm() {
    let isValid = true;

    // Clear all errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Validate customer selection
    if (!customerSelect.value) {
        showError('customerError', 'Please select a customer');
        isValid = false;
    }

    // Validate mode of payment
    if (!modeOfPayment.value) {
        showError('modeError', 'Please select mode of payment');
        isValid = false;
    }

    // Validate date
    if (!dateOfPayment.value) {
        showError('dateError', 'Please select date of payment');
        isValid = false;
    }

    // Validate payment reference number
    if (!document.getElementById('paymentRefNumber').value.trim()) {
        showError('refNumberError', 'Please enter payment reference number');
        isValid = false;
    }

    // Validate payment amount
    const amount = document.getElementById('paymentAmount').value.replace(/\D/g, '');
    if (!amount || parseFloat(amount) <= 0) {
        showError('amountError', 'Please enter a valid payment amount');
        isValid = false;
    }

    // Validate payment confirmation file
    if (!paymentConfirmationFile.files[0]) {
        showError('paymentFileError', 'Please upload payment confirmation file');
        isValid = false;
    }

    // Validate deposit receipt (if Cheque)
    if (modeOfPayment.value === 'Cheque' && !depositReceiptFile.files[0]) {
        showError('depositFileError', 'Please upload deposit receipt image');
        isValid = false;
    }

    return isValid;
}

// Handle Form Submission
async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        showToast('Please fill all required fields', 'error');
        return;
    }

    showLoading(true);

    try {
        // Generate submission ID
        const submissionID = await generateSubmissionID();

        // Get form values
        const customer = customersData.find(c => c.customer_code_name === customerSelect.value);
        const amount = paymentAmount.value.replace(/\D/g, ''); // Remove currency formatting

        // Compress and upload files
        let paymentConfirmationURL = '';
        let depositReceiptURL = '';

        // Upload payment confirmation file
        const paymentFile = paymentConfirmationFile.files[0];
        if (paymentFile) {
            const compressedFile = await compressImage(paymentFile);
            const fileName = `${submissionID}_payment_confirmation.${compressedFile.name.split('.').pop()}`;
            paymentConfirmationURL = await uploadToGoogleDrive(compressedFile, fileName);
        }

        // Upload deposit receipt file (if Cheque)
        if (modeOfPayment.value === 'Cheque' && depositReceiptFile.files[0]) {
            const depositFile = depositReceiptFile.files[0];
            const compressedFile = await compressImage(depositFile);
            const fileName = `${submissionID}_deposit_receipt.${compressedFile.name.split('.').pop()}`;
            depositReceiptURL = await uploadToGoogleDrive(compressedFile, fileName);
        }

        // Prepare form data
        const formData = {
            submissionID: submissionID,
            employeeEmail: currentUserEmail,
            rmEmailID: window.currentUserRM || '', // RM Email ID (auto-fetched from database)
            zmEmailID: currentUserZM || '', // ZM Email ID (auto-fetched from database)
            customerCode: customer.customer_code || '',
            companyTradeName: customer.company_trade_name || '',
            customerEmail: customer.customer_email || '',
            contactNumber: customer.contact_number || '',
            modeOfPayment: modeOfPayment.value,
            dateOfPayment: dateOfPayment.value,
            paymentRefNumber: document.getElementById('paymentRefNumber').value.trim(),
            paymentAmount: amount,
            remarks: document.getElementById('remarks').value.trim(),
            paymentConfirmationURL: paymentConfirmationURL,
            depositReceiptURL: depositReceiptURL
        };

        // Submit to Google Sheets
        await submitToGoogleSheets(formData);

        showLoading(false);
        showToast(`Form submitted successfully! Submission ID: ${submissionID}`, 'success');

        // Reset form after 2 seconds
        setTimeout(() => {
            paymentForm.reset();
            customerSelect.value = '';
            handleCustomerSelection();
            paymentConfirmationPreview.innerHTML = '';
            depositReceiptPreview.innerHTML = '';
            depositReceiptGroup.classList.add('hidden');
        }, 2000);

    } catch (error) {
        console.error('Submission error:', error);
        showLoading(false);
        showToast('Error submitting form. Please try again.', 'error');
    }
}

// Utility Functions
function showLoading(show) {
    try {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            if (show) {
                overlay.classList.remove('hidden');
            } else {
                overlay.classList.add('hidden');
            }
        }
    } catch (error) {
        console.error('Error in showLoading:', error);
    }
}

function showError(elementId, message) {
    try {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            console.error('Error element not found:', elementId);
            // Fallback: show alert
            alert('Error: ' + message);
        }
    } catch (error) {
        console.error('Error in showError:', error);
        alert('Error: ' + message);
    }
}

function clearError(elementId) {
    try {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    } catch (error) {
        console.error('Error in clearError:', error);
    }
}

function showToast(message, type = 'success') {
    try {
        const toast = document.getElementById('messageToast');
        if (toast) {
            toast.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.remove('hidden');

            setTimeout(() => {
                toast.classList.add('hidden');
            }, 5000);
        } else {
            // Fallback: use alert
            alert(message);
        }
    } catch (error) {
        console.error('Error in showToast:', error);
        alert(message);
    }
}

function logout() {
    currentUserEmail = '';
    currentUserZM = '';
    customersData = [];
    authScreen.classList.add('active');
    formScreen.classList.remove('active');
    employeeEmailInput.value = '';
    paymentForm.reset();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Starting initialization...');
    try {
        console.log('✅ DOM Content Loaded - Initializing application...');
        
        // Initialize DOM Elements
        authScreen = document.getElementById('authScreen');
        formScreen = document.getElementById('formScreen');
        employeeEmailInput = document.getElementById('employeeEmail');
        fetchDetailsBtn = document.getElementById('fetchDetailsBtn');
        logoutBtn = document.getElementById('logoutBtn');
        loggedInEmail = document.getElementById('loggedInEmail');
        customerSelect = document.getElementById('customerSelect');
        paymentForm = document.getElementById('paymentForm');
        modeOfPayment = document.getElementById('modeOfPayment');
        depositReceiptGroup = document.getElementById('depositReceiptGroup');
        dateOfPayment = document.getElementById('dateOfPayment');
        paymentAmount = document.getElementById('paymentAmount');
        paymentConfirmationFile = document.getElementById('paymentConfirmationFile');
        depositReceiptFile = document.getElementById('depositReceiptFile');
        paymentConfirmationPreview = document.getElementById('paymentConfirmationPreview');
        depositReceiptPreview = document.getElementById('depositReceiptPreview');
        
        console.log('DOM elements initialized');
        console.log('authScreen:', authScreen);
        console.log('formScreen:', formScreen);
        
        // Check if required DOM elements exist
        if (!employeeEmailInput) {
            console.error('employeeEmailInput not found');
            alert('Error: Email input field not found. Please refresh the page.');
            return;
        }
        
        if (!fetchDetailsBtn) {
            console.error('fetchDetailsBtn not found');
            alert('Error: Fetch Details button not found. Please refresh the page.');
            return;
        }
        
        if (!authScreen) {
            console.error('authScreen not found');
            alert('Error: Auth screen not found. Please refresh the page.');
            return;
        }
        
        if (!formScreen) {
            console.error('formScreen not found');
            alert('Error: Form screen not found. Please refresh the page.');
            return;
        }

        // Check if Supabase is loaded
        if (typeof window.supabase === 'undefined') {
            console.error('Supabase library not loaded. Check if CDN is accessible.');
            showError('emailError', 'Database library not loaded. Please check your internet connection and refresh the page.');
        } else {
            // Initialize Supabase if not already done
            if (!supabase) {
                try {
                    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);
                    console.log('Supabase client initialized on DOMContentLoaded');
                } catch (error) {
                    console.error('Error initializing Supabase:', error);
                    showError('emailError', 'Error initializing database connection: ' + error.message);
                }
            }
        }

        // Initialize date picker
        try {
            initDatePicker();
        } catch (error) {
            console.error('Error initializing date picker:', error);
        }

        // Email authentication
        console.log('Setting up Fetch Details button...');
        console.log('fetchDetailsBtn element:', fetchDetailsBtn);
        if (fetchDetailsBtn) {
            fetchDetailsBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔘 Fetch Details button clicked!');
                console.log('Email input value:', employeeEmailInput ? employeeEmailInput.value : 'N/A');
                
                try {
                    console.log('Calling authenticateEmployee...');
                    const result = await authenticateEmployee();
                    console.log('authenticateEmployee returned:', result);
                } catch (err) {
                    console.error('❌ Error in authenticateEmployee:', err);
                    console.error('Error stack:', err.stack);
                    showError('emailError', 'Error: ' + (err.message || err));
                }
            });
            console.log('✅ Fetch Details button handler attached');
        } else {
            console.error('❌ fetchDetailsBtn not found!');
            alert('Error: Fetch Details button not found. Please refresh the page.');
        }
        
        employeeEmailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                try {
                    authenticateEmployee();
                } catch (error) {
                    console.error('Error in email input keypress handler:', error);
                    showError('emailError', 'Error: ' + error.message);
                }
            }
        });

        // Customer selection
        if (customerSelect) {
            customerSelect.addEventListener('change', handleCustomerSelection);
        }

        // Mode of payment change
        if (modeOfPayment) {
            modeOfPayment.addEventListener('change', handleModeOfPaymentChange);
        }

        // Payment amount formatting
        if (paymentAmount) {
            paymentAmount.addEventListener('input', handlePaymentAmountInput);
            paymentAmount.addEventListener('blur', handlePaymentAmountInput);
        }

        // File previews
        if (paymentConfirmationFile && paymentConfirmationPreview) {
            paymentConfirmationFile.addEventListener('change', () => {
                handleFilePreview(paymentConfirmationFile, paymentConfirmationPreview);
            });
        }

        if (depositReceiptFile && depositReceiptPreview) {
            depositReceiptFile.addEventListener('change', () => {
                handleFilePreview(depositReceiptFile, depositReceiptPreview);
            });
        }

        // Form submission
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                try {
                    handleFormSubmit(e);
                } catch (error) {
                    console.error('Error in form submission:', error);
                    showToast('Error submitting form: ' + error.message, 'error');
                }
            });
        }

        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
        
        console.log('✅ Application initialized successfully');
    } catch (error) {
        console.error('❌ Error in DOMContentLoaded:', error);
        console.error('Error stack:', error.stack);
        alert('Error initializing application: ' + error.message + '\n\nPlease check console (F12) for details.');
    }
});

// Log when app.js finishes loading
console.log('✅ app.js script loaded');

