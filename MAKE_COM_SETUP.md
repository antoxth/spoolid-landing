# Make.com Auto-Reply Setup - Guida Completa

## 🎯 Cosa Faremo

Creeremo un'automation che:
1. Riceve i dati del form da Web3Forms
2. Invia automaticamente l'email di benvenuto all'utente
3. Tutto gratis fino a 1000 email/mese!

---

## Step 1: Crea Account Make.com

1. Vai su https://www.make.com/en/register
2. Registrati con email o Google
3. Scegli **FREE plan** (1000 operations/month)
4. Conferma email

---

## Step 2: Crea Nuovo Scenario

1. Nella dashboard Make, click **"Create a new scenario"**
2. Nome: "SpoolID Waitlist Auto-Reply"

---

## Step 3: Aggiungi Modulo Webhook (Trigger)

### 3.1 Aggiungi Webhook
1. Click sul **+** per aggiungere primo modulo
2. Cerca **"Webhooks"**
3. Scegli **"Custom webhook"**

### 3.2 Crea Webhook
1. Click **"Add"** per creare nuovo webhook
2. Nome webhook: `spoolid-waitlist`
3. Click **"Save"**
4. **COPIA IL WEBHOOK URL** che appare (sarà tipo: `https://hook.eu1.make.com/abc123xyz`)

📌 **IMPORTANTE**: Salva questo URL, ci servirà per Web3Forms!

---

## Step 4: Aggiungi Modulo Email (Action)

### 4.1 Aggiungi Gmail
1. Click sul **+** dopo il webhook
2. Cerca **"Gmail"**
3. Scegli **"Send an Email (advanced)"**

### 4.2 Connetti Gmail
1. Click **"Add"** connection
2. Autorizza Make ad accedere al tuo Gmail
3. Seleziona l'account `antoniocolucciph@gmail.com`

### 4.3 Configura Email

**To (Destinatario):**
```
{{1.email}}
```
*(Questo prende l'email dal webhook)*

**Subject (Oggetto):**
```
Welcome to the SpoolID Beta 🚀 (+ a quick question)
```

**From Name:**
```
Antonio - SpoolID
```

**Content Type:**
Seleziona **"HTML"**

**Content (Corpo email):**
Copia TUTTO il contenuto da: `email-template.html`

**Reply To:**
```
antoniocolucciph@gmail.com
```

---

## Step 5: Testa lo Scenario

### 5.1 Attiva "Listening" sul Webhook
1. Click **"Run once"** in basso a sinistra
2. Il webhook ora è in ascolto (vedi icona clock)

### 5.2 Testa con dati finti
1. Apri un nuovo tab
2. Vai su https://reqbin.com/
3. Scegli **POST**
4. URL: incolla il tuo webhook URL di Make
5. Headers: `Content-Type: application/json`
6. Body:
```json
{
  "email": "tuaemail@test.com",
  "name": "Test User"
}
```
7. Click **"Send"**

### 5.3 Verifica Make
1. Torna su Make
2. Dovresti vedere i dati arrivati nel webhook
3. Click **"Run once"** di nuovo
4. L'email dovrebbe essere inviata!

✅ **Controlla la tua email!** Dovresti aver ricevuto l'email di test.

---

## Step 6: Configura Web3Forms per Usare il Webhook

Ora dobbiamo dire a Web3Forms di inviare i dati a Make.

### Metodo: Modificare il Form per Inviare a Make

Aggiorna `src/App.jsx` per inviare anche a Make dopo Web3Forms:

```javascript
const handleWaitlistSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  const formData = new FormData()
  formData.append('access_key', '786fd9cc-5360-4f0d-8a42-2be634c76c06')
  formData.append('email', email)
  formData.append('subject', 'New SpoolID Waitlist Signup')
  formData.append('from_name', 'SpoolID Landing Page')

  try {
    // 1. Invia a Web3Forms (per te)
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      // 2. Invia a Make.com (per auto-reply)
      await fetch('IL_TUO_WEBHOOK_URL_DI_MAKE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        })
      })

      setSubmitSuccess(true)
      setEmail('')
      setTimeout(() => setSubmitSuccess(false), 5000)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Errore durante l\'invio. Riprova.')
  } finally {
    setIsSubmitting(false)
  }
}
```

**Sostituisci `IL_TUO_WEBHOOK_URL_DI_MAKE`** con l'URL del webhook che hai copiato prima!

---

## Step 7: Attiva lo Scenario su Make

1. Torna su Make
2. In basso a sinistra, toggle **"Scheduling"** da OFF a **ON**
3. Scegli frequenza: **"Immediately"** (appena arrivano dati)
4. Click **"OK"**
5. Salva scenario (Click icona floppy disk o Ctrl+S)

✅ **Lo scenario ora è ATTIVO!**

---

## Step 8: Deploy e Test Finale

### 8.1 Aggiorna il Codice
1. Modifica `src/App.jsx` come sopra
2. Commit e push:
```bash
git add src/App.jsx
git commit -m "Add Make.com webhook for auto-reply emails"
git push
```

### 8.2 Aspetta Deploy Vercel (2 min)

### 8.3 Test sul Sito Live
1. Vai su spoolid.com
2. Inserisci la TUA email nel form
3. Submit
4. Controlla email → dovresti ricevere l'email di benvenuto! 🎉

---

## 📊 Monitoraggio

### Su Make.com:
- Vai su **"Scenarios"**
- Clicca il tuo scenario
- Tab **"History"** mostra tutte le esecuzioni
- Puoi vedere quante operazioni hai usato: **Dashboard > Usage**

### Limiti Free Plan:
- ✅ 1000 operations/month
- 1 operation = 1 email inviata
- Resetta il 1° di ogni mese

---

## ❓ Troubleshooting

### "Email non arrivano"
1. Controlla tab "History" su Make
2. Verifica errori nel modulo Gmail
3. Controlla spam folder
4. Verifica che webhook URL sia corretto in `App.jsx`

### "Make dice 'Unauthorized'"
1. Riconnetti Gmail in Make
2. Autorizza di nuovo

### "Webhook non riceve dati"
1. Verifica che URL webhook in `App.jsx` sia corretto
2. Controlla console browser per errori JavaScript
3. Testa con reqbin.com come sopra

---

## ✅ Checklist Completamento

- [ ] Account Make.com creato
- [ ] Scenario "SpoolID Waitlist Auto-Reply" creato
- [ ] Webhook configurato e URL copiato
- [ ] Gmail connesso a Make
- [ ] Email template HTML incollato
- [ ] Scenario testato con dati finti
- [ ] `src/App.jsx` aggiornato con webhook URL
- [ ] Codice committato e pushato
- [ ] Test sul sito live completato
- [ ] Email di benvenuto ricevuta ✅

---

## 🎉 Fatto!

Ora ogni nuovo signup riceverà automaticamente l'email di benvenuto con la domanda sui brand di filamento!

**Costo: €0/mese** (fino a 1000 email) 🎊
