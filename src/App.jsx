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
  Database
} from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [makerCount, setMakerCount] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  // Initial animated counter effect Let's pretend we have some initial videos
  useEffect(() => {
    const targetCount = 142
    const duration = 4000
    const steps = 80
    const increment = targetCount / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetCount) {
        setMakerCount(targetCount)
        clearInterval(timer)
      } else {
        setMakerCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  // Periodic increment effect
  useEffect(() => {
    const incrementInterval = setInterval(() => {
      setMakerCount(prev => prev + 1)
    }, Math.random() * 8000 + 10000)

    return () => clearInterval(incrementInterval)
  }, [])

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Using Web3Forms
    const formData = new FormData()
    formData.append('access_key', '786fd9cc-5360-4f0d-8a42-2be634c76c06') // Web3Forms key
    formData.append('email', email)
    formData.append('subject', 'Nuova iscrizione Newsletter SpoolID AI Project')
    formData.append('from_name', 'SpoolID AI Research')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
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

  const faqs = [
    {
      q: "A cosa serve il video che devo caricare?",
      a: "Il video ci serve per estrarre diverse angolazioni della tua bobina. Questi dati (dataset) verranno 'dati in pasto' a un modello di Intelligenza Artificiale per insegnargli a stimare quanto filamento è rimasto basandosi puramente sull'analisi visiva."
    },
    {
      q: "Posso partecipare con qualsiasi marca di filamento?",
      a: "Assolutamente sì! Più marche, colori e dimensioni diverse raccogliamo, più il modello AI diventerà preciso e universale."
    },
    {
      q: "I miei dati personali e video sono al sicuro?",
      a: "Sì, i video caricati tramite il form finiranno direttamente nel nostro spazio di archiviazione protetto (Google Drive). Verranno utilizzati esclusivamente a scopo di ricerca e non verranno condivisi o venduti."
    },
    {
      q: "Cosa succede dopo aver lasciato la mail?",
      a: "Utilizzeremo la tua email esclusivamente per tenerti aggiornato mensilmente (nessun blocco di spam!) sui progressi della nostra ricerca AI e sull\'eventuale rilascio dell\'applicazione finale."
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
                Come Contribuire
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href={GOOGLE_FORM_UPLOAD_URL} target="_blank" rel="noreferrer" className="btn-secondary">
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
                Come Contribuire
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href={GOOGLE_FORM_UPLOAD_URL}
                target="_blank" rel="noreferrer"
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
                Stiamo sviluppando un modello di Intelligenza Artificiale rivoluzionario per i maker.
                Abbiamo bisogno di <span className="text-brand-orange font-semibold">migliaia di video</span> di bobine per addestrare il nostro algoritmo. Ti bastano <strong className="text-white">60 secondi</strong> per contribuire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                <a href="#upload" className="btn-primary inline-block">
                  Scopri come contribuire
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Upload size={18} className="text-brand-orange" />
                  <span><strong className="text-white">{makerCount}</strong> video già raccolti</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="relative">
              <img
                src="/images/ai-hero.png"
                alt="AI model analyzing a 3D printing filament spool"
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 border-y border-brand-orange/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-orange mb-2">10.000+</div>
              <div className="text-sm text-gray-400">Video Necessari Obiettivo</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">100%</div>
              <div className="text-sm text-gray-400">Open Source Approach</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange mb-2">Qualsiasi</div>
              <div className="text-sm text-gray-400">Marca Supportata</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">60 sec</div>
              <div className="text-sm text-gray-400">Tempo per contribuire</div>
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
              <h3 className="text-2xl font-bold mb-3">Slicers Inaffidabili</h3>
              <p className="text-gray-400">
                Le stime di chiusura dei software di slicer si basano su calcoli teorici. Spesso e volentieri si sbagliano e le stampe falliscono a metà.
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
              <img
                src="/images/sample-dataset.jpg"
                alt="Esempio di frame dal dataset per addestramento AI"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="inline-block p-4 bg-brand-blue/10 rounded-full mb-4">
                <BrainCircuit size={40} className="text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-3">La Soluzione AI</h3>
              <p className="text-gray-400">
                Immagina di scattare una semplice foto alla bobina e avere l'app che ti dice subito: "Rimangono circa 120 grammi". È questo che stiamo costruendo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / How it Works */}
      <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            Come puoi aiutarci a costruire il dataset
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
                Clicca sul pulsante qui sotto per inviarci il video tramite il nostro modulo sicuro di Google Drive.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a href={GOOGLE_FORM_UPLOAD_URL} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              <Upload size={24} />
              Vai al Form per caricare il tuo Video
            </a>
            <p className="text-sm text-gray-500 mt-4">Richiede accesso rapido a Google per l'invio su Drive.</p>
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
                {/* Web3Forms Auto-Reply Configuration */}
                <input type="hidden" name="subject" value="Iscrizione Notizie SpoolID AI" />
                <input type="hidden" name="from_name" value="SpoolID AI" />

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
