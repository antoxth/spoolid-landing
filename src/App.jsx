import { useState, useEffect } from 'react'
import {
  Tag,
  Scale,
  Smartphone,
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
  CreditCard,
  Award,
  Clock,
  Database
} from 'lucide-react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [makerCount, setMakerCount] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  // Initial animated counter effect (slower)
  useEffect(() => {
    const targetCount = 127
    const duration = 4000 // 4 seconds - more relaxed animation
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

  // Periodic increment effect - simulate new signups in real-time
  useEffect(() => {
    const incrementInterval = setInterval(() => {
      setMakerCount(prev => prev + 1)
    }, Math.random() * 5000 + 5000) // Random between 5-10 seconds

    return () => clearInterval(incrementInterval)
  }, [])

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Using Web3Forms - free email collection service
    const formData = new FormData()
    formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY') // User will replace this
    formData.append('email', email)
    formData.append('subject', 'New SpoolID Waitlist Signup')
    formData.append('from_name', 'SpoolID Landing Page')

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
      q: "Do I need expensive equipment?",
      a: "No! Any kitchen scale (€10-20) and cheap NFC tags (€0.10 each) work perfectly. You probably already have a scale at home."
    },
    {
      q: "Does it work with my 3D printer?",
      a: "Yes! SpoolID works with ALL 3D printers and ALL filament brands. It's printer-agnostic - you just weigh and scan."
    },
    {
      q: "How accurate is the weight tracking?",
      a: "Down to the gram! Unlike slicers that estimate based on theoretical flow rates, SpoolID uses real physical weight measurements."
    },
    {
      q: "What happens after I join the waitlist?",
      a: "You'll get early access to the beta app, 3 months of PRO features free, and direct input on features we build."
    }
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-orange to-orange-500 bg-clip-text text-transparent">
                SpoolID
              </h1>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How it works
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#waitlist" className="btn-secondary">
                Join Beta - Limited Spots
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
                href="#features"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#waitlist"
                className="block px-3 py-2 text-brand-blue hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Beta
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
                <p className="text-brand-blue font-semibold text-sm">🚀 Launching Soon - Beta Access Available</p>
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Save <span className="text-brand-orange">€200+</span> in wasted filament every month
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Track <span className="text-brand-orange font-semibold">unlimited spools</span> with{' '}
                <span className="text-brand-blue font-semibold">NFC Tags</span> and{' '}
                <span className="text-brand-blue font-semibold">Real Weight</span>.
                Setup in under <strong className="text-white">2 minutes</strong>. Works with <strong className="text-white">50+ brands</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                <a href="#waitlist" className="btn-primary inline-block">
                  Get Early Access - Limited Spots
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users size={18} className="text-brand-orange" />
                  <span><strong className="text-white">{makerCount}</strong> makers already joined</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Mockup - SpoolID App */}
            <div className="relative">
              <img
                src="/images/hero-app-screenshot.jpg"
                alt="SpoolID app interface showing PLA Red filament at 342g with progress bar and spool tracking"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-4 border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl text-gray-300 italic leading-relaxed">
            "Finally, no more failed prints because I ran out of filament! SpoolID saved me hours and hundreds of euros."
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-lg">
              <img
                src="/images/strd-logo.png"
                alt="STRD 3D Lab logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Antonio</p>
              <p className="text-sm text-gray-500">STRD 3D Lab, Avellino</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 bg-gradient-to-r from-brand-orange/10 to-brand-blue/10 border-y border-brand-orange/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-orange mb-2">50+</div>
              <div className="text-sm text-gray-400">Brands Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">2min</div>
              <div className="text-sm text-gray-400">Quick Setup</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange mb-2">€0.10</div>
              <div className="text-sm text-gray-400">Cost per Tag</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">1g</div>
              <div className="text-sm text-gray-400">Precision</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            Why Spreadsheets & Slicers Fail
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Failed Print Image */}
            <div className="card-glow text-center">
              {/* Real image of failed print */}
              <img
                src="/images/failed-print.jpg"
                alt="Failed 3D print - filament ran out mid-print"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="inline-block p-4 bg-red-500/10 rounded-full mb-4">
                <AlertTriangle size={40} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Slicers Lie</h3>
              <p className="text-gray-400">
                Theoretical estimates drift over time. You end up with failed prints due to runouts.
              </p>
            </div>

            {/* Card 2 - Spreadsheet Image */}
            <div className="card-glow text-center">
              {/* Real image of Excel spreadsheet */}
              <img
                src="/images/spreadsheet.jpg"
                alt="Complex Excel spreadsheet for filament inventory tracking"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="inline-block p-4 bg-yellow-500/10 rounded-full mb-4">
                <FileSpreadsheet size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Spreadsheets are Slow</h3>
              <p className="text-gray-400">
                Manual entry kills productivity. You need something instant.
              </p>
            </div>

            {/* Card 3 - Spool Pile Image */}
            <div className="card-glow text-center">
              {/* Real image of stacked filament spools */}
              <img
                src="/images/spool-pile.jpg"
                alt="Stack of partially-used filament spools - the graveyard of spools"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4">
                <Ghost size={40} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3">The Graveyard of Spools</h3>
              <p className="text-gray-400">
                You have dozens of partial spools but don't know if they are enough for the next print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / How it Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-16">
            Precision Inventory in 3 Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 - NFC Tag Image */}
            <div className="text-center">
              {/* Real image of NFC tag on filament bag */}
              <img
                src="/images/nfc-tag.jpg"
                alt="NFC tag on filament bag - finger touching the tag"
                className="w-full h-56 object-cover rounded-lg mb-6"
              />
              <div className="relative mb-6 -mt-12">
                <div className="inline-block p-6 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl shadow-xl">
                  <Tag size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Tag It</h3>
              <p className="text-gray-400">
                Stick a cheap NFC tag on your filament bag or spool.
              </p>
            </div>

            {/* Step 2 - Spool on Scale Image */}
            <div className="text-center">
              {/* Real image of spool on kitchen scale */}
              <img
                src="/images/spool-scale.jpg"
                alt="Filament spool on digital kitchen scale showing weight measurement"
                className="w-full h-56 object-cover rounded-lg mb-6"
              />
              <div className="relative mb-6 -mt-12">
                <div className="inline-block p-6 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl shadow-xl">
                  <Scale size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Weigh It</h3>
              <p className="text-gray-400">
                Place the spool on any kitchen scale after printing.
              </p>
            </div>

            {/* Step 3 - Scan */}
            <div className="text-center">
              <img
                src="/images/phone-scanning.jpg"
                alt="Hand holding phone scanning NFC tag on red PLA filament spool with SpoolID app showing 342g"
                className="w-full h-56 object-cover rounded-lg mb-6"
              />
              <div className="relative mb-6 -mt-12">
                <div className="inline-block p-6 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl shadow-xl">
                  <Smartphone size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Scan It</h3>
              <p className="text-gray-400">
                Tap with your phone. The app subtracts the empty spool weight automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secret Sauce */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-glow">
            <div className="inline-block p-4 bg-gradient-to-br from-brand-blue to-cyan-600 rounded-full mb-6">
              <Database size={48} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-blue to-cyan-400 bg-clip-text text-transparent">
              We know your spool's weight.
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Our <span className="text-brand-blue font-semibold">Master Database</span> contains
              empty spool tare weights for hundreds of brands (Sunlu, eSun, Polymaker, and more).
              We do the math so you get the real filament weight.
            </p>
            {/* Brand logos grid */}
            <img
              src="/images/brand-logos.png"
              alt="Supported filament brands: SUNLU, eSUN, Polymaker, Prusament, HATCHBOX, OVERTURE, Amolen, ERYONE, CREALITY, MatterHackers"
              className="w-full max-w-3xl mx-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-16">
            What You'll Get as a Beta User
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex-shrink-0">
                <Award className="text-brand-orange" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Early Access</h3>
                <p className="text-gray-400">Be among the first to use SpoolID before public launch</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex-shrink-0">
                <Zap className="text-brand-orange" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">3 Months PRO Free</h3>
                <p className="text-gray-400">Full access to premium features worth €30</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex-shrink-0">
                <Users className="text-brand-blue" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Shape the Product</h3>
                <p className="text-gray-400">Direct input on features we build next</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex-shrink-0">
                <CheckCircle2 className="text-brand-blue" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Priority Support</h3>
                <p className="text-gray-400">Get help faster with dedicated beta support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-16">
            Frequently Asked Questions
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

      {/* Footer / CTA */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full mb-6">
            <p className="text-brand-orange font-semibold text-sm">⚡ LIMITED BETA - Only 300 Spots Available</p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Launch your Farm into the future.
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the waitlist to get <span className="text-brand-orange font-semibold">3 months of PRO plan</span> for free.
          </p>

          {/* Progress Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Beta spots filled</span>
              <span className="text-brand-orange font-semibold">
                {makerCount}/300
              </span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-orange to-orange-500 transition-all duration-500"
                style={{ width: `${Math.min((makerCount / 300) * 100, 100)}%` }}
              />
            </div>
          </div>

          {submitSuccess ? (
            <div className="max-w-xl mx-auto p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-500 mb-2">You're on the list! 🎉</h3>
              <p className="text-gray-400">We'll notify you as soon as beta spots open up.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
                {/* Web3Forms Auto-Reply Configuration - See AUTO_REPLY_SETUP.md */}
                <input type="hidden" name="subject" value="New SpoolID Beta Signup 🎯" />
                <input type="hidden" name="from_name" value="SpoolID Beta" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Joining...' : 'Secure Your Spot'}
                </button>
              </form>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-gray-600" />
                  <span>Your email is safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-gray-600" />
                  <span>100% free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-gray-600" />
                  <span>No credit card required</span>
                </div>
              </div>
            </>
          )}

          <p className="text-sm text-gray-500 mt-4">
            <Users size={14} className="inline mr-1" />
            Join <strong className="text-white">{makerCount} makers</strong> who already secured their spot
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2026 SpoolID. Built for makers, by makers.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
