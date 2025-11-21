import { jsPDF } from 'jspdf';

const brandColor = '#0f172a'; // Primary dark color
const accentColor = '#c2a372'; // Gold/Secondary color

const guides = {
    buyerGuide: {
        title: "The Ultimate Home Buyer's Guide",
        sections: [
            {
                title: "1. Financial Preparation",
                content: [
                    "• Determine your budget: Calculate your monthly income and expenses.",
                    "• Save for a down payment: Minimum 5% for homes under $500k.",
                    "• Get Pre-Approved: Secure a rate hold and know your purchasing power.",
                    "• Prepare for closing costs: Land transfer tax, legal fees, and adjustments (approx. 1.5-4% of purchase price)."
                ]
            },
            {
                title: "2. Finding Your Home",
                content: [
                    "• Define your needs vs. wants: Bedrooms, location, amenities.",
                    "• Sign a Buyer Representation Agreement: Ensure your interests are protected.",
                    "• View properties: Attend open houses and private showings.",
                    "• Review comparable sales: Understand market value in your target area."
                ]
            },
            {
                title: "3. Making an Offer",
                content: [
                    "• Price & Deposit: Determine a competitive price and have your deposit ready (usually 5% within 24hrs).",
                    "• Conditions: Common conditions include Financing, Home Inspection, and Status Certificate (for condos).",
                    "• Negotiation: We will negotiate price, closing date, and inclusions on your behalf."
                ]
            },
            {
                title: "4. Closing the Deal",
                content: [
                    "• Firm up the deal: Waive conditions once satisfied.",
                    "• Choose a Real Estate Lawyer: They handle title transfer and funds.",
                    "• Arrange Insurance & Utilities: Mandatory for closing.",
                    "• Final Walkthrough: Verify the property condition before closing day."
                ]
            }
        ]
    },
    buyerChecklist: {
        title: "First-Time Home Buyer Checklist",
        sections: [
            {
                title: "Pre-Search Phase",
                content: [
                    "□ Check credit score and report",
                    "□ Determine total budget (monthly payments + maintenance)",
                    "□ Save for down payment (min 5%)",
                    "□ Save for closing costs (1.5-4%)",
                    "□ Get mortgage pre-approval",
                    "□ Choose a real estate agent"
                ]
            },
            {
                title: "The Search",
                content: [
                    "□ Create a 'Needs vs Wants' list",
                    "□ Research neighbourhoods (schools, transit, amenities)",
                    "□ Sign up for listing alerts",
                    "□ Attend open houses and viewings"
                ]
            },
            {
                title: "The Offer & Closing",
                content: [
                    "□ Hire a real estate lawyer",
                    "□ Prepare deposit funds (liquid and accessible)",
                    "□ Arrange home inspection",
                    "□ Review Status Certificate (if condo)",
                    "□ Secure home insurance",
                    "□ Set up utilities (Hydro, Water, Gas, Internet)",
                    "□ Book movers or rent a truck"
                ]
            }
        ]
    },
    sellerGuide: {
        title: "The Complete Home Seller's Guide",
        sections: [
            {
                title: "1. Preparation",
                content: [
                    "• Market Analysis: We review recent sales to determine the optimal list price.",
                    "• Declutter & Depersonalize: Remove personal items to help buyers visualize themselves in the space.",
                    "• Repairs: Fix minor issues (leaky faucets, paint scuffs) that could distract buyers.",
                    "• Staging: Arrange furniture to maximize flow and light."
                ]
            },
            {
                title: "2. Marketing Strategy",
                content: [
                    "• Professional Photography & Video: High-quality visuals are essential.",
                    "• MLS Listing: Exposure to thousands of agents and buyers.",
                    "• Social Media & Digital Ads: Targeted campaigns to reach active buyers.",
                    "• Open Houses: Scheduled times for public viewing."
                ]
            },
            {
                title: "3. Offers & Negotiation",
                content: [
                    "• Reviewing Offers: We analyze price, closing date, and conditions.",
                    "• Negotiation: We advocate for your terms to maximize your return.",
                    "• Acceptance: Once an offer is accepted, the buyer has a period to fulfill conditions."
                ]
            },
            {
                title: "4. Closing",
                content: [
                    "• Lawyer: Your lawyer will handle the payout of your mortgage and transfer of title.",
                    "• Moving: Vacate the property by the agreed time (usually 6:00 PM on closing day).",
                    "• Cancel Utilities: Arrange for final readings and cancellation."
                ]
            }
        ]
    },
    prepHome: {
        title: "Preparing Your Home for Sale",
        sections: [
            {
                title: "Curb Appeal",
                content: [
                    "• Mow the lawn and trim hedges.",
                    "• Clean the front door and entryway.",
                    "• Ensure house numbers are visible.",
                    "• Clean windows (inside and out)."
                ]
            },
            {
                title: "Interior Decluttering",
                content: [
                    "• Clear countertops in kitchen and bathrooms.",
                    "• Remove excess furniture to make rooms feel larger.",
                    "• Pack away personal photos and knick-knacks.",
                    "• Organize closets (buyers will look inside!)."
                ]
            },
            {
                title: "Deep Cleaning",
                content: [
                    "• Steam clean carpets and polish floors.",
                    "• Scrub grout and tiles.",
                    "• Dust light fixtures and baseboards.",
                    "• Eliminate odours (pets, cooking)."
                ]
            },
            {
                title: "Final Touches",
                content: [
                    "• Replace burnt-out light bulbs with bright LEDs.",
                    "• Touch up paint where needed.",
                    "• Add fresh flowers or plants for a welcoming touch."
                ]
            }
        ]
    },
    listingStrategy: {
        title: "Listing Strategy & Marketing Plan",
        sections: [
            {
                title: "Pricing Strategy",
                content: [
                    "• Comparative Market Analysis (CMA): Data-driven pricing based on recent sales.",
                    "• Market Conditions: Adjusting for Buyer's vs. Seller's market.",
                    "• Strategic Pricing: Pricing to generate interest and potential multiple offers."
                ]
            },
            {
                title: "Visual Presentation",
                content: [
                    "• HDR Photography: Capturing your home in the best light.",
                    "• 4K Video Tours: Immersive walkthroughs for remote buyers.",
                    "• Virtual Staging: Enhancing vacant spaces digitally.",
                    "• Floor Plans: Providing accurate layouts and measurements."
                ]
            },
            {
                title: "Exposure Channels",
                content: [
                    "• MLS System: The primary source for all real estate data.",
                    "• Realtor.ca: Canada's most visited real estate website.",
                    "• Social Media: Instagram, Facebook, and LinkedIn targeted ads.",
                    "• Email Marketing: Direct blast to our network of top agents and buyers."
                ]
            }
        ]
    }
};

export const generatePDF = (type, agentInfo) => {
    const doc = new jsPDF();
    const guide = guides[type];

    if (!guide) return;

    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPos = 20;

    // --- Header ---
    doc.setFontSize(22);
    doc.setTextColor(brandColor);
    doc.setFont('helvetica', 'bold');
    doc.text(guide.title, margin, yPos);

    yPos += 10;

    // Subheader / Brand
    doc.setFontSize(12);
    doc.setTextColor(accentColor);
    doc.text("Presented by " + (agentInfo?.name || "Premium Real Estate"), margin, yPos);

    yPos += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5);

    // --- Content ---
    guide.sections.forEach(section => {
        // Check for page break
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        // Section Title
        doc.setFontSize(14);
        doc.setTextColor(brandColor);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, margin, yPos);
        yPos += 8;

        // Section Content
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');

        section.content.forEach(line => {
            const splitText = doc.splitTextToSize(line, pageWidth - (margin * 2));

            // Check for page break within content
            if (yPos + (splitText.length * 5) > 270) {
                doc.addPage();
                yPos = 20;
            }

            doc.text(splitText, margin, yPos);
            yPos += (splitText.length * 6) + 2;
        });

        yPos += 5; // Space between sections
    });

    // --- Footer ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);

        const footerText = `${agentInfo?.name || 'Premium Real Estate'} | ${agentInfo?.phone || ''} | ${agentInfo?.email || ''}`;
        doc.text(footerText, margin, 285);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, 285);
    }

    // Save
    doc.save(`${guide.title.replace(/\s+/g, '_')}.pdf`);
};
