# Web3Forms Auto-Reply Email Setup

## Dashboard Configuration

1. Go to [web3forms.com](https://web3forms.com) and log into your account
2. Navigate to your form settings (using the access key from `src/App.jsx`)
3. Enable **"Auto-Reply"** feature
4. Copy and paste the email template below into the auto-reply editor

---

## Email Template Configuration

### Subject Line
```
Welcome to the SpoolID Beta 🚀 (+ a quick question)
```

### From Name
```
Antonio (or your name) - SpoolID
```

### Reply-To Email
```
your-email@domain.com
```
**IMPORTANT**: This is where users will reply to with their filament brand answers!

---

## Email Body (Plain Text)

```
Hi there,

Thanks for joining the waitlist for SpoolID. You're officially in line to get early access.

I'm building SpoolID because I got tired of guessing if my half-empty spool had enough filament for a 12-hour print. I knew there had to be a better way than Excel spreadsheets or trusting the slicer's estimates.

What happens next?
We are currently finalizing the database of empty spool weights (tares). I'll send you an email as soon as the Beta version is ready for download on your device.

In the meantime, I have one quick question for you:

→ What is the one filament brand you use the most?

(Just hit reply and let me know. I want to make sure we have their spool weights pre-loaded in the app for you).

Cheers,
Antonio
Founder, SpoolID

P.S. If you want to keep your filament stock in perfect condition while you wait, check out this quick guide: [LINK_TO_PDF_OR_BLOG_POST]
```

---

## Alternative: HTML Version (Better Formatting)

If Web3Forms supports HTML auto-replies, use this version for better visual impact:

```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937; line-height: 1.6;">
  
  <p style="font-size: 16px;">Hi there,</p>
  
  <p style="font-size: 16px;">Thanks for joining the waitlist for <strong>SpoolID</strong>. You're officially in line to get early access.</p>
  
  <p style="font-size: 16px;">I'm building SpoolID because I got tired of guessing if my half-empty spool had enough filament for a 12-hour print. I knew there had to be a better way than Excel spreadsheets or trusting the slicer's estimates.</p>
  
  <h3 style="color: #f97316; margin-top: 24px;">What happens next?</h3>
  <p style="font-size: 16px;">We are currently finalizing the database of empty spool weights (tares). I'll send you an email as soon as the Beta version is ready for download on your device.</p>
  
  <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); padding: 20px; border-radius: 12px; margin: 24px 0;">
    <p style="color: white; font-size: 17px; font-weight: 600; margin: 0 0 8px 0;">In the meantime, I have one quick question for you:</p>
    <p style="color: white; font-size: 18px; margin: 0; font-weight: 700;">→ What is the one filament brand you use the most?</p>
  </div>
  
  <p style="font-size: 16px; font-style: italic; color: #6b7280;">(Just hit reply and let me know. I want to make sure we have their spool weights pre-loaded in the app for you).</p>
  
  <p style="font-size: 16px; margin-top: 32px;">Cheers,<br>
  <strong>Antonio</strong><br>
  <span style="color: #6b7280;">Founder, SpoolID</span></p>
  
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
  
  <p style="font-size: 14px; color: #6b7280;"><strong>P.S.</strong> If you want to keep your filament stock in perfect condition while you wait, check out this quick guide: <a href="[LINK_TO_PDF]" style="color: #f97316; text-decoration: none; font-weight: 600;">3 Golden Rules for Filament Storage →</a></p>

</div>
```

---

## Market Research Tracking

Create a simple spreadsheet to track responses:

| Date | Email | Filament Brand | Notes |
|------|-------|----------------|-------|
| ... | ... | Prusament | Also uses eSun |
| ... | ... | Polymaker | ... |

**Pro Tip**: Set up a Gmail filter to automatically label responses with "SpoolID - Brand Research" for easy tracking.

---

## PDF Attachment Alternative (Since Web3Forms Doesn't Support Attachments)

### Option A: Host PDF and Link
1. Upload your "3 Golden Rules for Filament Storage" PDF to your website
2. Place it in `public/downloads/spoolid-filament-storage-guide.pdf`
3. Link to it: `https://yoursite.com/downloads/spoolid-filament-storage-guide.pdf`

### Option B: Create a Landing Page
Create a simple `/resources` page on your site with the guide as a downloadable resource

### Option C: Remove P.S. Line
If you don't have the PDF ready, simply remove the P.S. line from the email

---

## Testing Your Auto-Reply

1. Submit a test form on your landing page
2. Check if you receive the auto-reply within 1-2 minutes
3. Verify the "Reply-To" address is correct
4. Reply to your own test email to ensure responses go to the right inbox

---

## Expected Response Rate

Based on similar beta waitlist campaigns:
- **Open Rate**: 60-80% (very high for transactional emails)
- **Reply Rate**: 15-25% (the question makes it feel personal)
- **Data Quality**: Excellent (people who reply are your most engaged users)

This is perfect for prioritizing which brands to add to your database first! 🎯
