# SpoolID Auto-Reply Setup - Quick Checklist

## ✅ Step 1: Update Form Code (Already Done)
The form in `src/App.jsx` has been updated with the necessary hidden fields.

## ✅ Step 2: Get Your Web3Forms Access Key
1. Go to [web3forms.com](https://web3forms.com)
2. Sign up or login
3. Create a new form or use existing one
4. Copy your **Access Key**
5. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in [src/App.jsx:L593](file:///Users/antoniocolucci/landing%20filabase/src/App.jsx#L593)

## ✅ Step 3: Enable Auto-Reply in Web3Forms Dashboard
1. Login to [web3forms.com](https://web3forms.com)
2. Select your form
3. Go to **Settings** → **Auto-Reply**
4. Enable the toggle
5. Configure:
   - **Subject**: `Welcome to the SpoolID Beta 🚀 (+ a quick question)`
   - **From Name**: `Antonio - SpoolID` (or your name)
   - **Reply-To**: Your personal email (where brand responses will go)

## ✅ Step 4: Paste Email Template
Copy the email template from [EMAIL_TEMPLATE.md](file:///Users/antoniocolucci/landing%20filabase/EMAIL_TEMPLATE.md) and paste it into the Web3Forms auto-reply editor.

**Choose between:**
- **Plain Text Version** (simpler, guaranteed delivery)
- **HTML Version** (better design, might have compatibility issues)

I recommend starting with **Plain Text** for maximum deliverability.

## ✅ Step 5: Optional - Create PDF Guide
If you want to include the "3 Golden Rules for Filament Storage" mentioned in the P.S.:

1. Create the PDF guide
2. Upload to `public/downloads/filament-storage-guide.pdf`
3. Link will be: `https://your-domain.com/downloads/filament-storage-guide.pdf`
4. Update the `[LINK_TO_PDF]` placeholder in the email template

**Or**: Simply remove the P.S. line if you're not ready yet.

## ✅ Step 6: Test the Flow
1. Submit a test form on your landing page
2. Check your test email inbox (should arrive in 1-2 minutes)
3. Verify the email looks good
4. **Reply to the email** to confirm replies go to your inbox
5. If everything works → you're ready! 🎉

## 📊 Tracking Brand Responses
Create a simple spreadsheet to track user responses:

| Date | Email | Name | Brand Mentioned | Notes |
|------|-------|------|-----------------|-------|
| 2026-02-06 | user@email.com | John | Prusament | Also uses eSun |
| 2026-02-07 | jane@email.com | Jane | Polymaker | Looking for PETG |

**Gmail Tip**: Set up a filter to label all replies with "SpoolID - Brands" for easy tracking.

## 🎯 Expected Results
- **Open Rate**: 60-80% (transactional emails have high open rates)
- **Reply Rate**: 15-25% (the personal question drives engagement)
- **Market Intelligence**: You'll know exactly which brands to prioritize in your database!

---

## Need Help?
- Full email templates: [EMAIL_TEMPLATE.md](file:///Users/antoniocolucci/landing%20filabase/EMAIL_TEMPLATE.md)
- Web3Forms docs: https://docs.web3forms.com
- Form code: [src/App.jsx:L590-620](file:///Users/antoniocolucci/landing%20filabase/src/App.jsx#L590-L620)
