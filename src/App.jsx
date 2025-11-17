import { useEffect, useMemo, useState } from 'react'
import fallbackData from './data/listings-fallback.json'
import './App.css'

const services = [
  {
    title: 'Property Sales',
    description:
      'Expert guidance through every step of buying or selling your property. We handle negotiations, paperwork, and ensure the best deal for you.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    title: 'Property Valuation',
    description: 'Accurate market analysis and valuations with the latest neighborhood data so you can price with confidence.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    title: 'Investment Consulting',
    description: 'Strategic advice for income properties, 1031 exchanges, and portfolio diversification tailored to your goals.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: 'Property Management',
    description: 'Tenant screening, rent collection, and maintenance coordination handled by our dedicated management team.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
  {
    title: '24/7 Support',
    description: 'Questions pop up anytime. Our concierge-style support team is available day and night.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    title: 'Legal Assistance',
    description: 'We partner with trusted attorneys to review contracts, disclosures, and closing documents.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  }
]

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Home Buyer',
    initials: 'SM',
    text: 'Exceptional service from start to finish! The team helped us find our dream home and made the entire process seamless.'
  },
  {
    name: 'James Davis',
    role: 'Property Seller',
    initials: 'JD',
    text: 'Sold our property above asking price in just two weeks. Their marketing strategy and negotiation skills are outstanding.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'First-Time Buyer',
    initials: 'ER',
    text: 'As a first-time buyer, I was nervous about the process. They guided me through every step and answered every question.'
  },
  {
    name: 'Robert Wilson',
    role: 'Investor',
    initials: 'RW',
    text: 'Invested in multiple properties through them. Their market insights and investment advice have been invaluable.'
  },
  {
    name: 'Lisa Thompson',
    role: 'Home Buyer',
    initials: 'LT',
    text: 'The attention to detail and personalized service exceeded all expectations. They truly care about their clients.'
  },
  {
    name: 'Michael Chen',
    role: 'Relocating Professional',
    initials: 'MC',
    text: 'Relocated from another state and they made finding a home so easy with virtual tours and proactive communication.'
  }
]

const bedroomOptions = [
  { label: 'Any Bedrooms', value: '' },
  { label: 'Studio', value: '0' },
  { label: '1+ Bedrooms', value: '1' },
  { label: '2+ Bedrooms', value: '2' },
  { label: '3+ Bedrooms', value: '3' },
  { label: '4+ Bedrooms', value: '4' },
  { label: '5+ Bedrooms', value: '5' }
]

const priceOptions = [
  { label: 'Any Price', value: '' },
  { label: 'Under $300K', value: '0-300000' },
  { label: '$300K - $500K', value: '300000-500000' },
  { label: '$500K - $750K', value: '500000-750000' },
  { label: '$750K - $1M', value: '750000-1000000' },
  { label: 'Over $1M', value: '1000000-999999999' }
]

const sortOptions = [
  { label: 'Sort By', value: 'default' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Size: Largest First', value: 'sqft-high' },
  { label: 'Newest First', value: 'newest' }
]

const agentProfile = {
  name: 'Raman Dhiman',
  designation: 'Broker',
  brokerage: 'RE/MAX Gold Realty Inc., Brokerage',
  serviceArea: 'Serving Brampton • Mississauga • GTA',
  licenseNote: 'Each Office Independently Owned and Operated.',
  phone: '647-618-7512',
  officePhone: '905-456-1010',
  officePhoneAlt: '905-673-8900',
  email: 'realtor.rdhiman@gmail.com',
  address: '2720 North Park Drive #50, Brampton, ON L6S 0E9'
}

const formatPhoneLink = (value) => (value ? `tel:${value.replace(/\D/g, '')}` : undefined)

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value)

const buildListingsUrls = () => {
  const basePath = import.meta.env.BASE_URL ?? '/'
  const baseWithSlash = basePath.endsWith('/') ? basePath : `${basePath}/`
  const relativePath = `${baseWithSlash}listings.json`
  const urlSet = new Set()

  if (typeof window !== 'undefined') {
    try {
      urlSet.add(new URL(relativePath, window.location.href).toString())
    } catch {
      // ignore URL errors
    }
    try {
      urlSet.add(new URL('listings.json', window.location.href).toString())
    } catch {
      // ignore URL errors
    }
  }

  urlSet.add(relativePath)
  urlSet.add(`${baseWithSlash.replace(/^\.\//, '')}listings.json`)
  urlSet.add('./listings.json')
  urlSet.add('/listings.json')
  urlSet.add('listings.json')

  return Array.from(urlSet).filter(Boolean)
}

const fetchListingsData = async () => {
  const candidateUrls = buildListingsUrls()
  let lastError

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, {
        cache: 'no-cache'
      })
      if (response.ok) {
        return response.json()
      }
      lastError = new Error(`Failed to load listings from ${url}: ${response.status}`)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('Unable to load listings data')
}

function App() {
  const [realtor, setRealtor] = useState(fallbackData.realtor)
  const [listings, setListings] = useState(fallbackData.listings || [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [bedroomsFilter, setBedroomsFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [selectedListing, setSelectedListing] = useState(null)
  const [formStatus, setFormStatus] = useState('idle')
  const [navScrolled, setNavScrolled] = useState(false)
  const [usingFallbackData, setUsingFallbackData] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:'
  const realtorDetails = { ...agentProfile, ...(realtor || {}) }
  const primaryPhone = realtorDetails.phone || realtorDetails.phonePrimary
  const primaryPhoneLink = formatPhoneLink(primaryPhone)
  const logoUrl = realtorDetails.logo || realtorDetails.logoUrl
  const navItems = [
    { href: '#listings', label: 'Listings' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' }
  ]

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await fetchListingsData()
        setRealtor(data.realtor)
        setListings(data.listings)
        setUsingFallbackData(false)
        setError('')
      } catch (err) {
        setError(err.message || 'Error loading listings')
        console.error('[Listings]', err)
        if (fallbackData?.listings?.length) {
          setRealtor(fallbackData.realtor)
          setListings(fallbackData.listings)
          setUsingFallbackData(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedListing ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedListing])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.fade-in-up')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading, listings.length])

  const propertyTypes = useMemo(() => {
    const values = Array.from(new Set(listings.map((listing) => listing.type))).sort()
    return ['House', 'Condo', 'Townhouse', 'Loft', 'Studio', 'Penthouse', 'Duplex', ...values]
      .filter((value, index, array) => array.indexOf(value) === index)
      .sort()
  }, [listings])

  const filteredListings = useMemo(() => {
    let data = [...listings]

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()
      data = data.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.address.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          (listing.features && listing.features.some((feature) => feature.toLowerCase().includes(query)))
      )
    }

    if (typeFilter) {
      data = data.filter((listing) => listing.type === typeFilter)
    }

    if (bedroomsFilter !== '') {
      const minBedrooms = Number(bedroomsFilter)
      data = data.filter((listing) => listing.bedrooms >= minBedrooms)
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number)
      data = data.filter((listing) =>
        max === 999999999 ? listing.price >= min : listing.price >= min && listing.price <= max
      )
    }

    switch (sortOption) {
      case 'price-low':
        data.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        data.sort((a, b) => b.price - a.price)
        break
      case 'sqft-high':
        data.sort((a, b) => b.sqft - a.sqft)
        break
      case 'newest':
        data.sort((a, b) => b.yearBuilt - a.yearBuilt)
        break
      default:
        break
    }

    return data
  }, [listings, searchTerm, typeFilter, bedroomsFilter, priceFilter, sortOption])

  const handleClearFilters = () => {
    setSearchTerm('')
    setTypeFilter('')
    setBedroomsFilter('')
    setPriceFilter('')
    setSortOption('default')
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    setFormStatus('success')
    event.target.reset()
    setTimeout(() => setFormStatus('idle'), 4000)
  }

  const resultsText =
    filteredListings.length > 0
      ? `Showing ${filteredListings.length} ${filteredListings.length === 1 ? 'property' : 'properties'}`
      : 'No properties match your filters – try adjusting search criteria.'

  return (
    <div className="app">
      <div className="nav-top-bar">
        <div className="nav-brokerage">{realtorDetails.brokerage}</div>
        <div className="nav-top-links">
          {primaryPhone && (
            <a href={primaryPhoneLink} aria-label="Call Raman Dhiman">
              📞 {primaryPhone}
            </a>
          )}
          {realtorDetails.email && (
            <>
              <span>•</span>
              <a href={`mailto:${realtorDetails.email}`} aria-label="Email Raman Dhiman">
                ✉️ {realtorDetails.email}
              </a>
            </>
          )}
        </div>
      </div>
      <nav className={`navbar ${navScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="nav-brand">
              {logoUrl ? (
                <img src={logoUrl} alt={`${realtorDetails.name} logo`} className="brand-logo" />
              ) : (
                <div className="brand-icon">RD</div>
              )}
              <div>
                <div className="brand-title">{realtorDetails.name}</div>
                <div className="brand-tagline">{realtorDetails.designation}</div>
              </div>
            </div>
            <button
              className={`nav-toggle ${menuOpen ? 'open' : ''}`}
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="nav-cta">
              {primaryPhone && (
                <a className="btn btn-primary btn-pill" href={primaryPhoneLink}>
                  Call Raman
                </a>
              )}
              <a className="btn btn-outline btn-pill" href="#contact">
                Book a Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero fade-in-up">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <p className="hero-tagline">{realtorDetails.brokerage}</p>
            <h1 className="hero-title">Move with confidence with {realtorDetails.name}</h1>
            <p className="hero-subtitle">
              {realtorDetails.serviceArea || 'Personalized guidance for buyers, sellers, and investors across the GTA.'}
            </p>
            <div className="hero-actions">
              <a href="#listings" className="btn btn-primary">
                View Listings
              </a>
              {primaryPhone && (
                <a href={primaryPhoneLink} className="btn btn-outline">
                  Call {realtorDetails.name.split(' ')[0]}
                </a>
              )}
            </div>
            <div className="hero-agent-card">
              <div className="agent-name">{realtorDetails.name}</div>
              <div className="agent-title">{realtorDetails.designation}</div>
              {primaryPhone && (
                <div className="agent-contact">
                  <span>Direct:</span> <a href={primaryPhoneLink}>{primaryPhone}</a>
                </div>
              )}
              {realtorDetails.officePhone && (
                <div className="agent-contact">
                  <span>Office:</span>{' '}
                  <a href={formatPhoneLink(realtorDetails.officePhone)}>{realtorDetails.officePhone}</a>
                </div>
              )}
              {realtorDetails.licenseNote && <p className="agent-license">{realtorDetails.licenseNote}</p>}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="listings" className="listings-section fade-in-up">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Featured Properties</span>
              <h2>Curated homes for modern living</h2>
              <p>Explore luxury homes, investment properties, and hidden gems across the city.</p>
            </div>

            <div className="search-filters">
              <div className="search-bar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title, address, or features..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="filter-controls">
                <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="filter-select">
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select value={bedroomsFilter} onChange={(event) => setBedroomsFilter(event.target.value)} className="filter-select">
                  {bedroomOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)} className="filter-select">
                  {priceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className="filter-select">
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button type="button" className="btn-clear" onClick={handleClearFilters}>
                  Clear Filters
                </button>
              </div>
              <div className="results-count">
                <span>
                  {filteredListings.length > 0 ? (
                    <>
                      Showing <strong>{filteredListings.length}</strong> properties
                    </>
                  ) : (
                    <strong>{resultsText}</strong>
                  )}
                </span>
                {usingFallbackData && (
                  <div className="info-state">
                    Showing offline fallback data. Start a local server (for example, <code>npm run dev</code> or
                    <code>npx serve dist</code>) so the latest <code>public/listings.json</code> file can be loaded.
                  </div>
                )}
              </div>
            </div>

            {loading && <p className="loading">Loading listings...</p>}
            {error && !loading && (
              <div className="error-state">
                <p>{error}</p>
                {isFileProtocol && (
                  <p>
                    Browsers block `fetch` when a site is opened directly from the file system. Please run{' '}
                    <code>npm run dev</code> (or serve the <code>dist</code> folder with any static server) so the data
                    file can be requested over HTTP.
                  </p>
                )}
              </div>
            )}

            <div className="listings-grid">
              {!loading && filteredListings.length === 0 && <p className="empty-state">{resultsText}</p>}
              {filteredListings.map((listing) => (
                <article key={listing.id} className="listing-card fade-in-up" onClick={() => setSelectedListing(listing)}>
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="listing-image"
                    onError={(event) => {
                      event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
                    }}
                  />
                  <div className="listing-content">
                    <div className="listing-header">
                      <div className="listing-price">{formatPrice(listing.price)}</div>
                      <span className="listing-type">{listing.type}</span>
                    </div>
                    <h3 className="listing-title">{listing.title}</h3>
                    <div className="listing-address">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {listing.address}
                    </div>
                    <p className="listing-description">{listing.description}</p>
                    <div className="listing-details">
                      <div className="listing-detail">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>{listing.bedrooms} Bed</span>
                      </div>
                      <div className="listing-detail">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="9" y1="3" x2="9" y2="21" />
                        </svg>
                        <span>{listing.bathrooms} Bath</span>
                      </div>
                      <div className="listing-detail">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{formatNumber(listing.sqft)} sqft</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services-section fade-in-up">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Services</span>
              <h2>Full-service real estate, modernized</h2>
              <p>We handle everything from pricing strategy and marketing through closing day (and beyond).</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section fade-in-up">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <span className="section-tag">About Us</span>
                <h2>Your trusted real estate partner</h2>
                <p className="lead">
                  With over 15 years of experience, we have built a reputation for excellence, integrity, and results. Our
                  team combines deep market expertise with modern technology to deliver an elevated buying and selling
                  experience.
                </p>

                <div className="about-features">
                  {[
                    {
                      title: 'Proven Track Record',
                      text: 'Closed 500+ transactions with a 98% satisfaction rate.',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )
                    },
                    {
                      title: 'Expert Team',
                      text: 'Certified agents with deep neighborhood knowledge.',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <circle cx="9" cy="7" r="4" />
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        </svg>
                      )
                    },
                    {
                      title: 'Full Transparency',
                      text: 'Clear communication and honest guidance at every step.',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Market Leadership',
                      text: 'Consistently ranked among the top agencies in the region.',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                      )
                    }
                  ].map((feature) => (
                    <div key={feature.title} className="about-feature">
                      <div className="feature-icon">{feature.icon}</div>
                      <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="stats">
                  {[
                    { label: 'Active Listings', value: listings.length ? `${listings.length}` : '0' },
                    { label: 'Happy Clients', value: '500+' },
                    { label: 'Years Experience', value: '15+' },
                    { label: 'Satisfaction Rate', value: '98%' }
                  ].map((stat) => (
                    <div key={stat.label} className="stat-item">
                      <div className="stat-number" data-value={stat.value}>
                        {stat.value}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-section fade-in-up">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Testimonials</span>
              <h2>What our clients say</h2>
              <p>We are proud to partner with amazing clients and deliver exceptional results.</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="testimonial-card">
                  <div className="testimonial-rating">★★★★★</div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.initials}</div>
                    <div>
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section fade-in-up">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Contact</span>
              <h2>Let us open the door for you</h2>
              <p>Call, email, or send us a note and our team will respond within one business day.</p>
            </div>
            <div className="contact-wrapper">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <ul className="contact-list">
                      {primaryPhone && (
                        <li>
                          <span>Direct:</span> <a href={primaryPhoneLink}>{primaryPhone}</a>
                        </li>
                      )}
                      {realtorDetails.officePhone && (
                        <li>
                          <span>Office:</span>{' '}
                          <a href={formatPhoneLink(realtorDetails.officePhone)}>{realtorDetails.officePhone}</a>
                        </li>
                      )}
                      {realtorDetails.officePhoneAlt && (
                        <li>
                          <span>Office 2:</span>{' '}
                          <a href={formatPhoneLink(realtorDetails.officePhoneAlt)}>{realtorDetails.officePhoneAlt}</a>
                        </li>
                      )}
                    </ul>
                    <span className="contact-note">Always available for calls or WhatsApp</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>
                      <a href={`mailto:${realtorDetails.email}`}>{realtorDetails.email}</a>
                    </p>
                    <span className="contact-note">We respond within 24 hours</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3>Address</h3>
                    <p>{realtorDetails.address}</p>
                    <span className="contact-note">Visit our boutique office</span>
                  </div>
                </div>
              </div>

              <div className="contact-form-wrapper">
                <h3>Send us a message</h3>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="form-name">Name</label>
                      <input id="form-name" name="name" type="text" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email">Email</label>
                      <input id="form-email" name="email" type="email" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="form-phone">Phone</label>
                      <input id="form-phone" name="phone" type="tel" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-subject">Subject</label>
                      <select id="form-subject" name="subject" required defaultValue="">
                        <option value="" disabled>
                          Select a subject
                        </option>
                        <option value="buying">Buying a Property</option>
                        <option value="selling">Selling a Property</option>
                        <option value="renting">Renting</option>
                        <option value="investment">Investment Consultation</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-message">Message</label>
                    <textarea id="form-message" name="message" rows="5" required />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                  {formStatus === 'success' && (
                    <div className="form-message-success">Thank you! Your message has been sent successfully.</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 2L4 8V24L16 30L28 24V8L16 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{realtorDetails.name}</span>
            </div>
            <p>&copy; {new Date().getFullYear()} {realtorDetails.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedListing && (
        <div className="modal" onClick={() => setSelectedListing(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedListing(null)}>
              &times;
            </button>
            <img
              src={selectedListing.image}
              alt={selectedListing.title}
              className="modal-image"
              onError={(event) => {
                event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
              }}
            />
            <div className="modal-header">
              <h2 className="modal-title">{selectedListing.title}</h2>
              <div className="modal-address">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedListing.address}
              </div>
              <div className="modal-price">{formatPrice(selectedListing.price)}</div>
            </div>
            <div className="modal-details-grid">
              <div className="modal-detail-item">
                <div className="modal-detail-label">Bedrooms</div>
                <div className="modal-detail-value">{selectedListing.bedrooms}</div>
              </div>
              <div className="modal-detail-item">
                <div className="modal-detail-label">Bathrooms</div>
                <div className="modal-detail-value">{selectedListing.bathrooms}</div>
              </div>
              <div className="modal-detail-item">
                <div className="modal-detail-label">Square Feet</div>
                <div className="modal-detail-value">{formatNumber(selectedListing.sqft)}</div>
              </div>
              <div className="modal-detail-item">
                <div className="modal-detail-label">Type</div>
                <div className="modal-detail-value">{selectedListing.type}</div>
              </div>
              <div className="modal-detail-item">
                <div className="modal-detail-label">Year Built</div>
                <div className="modal-detail-value">{selectedListing.yearBuilt}</div>
              </div>
            </div>
            <div className="modal-description">
              <h3>Property Overview</h3>
              <p>{selectedListing.description}</p>
            </div>
            {selectedListing.features && (
              <div className="modal-features">
                <h3>Key Features</h3>
                <div className="features-grid">
                  {selectedListing.features.map((feature) => (
                    <span key={feature} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

