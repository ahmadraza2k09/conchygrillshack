import { useState, useEffect, useRef } from 'react'
import logoImg from './imports/image.png'

const WHATSAPP_URL =
  'https://wa.me/16494430115?text=Hi%20Chef%20Conchy%2C%20I%27d%20like%20to%20book%20a%20private%20dining%20experience.'

// Unsplash image helpers — external URLs, no import needed
const IMG = {
  hero:         'https://images.unsplash.com/photo-1565060803093-639802840a50?w=1800&h=1100&fit=crop&auto=format',
  chef:         'https://images.unsplash.com/photo-1723240906605-1f0ed36b5efb?w=900&h=1100&fit=crop&auto=format',
  dinner:       'https://images.unsplash.com/photo-1760533536461-714a23877e2d?w=900&h=1100&fit=crop&auto=format',
  grilledFish:  'https://images.unsplash.com/photo-1551014700-0ca41391f312?w=1000&h=750&fit=crop&auto=format',
  galChef:      'https://images.unsplash.com/photo-1556814901-18c866c057da?w=900&h=620&fit=crop&auto=format',
  galConch:     'https://images.unsplash.com/photo-1542211059-eed9619fb997?w=500&h=620&fit=crop&auto=format',
  galBBQ:       'https://images.unsplash.com/photo-1572173838181-589fc8c0a10a?w=500&h=620&fit=crop&auto=format',
  galDinner:    'https://images.unsplash.com/photo-1746138394984-5691db44df00?w=500&h=620&fit=crop&auto=format',
  galSunset:    'https://images.unsplash.com/photo-1760539631696-3d29372b6197?w=900&h=620&fit=crop&auto=format',
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'About',    href: '#about' },
    { label: 'Packages', href: '#packages' },
    { label: 'Menu',     href: '#menu' },
    { label: 'Gallery',  href: '#gallery' },
    { label: 'Find Us',  href: '#location' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,253,249,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,181,27,0.18)' : 'none',
        boxShadow: scrolled ? '0 6px 28px -12px rgba(77,39,21,0.22)' : 'none',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2"
            style={{ borderColor: scrolled ? '#F5B51B' : 'rgba(245,181,27,0.7)' }}
          >
            <img src={logoImg} alt="Conchy Conchy logo" className="w-full h-full object-cover" />
          </div>
          <div className="leading-tight">
            <span
              className="block font-bold tracking-wide"
              style={{ fontFamily: "'Cinzel', serif", color: scrolled ? '#4D2715' : '#FFFDF9', fontSize: '0.78rem' }}
            >
              Conchy Conchy
            </span>
            <span
              className="block tracking-[0.18em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: scrolled ? '#F5B51B' : 'rgba(245,181,27,0.9)', fontSize: '0.6rem' }}
            >
              Grill Shack
            </span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: scrolled ? '#2B2B2B' : 'rgba(255,253,249,0.88)' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#F5B51B' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = scrolled ? '#2B2B2B' : 'rgba(255,253,249,0.88)' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.03]"
          style={{ fontFamily: "'DM Sans', sans-serif", background: '#E57B1A', color: '#FFFDF9', borderRadius: '2px', letterSpacing: '0.04em' }}
        >
          Book on WhatsApp
        </a>

        <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <div className="w-6 flex flex-col gap-1.5">
            {[0, 1, 2].map(i => (
              <span key={i} className="block h-px transition-all duration-300"
                style={{ background: scrolled ? '#2B2B2B' : '#FFFDF9', width: i === 1 ? '70%' : '100%' }} />
            ))}
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t" style={{ background: '#FFFDF9', borderColor: 'rgba(245,181,27,0.2)' }}>
          <ul className="px-6 py-4 flex flex-col gap-4">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}
                  className="block text-sm tracking-wide"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', fontWeight: 500 }}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-2 px-5 py-2.5 text-sm font-medium"
                style={{ background: '#E57B1A', color: '#FFFDF9', borderRadius: '2px' }}>
                Book on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Real background image */}
      <img
        src={IMG.hero}
        alt="Turquoise Caribbean waters at Sapodilla Bay"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay — dark at top & bottom for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0d06]/55 via-transparent to-[#1a0d06]/88" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <h1
            className="fade-up delay-100 text-[#FFFDF9] leading-[1.05] mb-6"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}
          >
            Grilling On<br />
            The Beach
          </h1>
          <p
            className="fade-up delay-200 text-[#F6F1E7]/85 mb-2"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300, letterSpacing: '0.02em' }}
          >
            We Cook, You Celebrate.
          </p>
          <p
            className="fade-up delay-300 mb-12"
            style={{ fontFamily: "'Cinzel', serif", color: '#F5B51B', opacity: 0.85, fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', letterSpacing: '0.08em' }}
          >
            Exquisite Dining. Unforgettable Moments.
          </p>
          <div className="fade-up delay-500 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ background: '#E57B1A', color: '#FFFDF9', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.534 5.857L0 24l6.335-1.506A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.782 9.782 0 01-4.988-1.366l-.357-.213-3.758.893.946-3.652-.233-.375A9.77 9.77 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/></svg>
              Book on WhatsApp
            </a>
            <a
              href="#location"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,253,249,0.35)', color: '#FFFDF9', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}
            >
              Find the Grill Shack
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2 fade-in delay-700">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#F5B51B]/60" />
        <p className="text-[#F5B51B]/60 text-xs tracking-[0.2em] uppercase"
          style={{ writingMode: 'vertical-lr', fontFamily: "'DM Sans', sans-serif" }}>
          Scroll
        </p>
      </div>
    </section>
  )
}

function About() {
  const { ref, visible } = useInView()
  return (
    <section id="about" ref={ref} className="py-24 md:py-36" style={{ background: '#FFFDF9' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#E57B1A] text-xs tracking-[0.28em] uppercase mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Est. 20+ Years
            </p>
            <h2
              className="mb-8 leading-[1.1]"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', color: '#4D2715', fontWeight: 700, letterSpacing: '0.03em' }}
            >
              Chef Conchy &amp;<br />
              <span style={{ color: '#F5B51B' }}>The Art of the Grill</span>
            </h2>
            <p className="leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', color: '#2B2B2B', fontWeight: 300, lineHeight: 1.8 }}>
              Conchy Conchy Grill Shack brings gourmet flavor to your special moments. With passion, creativity, and the freshest local ingredients, Chef Conchy delivers an elevated dining experience anywhere you are.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              {[
                { num: '20+',  label: 'Years Experience' },
                { num: '4.4★', label: 'Google Rating' },
                { num: '42',   label: 'Reviews' },
                { num: '100%', label: 'Local Recommendation' },
              ].map(c => (
                <div key={c.label} className="border-l-2 pl-4" style={{ borderColor: '#F5B51B' }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '1.8rem', color: '#4D2715', fontWeight: 700, lineHeight: 1 }}>
                    {c.num}
                  </p>
                  <p className="mt-1 text-xs tracking-wide uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', opacity: 0.6 }}>
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full aspect-[4/5] rounded-sm overflow-hidden bg-[#3a2010] card-shadow hover-lift">
              <img src={IMG.chef} alt="Chef Jerome cooking on the beach" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 mr-8 h-px" style={{ background: 'linear-gradient(to right, #F5B51B, transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Packages() {
  const { ref, visible } = useInView()
  const packages = [
    { size: 'Party of 2',  price: '$300' },
    { size: 'Party of 4',  price: '$400' },
    { size: 'Party of 6',  price: '$450' },
    { size: 'Party of 8',  price: '$750' },
    { size: 'Party of 12', price: '$1,100' },
    { size: 'Beach BBQ',   price: '$1,500' },
  ]
  const occasions = ['Anniversaries', 'Birthdays', 'Marriage Proposals', 'Special Occasions']

  return (
    <section id="packages" ref={ref} style={{ background: '#4D2715' }} className="py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#F5B51B] text-xs tracking-[0.28em] uppercase mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Private Chef Experience
            </p>
            <h2
              className="mb-12 leading-tight"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 3.2vw, 3rem)', color: '#F6F1E7', fontWeight: 700, letterSpacing: '0.04em' }}
            >
              Private Chef<br />
              <span style={{ color: '#F5B51B' }}>Packages</span>
            </h2>

            <div className="space-y-0">
              {packages.map((pkg, i) => (
                <div
                  key={pkg.size}
                  className={`flex items-center justify-between py-4 transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ borderBottom: '1px solid rgba(246,241,231,0.12)', transitionDelay: `${i * 60 + 200}ms` }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: '#F6F1E7', fontWeight: 300, fontSize: '1.05rem' }}>
                    {pkg.size}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="h-px opacity-20" style={{ width: '60px', background: '#F5B51B' }} />
                    <span style={{ fontFamily: "'Cinzel', serif", color: '#F5B51B', fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.05em' }}>
                      {pkg.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="text-xs tracking-[0.22em] uppercase mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(246,241,231,0.45)' }}>
                Perfect for
              </p>
              <div className="flex flex-wrap gap-2">
                {occasions.map(o => (
                  <span key={o} className="px-3 py-1.5 text-xs tracking-wide"
                    style={{ border: '1px solid rgba(245,181,27,0.35)', color: '#F5B51B', fontFamily: "'DM Sans', sans-serif", borderRadius: '1px' }}>
                    {o}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 p-6" style={{ border: '1px solid rgba(245,181,27,0.2)', borderRadius: '2px' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#F5B51B', opacity: 0.7 }}>
                Booking Policy
              </p>
              <ul className="space-y-2">
                {[
                  'No last-minute bookings.',
                  'Book at least two (2) days ahead.',
                  'Cancel at least two (2) days in advance.',
                  'Thank you for understanding and respecting our time.',
                ].map(p => (
                  <li key={p} className="text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(246,241,231,0.65)', fontWeight: 300, lineHeight: 1.6 }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.02]"
              style={{ background: '#F5B51B', color: '#4D2715', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}
            >
              Reserve Your Evening
            </a>
          </div>

          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-[#2B1A0D] card-shadow hover-lift">
              <img src={IMG.dinner} alt="Candlelit beach dinner table by the ocean" className="w-full h-full object-cover" />
            </div>
            <p className="mt-6 text-sm leading-relaxed"
              style={{ fontFamily: "'Cinzel', serif", color: 'rgba(246,241,231,0.4)', fontSize: '0.88rem', letterSpacing: '0.03em' }}>
              "An evening under the stars, with the ocean as your backdrop and the finest Caribbean flavors at your table."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Menu() {
  const { ref, visible } = useInView()
  const categories = [
    { name: 'From the Grill', items: ['Fresh-Caught Snapper', 'Jerk Chicken', 'Ribs', 'Shrimp'] },
    { name: 'Conch',          items: ['Conch Salad', 'Curry Conch', 'Conch Fritters'] },
    { name: 'Handheld',       items: ['Lobster Tacos', 'Fish Tacos'] },
    { name: 'From the Bar',   items: ['Rum Punch', 'Tropical Cocktails', 'Cold Beer'] },
  ]

  return (
    <section id="menu" ref={ref} className="py-24 md:py-36" style={{ background: '#F6F1E7' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`mb-16 md:mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[#E57B1A] text-xs tracking-[0.28em] uppercase mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Grill Shack
              </p>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#4D2715', fontWeight: 700, lineHeight: 1.05, letterSpacing: '0.04em' }}>
                The Menu
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', opacity: 0.45 }}>
                Pricing
              </p>
              <p style={{ fontFamily: "'Cinzel', serif", color: '#4D2715', fontSize: '1rem', letterSpacing: '0.04em' }}>
                Market Price
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#E57B1A', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                Ask at the Bar
              </p>
            </div>
          </div>
          <div className="mt-6 h-px" style={{ background: 'linear-gradient(to right, #F5B51B, transparent)' }} />
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div className={`space-y-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {categories.map(cat => (
              <div key={cat.name}>
                <h3 className="mb-4 pb-3 border-b"
                  style={{ fontFamily: "'Cinzel', serif", color: '#4D2715', fontSize: '1.1rem', fontWeight: 600, borderColor: 'rgba(77,39,21,0.15)', letterSpacing: '0.05em' }}>
                  {cat.name}
                </h3>
                <ul className="space-y-2.5">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-center gap-3"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', fontWeight: 300, fontSize: '0.98rem' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#F5B51B' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#2B1A0D] card-shadow hover-lift">
              <img src={IMG.grilledFish} alt="Fresh fish on the grill" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 p-5" style={{ background: 'rgba(77,39,21,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: "'Cinzel', serif", color: '#4D2715', fontSize: '0.88rem', lineHeight: 1.7, letterSpacing: '0.02em' }}>
                All seafood is sourced fresh daily from local Turks &amp; Caicos waters. Prices are seasonal and reflect the catch of the day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const { ref, visible } = useInView()

  const photos = [
    { src: IMG.galChef,   alt: 'Chef grilling snapper on the beach',   caption: 'Chef grilling snapper',   wide: true },
    { src: IMG.galConch,  alt: 'Fresh conch shells on the beach sand',  caption: 'Fresh conch salad',       wide: false },
    { src: IMG.galBBQ,    alt: 'Beach BBQ with open flame',             caption: 'Beach BBQ',               wide: false },
    { src: IMG.galDinner, alt: 'Couple at romantic private beach dinner', caption: 'Private dinner',         wide: false },
    { src: IMG.galSunset, alt: 'Sunset over turquoise Caribbean water',  caption: 'Sunset at Sapodilla Bay', wide: true },
  ]

  return (
    <section id="gallery" ref={ref} style={{ background: '#2B1A0D' }} className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#F5B51B] text-xs tracking-[0.28em] uppercase mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Gallery
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: '#F6F1E7', fontWeight: 700, letterSpacing: '0.04em' }}>
            Life on the Beach
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Large left — chef */}
          <div className="col-span-2 md:col-span-2 row-span-2 rounded-sm overflow-hidden bg-[#1a0d06] relative group" style={{ height: '480px' }}>
            <img src={photos[0].src} alt={photos[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{photos[0].caption}</p>
            </div>
          </div>
          {/* Top-right — conch */}
          <div className="col-span-1 rounded-sm overflow-hidden bg-[#1a0d06] relative group" style={{ height: '234px' }}>
            <img src={photos[1].src} alt={photos[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{photos[1].caption}</p>
            </div>
          </div>
          {/* BBQ */}
          <div className="col-span-1 rounded-sm overflow-hidden bg-[#1a0d06] relative group" style={{ height: '234px' }}>
            <img src={photos[2].src} alt={photos[2].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{photos[2].caption}</p>
            </div>
          </div>
          {/* Private dinner */}
          <div className="col-span-1 rounded-sm overflow-hidden bg-[#1a0d06] relative group" style={{ height: '280px' }}>
            <img src={photos[3].src} alt={photos[3].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{photos[3].caption}</p>
            </div>
          </div>
          {/* Sunset — wide */}
          <div className="col-span-2 rounded-sm overflow-hidden bg-[#1a0d06] relative group" style={{ height: '280px' }}>
            <img src={photos[4].src} alt={photos[4].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs tracking-widest uppercase text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>{photos[4].caption}</p>
            </div>
          </div>
        </div>

        {/* Instagram follow CTA */}
        <a
          href="https://instagram.com/conchyconchy2"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 p-7 md:p-8 rounded-sm transition-all duration-300 hover:bg-[rgba(245,181,27,0.04)]"
          style={{ border: '1px solid rgba(245,181,27,0.18)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs tracking-[0.22em] uppercase mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(246,241,231,0.45)' }}>
              Follow the journey
            </p>
            <p className="transition-colors group-hover:text-[#FFD95A]"
              style={{ fontFamily: "'Cinzel', serif", fontSize: '1.25rem', color: '#F5B51B', letterSpacing: '0.05em' }}>
              @conchyconchy2
            </p>
          </div>
          <span
            className="sm:ml-auto inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-[0.12em] uppercase transition-all duration-200 group-hover:gap-3"
            style={{ border: '1px solid rgba(245,181,27,0.4)', color: '#F5B51B', borderRadius: '1px', fontFamily: "'DM Sans', sans-serif" }}
          >
            Follow
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </a>
      </div>
    </section>
  )
}

function Location() {
  const { ref, visible } = useInView()
  return (
    <section id="location" ref={ref} className="py-24 md:py-36" style={{ background: '#FFFDF9' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#E57B1A] text-xs tracking-[0.28em] uppercase mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Find Us
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', color: '#4D2715', fontWeight: 700, letterSpacing: '0.04em' }}>
            Sapodilla Bay Beach
          </h2>
          <p className="mt-2" style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', opacity: 0.6, fontWeight: 300 }}>
            Providenciales, Turks &amp; Caicos
          </p>
        </div>

        <div className={`grid lg:grid-cols-[2fr_1fr] gap-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-sm overflow-hidden card-shadow"
            style={{ height: '420px', border: '1px solid rgba(77,39,21,0.12)' }}>
            <iframe
              title="Map of Conchy Conchy Grill Shack — Sapodilla Bay Beach, Providenciales, Turks & Caicos"
              src="https://maps.google.com/maps?q=Sapodilla%20Bay%20Beach%2C%20Providenciales%2C%20Turks%20and%20Caicos&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="p-7" style={{ background: '#F6F1E7', borderRadius: '2px', border: '1px solid rgba(245,181,27,0.2)' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: '3rem', color: '#F5B51B', fontWeight: 700, lineHeight: 1 }}>
                  4.4
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: '#F5B51B', fontSize: '1.2rem' }}>★★★★</span>
              </div>
              <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', opacity: 0.55, fontWeight: 300 }}>
                42 Google Reviews
              </p>
              <a href="https://www.google.com/search?q=Conchy+Conchy+Grill+Shack+Turks+Caicos"
                target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-block text-xs tracking-widest uppercase border-b transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#E57B1A', borderColor: 'rgba(229,123,26,0.3)', paddingBottom: '2px' }}>
                View on Google
              </a>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#2B2B2B', opacity: 0.4 }}>
                Address
              </p>
              <address className="not-italic leading-relaxed"
                style={{ fontFamily: "'Cinzel', serif", color: '#4D2715', fontSize: '1rem', letterSpacing: '0.03em' }}>
                Sapodilla Bay Beach<br />
                Providenciales<br />
                Turks &amp; Caicos Islands
              </address>
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:scale-[1.02]"
              style={{ background: '#E57B1A', color: '#FFFDF9', borderRadius: '2px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}>
              Get Directions via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, visible } = useInView()
  return (
    <section id="contact" ref={ref} className="py-24 md:py-36 overflow-hidden" style={{ background: '#F5B51B' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className={`grid lg:grid-cols-[1fr_1fr] gap-16 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-xs tracking-[0.28em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(77,39,21,0.6)' }}>
              Contact
            </p>
            <h2 className="leading-[1.05] mb-6"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)', color: '#4D2715', fontWeight: 700, letterSpacing: '0.04em' }}>
              Ready to<br />Reserve?
            </h2>
            <p className="max-w-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(77,39,21,0.7)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8 }}>
              No forms. No emails. Just message Chef Conchy directly on WhatsApp to reserve your private dining experience.
            </p>
          </div>

          <div className="space-y-5">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
              style={{ background: '#4D2715', borderRadius: '2px' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.534 5.857L0 24l6.335-1.506A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.782 9.782 0 01-4.988-1.366l-.357-.213-3.758.893.946-3.652-.233-.375A9.77 9.77 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/></svg>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(246,241,231,0.45)' }}>
                  WhatsApp
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", color: '#F6F1E7', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  +1 (649) 443-0115
                </p>
              </div>
            </a>

            <a href="https://instagram.com/conchyconchy2" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
              style={{ background: 'rgba(77,39,21,0.15)', border: '1px solid rgba(77,39,21,0.2)', borderRadius: '2px' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(77,39,21,0.5)' }}>
                  Instagram
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", color: '#4D2715', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  @conchyconchy2
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = [
    { label: 'About',    href: '#about' },
    { label: 'Packages', href: '#packages' },
    { label: 'Menu',     href: '#menu' },
    { label: 'Gallery',  href: '#gallery' },
    { label: 'Find Us',  href: '#location' },
  ]
  return (
    <footer style={{ background: '#1a0d06', borderTop: '1px solid rgba(245,181,27,0.12)' }} className="py-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
              style={{ borderColor: 'rgba(245,181,27,0.4)' }}>
              <img src={logoImg} alt="Conchy Conchy logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="block font-bold"
                style={{ fontFamily: "'Cinzel', serif", color: '#F6F1E7', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
                Conchy Conchy
              </span>
              <span className="block tracking-[0.18em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", color: '#F5B51B', fontSize: '0.6rem' }}>
                Grill Shack
              </span>
            </div>
          </a>

          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href}
                    className="text-xs tracking-wide transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(246,241,231,0.45)', fontWeight: 400 }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = '#F5B51B' }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(246,241,231,0.45)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {[
              { href: 'https://instagram.com/conchyconchy2', label: 'Instagram', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(245,181,27,0.7)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { href: WHATSAPP_URL, label: 'WhatsApp', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(245,181,27,0.7)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.534 5.857L0 24l6.335-1.506A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.782 9.782 0 01-4.988-1.366l-.357-.213-3.758.893.946-3.652-.233-.375A9.77 9.77 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/></svg> },
              { href: 'https://www.google.com/search?q=Conchy+Conchy+Grill+Shack+Turks+Caicos', label: 'Google Reviews', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(245,181,27,0.7)"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ border: '1px solid rgba(245,181,27,0.3)' }} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(245,181,27,0.08)' }}>
          <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(246,241,231,0.25)' }}>
            &copy; {new Date().getFullYear()} Conchy Conchy Grill Shack. All rights reserved.
          </p>
          <p className="text-xs" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,181,27,0.3)', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Sapodilla Bay, Providenciales, Turks &amp; Caicos
          </p>
        </div>
      </div>
    </footer>
  )
}

function FloatingWhatsApp({ visible }: { visible: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        background: '#25D366',
        boxShadow: '0 12px 32px -6px rgba(37,211,102,0.55)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.534 5.857L0 24l6.335-1.506A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.782 9.782 0 01-4.988-1.366l-.357-.213-3.758.893.946-3.652-.233-.375A9.77 9.77 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/></svg>
    </a>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: '#FFFDF9' }}>
      <Nav scrolled={scrolled} />
      <Hero />
      <About />
      <Packages />
      <Menu />
      <Gallery />
      <Location />
      <Contact />
      <Footer />
      <FloatingWhatsApp visible={scrolled} />
    </div>
  )
}
