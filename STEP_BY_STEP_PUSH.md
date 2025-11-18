# 📤 Step-by-Step: Push to GitHub (Visual Guide)

## 🎯 Goal
Push your Payment Form code to GitHub repository: `yashkhandelwal-pw/payment-form-k8-26-27`

---

## 📝 Step 1: Get Your Personal Access Token

### Visual Steps:

```
1. Open Browser → Go to: https://github.com/settings/tokens
   └─> You should see "Personal access tokens" page

2. Click "Generate new token" button (top right)
   └─> Select "Generate new token (classic)"

3. Fill the form:
   ┌─────────────────────────────────────┐
   │ Note: Payment Form Push            │
   │ Expiration: 90 days (or No exp)    │
   │ ☑️ repo (check this box)           │
   └─────────────────────────────────────┘

4. Scroll down → Click "Generate token" (green button)

5. COPY THE TOKEN IMMEDIATELY!
   └─> It looks like: ghp_xxxxxxxxxxxxxxxxxxxxx
   └─> Save it in Notepad temporarily
```

---

## 💻 Step 2: Push Using PowerShell

### Open PowerShell:
1. Press `Windows Key + X`
2. Select "Windows PowerShell" or "Terminal"
3. Navigate to your project:
   ```powershell
   cd "D:\Scripts for web apps\Payment FOrm - K8 26-27"
   ```

### Run Push Command:
```powershell
git push -u origin main
```

### When Prompted:
```
Username for 'https://github.com': yashkhandelwal-pw
Password for 'https://yashkhandelwal-pw@github.com': [PASTE YOUR TOKEN HERE]
```

**Important:**
- Username: `yashkhandelwal-pw`
- Password: **Paste your token** (NOT your GitHub password!)
- To paste in PowerShell: Right-click or `Shift+Insert`

---

## ✅ Step 3: Verify Success

### You should see:
```
Enumerating objects: 33, done.
Counting objects: 100% (33/33), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
To https://github.com/yashkhandelwal-pw/payment-form-k8-26-27.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Check on GitHub:
1. Go to: https://github.com/yashkhandelwal-pw/payment-form-k8-26-27
2. You should see all your files!

---

## 🔒 Step 4: Add Secret (Important!)

### Navigate:
```
GitHub Repository
  └─> Settings (top menu)
      └─> Secrets and variables
          └─> Actions
              └─> New repository secret
```

### Fill Form:
```
Name: SERVICE_ACCOUNT_KEY
Secret: [Paste entire contents of backend/service-account-key.json]
```

### To Get Service Account Key:
1. Open: `backend/service-account-key.json`
2. Select All (Ctrl+A)
3. Copy (Ctrl+C)
4. Paste into GitHub secret field

---

## 🎉 Done!

Your code is now on GitHub and ready for deployment!

---

## 🆘 If Something Goes Wrong

### Error: "Write access denied"
→ Your token needs `repo` scope. Generate a new token.

### Error: "Repository not found"
→ Check the repository URL is correct.

### Error: "Authentication failed"
→ Make sure you're using the token, not your password.

### Still stuck?
→ See `COMPLETE_GITHUB_GUIDE.md` for detailed troubleshooting.

