# 🚀 Quick Start - Make.com Auto-Reply (15 minuti)

## Panoramica Visiva

![Make.com Registration](file:///Users/antoniocolucci/.gemini/antigravity/brain/465a294c-bfb2-4394-99cd-1f774e04b701/make_registration_clean_1770422175914.png)

![Free Plan - 1000 operations/month](file:///Users/antoniocolucci/.gemini/antigravity/brain/465a294c-bfb2-4394-99cd-1f774e04b701/make_free_plan_1770422184015.png)

![Visual Builder Interface](file:///Users/antoniocolucci/.gemini/antigravity/brain/465a294c-bfb2-4394-99cd-1f774e04b701/make_product_builder_clean_1770422553759.png)

---

## ⚡ Setup Veloce (15 min)

### 1️⃣ Crea Account (2 min)
1. Vai su https://www.make.com/en/register
2. "Continue with Google" → Seleziona `antoniocolucciph@gmail.com`
3. Scegli **FREE plan** (1000 ops/mese)

### 2️⃣ Crea Scenario (3 min)
1. Dashboard → **"Create a new scenario"**
2. Nome: "SpoolID Auto-Reply"
3. Click sul **+** grande

### 3️⃣ Aggiungi Webhook (2 min)
1. Cerca **"Webhooks"**
2. Scegli **"Custom webhook"**
3. Click **"Add"** → Nome: `spoolid-waitlist` → **"Save"**
4. **📋 COPIA L'URL** che appare (es: `https://hook.eu1.make.com/abc123xyz`)

### 4️⃣ Aggiungi Gmail (4 min)
1. Click **+** dopo il webhook
2. Cerca **"Gmail"**
3. Scegli **"Send an Email (advanced)"**
4. Connetti account Gmail
5. Configura:
   - **To**: `{{1.email}}` (clicca il dato dal webhook)
   - **Subject**: `Welcome to the SpoolID Beta 🚀 (+ a quick question)`
   - **From Name**: `Antonio - SpoolID`
   - **Content Type**: `HTML`
   - **Content**: Apri `email-template.html` e copia TUTTO
   - **Reply To**: `antoniocolucciph@gmail.com`

### 5️⃣ Attiva Scenario (1 min)
1. Click **"Run once"** (in basso)
2. Toggle **"Scheduling" OFF → ON**
3. Scegli **"Immediately"**
4. Salva (icona floppy disk

)

### 6️⃣ Aggiorna Codice (2 min)
Sostituisco il codice per te. **Dimmi solo il WEBHOOK URL** che Make ti ha dato!

Oppure modifica tu stesso `src/App.jsx`:

**TROVA** (circa linea 71-76):
```javascript
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
```

**SOSTITUISCI CON**:
```javascript
    try {
      // 1. Send to Web3Forms (notification to you)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // 2. Send to Make.com (auto-reply to user)
        await fetch('IL_TUO_WEBHOOK_URL_QUI', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          })
        })
```

### 7️⃣ Test (1 min)
1. `git add . && git commit -m "Add Make.com auto-reply" && git push`
2. Aspetta deploy (2 min)
3. Vai su spoolid.com
4. Metti la TUA email e submit
5. Controlla inbox → email benvenuto! 🎉

---

## ✅ Checklist Rapida

- [ ] Account Make creato
- [ ] Scenario "SpoolID Auto-Reply" creato
- [ ] Webhook configurato → **URL copiato**
- [ ] Gmail connesso → Email configurata con HTML
- [ ] Scenario attivato (Scheduling ON)
- [ ] Codice aggiornato con webhook URL
- [ ] Push su GitHub
- [ ] Test sul sito → Email ricevuta ✅

---

## 🆘 Bisogno di Aiuto?

**Dammi il webhook URL di Make e lo aggiungo io al codice!**

Poi faccio commit e push automaticamente. 🚀
