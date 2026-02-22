import { useState, useEffect } from 'react'
import {
  Camera,
  Upload,
  BrainCircuit,
  AlertTriangle,
  FileSpreadsheet,
  Ghost,
  Menu,
  X,
  Users,
  CheckCircle2,
  ChevronDown,
  Lock,
  Zap,
  Play,
  Database,
  CheckCircle
} from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const [videoFile, setVideoFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQTNVG1aJi3nJijdzhljl504_WaJrwpaWgb9tO3PUhhhlqySPbQt6cHzZ-16VZFBX7/exec"

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'newsletter',
          email: email
        })
      })

      const data = await response.json()

      if (data.status === 'success') {
        setSubmitSuccess(true)
        setEmail('')
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert("Errore durante l'iscrizione. Riprova.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
      setUploadStatus(null)
    } else if (file) {
      alert("Per favore, seleziona un file video valido.")
    }
  }

  const handleVideoUpload = async () => {
    if (!videoFile) return
    setIsUploading(true)
    setUploadStatus(null)
    setUploadProgress(10)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(videoFile)

      reader.onload = async () => {
        setUploadProgress(40)
        const base64Data = reader.result

        try {
          const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
              action: 'upload_video',
              fileName: videoFile.name,
              mimeType: videoFile.type,
              fileData: base64Data
            })
          })

          setUploadProgress(80)
          const data = await response.json()

          if (data.status === 'success') {
            setUploadStatus('success')
            setVideoFile(null)
            setTimeout(() => setUploadStatus(null), 8000)
          } else {
            throw new Error(data.message || 'Upload failed')
          }
        } catch (err) {
          console.error('Upload API Error:', err)
          setUploadStatus('error')
        } finally {
          setIsUploading(false)
          setUploadProgress(0)
        }
      }

      reader.onerror = (error) => {
        console.error('File reading error:', error)
        setUploadStatus('error')
        setIsUploading(false)
        setUploadProgress(0)
      }
    } catch (error) {
      console.error('General Upload Error:', error)
      setUploadStatus('error')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const faqs = [
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
  ]

  // IMPORTANT: Metti qui l'URL del tuo Google Form per l'upload
  const GOOGLE_FORM_UPLOAD_URL = "https://forms.gle/INSERISCI_QUI_IL_TUO_LINK_AL_FORM"

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-orange-500 bg-clip-text text-transparent">
                SpoolID AI
              </h1>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#progetto" className="text-gray-300 hover:text-white transition-colors">
                Il Progetto
              </a>
              <a href="#upload" className="text-gray-300 hover:text-white transition-colors">
                Come Aiutarmi
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#upload" className="btn-secondary">
                Carica il tuo Video
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="#progetto"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Il Progetto
              </a>
              <a
                href="#upload"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Come Aiutarmi
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#upload"
                className="block px-3 py-2 text-brand-orange hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Carica il tuo Video
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-brand-blue/10 border border-brand-blue/30 rounded-full mb-4">
                <p className="text-brand-blue font-semibold text-sm">🔬 Ricerca AI in Corso - Contribuisci al Dataset</p>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Stimare il filamento residuo da una <span className="text-brand-orange">semplice foto</span>.
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Sto sviluppando un modello di Intelligenza Artificiale rivoluzionario per i maker.
                Ho bisogno di <span className="text-brand-orange font-semibold">tanti video</span> di bobine per addestrare il mio algoritmo. Ti bastano <strong className="text-white">60 secondi</strong> per aiutarmi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                <a href="#upload" className="btn-primary inline-block">
                  Scopri come aiutare
                </a>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="relative">
              <div className="w-full aspect-[4/3] bg-gray-800 rounded-2xl shadow-2xl relative overflow-hidden border border-gray-700 flex items-center justify-center group flex-col">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 opacity-30"></div>
                <BrainCircuit size={80} className="text-brand-blue mb-4 opacity-80" />
                <p className="text-gray-400 font-medium">SpoolID AI - Progetto di Ricerca</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-800 bg-gray-900/50 backdrop-blur-sm relative py-12">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="py-4">
              <div className="text-4xl font-bold text-brand-blue mb-2">100%</div>
              <div className="text-sm tracking-wider uppercase text-gray-500">Open Source Approach</div>
            </div>
            <div className="py-4">
              <div className="text-4xl font-bold text-brand-orange mb-2">Qualsiasi</div>
              <div className="text-sm tracking-wider uppercase text-gray-500">Marca Supportata</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="progetto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            Il Problema: Perché serve l'AI?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glow text-center">
              <div className="inline-block p-4 bg-red-500/10 rounded-full mb-4">
                <AlertTriangle size={40} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Più veloce della Pesa</h3>
              <p className="text-gray-400">
                L'obiettivo è offrirti un controllo immediato: niente più bilance da cucina. Solo uno scatto e sai quanto materiale hai.
              </p>
            </div>

            <div className="card-glow text-center">
              <div className="inline-block p-4 bg-yellow-500/10 rounded-full mb-4">
                <FileSpreadsheet size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Pesare è una noia</h3>
              <p className="text-gray-400">
                Pesare costantemente le bobine e segnare i grammi usa-e-getta su un foglio excel ruba la magia della stampa 3D.
              </p>
            </div>

            <div className="card-glow text-center">
              <div className="inline-block p-4 bg-brand-blue/10 rounded-full mb-4">
                <BrainCircuit size={40} className="text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-3">La Soluzione AI</h3>
              <p className="text-gray-400">
                Immagina di scattare una semplice foto alla bobina e avere l'app che ti dice subito: "Rimangono circa 120 grammi". È questo che sto costruendo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / How it Works */}
      <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            Come puoi aiutarmi a costruire il dataset
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="inline-block p-6 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl shadow-xl">
                  <Camera size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 right-[30%] w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Prendi la Bobina</h3>
              <p className="text-gray-400">
                Prendi una bobina di qualsiasi marca, preferibilmente mezza usata.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="inline-block p-6 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl shadow-xl">
                  <Play size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 right-[30%] w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Gira un breve video</h3>
              <p className="text-gray-400">
                Tienila in mano e ruotala lentamente davanti alla fotocamera del telefono per 10-15 secondi. Mostra bene i lati e il centro.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="inline-block p-6 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl shadow-xl">
                  <Upload size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 right-[30%] w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Carica il File</h3>
              <p className="text-gray-400">
                Seleziona il file qui sotto. Ti garantisco il pieno anonimato.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center">
              {!videoFile ? (
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 hover:border-brand-orange hover:bg-gray-800/50 transition-all relative group">
                  <input
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <Upload size={48} className="mx-auto text-gray-500 group-hover:text-brand-orange mb-4 transition-colors" />
                  <h4 className="text-xl font-medium text-white mb-2">Trascina qui il tuo video o clicca per sfogliare</h4>
                  <p className="text-gray-400 text-sm">MP4, MOV, WebM - Massimo 50MB</p>
                </div>
              ) : (
                <div className="p-8 border border-gray-800 rounded-xl bg-gray-800/50">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="p-3 bg-brand-blue/20 rounded-lg text-brand-blue">
                      <Camera size={32} />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-white font-medium truncate max-w-xs">{videoFile.name}</p>
                      <p className="text-sm text-gray-400">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    {!isUploading && (
                      <button onClick={() => setVideoFile(null)} className="text-gray-500 hover:text-red-500 p-2 transition-colors z-20 relative">
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  {isUploading ? (
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-2 text-gray-400">
                        <span>Caricamento magico in corso...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-brand-orange h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <button onClick={handleVideoUpload} className="btn-primary w-full flex items-center justify-center gap-2 relative z-20">
                      <Upload size={20} />
                      Invia Video al Dataset
                    </button>
                  )}
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  <span>Upload completato! Grazie mille per il tuo contributo.</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center justify-center gap-2 text-left">
                  <AlertTriangle size={24} className="flex-shrink-0" />
                  <span className="text-sm">Errore durante l'upload. Il file potrebbe essere troppo grande o internet instabile.</span>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-6">
                Nessun account richiesto. Il tuo video viene salvato in totale <strong className="text-gray-400">anonimato e sicurezza</strong> sul mio Google Drive di ricerca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-16">
            FAQ relative al Dataset
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-gray-900/50 hover:bg-gray-900 transition-colors text-left"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`text-brand-orange transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-950/50">
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Newsletter */}
      <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-4 bg-gradient-to-br from-brand-blue to-cyan-600 rounded-full mb-6">
            <Database size={40} className="text-white" />
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Segui l'addestramento dell'AI
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Non vuoi caricare un video ora ma sei curioso? Lascia la tua email.
            <br className="hidden md:block" /> Ti aggiorneremo sui risultati della ricerca e sul lancio del modello.
          </p>

          {submitSuccess ? (
            <div className="max-w-xl mx-auto p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-500 mb-3">Iscrizione confermata! 🎉</h3>
              <p className="text-gray-300 text-lg mb-2">Ti terremo aggiornato sui progressi di SpoolID AI.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Iscrizione...' : 'Resta Aggiornato'}
                </button>
              </form>

              {/* Privacy Badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-gray-600" />
                  <span>Nessuno spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-gray-600" />
                  <span>Solo aggiornamenti utili</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2026 SpoolID AI Research. Project by Makers per i Makers.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
