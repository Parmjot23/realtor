import React, { useState } from 'react'

const ListingCard = ({ listing, onClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX)
    }

    const handleTouchEnd = (e) => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe || isRightSwipe) {
            e.stopPropagation() // Prevent opening modal on swipe
            const images = listing.images || [listing.image]

            if (isLeftSwipe && currentImageIndex < images.length - 1) {
                setCurrentImageIndex(prev => prev + 1)
            }
            if (isRightSwipe && currentImageIndex > 0) {
                setCurrentImageIndex(prev => prev - 1)
            }
        }

        setTouchStart(null)
        setTouchEnd(null)
    }

    // Manual navigation for desktop (optional but good for testing)
    const nextImage = (e) => {
        e.stopPropagation()
        const images = listing.images || [listing.image]
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(prev => prev + 1)
        } else {
            setCurrentImageIndex(0) // wrap around
        }
    }

    const prevImage = (e) => {
        e.stopPropagation()
        const images = listing.images || [listing.image]
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1)
        } else {
            setCurrentImageIndex(images.length - 1) // wrap around
        }
    }


    const status = listing.status || 'For Sale'
    const images = listing.images || [listing.image]
    const currentImage = images[currentImageIndex]

    return (
        <article className="listing-card fade-in-up" onClick={() => onClick(listing)}>
            <div
                className="listing-image-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className={`listing-status ${status.toLowerCase() === 'sold' ? 'sold' : ''}`}>
                    {status}
                </div>
                <img
                    src={currentImage}
                    alt={listing.address}
                    className="listing-image"
                    onError={(event) => {
                        event.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
                    }}
                />

                {/* Dots Indicator */}
                {images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '6px',
                        zIndex: 2,
                        background: 'rgba(0,0,0,0.3)',
                        padding: '4px 8px',
                        borderRadius: '10px'
                    }}>
                        {images.slice(0, 5).map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: idx === currentImageIndex ? 'white' : 'rgba(255,255,255,0.4)',
                                    transition: 'background-color 0.2s'
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Desktop Hover Arrows (hidden on touch via CSS if needed, but useful generally) */}
                {images.length > 1 && (
                    <>
                        <button
                            className="card-nav-btn prev"
                            onClick={prevImage}
                            style={{
                                position: 'absolute',
                                left: '5px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                                display: 'none', // Hidden by default, shown on hover via CSS
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                paddingBottom: '2px',
                                zIndex: 3
                            }}
                        >‹</button>
                        <button
                            className="card-nav-btn next"
                            onClick={nextImage}
                            style={{
                                position: 'absolute',
                                right: '5px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(255,255,255,0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                                display: 'none', // Hidden by default, shown on hover via CSS
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                paddingBottom: '2px',
                                zIndex: 3
                            }}
                        >›</button>
                    </>
                )}
            </div>
            <div className="listing-content">
                <div className="listing-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(listing.price)}</div>
                <h3 className="listing-title">{listing.address}</h3>
                <div className="listing-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {listing.municipality}, {listing.area}
                </div>
                <div className="listing-meta">
                    <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                        </svg>
                        {listing.bedrooms} Beds
                    </span>
                    <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="2 6 12 13 22 6" />
                        </svg>
                        {listing.bathrooms} Baths
                    </span>
                    <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3v18h18" />
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                        </svg>
                        {listing.sqft} Sq Ft
                    </span>
                </div>
            </div>
        </article>
    )
}

export default ListingCard
