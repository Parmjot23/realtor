import React from 'react'

export const agentProfile = {
    name: 'Raman Dhiman',
    designation: 'Broker',
    brokerage: 'RE/MAX Gold Realty Inc.',
    serviceArea: 'Serving Brampton • Mississauga • GTA',
    licenseNote: 'Each Office Independently Owned and Operated.',
    phone: '647-618-7512',
    officePhone: '905-456-1010',
    officePhoneAlt: '905-673-8900',
    email: 'realtor.rdhiman@gmail.com',
    address: '2720 N Park Dr Unit 201, Brampton, ON L6S 0E9',
    photo: '/realtor-profile.png'
}

export const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#listings', label: 'Properties' },
    { href: '/#services', label: 'Services' },
    { href: '/calculators', label: 'Calculators' },
    { href: '/resources', label: 'Resources' },
    { href: '/#contact', label: 'Contact' }
]

export const services = [
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

export const testimonials = [
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

export const propertyCategories = [
    { label: 'Residential', description: 'Detached, Semi, and Townhomes', anchor: '/#listings', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800' },
    { label: 'Condos', description: 'High-rise & Boutique living', anchor: '/#listings', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
    { label: 'Commercial', description: 'Retail, Office & Industrial', anchor: '/#listings', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' },
    { label: 'Pre-Construction', description: 'VIP Access & Incentives', anchor: '/#preconstruction', image: '/pre-construction.png' }
]

export const buyerGuides = [
    { label: 'Buyer’s Guide PDF', href: 'https://www.cmhc-schl.gc.ca/sites/cmhc/professionals/housing-research/housing-research-data/housing-information-centre/housing-information-centre-publications/homebuying-step-by-step-guide-en.pdf' },
    { label: 'First-Time Buyer Checklist', href: 'https://assets.cmhc-schl.gc.ca/sf/project/cmhc/pubsandreports/pdf/68470.pdf' },
    { label: 'RRSP Home Buyer’s Plan', href: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html' },
    { label: 'Mortgage For Your Home', href: '/calculators' },
    { label: 'GST/HST New Housing Rebate', href: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-home-construction/new-housing-rebate.html' }
]

export const sellerGuides = [
    { label: 'Seller’s Guide PDF', href: '/#contact' },
    { label: 'Preparing Your Home', href: '/#contact' },
    { label: 'Listing Strategy Call', href: '/#contact' },
    { label: 'Market Evaluation Request', href: '/#valuation' }
]

export const usefulLinks = [
    { label: 'Equifax Canada', href: 'https://www.consumer.equifax.ca/personal/' },
    { label: 'Land Registry', href: 'https://www.onland.ca/ui/' },
    { label: 'Land Transfer Tax MPAC', href: 'https://www.mpac.ca/' },
    { label: 'Bank of Canada', href: 'https://www.bankofcanada.ca/' },
    { label: 'Government of Ontario', href: 'https://www.ontario.ca/' },
    { label: 'Region of Peel', href: 'https://www.peelregion.ca/' }
]

export const cityLinks = [
    'City of Mississauga',
    'City of Toronto',
    'City of Cambridge',
    'City of Kitchener',
    'City of Brampton',
    'Halton Region'
]

export const formatPhoneLink = (value) => (value ? `tel:${value.replace(/\D/g, '')}` : undefined)

export const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value)
