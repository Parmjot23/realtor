import { useState } from 'react';

const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const MortgagePreApproval = ({ realtorEmail }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        annualIncome: '',
        desiredPrice: '',
        downPayment: '',
        creditScore: 'good'
    });
    const [submitted, setSubmitted] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const numValue = value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, [name]: numValue }));
    };

    // Simple qualification logic
    const calculateQualification = () => {
        const income = Number(formData.annualIncome) || 0;
        const price = Number(formData.desiredPrice) || 0;
        const down = Number(formData.downPayment) || 0;
        const creditScore = formData.creditScore;

        if (income === 0 || price === 0) return null;

        const mortgageAmount = price - down;
        const downPaymentPercent = (down / price) * 100;

        // Max affordable based on ~4.5x annual income
        const maxAffordable = income * 4.5;

        // Calculate debt ratio (assuming mortgage at 6% for 25 years)
        const monthlyPayment = mortgageAmount * (0.005 * Math.pow(1.005, 300)) / (Math.pow(1.005, 300) - 1);
        const monthlyIncome = income / 12;
        const debtRatio = (monthlyPayment / monthlyIncome) * 100;

        let status = 'qualified';
        let message = "Based on your information, you're likely to qualify for a mortgage!";

        if (downPaymentPercent < 5) {
            status = 'review';
            message = "A minimum 5% down payment is typically required. Let's discuss your options.";
        } else if (debtRatio > 44 || mortgageAmount > maxAffordable) {
            status = 'adjustment';
            message = "Your numbers may need some adjustment. Let's review together to find the best solution.";
        } else if (creditScore === 'poor') {
            status = 'review';
            message = "We can explore mortgage options that work with your credit situation.";
        }

        return {
            status,
            message,
            maxAffordable,
            monthlyPayment,
            mortgageAmount
        };
    };

    const qualification = showResult ? calculateQualification() : null;

    const handleCheckQualification = (e) => {
        e.preventDefault();
        if (formData.annualIncome && formData.desiredPrice) {
            setShowResult(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create mailto link with lead details
        const subject = encodeURIComponent(`Mortgage Pre-Approval Lead: ${formData.name}`);
        const body = encodeURIComponent(
            `New Mortgage Pre-Approval Lead

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Financial Details:
- Annual Income: ${formatCurrency(Number(formData.annualIncome))}
- Desired Property Price: ${formatCurrency(Number(formData.desiredPrice))}
- Down Payment: ${formatCurrency(Number(formData.downPayment))}
- Credit Score: ${formData.creditScore === 'excellent' ? 'Excellent (750+)' : formData.creditScore === 'good' ? 'Good (680-749)' : formData.creditScore === 'fair' ? 'Fair (620-679)' : 'Needs Improvement (<620)'}

Qualification Status: ${qualification?.status === 'qualified' ? 'Likely Qualified' : qualification?.status === 'adjustment' ? 'May Need Adjustment' : 'Needs Review'}
Estimated Monthly Payment: ${qualification?.monthlyPayment ? formatCurrency(qualification.monthlyPayment) : 'N/A'}

Please follow up with this lead.`
        );

        window.location.href = `mailto:${realtorEmail}?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="preapproval-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your pre-approval request has been sent. We'll be in touch shortly to discuss your mortgage options.</p>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => {
                        setSubmitted(false);
                        setShowResult(false);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            annualIncome: '',
                            desiredPrice: '',
                            downPayment: '',
                            creditScore: 'good'
                        });
                    }}
                >
                    Start New Application
                </button>
            </div>
        );
    }

    return (
        <div className="preapproval-container">
            <form className="preapproval-form" onSubmit={showResult ? handleSubmit : handleCheckQualification}>
                <div className="form-section">
                    <h3>Quick Financial Check</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="annualIncome">Annual Income</label>
                            <div className="input-with-prefix">
                                <span className="input-prefix">$</span>
                                <input
                                    id="annualIncome"
                                    name="annualIncome"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="100,000"
                                    value={formData.annualIncome ? Number(formData.annualIncome).toLocaleString() : ''}
                                    onChange={handleNumberChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desiredPrice">Desired Property Price</label>
                            <div className="input-with-prefix">
                                <span className="input-prefix">$</span>
                                <input
                                    id="desiredPrice"
                                    name="desiredPrice"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="500,000"
                                    value={formData.desiredPrice ? Number(formData.desiredPrice).toLocaleString() : ''}
                                    onChange={handleNumberChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="downPayment">Down Payment Available</label>
                            <div className="input-with-prefix">
                                <span className="input-prefix">$</span>
                                <input
                                    id="downPayment"
                                    name="downPayment"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="50,000"
                                    value={formData.downPayment ? Number(formData.downPayment).toLocaleString() : ''}
                                    onChange={handleNumberChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="creditScore">Credit Score Range</label>
                            <select
                                id="creditScore"
                                name="creditScore"
                                value={formData.creditScore}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="excellent">Excellent (750+)</option>
                                <option value="good">Good (680-749)</option>
                                <option value="fair">Fair (620-679)</option>
                                <option value="poor">Needs Improvement</option>
                            </select>
                        </div>
                    </div>
                </div>

                {!showResult && (
                    <button type="submit" className="btn btn-primary btn-full">
                        Check My Qualification
                    </button>
                )}

                {showResult && qualification && (
                    <>
                        <div className={`qualification-result status-${qualification.status}`}>
                            <div className="qualification-status">
                                {qualification.status === 'qualified' && <span className="status-icon">✓</span>}
                                {qualification.status === 'adjustment' && <span className="status-icon">⚡</span>}
                                {qualification.status === 'review' && <span className="status-icon">📋</span>}
                                <span className="status-text">
                                    {qualification.status === 'qualified' && 'Likely Qualified!'}
                                    {qualification.status === 'adjustment' && 'May Need Adjustment'}
                                    {qualification.status === 'review' && 'Let\'s Review Together'}
                                </span>
                            </div>
                            <p className="qualification-message">{qualification.message}</p>
                            <div className="qualification-details">
                                <div className="detail-item">
                                    <span className="detail-label">Est. Monthly Payment</span>
                                    <span className="detail-value">{formatCurrency(qualification.monthlyPayment)}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Mortgage Amount</span>
                                    <span className="detail-value">{formatCurrency(qualification.mortgageAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-section contact-section">
                            <h3>Get Your Pre-Approval Started</h3>
                            <p className="section-subtitle">Enter your contact details and I'll reach out to discuss your options.</p>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Smith"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="(647) 555-1234"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full">
                            Send My Pre-Approval Request
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default MortgagePreApproval;
