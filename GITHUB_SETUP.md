# 🚀 GitHub Setup & Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Create one at https://github.com
2. **Git installed** on your local machine
3. **Service Account Key** - Your `backend/service-account-key.json` file

---

## 🔧 Step 1: Initialize Git Repository

### 1.1 Open Terminal/PowerShell in your project folder

```powershell
cd "D:\Scripts for web apps\Payment FOrm - K8 26-27"
```

### 1.2 Initialize Git (if not already done)

```powershell
git init
```

### 1.3 Add all files to staging

```powershell
git add .
```

### 1.4 Create initial commit

```powershell
git commit -m "Initial commit: Payment Form K8 26-27"
```

---

## 📤 Step 2: Create GitHub Repository

### 2.1 Go to GitHub

1. Visit https://github.com
2. Click the **"+"** icon in the top right
3. Select **"New repository"**

### 2.2 Repository Settings

- **Repository name**: `payment-form-k8-26-27` (or your preferred name)
- **Description**: `Payment Form Application for K8 26-27`
- **Visibility**: 
  - ✅ **Private** (recommended - contains sensitive data)
  - ⚠️ **Public** (only if you're comfortable with code being public)
- **DO NOT** check:
  - ❌ Add a README file
  - ❌ Add .gitignore
  - ❌ Choose a license

### 2.3 Click "Create repository"

---

## 🔗 Step 3: Connect Local Repository to GitHub

### 3.1 Add Remote Repository

After creating the repository, GitHub will show you commands. Use this one:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/payment-form-k8-26-27.git
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 3.2 Rename branch to main (if needed)

```powershell
git branch -M main
```

### 3.3 Push to GitHub

```powershell
git push -u origin main
```

You'll be prompted for your GitHub username and password (or Personal Access Token).

---

## 🔐 Step 4: Add GitHub Secrets (IMPORTANT!)

### 4.1 Go to Repository Settings

1. In your GitHub repository, click **"Settings"** (top menu)
2. In the left sidebar, click **"Secrets and variables"** → **"Actions"**

### 4.2 Add Service Account Key Secret

1. Click **"New repository secret"**
2. **Name**: `SERVICE_ACCOUNT_KEY`
3. **Value**: 
   - Open `backend/service-account-key.json` in a text editor
   - Copy the **entire contents** of the file
   - Paste it into the "Secret" field
4. Click **"Add secret"**

### 4.3 Verify Secret Added

You should see `SERVICE_ACCOUNT_KEY` in your secrets list.

---

## ✅ Step 5: Verify Setup

### 5.1 Check GitHub Repository

1. Go to your repository on GitHub
2. Verify all files are uploaded (except `service-account-key.json` - it should NOT be there)
3. Check that `.gitignore` is present

### 5.2 Check GitHub Actions

1. Click the **"Actions"** tab in your repository
2. You should see the workflow file listed
3. The workflow will run automatically on push

---

## 🚀 Step 6: Deployment Options

### Option A: Manual Deployment (Current Setup)

The GitHub Actions workflow currently:
- ✅ Installs dependencies
- ✅ Validates the service account key
- ✅ Tests the backend server

**For actual deployment, you need to:**

1. **Set up a production server** (VPS, cloud instance, etc.)
2. **Clone the repository** on the server
3. **Add the service account key** manually
4. **Run the servers**:
   ```bash
   # Backend
   cd backend
   npm install
   node server.js
   
   # Frontend (separate terminal)
   npx http-server -p 8000 -c-1
   ```

### Option B: Automated Deployment (Advanced)

For automated deployment, you can extend the workflow to:
- Deploy to Vercel/Netlify (frontend)
- Deploy to Railway/Render/Heroku (backend)
- Use SSH to deploy to your own server

---

## 📝 Quick Command Reference

```powershell
# Initialize Git
git init

# Add files
git add .

# Commit
git commit -m "Your commit message"

# Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/payment-form-k8-26-27.git

# Push to GitHub
git push -u origin main

# Future updates
git add .
git commit -m "Update description"
git push
```

---

## ⚠️ Important Security Notes

1. **NEVER commit `service-account-key.json`** - It's in `.gitignore` for a reason
2. **Use GitHub Secrets** for sensitive data
3. **Keep repository private** if it contains business logic
4. **Review `.gitignore`** before committing

---

## 🆘 Troubleshooting

### Issue: "Permission denied"
- **Solution**: Use Personal Access Token instead of password
  - GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Use token as password when pushing

### Issue: "Service account key not found"
- **Solution**: Make sure you added the secret in GitHub Settings → Secrets

### Issue: "Files not showing on GitHub"
- **Solution**: Check `.gitignore` - files might be excluded

---

## 📚 Next Steps

1. ✅ Push code to GitHub
2. ✅ Add service account key as secret
3. ✅ Set up production server
4. ✅ Deploy application
5. ✅ Configure domain (optional)

---

**Need help?** Check the GitHub Actions logs in the "Actions" tab of your repository.

