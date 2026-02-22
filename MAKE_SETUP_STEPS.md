# 🚀 Setup Make.com - Step by Step

## Passo 1: Crea lo Scenario

1. Vai su https://www.make.com/dashboard
2. Click **"Create a new scenario"**
3. Nome: **"SpoolID - Sheets + Email Auto-Reply"**

---

## Passo 2: Modulo 1 - Webhook (Trigger)

### Aggiungi Webhook
1. Click sul grande **+**
2. Cerca **"Webhooks"**
3. Seleziona **"Custom webhook"**

### Configura Webhook
1. Click **"Add"**
2. Webhook name: `spoolid-waitlist`
3. Click **"Save"**
4. **📋 COPIA L'URL** che appare (salvalo da parte!)

### Test Webhook
1. Click **"Run once"** (in basso a sinistra)
2. Il webhook è ora in "listening" (icona orologio)
3. Apri nuovo tab: https://reqbin.com/
4. POST request all'URL webhook
5. Headers: `Content-Type: application/json`
6. Body:
```json
{
  "email": "test@example.com",
  "timestamp": "2026-02-07T01:10:00Z",
  "userAgent": "Chrome/MacOS",
  "source": "spoolid.com"
}
```
7. Click **"Send"**
8. Torna su Make → dovresti vedere i dati arrivati! ✅

---

## Passo 3: Modulo 2 - Google Sheets

### Aggiungi Google Sheets
1. Click **+** dopo il webhook
2. Cerca **"Google Sheets"**
3. Seleziona **"Add a Row"**

### Connetti Google Account
1. Click **"Add"** connection
2. Autorizza Make ad accedere a Google Sheets
3. Seleziona account `antoniocolucciph@gmail.com`

### Configura Riga
1. **Spreadsheet**: Seleziona "SpoolID Waitlist Database"
2. **Sheet Name**: `Sheet1`
3. **Values** (una per colonna):

**Colonna A (Email):**
```
{{1.email}}
```
*Click sull'icona del webhook e seleziona "email"*

**Colonna B (Signup Date):**
```
{{formatDate(now; "YYYY-MM-DD")}}
```

**Colonna C (Signup Time):**
```
{{formatDate(now; "HH:mm:ss")}}
```

**Colonna D (Browser/Device):**
```
{{1.userAgent}}
```

**Colonna E (Source):**
```
{{1.source}}
```

**Colonna F (Preferred Brand):**
```
(leave empty - filled manually later)
```

**Colonna G (Status):**
```
Pending
```

**Colonna H (Notes):**
```
Auto-added from website
```

---

## Passo 4: Modulo 3 - Gmail

### Aggiungi Gmail
1. Click **+** dopo Google Sheets
2. Cerca **"Gmail"**
3. Seleziona **"Send an Email (advanced)"**

### Connetti Gmail (se non già fatto)
1. Click **"Add"** connection
2. Autorizza Make
3. Seleziona `antoniocolucciph@gmail.com`

### Configura Email

**To (Destinatario):**
```
{{1.email}}
```

**Subject:**
```
Welcome to the SpoolID Beta 🚀 (+ a quick question)
```

**From Name:**
```
Antonio - SpoolID
```

**Content Type:**
Seleziona **"HTML"**

**Content (Body HTML):**
Apri il file `email-template.html` e **copia TUTTO il contenuto**.

Oppure usa questo HTML semplificato:

```html
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: white; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f97316, #3b82f6); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; color: white;">SpoolID</h1>
    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9);">Welcome to the Beta! 🎉</p>
  </div>
  
  <div style="background: #1e293b; padding: 30px; border-radius: 0 0 12px 12px;">
    <p style="color: #e2e8f0; line-height: 1.6;">Hi there,</p>
    
    <p style="color: #e2e8f0; line-height: 1.6;">
      Thanks for joining the waitlist for <strong style="color: #f97316;">SpoolID</strong>. 
      You're officially in line to get early access.
    </p>
    
    <p style="color: #e2e8f0; line-height: 1.6;">
      I'm building SpoolID because I got tired of guessing if my half-empty spool had 
      enough filament for a 12-hour print. I knew there had to be a better way than 
      Excel spreadsheets or trusting the slicer's estimates.
    </p>
    
    <div style="background: linear-gradient(135deg, rgba(249,115,22,0.2), rgba(59,130,246,0.2)); 
                border: 1px solid rgba(249,115,22,0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #f97316; margin: 0 0 10px;">🚀 What happens next?</h3>
      <p style="color: #cbd5e1; margin: 0; line-height: 1.6;">
        We are currently finalizing the database of empty spool weights (tares). 
        I'll send you an email as soon as the Beta version is ready for download.
      </p>
    </div>
    
    <div style="background: linear-gradient(135deg, #f97316, #fb923c); 
                padding: 25px; border-radius: 8px; text-align: center; margin: 20px 0;">
      <p style="color: white; font-size: 16px; font-weight: 600; margin: 0 0 8px;">
        In the meantime, I have one quick question for you:
      </p>
      <p style="color: white; font-size: 20px; font-weight: 700; margin: 0;">
        → What is the one filament brand you use the most?
      </p>
    </div>
    
    <p style="color: #94a3b8; font-style: italic; line-height: 1.6;">
      (Just hit reply and let me know. I want to make sure we have their spool weights 
      pre-loaded in the app for you).
    </p>
    
    <p style="color: #e2e8f0; margin-top: 30px; line-height: 1.6;">
      Cheers,<br>
      <strong style="color: white;">Antonio</strong><br>
      <span style="color: #94a3b8;">Founder, SpoolID</span>
    </p>
  </div>
  
  <div style="background: #0f172a; padding: 20px; text-align: center; margin-top: 20px;">
    <p style="color: #64748b; font-size: 13px; margin: 0;">
      SpoolID - NFC-based filament tracking for 3D printing
    </p>
  </div>
</body>
</html>
```

**Reply To:**
```
antoniocolucciph@gmail.com
```

---

## Passo 5: Attiva lo Scenario

1. Click **"Run once"** per testare
2. Invia altro test da reqbin.com
3. Verifica:
   - ✅ Riga aggiunta al Google Sheet
   - ✅ Email ricevuta
   
4. Se tutto OK:
   - Toggle **"Scheduling"** da OFF a **ON**
   - Scegli **"Immediately"**
   - Click **"OK"**

5. **Salva** lo scenario (icona floppy disk o Ctrl+S)

✅ **Scenario attivo!**

---

## Passo 6: Dammi il Webhook URL

Una volta completato, **copiami l'URL del webhook** e aggiorno il codice per te!

Sarà tipo: `https://hook.eu1.make.com/abc123xyz456`
