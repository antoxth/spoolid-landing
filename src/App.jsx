import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import translations from './translations'

function App({ lang = 'en' }) {
  const t = translations[lang] || translations['en']
  const navigate = useNavigate()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const [videoFile, setVideoFile] = useState(null)
  const [uploadPhase, setUploadPhase] = useState(null) // 'reading' | 'uploading' | 'success' | 'error'
  const [readProgress, setReadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [uploadErrorDetail, setUploadErrorDetail] = useState("")

  // Post-upload email state
  const [postUploadEmail, setPostUploadEmail] = useState('')
  const [isSubmittingPostEmail, setIsSubmittingPostEmail] = useState(false)
  const [postEmailSuccess, setPostEmailSuccess] = useState(false)

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQTNVG1aJi3nJijdzhljl504_WaJrwpaWgb9tO3PUhhhlqySPbQt6cHzZ-16VZFBX7/exec"

  // Update html lang attribute for SEO
  useEffect(() => {
    document.documentElement.lang = t.htmlLang
  }, [t.htmlLang])

  // Close language dropdown when clicking outside
  useEffect(() => {
    if (!langOpen) return
    const handler = (e) => {
      if (!e.target.closest('#lang-dropdown')) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [langOpen])

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
      alert(t.newsletterError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePostUploadEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingPostEmail(true)

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'newsletter',
          email: postUploadEmail
        })
      })

      const data = await response.json()

      if (data.status === 'success') {
        setPostEmailSuccess(true)
        setPostUploadEmail('')
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error submitting post-upload email:', error)
      alert(t.newsletterError)
    } finally {
      setIsSubmittingPostEmail(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    // Su Android in-app o browser specifici, il MIME type potrebbe essere vuoto o non standard
    const validVideoExts = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.m4v', '.3gp']
    const isVideoType = file?.type?.startsWith('video/')
    const hasVideoExt = file?.name && validVideoExts.some(ext => file.name.toLowerCase().endsWith(ext))
    const isUnidentifiedButLikelyValid = file && file.type === ''

    if (file && (isVideoType || hasVideoExt || isUnidentifiedButLikelyValid)) {
      const maxSizeInBytes = 40 * 1024 * 1024 // 40 MB
      if (file.size > maxSizeInBytes) {
        alert(t.uploaderTooBig((file.size / 1024 / 1024).toFixed(1)))
        e.target.value = null
        return
      }

      setVideoFile(file)
      setUploadStatus(null)
    } else if (file) {
      alert(t.uploaderBadFormat(file?.name))
      e.target.value = null
    }
  }

  const handleVideoUpload = async () => {
    if (!videoFile) return
    setIsUploading(true)
    setUploadPhase('reading')
    setReadProgress(0)
    setUploadStatus(null)
    setUploadErrorDetail("")

    // Safe base64 converter: avoids stack overflow (apply limit) and O(n²)
    // string concat on iOS Safari. Uses 8KB mini-batches with apply().
    const toBase64 = (uint8Slice) => {
      const MINI = 8192 // 8 KB — well within iOS call-stack limits
      let binary = ''
      for (let i = 0; i < uint8Slice.length; i += MINI) {
        binary += String.fromCharCode.apply(null, uint8Slice.subarray(i, i + MINI))
      }
      return btoa(binary)
    }

    try {
      // --- CHUNKED UPLOAD (memory-safe for Android & iOS) ---
      // 1.5 MB per chunk: small enough to stay under Safari's per-request limits
      // while still efficient (a 30 MB file = ~20 sequential requests).
      const CHUNK_SIZE = 1.5 * 1024 * 1024 // 1.5 MB

      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onprogress = (e) => {
          if (e.lengthComputable) setReadProgress(Math.round((e.loaded / e.total) * 100))
        }
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = reject
        reader.readAsArrayBuffer(videoFile)
      })

      setUploadPhase('uploading')

      const uint8 = new Uint8Array(arrayBuffer)
      const totalChunks = Math.ceil(uint8.length / CHUNK_SIZE)
      const uploadId = Date.now().toString(36) + Math.random().toString(36).slice(2)
      const fileName = videoFile.name || 'android_video.mp4'
      const mimeType = videoFile.type || 'video/mp4'

      for (let i = 0; i < totalChunks; i++) {
        const slice = uint8.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
        const chunkBase64 = toBase64(slice)

        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'upload_chunk',
            uploadId,
            fileName,
            mimeType,
            chunkIndex: i,
            totalChunks,
            chunkData: chunkBase64
          })
        })

        const rawText = await response.text()
        let data
        try {
          data = JSON.parse(rawText)
        } catch {
          throw new Error(`Google Server Error (HTTP ${response.status}): ${rawText.substring(0, 200)}`)
        }

        if (data.status !== 'success' && data.status !== 'chunk_ok') {
          throw new Error(data.message || `Chunk ${i + 1}/${totalChunks} failed`)
        }

        if (i === totalChunks - 1 && data.status === 'success') {
          setUploadPhase('success')
          setUploadStatus('success')
          setVideoFile(null)
        }
      }

    } catch (err) {
      console.error('Upload Error:', err)
      setUploadStatus('error')
      setUploadPhase('error')
      setUploadErrorDetail(`${err.name}: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const faqs = t.faqs

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
                {t.navProject}
              </a>
              <a href="#upload" className="text-gray-300 hover:text-white transition-colors">
                {t.navHelp}
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                {t.navFaq}
              </a>
            </div>

            {/* Right side: CTA + Language switcher dropdown */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative" id="lang-dropdown">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800"
                >
                  🌐 {t.langCode.toUpperCase()}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-9 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl py-1 z-50 min-w-[120px] overflow-hidden">
                    {t.otherLangs.map(l => (
                      <button
                        key={l.path}
                        onClick={() => { navigate(l.path); setLangOpen(false) }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a href="#upload" className="btn-secondary">
                {t.navCta}
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
              <a href="#progetto" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t.navProject}
              </a>
              <a href="#upload" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t.navHelp}
              </a>
              <a href="#faq" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t.navFaq}
              </a>
              <a href="#upload" className="block px-3 py-2 text-brand-orange hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t.navCta}
              </a>

              {/* ── Unified Language Submenu ── */}
              <div className="border-t border-gray-800 pt-1 mt-1">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span>🌐 {t.langCode.toUpperCase()} — Language</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="pl-4 space-y-1 pb-1">
                    {t.otherLangs.map(l => (
                      <button
                        key={l.path}
                        onClick={() => { navigate(l.path); setMobileMenuOpen(false); setLangOpen(false) }}
                        className="block w-full text-left px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                <p className="text-brand-blue font-semibold text-sm">{t.heroBadge}</p>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t.heroHeadline1} <span className="text-brand-orange">{t.heroHeadlineHighlight}</span>{t.heroHeadline2}
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {t.heroSubtitle1}{' '}
                <span className="text-brand-orange font-semibold">{t.heroSubtitleHighlight}</span>{' '}
                {t.heroSubtitle2}{' '}
                <strong className="text-white">{t.heroSubtitleBold}</strong>{' '}
                {t.heroSubtitle3}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                <a href="#upload" className="btn-primary inline-block">
                  {t.heroCta}
                </a>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="relative">
              <div className="w-full aspect-[4/3] bg-gray-800 rounded-2xl shadow-2xl relative overflow-hidden border border-gray-700 flex items-center justify-center group flex-col">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-blue/20 opacity-30"></div>
                <BrainCircuit size={80} className="text-brand-blue mb-4 opacity-80" />
                <p className="text-gray-400 font-medium">{t.heroVisualLabel}</p>
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
              <div className="text-4xl font-bold text-brand-blue mb-2">{t.stat1Value}</div>
              <div className="text-sm tracking-wider uppercase text-gray-500">{t.stat1Label}</div>
            </div>
            <div className="py-4">
              <div className="text-4xl font-bold text-brand-orange mb-2">{t.stat2Value}</div>
              <div className="text-sm tracking-wider uppercase text-gray-500">{t.stat2Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="progetto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            {t.problemTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glow text-center">
              <div className="inline-block p-4 bg-red-500/10 rounded-full mb-4">
                <AlertTriangle size={40} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.card1Title}</h3>
              <p className="text-gray-400">{t.card1Body}</p>
            </div>

            <div className="card-glow text-center">
              <div className="inline-block p-4 bg-yellow-500/10 rounded-full mb-4">
                <FileSpreadsheet size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.card2Title}</h3>
              <p className="text-gray-400">{t.card2Body}</p>
            </div>

            <div className="card-glow text-center">
              <div className="inline-block p-4 bg-brand-blue/10 rounded-full mb-4">
                <BrainCircuit size={40} className="text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t.card3Title}</h3>
              <p className="text-gray-400">{t.card3Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / How it Works */}
      <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            {t.helpTitle}
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
              <h3 className="text-2xl font-bold mb-3">{t.step1Title}</h3>
              <p className="text-gray-400">{t.step1Body}</p>
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
              <h3 className="text-2xl font-bold mb-3">{t.step2Title}</h3>
              <p className="text-gray-400">{t.step2Body}</p>
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
              <h3 className="text-2xl font-bold mb-3">{t.step3Title}</h3>
              <p className="text-gray-400">{t.step3Body}</p>
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
                  <h4 className="text-xl font-medium text-white mb-2">{t.uploaderDropTitle}</h4>
                  <p className="text-gray-400 text-sm">{t.uploaderDropSubtitle}</p>
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
                      {uploadPhase === 'reading' && (
                        <>
                          <div className="flex justify-between text-sm mb-2 text-gray-400">
                            <span>{t.uploaderPhase1}</span>
                            <span>{readProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 shadow-inner overflow-hidden">
                            <div className="bg-brand-orange h-2 rounded-full transition-all duration-150 ease-out" style={{ width: `${readProgress}%` }}></div>
                          </div>
                        </>
                      )}

                      {uploadPhase === 'uploading' && (
                        <>
                          <div className="flex justify-between text-sm mb-2 text-gray-400">
                            <span>{t.uploaderPhase2}</span>
                            <span className="animate-pulse">{t.uploaderWait}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 shadow-inner overflow-hidden relative">
                            <div className="w-1/3 bg-brand-orange h-full rounded-full absolute animate-[loader_1.5s_ease-in-out_infinite]"></div>
                          </div>
                          <style>{`
                            @keyframes loader {
                              0% { left: -33%; }
                              50% { left: 100%; right: -33%; }
                              100% { left: -33%; }
                            }
                          `}</style>
                        </>
                      )}
                    </div>
                  ) : (
                    <button onClick={handleVideoUpload} className="btn-primary w-full flex items-center justify-center gap-2 relative z-20">
                      <Upload size={20} />
                      {t.uploaderSendBtn}
                    </button>
                  )}
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="mt-8 p-6 bg-gray-800/80 border border-green-500/30 rounded-xl text-center shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                  <div className="flex items-center justify-center gap-3 mb-4 text-green-400">
                    <CheckCircle size={28} />
                    <h4 className="text-xl font-bold">{t.uploaderSuccessTitle}</h4>
                  </div>
                  <p className="text-gray-300 mb-6 font-medium">{t.uploaderSuccessBody}</p>

                  {postEmailSuccess ? (
                    <div className="p-4 bg-green-500/10 rounded-lg text-green-400 font-medium">
                      {t.uploaderEmailSubscribed}
                    </div>
                  ) : (
                    <form onSubmit={handlePostUploadEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        required
                        value={postUploadEmail}
                        onChange={(e) => setPostUploadEmail(e.target.value)}
                        placeholder={t.uploaderEmailPlaceholder}
                        className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                        disabled={isSubmittingPostEmail}
                      />
                      <button
                        type="submit"
                        className="btn-primary py-3 px-6 whitespace-nowrap text-sm"
                        disabled={isSubmittingPostEmail}
                      >
                        {isSubmittingPostEmail ? t.uploaderEmailBtnLoading : t.uploaderEmailBtn}
                      </button>
                    </form>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <button
                      onClick={() => {
                        setUploadStatus(null)
                        setPostEmailSuccess(false)
                        setPostUploadEmail('')
                      }}
                      className="text-gray-400 hover:text-brand-orange text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <Upload size={16} />
                      {t.uploaderUploadAnother}
                    </button>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={24} className="flex-shrink-0" />
                    <span className="text-sm">{t.uploaderError}</span>
                  </div>
                  {uploadErrorDetail && (
                    <div className="p-3 bg-black/40 rounded border border-red-500/20">
                      <p className="text-xs font-semibold text-red-300 mb-1">{t.uploaderErrorDevLabel}</p>
                      <code className="text-xs text-red-200 break-words font-mono block">
                        {uploadErrorDetail}
                      </code>
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm text-gray-500 mt-6">
                {t.uploaderPrivacy} <strong className="text-gray-400">{t.uploaderPrivacyBold}</strong> {t.uploaderPrivacy2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-16">
            {t.faqTitle}
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
            {t.newsletterTitle}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t.newsletterSubtitle}
            <br className="hidden md:block" /> {t.newsletterSubtitle2}
          </p>

          {submitSuccess ? (
            <div className="max-w-xl mx-auto p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-500 mb-3">{t.newsletterSuccessTitle}</h3>
              <p className="text-gray-300 text-lg mb-2">{t.newsletterSuccessBody}</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletterEmailPlaceholder}
                  className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.newsletterBtnLoading : t.newsletterBtn}
                </button>
              </form>

              {/* Privacy Badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-gray-600" />
                  <span>{t.newsletterNoSpam}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-gray-600" />
                  <span>{t.newsletterUseful}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
