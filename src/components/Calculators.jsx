import { useState } from 'react';

export const MortgageCalculator = () => {
    const [price, setPrice] = useState(1000000);
    const [downPayment, setDownPayment] = useState(200000);
    const [rate, setRate] = useState(5.5);
    const [amortization, setAmortization] = useState(25);

    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = amortization * 12;

    const monthlyPayment = principal > 0 && monthlyRate > 0
        ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
        : 0;

    return (
        <div className="calculator-body">
            <div className="form-group">
                <label>Home Price</label>
                <input type="number" className="form-input" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Down Payment ($)</label>
                <input type="number" className="form-input" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Interest Rate (%)</label>
                <input type="number" className="form-input" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Amortization (Years)</label>
                <select className="form-input" value={amortization} onChange={e => setAmortization(Number(e.target.value))}>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                    <option value="25">25 Years</option>
                    <option value="30">30 Years</option>
                </select>
            </div>
            <div className="result-box">
                <h4>Monthly Payment</h4>
                <div className="big-number">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
        </div>
    );
};

export const LandTransferTaxCalculator = () => {
    const [price, setPrice] = useState(1000000);
    const [location, setLocation] = useState('toronto');
    const [firstTime, setFirstTime] = useState(false);

    const calculateOntarioTax = (price) => {
        let tax = 0;
        if (price > 0) tax += Math.min(price, 55000) * 0.005;
        if (price > 55000) tax += (Math.min(price, 250000) - 55000) * 0.01;
        if (price > 250000) tax += (Math.min(price, 400000) - 250000) * 0.015;
        if (price > 400000) tax += (Math.min(price, 2000000) - 400000) * 0.02;
        if (price > 2000000) tax += (price - 2000000) * 0.025;
        return tax;
    };

    const calculateTorontoTax = (price) => {
        let tax = 0;
        if (price > 0) tax += Math.min(price, 55000) * 0.005;
        if (price > 55000) tax += (Math.min(price, 250000) - 55000) * 0.01;
        if (price > 250000) tax += (Math.min(price, 400000) - 250000) * 0.015;
        if (price > 400000) tax += (Math.min(price, 2000000) - 400000) * 0.02;
        if (price > 2000000) tax += (price - 2000000) * 0.025;
        return tax;
    };

    let ontarioTax = calculateOntarioTax(price);
    let torontoTax = location === 'toronto' ? calculateTorontoTax(price) : 0;

    if (firstTime) {
        ontarioTax = Math.max(0, ontarioTax - 4000);
        if (location === 'toronto') torontoTax = Math.max(0, torontoTax - 4475);
    }

    const totalTax = ontarioTax + torontoTax;

    return (
        <div className="calculator-body">
            <div className="form-group">
                <label>Home Price</label>
                <input type="number" className="form-input" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Location</label>
                <select className="form-input" value={location} onChange={e => setLocation(e.target.value)}>
                    <option value="ontario">Ontario (Outside Toronto)</option>
                    <option value="toronto">Toronto</option>
                </select>
            </div>
            <div className="form-group checkbox-group">
                <label>
                    <input type="checkbox" checked={firstTime} onChange={e => setFirstTime(e.target.checked)} />
                    First-Time Home Buyer
                </label>
            </div>
            <div className="result-box">
                <h4>Total Land Transfer Tax</h4>
                <div className="big-number">${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <div className="tax-breakdown">
                    <small>Ontario: ${ontarioTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</small>
                    {location === 'toronto' && <small> • Toronto: ${torontoTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</small>}
                </div>
            </div>
        </div>
    );
};

export const CMHCCalculator = () => {
    const [price, setPrice] = useState(800000);
    const [downPayment, setDownPayment] = useState(60000);

    const downPaymentPercent = price > 0 ? (downPayment / price) * 100 : 0;

    let rate = 0;
    if (downPaymentPercent < 5) rate = 0;
    else if (downPaymentPercent < 10) rate = 4.00;
    else if (downPaymentPercent < 15) rate = 3.10;
    else if (downPaymentPercent < 20) rate = 2.80;
    else rate = 0;

    const insurance = (price - downPayment) * (rate / 100);
    const totalMortgage = (price - downPayment) + insurance;

    return (
        <div className="calculator-body">
            <div className="form-group">
                <label>Home Price</label>
                <input type="number" className="form-input" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label>Down Payment ($)</label>
                <input type="number" className="form-input" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} />
                <small className="helper-text">{downPaymentPercent.toFixed(2)}% Down Payment</small>
            </div>
            <div className="result-box">
                <h4>CMHC Insurance Premium</h4>
                <div className="big-number">${insurance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                <p>Total Mortgage Required: <strong>${totalMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></p>
            </div>
        </div>
    );
};

export const CalculatorModal = ({ tool, onClose }) => {
    if (!tool) return null;

    return (
        <div className="calculator-modal-overlay" onClick={onClose}>
            <div className="calculator-modal-content" onClick={e => e.stopPropagation()}>
                <button className="calculator-modal-close" onClick={onClose}>×</button>
                <h2 className="calculator-modal-title">{tool.title}</h2>
                {tool.title === 'Mortgage Calculator' && <MortgageCalculator />}
                {tool.title === 'Land Transfer Tax' && <LandTransferTaxCalculator />}
                {tool.title === 'CMHC Insurance' && <CMHCCalculator />}
            </div>
        </div>
    );
};
