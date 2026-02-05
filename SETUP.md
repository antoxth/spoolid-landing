# Setup Guide - SpoolID Landing Page

## 📧 Step 1: Attivare Raccolta Email (2 minuti)

### Opzione A: Web3Forms (Raccomandato - Gratis)

1. Vai su **[web3forms.com](https://web3forms.com)**
2. Inserisci la tua email e clicca "Create Access Key"
3. Riceverai un **Access Key** via email
4. Apri `src/App.jsx` e cerca la riga:
   ```javascript
   formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY')
   ```
5. Sostituisci `YOUR_WEB3FORMS_ACCESS_KEY` con la tua chiave
6. **Fatto!** Le email arriveranno nella tua casella

### Opzione B: Google Forms (Alternativa)

Se preferisci salvare le email in un Google Sheet:
1. Crea un Google Form con un campo "Email"
2. Usa un servizio come [FormSubmit.co](https://formsubmit.co) per inviare i dati

---

## 🚀 Step 2: Deploy su Vercel (3 minuti)

### Prerequisiti
- Account GitHub (gratuito)
- Account Vercel (gratuito) - [vercel.com](https://vercel.com)

### Procedura

#### 1. Inizializza Git Repository
Nella cartella del progetto:
```bash
cd "/Users/antoniocolucci/landing filabase"
git init
git add .
git commit -m "Initial commit - SpoolID landing page"
```

#### 2. Crea Repository su GitHub
1. Vai su [github.com/new](https://github.com/new)
2. Nome repository: `spoolid-landing` (o quello che preferisci)
3. NON aggiungere README/gitignore/license
4. Clicca "Create repository"

#### 3. Push su GitHub
Copia i comandi che GitHub ti mostra, tipo:
```bash
git remote add origin https://github.com/TUO_USERNAME/spoolid-landing.git
git branch -M main
git push -u origin main
```

#### 4. Deploy su Vercel
1. Vai su [vercel.com](https://vercel.com) e fai login con GitHub
2. Clicca "Add New Project"
3. Importa il repository `spoolid-landing`
4. **Framework Preset**: Vercel rileva automaticamente "Vite"
5. **Build Settings**: 
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Clicca **"Deploy"**

✅ **Fatto!** In ~2 minuti avrai il tuo link tipo `spoolid-landing.vercel.app`

---

## 📸 Step 3: Aggiungere le Tue Foto

### Organizzazione File
Crea una cartella per le immagini:
```bash
mkdir -p public/images
```

### Inserisci le Foto
Metti le tue foto in `public/images/` con nomi descrittivi:
- `hero-app-mockup.png`
- `failed-print.jpg`
- `spreadsheet.jpg`
- `spool-pile.jpg`
- `nfc-tag.jpg`
- `scale-weighing.jpg`
- `phone-scanning.jpg`
- `brands-logos.png`

### Sostituisci i Placeholder in App.jsx

Cerca i placeholder e sostituiscili con:

```jsx
// ESEMPIO: Hero Section
<img 
  src="/images/hero-app-mockup.png" 
  alt="SpoolID App Interface"
  className="w-full rounded-2xl shadow-2xl"
/>

// ESEMPIO: Problem Card 1
<img 
  src="/images/failed-print.jpg" 
  alt="Failed 3D print"
  className="w-full h-48 object-cover rounded-lg mb-4"
/>
```

Ripeti per tutti i 7 placeholder.

---

## 🔧 Comandi Utili

### Sviluppo Locale
```bash
npm run dev
```
Apre su `http://localhost:5173`

### Build di Produzione
```bash
npm run build
npm run preview
```

### Aggiornare il Sito su Vercel
Ogni volta che fai push su GitHub, Vercel aggiorna automaticamente:
```bash
git add .
git commit -m "Updated images"
git push
```

---

## 📊 Monitorare le Email

- **Web3Forms**: Controlla la tua casella email
- **Vercel Analytics**: Attivabile gratis dal dashboard Vercel per vedere i visitatori

---

## 🎯 Next Steps

1. ✅ Attiva Web3Forms
2. ✅ Deploy su Vercel
3. ✅ Aggiungi le tue foto
4. 📣 Condividi il link su:
   - r/3Dprinting
   - r/functionalprint
   - Facebook groups 3D printing
   - Forum Prusa / Comunità italiane

---

**Hai domande?** Tutto è già configurato e pronto per il deploy! 🚀
