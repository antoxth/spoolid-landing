const translations = {
    en: {
        // Meta
        langCode: 'en',
        otherLangPath: '/it',
        otherLangLabel: '🇮🇹 Italiano',
        htmlLang: 'en',

        // Navbar
        navProject: 'The Project',
        navHelp: 'How to Help',
        navFaq: 'FAQ',
        navCta: 'Upload Your Video',

        // Hero
        heroBadge: '🔬 AI Research in Progress — Contribute to the Dataset',
        heroHeadline1: 'Estimating remaining filament from a',
        heroHeadlineHighlight: 'simple photo',
        heroHeadline2: '.',
        heroSubtitle1: "I'm developing a revolutionary AI model for makers. I need",
        heroSubtitleHighlight: 'many videos',
        heroSubtitle2: 'of filament spools to train my algorithm. It only takes',
        heroSubtitleBold: '60 seconds',
        heroSubtitle3: 'to help.',
        heroCta: 'See how to help',
        heroVisualLabel: 'SpoolID AI - Research Project',

        // Stats
        stat1Value: '100%',
        stat1Label: 'Open Source Approach',
        stat2Value: 'Any',
        stat2Label: 'Brand Supported',

        // Problem section
        problemTitle: 'The Problem: Why do we need AI?',
        card1Title: 'Faster Than a Scale',
        card1Body: "The goal is to give you an instant check: no more kitchen scales. Just one photo and you'll know how much material you have left.",
        card2Title: 'Weighing Is a Pain',
        card2Body: 'Constantly weighing spools and logging grams on a spreadsheet takes the magic out of 3D printing.',
        card3Title: 'The AI Solution',
        card3Body: 'Imagine taking a simple photo of your spool and the app immediately tells you: "About 120 grams remaining." That\'s what I\'m building.',

        // How to help
        helpTitle: 'How can you help me build the dataset?',
        step1Title: 'Grab a Spool',
        step1Body: 'Pick any spool of any brand — preferably one that is half used.',
        step2Title: 'Record a Short Video',
        step2Body: 'Hold it and slowly rotate it in front of your phone camera for 10–15 seconds. Show the sides and the center clearly.',
        step3Title: 'Upload the File',
        step3Body: 'Select the file below. I guarantee complete anonymity.',

        // Uploader
        uploaderDropTitle: 'Drag your video here or click to browse',
        uploaderDropSubtitle: 'MP4, MOV, WebM — Max 40MB',
        uploaderPhase1: 'Step 1/2: Reading local video file...',
        uploaderPhase2: 'Step 2/2: Sending to Google Drive...',
        uploaderWait: 'Please wait...',
        uploaderSendBtn: 'Submit Video to Dataset',
        uploaderSuccessTitle: 'Upload complete!',
        uploaderSuccessBody: 'Thank you so much for your contribution. Would you like to receive an email when the AI model is ready?',
        uploaderEmailSubscribed: 'Subscribed! I\'ll keep you posted on the progress.',
        uploaderEmailPlaceholder: 'Your email',
        uploaderEmailBtn: 'Keep Me Updated',
        uploaderEmailBtnLoading: 'Sending...',
        uploaderUploadAnother: 'Upload another video',
        uploaderError: 'Upload error. The file might be too large or your connection unstable.',
        uploaderErrorDevLabel: 'Technical detail for the developer:',
        uploaderPrivacy: 'No account required. Your video is saved in complete',
        uploaderPrivacyBold: 'anonymity and security',
        uploaderPrivacy2: 'on my research Google Drive.',
        uploaderTooBig: (mb) => `File too large (${mb} MB). Google accepts files up to 40MB. Try recording a shorter video or lowering the resolution (e.g. 1080p instead of 4K).`,
        uploaderBadFormat: (name) => `The format of the file (${name || 'unknown'}) does not appear to be a standard video. Please try again.`,
        newsletterError: "Subscription error. Please try again.",

        // FAQ
        faqTitle: 'Dataset FAQ',
        faqs: [
            {
                q: 'What is the video for?',
                a: "I use the video to extract multiple angles of your spool. This data (dataset) will be fed to an AI model to teach it to estimate how much filament is left based purely on visual analysis."
            },
            {
                q: 'Can I participate with any filament brand?',
                a: "Absolutely! The more brands, colors, and sizes we collect, the more accurate and universal the AI model will become."
            },
            {
                q: 'Are my personal data and videos safe?',
                a: "Yes. Videos uploaded through the form go directly to my secure storage (Google Drive). They will be used exclusively for research purposes and will not be shared or sold."
            },
            {
                q: 'What happens after I leave my email?',
                a: "I will use your email solely to send you monthly updates (no spam!) on the progress of my AI research and the eventual release of the final app."
            }
        ],

        // Newsletter
        newsletterTitle: "Follow the AI Training",
        newsletterSubtitle: "Not ready to upload a video but curious? Leave your email.",
        newsletterSubtitle2: "I'll keep you updated on the research results and the model launch.",
        newsletterSuccessTitle: 'Subscription confirmed! 🎉',
        newsletterSuccessBody: "I'll keep you updated on SpoolID AI's progress.",
        newsletterEmailPlaceholder: 'Your email',
        newsletterBtn: 'Stay Updated',
        newsletterBtnLoading: 'Subscribing...',
        newsletterNoSpam: 'No spam',
        newsletterUseful: 'Only useful updates',

        // Footer
        footerText: '© 2026 SpoolID AI Research. Project by Makers for Makers.',
    },

    it: {
        // Meta
        langCode: 'it',
        otherLangPath: '/',
        otherLangLabel: '🇬🇧 English',
        htmlLang: 'it',

        // Navbar
        navProject: 'Il Progetto',
        navHelp: 'Come Aiutarmi',
        navFaq: 'FAQ',
        navCta: 'Carica il tuo Video',

        // Hero
        heroBadge: '🔬 Ricerca AI in Corso - Contribuisci al Dataset',
        heroHeadline1: 'Stimare il filamento residuo da una',
        heroHeadlineHighlight: 'semplice foto',
        heroHeadline2: '.',
        heroSubtitle1: "Sto sviluppando un modello di Intelligenza Artificiale rivoluzionario per i maker. Ho bisogno di",
        heroSubtitleHighlight: 'tanti video',
        heroSubtitle2: 'di bobine per addestrare il mio algoritmo. Ti bastano',
        heroSubtitleBold: '60 secondi',
        heroSubtitle3: 'per aiutarmi.',
        heroCta: 'Scopri come aiutare',
        heroVisualLabel: 'SpoolID AI - Progetto di Ricerca',

        // Stats
        stat1Value: '100%',
        stat1Label: 'Open Source Approach',
        stat2Value: 'Qualsiasi',
        stat2Label: 'Marca Supportata',

        // Problem section
        problemTitle: "Il Problema: Perché serve l'AI?",
        card1Title: 'Più veloce della Pesa',
        card1Body: "L'obiettivo è offrirti un controllo immediato: niente più bilance da cucina. Solo uno scatto e sai quanto materiale hai.",
        card2Title: 'Pesare è una noia',
        card2Body: 'Pesare costantemente le bobine e segnare i grammi usa-e-getta su un foglio excel ruba la magia della stampa 3D.',
        card3Title: 'La Soluzione AI',
        card3Body: 'Immagina di scattare una semplice foto alla bobina e avere l\'app che ti dice subito: "Rimangono circa 120 grammi". È questo che sto costruendo.',

        // How to help
        helpTitle: 'Come puoi aiutarmi a costruire il dataset',
        step1Title: 'Prendi la Bobina',
        step1Body: 'Prendi una bobina di qualsiasi marca, preferibilmente mezza usata.',
        step2Title: 'Gira un breve video',
        step2Body: 'Tienila in mano e ruotala lentamente davanti alla fotocamera del telefono per 10-15 secondi. Mostra bene i lati e il centro.',
        step3Title: 'Carica il File',
        step3Body: 'Seleziona il file qui sotto. Ti garantisco il pieno anonimato.',

        // Uploader
        uploaderDropTitle: 'Trascina qui il tuo video o clicca per sfogliare',
        uploaderDropSubtitle: 'MP4, MOV, WebM - Massimo 40MB',
        uploaderPhase1: 'Fase 1/2: Analisi file video locale...',
        uploaderPhase2: 'Fase 2/2: Invio a Google Drive in corso...',
        uploaderWait: 'Attendi...',
        uploaderSendBtn: 'Invia Video al Dataset',
        uploaderSuccessTitle: 'Upload completato!',
        uploaderSuccessBody: 'Grazie mille per il tuo prezioso contributo. Ti andrebbe di ricevere una mail quando il modello AI sarà pronto?',
        uploaderEmailSubscribed: "Iscrizione confermata! Ti terrò aggiornato sui progressi.",
        uploaderEmailPlaceholder: 'La tua email',
        uploaderEmailBtn: 'Tienimi Aggiornato',
        uploaderEmailBtnLoading: 'Invio in corso...',
        uploaderUploadAnother: 'Carica un altro video',
        uploaderError: "Errore durante l'upload. Il file potrebbe essere troppo grande o internet instabile.",
        uploaderErrorDevLabel: 'Dettaglio tecnico per lo sviluppatore:',
        uploaderPrivacy: 'Nessun account richiesto. Il tuo video viene salvato in totale',
        uploaderPrivacyBold: 'anonimato e sicurezza',
        uploaderPrivacy2: 'sul mio Google Drive di ricerca.',
        uploaderTooBig: (mb) => `Il file è troppo grande (${mb} MB). Google accetta file fino a 40MB via form. Prova a girare un video più breve o abbassare la risoluzione della fotocamera (es. 1080p invece di 4K).`,
        uploaderBadFormat: (name) => `Il formato del file (${name || 'sconosciuto'}) non sembra un video standard. Riprova.`,
        newsletterError: "Errore durante l'iscrizione. Riprova.",

        // FAQ
        faqTitle: 'FAQ relative al Dataset',
        faqs: [
            {
                q: "A cosa serve il video che devo caricare?",
                a: "Il video mi serve per estrarre diverse angolazioni della tua bobina. Questi dati (dataset) verranno 'dati in pasto' a un modello di Intelligenza Artificiale per insegnargli a stimare quanto filamento è rimasto basandosi puramente sull'analisi visiva."
            },
            {
                q: "Posso partecipare con qualsiasi marca di filamento?",
                a: "Assolutamente sì! Più marche, colori e dimensioni diverse raccogliamo, più il modello AI diventerà preciso e universale."
            },
            {
                q: "I miei dati personali e video sono al sicuro?",
                a: "Sì, i video caricati tramite il form finiranno direttamente nel mio spazio di archiviazione protetto (Google Drive). Verranno utilizzati esclusivamente a scopo di ricerca e non verranno condivisi o venduti."
            },
            {
                q: "Cosa succede dopo aver lasciato la mail?",
                a: "Utilizzerò la tua email esclusivamente per tenerti aggiornato mensilmente (nessun blocco di spam!) sui progressi della mia ricerca AI e sull'eventuale rilascio dell'applicazione finale."
            }
        ],

        // Newsletter
        newsletterTitle: "Segui l'addestramento dell'AI",
        newsletterSubtitle: "Non vuoi caricare un video ora ma sei curioso? Lascia la tua email.",
        newsletterSubtitle2: "Ti aggiorneremo sui risultati della ricerca e sul lancio del modello.",
        newsletterSuccessTitle: 'Iscrizione confermata! 🎉',
        newsletterSuccessBody: 'Ti terremo aggiornato sui progressi di SpoolID AI.',
        newsletterEmailPlaceholder: 'La tua email',
        newsletterBtn: 'Resta Aggiornato',
        newsletterBtnLoading: 'Iscrizione...',
        newsletterNoSpam: 'Nessuno spam',
        newsletterUseful: 'Solo aggiornamenti utili',

        // Footer
        footerText: '© 2026 SpoolID AI Research. Project by Makers per i Makers.',
    }
}

export default translations
