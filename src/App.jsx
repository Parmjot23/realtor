import { useEffect, useMemo, useState } from 'react'
import fallbackData from './data/listings-fallback.json'
import { CalculatorModal } from './components/Calculators'
import { generatePDF } from './utils/pdfGenerator'
import './App.css'

const services = [
    {
        title: 'Property Sales',
        description:
            'Expert guidance through every step of buying or selling your property. We handle negotiations, paperwork, and ensure the best deal for you.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    {
        title: 'Property Valuation',
        description: 'Accurate market analysis and valuations with the latest neighborhood data so you can price with confidence.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        )
    },
    {
        title: 'Investment Consulting',
        description: 'Strategic advice for income properties, 1031 exchanges, and portfolio diversification tailored to your goals.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        )
    },
    {
        title: 'Property Management',
        description: 'Tenant screening, rent collection, and maintenance coordination handled by our dedicated management team.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        )
    }
]

const testimonials = [
    {
        name: 'Mandeep Arora',
        role: 'Client',
        initials: 'MA',
        text: 'I had amazing experience working with Rama! From start to finish he was very detail oriented, be it finding the open houses, inspection and deal negotiation. He has very good knowledge of areas in and around Brampton, and yes he also helped us in the mortgage. We found our dream home in 2024 and we couldn\'t be happier! Highly recommend him.'
    },
    {
        name: 'Janine Speirs',
        role: 'Real Estate Agent',
        initials: 'JS',
        text: 'I had the pleasure of working with Raman on a recent transaction where I represented the sellers and he represented the buyers. Throughout the entire process, Raman demonstrated exceptional professionalism, clear communication, and a collaborative spirit. He was proactive, respectful, and always worked diligently to ensure a smooth experience for everyone involved.'
    },
    {
        name: 'A S',
        role: 'Client',
        initials: 'AS',
        text: 'Raman helped me purchase and sell a home in a at a very good price in a rather tight market (bottom of the barrel Oct 2024). He also connected us with a mortgage broker and suggested best course of action every step of the way. He is the expert you want on your side, highly recommended!'
    },
    {
        name: 'Jaspreet Kaur Sekhon',
        role: 'Client',
        initials: 'JK',
        text: 'Best ever experience. Help you find your dream house 😊'
    }
]

const propertyCategories = [
    { label: 'Residential', description: 'Detached, Semi, and Townhomes', anchor: '#listings', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800' },
    { label: 'Condos', description: 'High-rise & Boutique living', anchor: '#listings', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
    { label: 'Commercial', description: 'Retail, Office & Industrial', anchor: '#listings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
    { label: 'Pre-Construction', description: 'VIP Access & Incentives', anchor: '#preconstruction', image: '/pre-construction.png' }
]

const calculatorTools = [
    {
        title: 'Mortgage Calculator',
        description: 'Estimate your monthly payments and compare scenarios.',
        tag: 'Popular'
    },
    {
        title: 'Land Transfer Tax',
        description: 'See Ontario & Toronto LTT with first-time buyer rebates.',
        tag: 'Ontario'
    },
    {
        title: 'CMHC Insurance',
        description: 'Understand default insurance premiums for high-ratio mortgages.',
        tag: 'CMHC'
    }
]

const visitorTools = [
    {
        title: 'New Listing Alert',
        text: 'Get listings that match your criteria the moment they hit MLS.',
        action: 'Create Alert',
        href: '#contact'
    },
    {
        title: 'School Rankings',
        text: 'Access Fraser Institute & EQAO scores to select the right neighbourhood.',
        action: 'View Rankings',
        href: 'https://www.compareschoolrankings.org/'
    },
    {
        title: 'Market Watch Report',
        text: 'Monthly TRREB stats delivered to your inbox.',
        action: 'Download Report',
        href: 'https://trreb.ca/market-data/market-watch/'
    }
]

const buyerGuides = [
    { label: 'Buyer’s Guide PDF', pdfType: 'buyerGuide' },
    { label: 'First-Time Buyer Checklist', pdfType: 'buyerChecklist' },
    { label: 'RRSP Home Buyer’s Plan', href: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html' },
    { label: 'Mortgage For Your Home', href: '#calculators' },
    { label: 'GST/HST New Housing Rebate', href: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-home-construction/new-housing-rebate.html' }
]

const sellerGuides = [
    { label: 'Seller’s Guide PDF', pdfType: 'sellerGuide' },
    { label: 'Preparing Your Home', pdfType: 'prepHome' },
    { label: 'Listing Strategy Guide', pdfType: 'listingStrategy' },
    { label: 'Market Evaluation Request', href: '#valuation' }
]

const usefulLinks = [
    { label: 'Equifax Canada', href: 'https://www.consumer.equifax.ca/personal/' },
    { label: 'Land Registry', href: 'https://www.onland.ca/ui/' },
    { label: 'Land Transfer Tax MPAC', href: 'https://www.mpac.ca/' },
    { label: 'Bank of Canada', href: 'https://www.bankofcanada.ca/' },
    { label: 'Government of Ontario', href: 'https://www.ontario.ca/' },
    { label: 'Region of Peel', href: 'https://www.peelregion.ca/' }
]

const cityLinks = [
    { label: 'City of Mississauga', href: 'https://www.mississauga.ca/' },
    { label: 'City of Toronto', href: 'https://www.toronto.ca/' },
    { label: 'City of Cambridge', href: 'https://www.cambridge.ca/' },
    { label: 'City of Kitchener', href: 'https://www.kitchener.ca/' },
    { label: 'City of Brampton', href: 'https://www.brampton.ca/' },
    { label: 'Halton Region', href: 'https://www.halton.ca/' }
]

const gtaAreas = [
    {
        title: 'Toronto Core',
        description: 'Downtown, Midtown, North York, Etobicoke, and Scarborough.',
        tag: 'Urban + Transit'
    },
    {
        title: 'West GTA',
        description: 'Brampton, Mississauga, Caledon, and surrounding Peel communities.',
        tag: 'Family-Focused'
    },
    {
        title: 'Halton & Hamilton',
        description: 'Oakville, Burlington, Milton, and emerging pockets across Halton.',
        tag: 'Lakefront + Growth'
    },
    {
        title: 'Durham & York',
        description: 'Markham, Vaughan, Richmond Hill, Pickering, Ajax, Whitby, and Oshawa.',
        tag: 'Commuter-Friendly'
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
    brokerage: 'RE/MAX Gold Realty Inc.',
    serviceArea: 'Serving Brampton • Mississauga • GTA',
    licenseNote: 'Each Office Independently Owned and Operated.',
    phone: '647-618-7512',
    officePhone: '905-456-1010',
    officePhoneAlt: '905-673-8900',
    email: 'realtor.rdhiman@gmail.com',
    address: '2720 N Park Dr Unit# 50, Brampton, ON L6S 0E9',
    photo: '/realtor-profile.png'
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

const calculateLTT = (price, address) => {
    const calculateTieredTax = (amount) => {
        let tax = 0;
        if (amount > 2000000) {
            tax += (amount - 2000000) * 0.025;
            amount = 2000000;
        }
        if (amount > 400000) {
            tax += (amount - 400000) * 0.02;
            amount = 400000;
        }
        if (amount > 250000) {
            tax += (amount - 250000) * 0.015;
            amount = 250000;
        }
        if (amount > 55000) {
            tax += (amount - 55000) * 0.01;
            amount = 55000;
        }
        if (amount > 0) {
            tax += amount * 0.005;
        }
        return tax;
    };

    const ontarioTax = calculateTieredTax(price);
    let torontoTax = 0;

    if (address && address.toLowerCase().includes('toronto')) {
        torontoTax = calculateTieredTax(price);
    }

    return { ontario: ontarioTax, toronto: torontoTax, total: ontarioTax + torontoTax };
};

const calculateCMHC = (price, downPaymentPercent) => {
    if (downPaymentPercent >= 20) return 0;

    const loanAmount = price - (price * downPaymentPercent / 100);
    let rate = 0;

    if (downPaymentPercent >= 15) rate = 0.0280;
    else if (downPaymentPercent >= 10) rate = 0.0310;
    else if (downPaymentPercent >= 5) rate = 0.0400;

    return loanAmount * rate;
};

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
    const [activeTab, setActiveTab] = useState('overview')
    const [activeCalculator, setActiveCalculator] = useState(null)

    // Mortgage calculator state
    const [downPayment, setDownPayment] = useState(20)
    const [interestRate, setInterestRate] = useState(6.5)
    const [loanTerm, setLoanTerm] = useState(30)
    const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:'
    const realtorDetails = { ...agentProfile, ...(realtor || {}) }
    const primaryPhone = realtorDetails.phone || realtorDetails.phonePrimary
    const primaryPhoneLink = formatPhoneLink(primaryPhone)
    const logoUrl = realtorDetails.logo || realtorDetails.logoUrl
    const navItems = [
        { href: '#listings', label: 'Properties' },
        { href: '#valuation', label: 'Valuation' },
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
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
            setNavScrolled(window.scrollY > 50)
        }
        handleScroll()
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
            { threshold: 0.15 }
        )

        const elements = document.querySelectorAll('.fade-in-up')
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [loading, listings.length])

    const propertyTypes = useMemo(() => {
        const values = Array.from(new Set(listings.map((listing) => listing.type))).sort()
        return ['House', 'Condo', 'Condos', 'Townhouse', 'Loft', 'Studio', 'Penthouse', 'Duplex', 'Commercial', 'Pre-Construction', ...values]
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

    const calculateMortgage = (price) => {
        const downPaymentAmount = (price * downPayment) / 100
        const cmhcFee = calculateCMHC(price, downPayment)
        const loanAmount = price - downPaymentAmount + cmhcFee
        const monthlyRate = interestRate / 100 / 12
        const numberOfPayments = loanTerm * 12

        if (monthlyRate === 0) return loanAmount / numberOfPayments

        const monthlyPayment =
            loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

        return monthlyPayment
    }

    const resultsText =
        filteredListings.length > 0
            ? `Showing ${filteredListings.length} ${filteredListings.length === 1 ? 'property' : 'properties'}`
            : 'No properties match your filters – try adjusting search criteria.'

    return (
        <div className="app">
            <div className="nav-top-bar">
                <div className="container">
                    <div className="nav-brokerage">{realtorDetails.brokerage}</div>
                    <div className="nav-top-links">
                        {primaryPhone && (
                            <a href={primaryPhoneLink} aria-label="Call Raman Dhiman">
                                <span style={{ marginRight: '0.5rem' }}>📞</span> {primaryPhone}
                            </a>
                        )}
                        {realtorDetails.email && (
                            <a href={`mailto:${realtorDetails.email}`} aria-label="Email Raman Dhiman">
                                <span style={{ marginRight: '0.5rem' }}>✉️</span> {realtorDetails.email}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <nav className={`navbar ${navScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container">
                    <div className="nav-content">
                        <a href="#" className="nav-brand">
                            {logoUrl ? (
                                <img src={logoUrl} alt={`${realtorDetails.name} logo`} className="brand-logo" />
                            ) : (
                                <div className="brand-icon">RD</div>
                            )}
                            <div className="brand-info">
                                <h1>{realtorDetails.name}</h1>
                                <div className="brand-tagline">{realtorDetails.designation}</div>
                            </div>
                        </a>

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
                            <div className="mobile-cta-container">
                                {primaryPhone && (
                                    <a className="btn btn-primary" href={primaryPhoneLink}>
                                        Call Now
                                    </a>
                                )}
                                <a className="btn btn-outline-dark" href="#contact">
                                    Book Consult
                                </a>
                            </div>
                        </div>

                        <div className="nav-cta">
                            {primaryPhone && (
                                <a className="btn btn-primary" href={primaryPhoneLink}>
                                    Call Now
                                </a>
                            )}
                            <a className="btn btn-outline-dark" href="#contact">
                                Book Consult
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="hero">
                <div className="hero-bg">
                    <div className="hero-overlay" />
                    <img src="/modern-canadian-house-v2.png" alt="Modern Urban Canadian Home" />
                </div>
                <div className="hero-container">
                    <div className="hero-content fade-in-up">
                        <div className="hero-subtitle">Experience Excellence</div>
                        <h1 className="hero-title">Move with Confidence</h1>
                        <p className="hero-description">
                            {realtorDetails.serviceArea || 'Personalized guidance for buyers, sellers, and investors across the GTA.'}
                        </p>
                        <div className="hero-actions">
                            <a href="#listings" className="btn btn-primary">
                                View Listings
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                Contact Me
                            </a>
                        </div>
                    </div>

                    <div className="hero-realtor-image-container fade-in-up">
                        <img src={realtorDetails.photo} alt={realtorDetails.name} className="hero-realtor-image" />
                    </div>
                </div>
            </header >

            <main>
                <section className="discovery-bar fade-in-up">
                    <div className="container">
                        <div className="discovery-grid">
                            {propertyCategories.map((category) => (
                                <a
                                    key={category.label}
                                    href={category.anchor}
                                    className="discovery-card"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        const filterValue = category.label === 'Residential' ? 'House' : category.label === 'Condos' ? 'Condo' : category.label
                                        if (category.label !== 'Pre-Construction') {
                                            setTypeFilter(filterValue)
                                            document.getElementById('listings').scrollIntoView({ behavior: 'smooth' })
                                        } else {
                                            document.getElementById('preconstruction').scrollIntoView({ behavior: 'smooth' })
                                        }
                                    }}
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url('${category.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="discovery-title">{category.label}</div>
                                    <p>{category.description}</p>
                                    <span>Explore →</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="visitor-tools-section fade-in-up">
                    <div className="container visitor-layout">
                        <div className="visitor-column">
                            <span className="section-tag">Visitor Tools</span>
                            <h2>Everything you need to make the right move</h2>
                            <div className="visitor-tool-cards">
                                {visitorTools.map((tool) => (
                                    <article key={tool.title} className="visitor-card">
                                        <h3>{tool.title}</h3>
                                        <p>{tool.text}</p>
                                        <a
                                            href={tool.href}
                                            className="text-link"
                                            target={tool.href?.startsWith('http') ? '_blank' : '_self'}
                                            rel={tool.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            {tool.action} →
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </div>
                        <div className="visitor-column resources-panel">
                            <div className="resource-card">
                                <h3>Buyer Resources</h3>
                                <ul className="resource-list">
                                    {buyerGuides.map((guide) => (
                                        <li key={guide.label}>
                                            {guide.pdfType ? (
                                                <button
                                                    onClick={() => generatePDF(guide.pdfType, realtorDetails)}
                                                    className="resource-link"
                                                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit', width: '100%' }}
                                                >
                                                    {guide.label}
                                                </button>
                                            ) : (
                                                <a
                                                    href={guide.href}
                                                    target={guide.href?.startsWith('http') ? "_blank" : "_self"}
                                                    rel={guide.href?.startsWith('http') ? "noopener noreferrer" : ""}
                                                    className="resource-link"
                                                >
                                                    {guide.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="resource-card">
                                <h3>Seller Resources</h3>
                                <ul className="resource-list">
                                    {sellerGuides.map((guide) => (
                                        <li key={guide.label}>
                                            {guide.pdfType ? (
                                                <button
                                                    onClick={() => generatePDF(guide.pdfType, realtorDetails)}
                                                    className="resource-link"
                                                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit', width: '100%' }}
                                                >
                                                    {guide.label}
                                                </button>
                                            ) : (
                                                <a
                                                    href={guide.href}
                                                    className="resource-link"
                                                >
                                                    {guide.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="resource-card">
                                <h3>Useful Links</h3>
                                <div className="useful-links-grid">
                                    {usefulLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="preconstruction" className="preconstruction-highlight fade-in-up">
                    <div className="container preconstruction-content">
                        <div>
                            <span className="section-tag">VIP Access</span>
                            <h2>Pre-Construction Opportunities</h2>
                            <p>
                                Gain first access to platinum launches across the GTA with extended deposit structures,
                                capped levies, and exclusive incentives tailored for investors and first-time buyers.
                            </p>
                            <div className="preconstruction-actions">
                                <a href="#contact" className="btn btn-primary">Book a VIP Preview</a>
                                <a href="#listings" className="btn btn-outline-dark">View Projects</a>
                            </div>
                        </div>
                        <div className="preconstruction-stats">
                            <div>
                                <strong>25+</strong>
                                <span>Active Projects</span>
                            </div>
                            <div>
                                <strong>12</strong>
                                <span>Builder Partnerships</span>
                            </div>
                            <div>
                                <strong>$50K+</strong>
                                <span>Average Incentives</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="calculators" className="calculators-section fade-in-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Calculators & Tools</span>
                            <h2>Plan every step with confidence</h2>
                            <p>From mortgage planning to land transfer tax, use our calculators to budget smarter.</p>
                        </div>
                        <div className="calculators-grid">
                            {calculatorTools.map((tool) => (
                                <article key={tool.title} className="calculator-card">
                                    <div className="calculator-badge">{tool.tag}</div>
                                    <h3>{tool.title}</h3>
                                    <p>{tool.description}</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
                                        onClick={() => setActiveCalculator(tool)}
                                    >
                                        Launch Tool
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="listings" className="section-bg-light fade-in-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Exclusive Properties</span>
                            <h2>Featured Listings</h2>
                            <p>Curated selection of the finest homes for sale in the area.</p>
                        </div>

                        <div className="search-bar-container">
                            <div className="search-input-group">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by address, neighborhood, or feature..."
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>

                            <div className="filter-group">
                                <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="filter-select">
                                    <option value="">All Types</option>
                                    {propertyTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)} className="filter-select">
                                    {priceOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <button type="button" className="btn btn-secondary" onClick={handleClearFilters} style={{ padding: '0.875rem 1.5rem' }}>
                                    Clear
                                </button>
                            </div>
                        </div>

                        {loading && <p className="loading">Loading listings...</p>}
                        {error && !loading && (
                            <div className="error-state">
                                <p>{error}</p>
                                {isFileProtocol && (
                                    <p>Please run <code>npm run dev</code> to view listings.</p>
                                )}
                            </div>
                        )}

                        <div className="listings-grid">
                            {!loading && filteredListings.length === 0 && <p className="empty-state">{resultsText}</p>}
                            {filteredListings.map((listing) => {
                                const status = listing.status || 'For Sale'

                                return (
                                    <article key={listing.id} className="listing-card fade-in-up" onClick={() => setSelectedListing(listing)}>
                                        <div className="listing-image-container">
                                            <div className="listing-tag">{listing.type}</div>
                                            <div className={`listing-status ${status.toLowerCase() === 'sold' ? 'sold' : ''}`}>
                                                {status}
                                            </div>
                                            <img
                                                src={listing.image}
                                                alt={listing.title}
                                                className="listing-image"
                                                onError={(event) => {
                                                    event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
                                                }}
                                            />
                                        </div>
                                        <div className="listing-content">
                                            <div className="listing-price">{formatPrice(listing.price)}</div>
                                            <h3 className="listing-title">{listing.title}</h3>
                                            <div className="listing-address">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {listing.address}
                                            </div>
                                        </div>
                                        <div className="listing-meta">
                                            <div className="meta-item">
                                                <span>{listing.bedrooms}</span> Beds
                                            </div>
                                            <div className="meta-item">
                                                <span>{listing.bathrooms}</span> Baths
                                            </div>
                                            <div className="meta-item">
                                                <span>{formatNumber(listing.sqft)}</span> SqFt
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section id="valuation" className="valuation-section fade-in-up">
                    <div className="hero-bg" style={{ opacity: 0.15 }}>
                        <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920" alt="Background" />
                    </div>
                    <div className="container valuation-content">
                        <div className="section-header">
                            <span className="section-tag">Sellers</span>
                            <h2>What is your home worth?</h2>
                            <p>Get a complimentary, comprehensive home valuation report including recent sales in your area.</p>
                        </div>
                        <a href="#contact" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Request Free Valuation
                        </a>
                    </div>
                </section>

                <section id="services" className="fade-in-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Our Expertise</span>
                            <h2>Full-Service Real Estate</h2>
                            <p>We handle everything from pricing strategy and marketing through closing day and beyond.</p>
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

                <section id="about" className="section-bg-light fade-in-up">
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-image-col">
                                <img src={realtorDetails.photo} alt={realtorDetails.name} className="about-image" />
                            </div>
                            <div className="about-content-col">
                                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem', maxWidth: '100%' }}>
                                    <span className="section-tag">About Us</span>
                                    <h2>Your Trusted Partner</h2>
                                    <p className="lead">
                                        With over 15 years of experience, we have built a reputation for excellence, integrity, and results.
                                        We combine deep market expertise with modern technology.
                                    </p>
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

                <section id="testimonials" className="fade-in-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Testimonials</span>
                            <h2>Client Success Stories</h2>
                        </div>
                        <div className="testimonials-grid">
                            {testimonials.map((testimonial) => (
                                <article key={testimonial.name} className="testimonial-card">
                                    <div className="testimonial-rating">★★★★★</div>
                                    <p className="testimonial-text">"{testimonial.text}"</p>
                                    <div className="testimonial-author">
                                        <div className="author-avatar">{testimonial.initials}</div>
                                        <div className="author-info">
                                            <h4>{testimonial.name}</h4>
                                            <div className="author-role">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="city-links-section fade-in-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Communities</span>
                            <h2>Neighbourhoods We Serve</h2>
                            <p>Local insight across Peel, Halton, Waterloo, and the GTA core.</p>
                        </div>
                        <div className="city-links-grid">
                            {cityLinks.map((city) => (
                                <a
                                    key={city.label}
                                    href={city.href}
                                    className="city-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {city.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="gta-map-section fade-in-up" id="gta">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Coverage</span>
                            <h2>We Cover the Entire GTA</h2>
                            <p>From lakefront condos to family suburbs, our team circles the Greater Toronto Area with local expertise.</p>
                        </div>

                        <div className="gta-map-grid">
                            <div className="gta-map-card">
                                <div className="map-badge">Full GTA</div>
                                <div className="map-visual">
                                    <iframe
                                        title="Greater Toronto Area Map"
                                        className="gta-map-embed"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115759.60683880196!2d-79.51814077362439!3d43.71815566222261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d16d514a8d%3A0x18b4558d58e77e7c!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1583018339155!5m2!1sen!2sus"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    <div className="map-overlay">
                                        <div className="coverage-ring" />
                                        <div className="coverage-ring secondary" />
                                        <div className="map-label">Greater Toronto Area</div>
                                    </div>
                                </div>
                            </div>

                            <div className="gta-area-list">
                                {gtaAreas.map((area) => (
                                    <article key={area.title} className="gta-area-card">
                                        <div className="area-top">
                                            <div className="area-icon" aria-hidden="true">⦿</div>
                                            <div>
                                                <h3>{area.title}</h3>
                                                <span className="area-tag">{area.tag}</span>
                                            </div>
                                        </div>
                                        <p>{area.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact-section fade-in-up">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Get in Touch</span>
                            <h2>Let's Discuss Your Goals</h2>
                            <p>Call, email, or send us a note and our team will respond within one business day.</p>
                        </div>
                        <div className="contact-wrapper">
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Phone</h3>
                                        <ul className="contact-list">
                                            {primaryPhone && (
                                                <li><a href={primaryPhoneLink}>{primaryPhone}</a></li>
                                            )}
                                            {realtorDetails.officePhone && (
                                                <li><a href={formatPhoneLink(realtorDetails.officePhone)}>Office: {realtorDetails.officePhone}</a></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <p><a href={`mailto:${realtorDetails.email}`}>{realtorDetails.email}</a></p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Address</h3>
                                        <p>{realtorDetails.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form-wrapper">
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
                                    <div className="form-group">
                                        <label htmlFor="form-phone">Phone</label>
                                        <input id="form-phone" name="phone" type="tel" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="form-message">Message</label>
                                        <textarea id="form-message" name="message" rows="4" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Send Message
                                    </button>
                                    {formStatus === 'success' && (
                                        <div className="form-message-success">Message sent successfully!</div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <span>{realtorDetails.name}</span>
                            </div>
                            <p className="footer-text">
                                Dedicated to providing exceptional service and expertise for all your real estate needs.
                            </p>
                            <p className="footer-text">{realtorDetails.brokerage}</p>
                            <img src="/remax-gold-logo.jpg" alt="RE/MAX Gold Logo" className="footer-remax-logo" />
                        </div>
                        <div className="footer-col">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li><a href="#listings">Properties</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Services</h3>
                            <ul className="footer-links">
                                <li><a href="#valuation">Home Valuation</a></li>
                                <li><a href="#">Buying a Home</a></li>
                                <li><a href="#">Selling a Home</a></li>
                                <li><a href="#">Property Management</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>Contact</h3>
                            <ul className="footer-links">
                                <li>{primaryPhone}</li>
                                <li>{realtorDetails.email}</li>
                                <li>{realtorDetails.address}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} {realtorDetails.name}. {realtorDetails.licenseNote} All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {
                selectedListing && (
                    <div className="modal" onClick={() => setSelectedListing(null)}>
                        <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                            <button type="button" className="modal-close" onClick={() => setSelectedListing(null)}>
                                &times;
                            </button>

                            <div className="modal-image-col">
                                <img
                                    src={selectedListing.image}
                                    alt={selectedListing.title}
                                    className="modal-image"
                                    onError={(event) => {
                                        event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
                                    }}
                                />
                            </div>

                            <div className="modal-info-col">
                                <div className="modal-header">
                                    <h2 className="modal-title">{selectedListing.title}</h2>
                                    <div className="modal-price">{formatPrice(selectedListing.price)}</div>
                                    <div className="modal-address">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {selectedListing.address}
                                    </div>
                                </div>

                                <div className="modal-tabs">
                                    <button
                                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('overview')}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('calculator')}
                                    >
                                        Calculator
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('contact')}
                                    >
                                        Contact
                                    </button>
                                </div>

                                {activeTab === 'overview' && (
                                    <>
                                        <div className="modal-stats-grid">
                                            <div className="modal-stat">
                                                <span className="modal-stat-value">{selectedListing.bedrooms}</span>
                                                <span className="modal-stat-label">Beds</span>
                                            </div>
                                            <div className="modal-stat">
                                                <span className="modal-stat-value">{selectedListing.bathrooms}</span>
                                                <span className="modal-stat-label">Baths</span>
                                            </div>
                                            <div className="modal-stat">
                                                <span className="modal-stat-value">{formatNumber(selectedListing.sqft)}</span>
                                                <span className="modal-stat-label">SqFt</span>
                                            </div>
                                            <div className="modal-stat">
                                                <span className="modal-stat-value">{selectedListing.type}</span>
                                                <span className="modal-stat-label">Type</span>
                                            </div>
                                        </div>

                                        <div className="modal-description">
                                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--secondary-color)' }}>Property Overview</h3>
                                            <p>{selectedListing.description}</p>
                                        </div>

                                        {selectedListing.features && (
                                            <div className="modal-features-container">
                                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--secondary-color)' }}>Key Features</h3>
                                                <div className="modal-features">
                                                    {selectedListing.features.map((feature) => (
                                                        <span key={feature} className="feature-tag">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeTab === 'calculator' && (
                                    <div className="mortgage-calculator">
                                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--secondary-color)' }}>Mortgage Calculator</h3>

                                        <div className="calculator-result">
                                            <div className="result-label">Estimated Monthly Payment</div>
                                            <div className="result-value">{formatPrice(calculateMortgage(selectedListing.price))}<span>/mo</span></div>
                                        </div>

                                        <div className="calculator-inputs">
                                            <div className="calculator-input-group">
                                                <label>Down Payment: {downPayment}%</label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    step="5"
                                                    value={downPayment}
                                                    onChange={(e) => setDownPayment(Number(e.target.value))}
                                                    className="range-slider"
                                                />
                                                <div className="input-value">{formatPrice((selectedListing.price * downPayment) / 100)}</div>
                                            </div>

                                            <div className="calculator-input-group">
                                                <label>Interest Rate: {interestRate}%</label>
                                                <input
                                                    type="range"
                                                    min="3"
                                                    max="10"
                                                    step="0.5"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                                    className="range-slider"
                                                />
                                            </div>

                                            <div className="calculator-input-group">
                                                <label>Loan Term: {loanTerm} years</label>
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="30"
                                                    step="5"
                                                    value={loanTerm}
                                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                                    className="range-slider"
                                                />
                                            </div>
                                        </div>

                                        <div className="calculator-breakdown">
                                            <div className="breakdown-item">
                                                <span>Home Price:</span>
                                                <strong>{formatPrice(selectedListing.price)}</strong>
                                            </div>
                                            <div className="breakdown-item">
                                                <span>Down Payment ({downPayment}%):</span>
                                                <strong>{formatPrice((selectedListing.price * downPayment) / 100)}</strong>
                                            </div>
                                            {calculateCMHC(selectedListing.price, downPayment) > 0 && (
                                                <div className="breakdown-item">
                                                    <span>CMHC Insurance:</span>
                                                    <strong>{formatPrice(calculateCMHC(selectedListing.price, downPayment))}</strong>
                                                </div>
                                            )}
                                            <div className="breakdown-item">
                                                <span>Loan Amount:</span>
                                                <strong>{formatPrice(selectedListing.price - (selectedListing.price * downPayment) / 100 + calculateCMHC(selectedListing.price, downPayment))}</strong>
                                            </div>
                                            <div className="breakdown-item">
                                                <span>Total Interest:</span>
                                                <strong>{formatPrice((calculateMortgage(selectedListing.price) * loanTerm * 12) - (selectedListing.price - (selectedListing.price * downPayment) / 100 + calculateCMHC(selectedListing.price, downPayment)))}</strong>
                                            </div>
                                        </div>

                                        <p className="calculator-disclaimer">
                                            * This is an estimate only. Actual payments may vary based on property taxes, insurance, HOA fees, and other factors.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'contact' && (
                                    <div className="modal-form-container">
                                        <h4>Interested in this property?</h4>
                                        <form onSubmit={handleContactSubmit} className="contact-form" style={{ gap: '1rem' }}>
                                            <div className="form-row" style={{ gap: '1rem' }}>
                                                <input type="text" placeholder="Name" className="form-input" style={{ margin: 0, padding: '0.75rem' }} required />
                                                <input type="tel" placeholder="Phone" className="form-input" style={{ margin: 0, padding: '0.75rem' }} required />
                                            </div>
                                            <textarea
                                                className="form-input"
                                                placeholder="I'm interested in this property..."
                                                rows="3"
                                                style={{ margin: 0, padding: '0.75rem' }}
                                                defaultValue={`Hi, I'm interested in ${selectedListing.address}. Please contact me.`}
                                            />
                                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Schedule Viewing</button>
                                            {formStatus === 'success' && (
                                                <div className="form-message-success">Thank you! We'll contact you soon.</div>
                                            )}
                                        </form>

                                        <div className="share-section">
                                            <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Share This Property</h4>
                                            <div className="share-buttons">
                                                <button
                                                    className="share-btn"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(window.location.href)
                                                        alert('Link copied to clipboard!')
                                                    }}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                                    </svg>
                                                    Copy Link
                                                </button>
                                                <button
                                                    className="share-btn"
                                                    onClick={() => window.open(`mailto:?subject=${selectedListing.title}&body=Check out this property: ${selectedListing.address}`, '_blank')}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                        <polyline points="22,6 12,13 2,6" />
                                                    </svg>
                                                    Email
                                                </button>
                                                <button
                                                    className="share-btn"
                                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                    </svg>
                                                    Share
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Calculator Modal */}
            {
                activeCalculator && (
                    <CalculatorModal
                        tool={activeCalculator}
                        onClose={() => setActiveCalculator(null)}
                    />
                )
            }
        </div >
    )
}

export default App
