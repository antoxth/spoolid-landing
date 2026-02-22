# Configurazione Dominio Register.it su Vercel

## 🌐 Collegare il Tuo Dominio Custom

Guida completa per connettere il tuo dominio Register.it al deploy Vercel di SpoolID.

---

## 📋 Cosa Ti Serve

- ✅ Deploy Vercel completato (fatto!)
- ✅ Dominio acquistato su Register.it
- ✅ Accesso al pannello Register.it
- ⏱️ Tempo richiesto: 5-10 minuti (+ 24-48h per propagazione DNS)

---

## Parte 1: Aggiungere Dominio su Vercel

### Step 1: Vai alle Impostazioni del Progetto

1. Su Vercel, vai al tuo progetto **spoolid-landing**
2. Click su **"Settings"** (in alto)
3. Nel menu laterale, click su **"Domains"**

### Step 2: Aggiungi il Dominio

1. Nella sezione Domains, troverai un campo **"Add"** o **"Enter domain"**
2. Inserisci il tuo dominio, ad esempio:
   - `spoolid.com` (dominio principale)
   - `www.spoolid.com` (con www)
3. Click **"Add"**

### Step 3: Vercel Ti Mostrerà i Record DNS

Vercel ti mostrerà una schermata con i record DNS da configurare. **NON CHIUDERE QUESTA PAGINA** - ti servirà per copiare i valori.

Tipicamente vedrai:

#### Per il dominio principale (spoolid.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

#### Per www (www.spoolid.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**📸 Importante**: Fai uno screenshot o copia questi valori!

---

## Parte 2: Configurare DNS su Register.it

### Step 1: Login su Register.it

1. Vai su **https://www.register.it**
2. Fai login al tuo account
3. Vai in **"I miei servizi"** o **"Domini"**

### Step 2: Trova la Gestione DNS

1. Trova il tuo dominio nella lista
2. Click su **"Gestisci"** o **"Manage"**
3. Cerca la sezione **"DNS"** o **"Zona DNS"** o **"DNS Management"**
4. Click su **"Modifica zona DNS"** o **"Edit DNS Zone"**

### Step 3: Aggiungi i Record DNS

#### Record A (per dominio principale)

1. Click su **"Aggiungi Record"** o **"Add Record"**
2. Compila i campi:
   - **Tipo**: `A`
   - **Host** o **Nome**: `@` (oppure lascia vuoto, significa root domain)
   - **Punta a** o **Value**: `76.76.21.21` (l'IP che ti ha dato Vercel)
   - **TTL**: `3600` (o lascia default)
3. Click **"Salva"** o **"Save"**

#### Record CNAME (per www)

1. Aggiungi un altro record
2. Compila:
   - **Tipo**: `CNAME`
   - **Host** o **Nome**: `www`
   - **Punta a** o **Value**: `cname.vercel-dns.com` (copiato da Vercel)
   - **TTL**: `3600`
3. Click **"Salva"**

### Step 4: Rimuovi Record Conflittuali (IMPORTANTE!)

⚠️ **Attenzione**: Se ci sono già altri record A o CNAME per `@` o `www`, **devi rimuoverli** prima di aggiungere i nuovi, altrimenti ci saranno conflitti.

Register.it potrebbe avere di default:
- Un record A che punta al loro parking page
- Un record CNAME per www

**Eliminali** prima di aggiungere quelli di Vercel.

---

## Parte 3: Verifica e Attesa

### Su Register.it

1. Dopo aver salvato, verifica che i record siano visibili nella lista
2. Dovrebbe comparire qualcosa come:
   ```
   @ (root)    A      76.76.21.21       3600
   www         CNAME  cname.vercel-dns.com  3600
   ```

### Su Vercel

1. Torna sulla pagina Vercel dove hai aggiunto il dominio
2. Vedrai lo stato del dominio:
   - 🟡 **Pending** o **Configuring** = DNS non ancora propagato
   - 🟢 **Valid** o **Active** = Tutto OK!

### Tempo di Propagazione

- ⏱️ **Minimo**: 5-10 minuti (a volte funziona subito)
- ⏱️ **Tipico**: 1-4 ore
- ⏱️ **Massimo**: 24-48 ore (raro)

Puoi controllare la propagazione su: https://www.whatsmydns.net

---

## 🎯 Configurazione Consigliata: Redirect www → dominio principale

Una volta che entrambi funzionano, su Vercel:

1. Vai in **Settings** → **Domains**
2. Trova `www.spoolid.com` nella lista
3. Click sui tre puntini `...` accanto
4. Seleziona **"Set as Redirect to spoolid.com"**

Così tutti i visitatori che digitano `www` vengono reindirizzati automaticamente alla versione senza www (o viceversa, a tua scelta).

---

## ✅ Test Finale

Quando i DNS sono propagati:

1. Apri browser in incognito
2. Vai su `https://tuodominio.com`
3. Dovrebbe caricare il tuo sito SpoolID
4. Verifica certificato SSL (lucchetto verde nella barra)
5. ✅ **Vercel configura automaticamente HTTPS** - nessuna azione richiesta!

---

## ❓ Troubleshooting

### "DNS non si aggiorna dopo 24 ore"

- Controlla di aver rimosso i vecchi record su Register.it
- Verifica che i valori siano esattamente quelli di Vercel (nessuno spazio extra)
- Prova a svuotare la cache DNS: `ipconfig /flushdns` (Windows) o `sudo dscacheutil -flushcache` (Mac)

### "ERR_SSL_PROTOCOL_ERROR"

- Normale nelle prime ore dopo configurazione
- Vercel genera il certificato SSL automaticamente, può richiedere fino a 24h
- Nel frattempo usa `http://` invece di `https://` per testare

### "Dominio non trovato"

- DNS non ancora propagato, aspetta ancora
- Controlla su whatsmydns.net se i server DNS nel mondo vedono i tuoi record

---

## 🎉 Dopo la Configurazione

Una volta che il dominio è attivo:

1. ✅ **Web3Forms**: Aggiorna il dominio nelle impostazioni se necessario
2. ✅ **Email auto-reply**: Testa con un signup reale
3. ✅ **Analytics**: Considera di aggiungere Google Analytics o Plausible
4. 🚀 **Pubblicizza**: Il tuo landing è live!

---

## 📞 Supporto

- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **Register.it Support**: https://www.register.it/assistenza
- **DNS Checker**: https://www.whatsmydns.net

Il tuo sito sarà online sul tuo dominio custom tra poco! 🎊
