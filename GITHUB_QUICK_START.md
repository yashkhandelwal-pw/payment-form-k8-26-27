# ⚡ GitHub Quick Start Guide

## 🚀 Fast Setup (5 Minutes)

### Step 1: Initialize Git
```powershell
git init
git add .
git commit -m "Initial commit: Payment Form K8 26-27"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `payment-form-k8-26-27`
3. Set to **Private** ✅
4. Click "Create repository"

### Step 3: Connect & Push
```powershell
git remote add origin https://github.com/YOUR_USERNAME/payment-form-k8-26-27.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

### Step 4: Add Service Account Key Secret
1. Go to: Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `SERVICE_ACCOUNT_KEY`
4. Value: Copy entire contents of `backend/service-account-key.json`
5. Click "Add secret"

### Step 5: Verify
- ✅ Check repository has all files (except `service-account-key.json`)
- ✅ Check "Actions" tab shows workflow
- ✅ Check secret is added

---

## 📋 What's Included

- ✅ `.gitignore` - Excludes sensitive files
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
- ✅ `GITHUB_SETUP.md` - Detailed setup guide
- ✅ `DEPLOYMENT.md` - Deployment options

---

## 🔐 Security Checklist

- [ ] Repository is **Private**
- [ ] `service-account-key.json` is in `.gitignore`
- [ ] Service account key added as GitHub Secret
- [ ] No sensitive data in code

---

## 🆘 Need Help?

See `GITHUB_SETUP.md` for detailed instructions.

