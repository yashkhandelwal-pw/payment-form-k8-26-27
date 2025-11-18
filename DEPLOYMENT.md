# 🌐 Deployment Guide

## 📍 Current Setup

Your application consists of:
- **Frontend**: Static HTML/CSS/JS files (served via `http-server`)
- **Backend**: Node.js/Express server (port 3000)

---

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) ⭐ Recommended

#### Frontend on Vercel:
1. Go to https://vercel.com
2. Sign up/Login
3. Click "New Project"
4. Import your GitHub repository
5. **Root Directory**: Leave as root (or set to `/` if needed)
6. **Build Command**: Leave empty (static files)
7. **Output Directory**: Leave empty
8. Click "Deploy"

#### Backend on Railway:
1. Go to https://railway.app
2. Sign up/Login
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. **Root Directory**: Set to `backend`
6. Add environment variable:
   - Name: `SERVICE_ACCOUNT_KEY`
   - Value: (paste entire JSON from `service-account-key.json`)
7. Railway will auto-detect Node.js and deploy
8. Get the backend URL (e.g., `https://your-app.railway.app`)
9. Update `config.js` in your frontend:
   ```javascript
   const BACKEND_API_URL = 'https://your-app.railway.app';
   ```
10. Redeploy frontend on Vercel

---

### Option 2: Render (Full Stack)

#### Deploy Backend:
1. Go to https://render.com
2. Sign up/Login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - **Name**: `payment-form-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variable:
   - Key: `SERVICE_ACCOUNT_KEY`
   - Value: (paste entire JSON)
7. Click "Create Web Service"

#### Deploy Frontend:
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Settings:
   - **Name**: `payment-form-frontend`
   - **Root Directory**: `/` (root)
   - **Build Command**: Leave empty
   - **Publish Directory**: `/` (root)
4. Add Environment Variable:
   - Key: `BACKEND_API_URL`
   - Value: `https://your-backend.onrender.com`
5. Update `config.js` to use Render backend URL
6. Click "Create Static Site"

---

### Option 3: Your Own Server (VPS/Cloud)

#### Requirements:
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx (for reverse proxy, optional)

#### Steps:

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/payment-form-k8-26-27.git
   cd payment-form-k8-26-27
   ```

4. **Setup backend**
   ```bash
   cd backend
   npm install
   # Create service-account-key.json manually
   nano service-account-key.json
   # Paste your service account key JSON
   ```

5. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

6. **Start backend with PM2**
   ```bash
   cd backend
   pm2 start server.js --name payment-backend
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx (for frontend)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/payment-form
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /path/to/payment-form-k8-26-27;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/payment-form /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Update config.js**
   ```javascript
   const BACKEND_API_URL = 'http://your-domain.com/api';
   ```

9. **Setup SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🔧 Environment Variables

### Backend (.env file or platform environment variables):
```env
PORT=3000
GOOGLE_DRIVE_FOLDER_ID=0AO4PzvJNGviNUk9PVA
GOOGLE_SHEET_ID=1_sf0JLbyEyeH4FiH-BJFOw3NWzmUH8qP0yNK8zfyE6A
GOOGLE_SHEET_NAME=Form Responses
```

### Frontend (config.js):
```javascript
const BACKEND_API_URL = 'https://your-backend-url.com';
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend server is running and accessible
- [ ] Frontend can connect to backend API
- [ ] Service account key is properly configured
- [ ] Google Drive folder is accessible by service account
- [ ] Google Sheet is accessible by service account
- [ ] Form submission works end-to-end
- [ ] File uploads work correctly
- [ ] SSL certificate is installed (if using custom domain)
- [ ] CORS is properly configured (if frontend/backend on different domains)

---

## 🆘 Troubleshooting

### Backend not starting:
- Check service account key is valid
- Verify environment variables
- Check logs: `pm2 logs payment-backend` or platform logs

### Frontend can't connect to backend:
- Verify `BACKEND_API_URL` in `config.js`
- Check CORS settings in `backend/server.js`
- Verify backend is accessible (test with curl/Postman)

### File uploads failing:
- Verify Google Drive folder ID is correct
- Check service account has access to Shared Drive
- Verify folder permissions

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)

---

**Choose the deployment option that best fits your needs!**

