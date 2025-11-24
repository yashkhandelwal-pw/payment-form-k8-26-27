# 🎯 START HERE - Payment Form K8 26-27

## 🌐 Your Localhost URL

# **→ http://localhost:8000 ←**

---

## 🚀 Quick Start (2 Steps)

### Step 1: Start Servers

Double-click: **`START_SERVERS.bat`**

This will open 2 terminal windows:
- ✅ Backend Server (port 3000)
- ✅ Frontend Server (port 8000)

### Step 2: Open Application

**Click here:** http://localhost:8000

---

## 📋 Your Localhost Information

| Service | URL | Status |
|---------|-----|--------|
| **Payment Form** | http://localhost:8000 | ✅ Main App |
| **Backend API** | http://localhost:3000 | ✅ Server |
| **Health Check** | http://localhost:3000/api/health | ✅ Test |

---

## ✨ Features

- 🌸 Beautiful light theme design
- 🏢 Company logo at top
- 📱 Mobile responsive
- ✅ Employee authentication
- 💳 Payment form submission
- 📊 Google Sheets integration
- 📁 Google Drive file upload

---

## 🆘 Need Help?

### If Servers Won't Start:
```bash
cd backend
npm install
node server.js
```

Then in new terminal:
```bash
npx http-server -p 8000
```

### If Port Already in Use:
```bash
# Find process on port 3000 or 8000
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Kill process (use PID from above)
taskkill /PID [PID] /F
```

---

## 📂 Project Files

```
payment-form-k8-26-27/
├── index.html          # Main app
├── app.js              # Frontend
├── styles.css          # Styling
├── config.js           # Config
├── backend/
│   └── server.js       # API server
└── START_SERVERS.bat   # Start script
```

---

## 🎉 Ready to Use!

1. Double-click **START_SERVERS.bat**
2. Wait 5 seconds
3. Open **http://localhost:8000**
4. Start using the payment form! 🎊

---

**Your Localhost:** http://localhost:8000

