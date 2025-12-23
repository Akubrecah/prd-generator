import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Check, ArrowLeft, Globe, Wallet } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
  { id: 'paypal', name: 'PayPal', icon: Wallet, description: 'Pay with your PayPal account' },
  { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, description: 'Mobile money (Kenya)' },
  { id: 'stripe', name: 'Stripe Link', icon: Globe, description: 'One-click checkout' },
  { id: 'bank', name: 'Bank Transfer', icon: Building, description: 'Direct bank transfer' },
];

export default function PaymentModal({ isOpen, onClose, onComplete, plan, price }) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  if (!isOpen) return null;

  const handlePayment = () => {
    // Simulate payment processing
    setStep(3);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel p-8 rounded-2xl max-w-lg w-full relative">
        {step > 1 && step < 3 && (
          <button onClick={() => setStep(step - 1)} className="absolute top-4 left-4 text-white/50 hover:text-white">
            <ArrowLeft size={20} />
          </button>
        )}
        
        {/* Step 1: Select Payment Method */}
        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Payment Method</h2>
              <p className="text-gray-400">Upgrade to {plan} for ${price}/month</p>
            </div>

            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${
                    selectedMethod === method.id 
                      ? 'bg-indigo-500/20 border-indigo-500' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${selectedMethod === method.id ? 'bg-indigo-500' : 'bg-white/10'}`}>
                    <method.icon size={20} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-white">{method.name}</div>
                    <div className="text-sm text-gray-400">{method.description}</div>
                  </div>
                  {selectedMethod === method.id && (
                    <Check size={20} className="text-indigo-400" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedMethod && setStep(2)}
              disabled={!selectedMethod}
              className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors"
            >
              Continue
            </button>
          </>
        )}

        {/* Step 2: Enter Payment Details */}
        {step === 2 && selectedMethod === 'card' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Card Details</h2>
              <p className="text-gray-400">Enter your payment information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white rounded-xl font-bold transition-all"
            >
              Pay ${price}.00
            </button>
          </>
        )}

        {step === 2 && selectedMethod === 'mpesa' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">M-Pesa Payment</h2>
              <p className="text-gray-400">Enter your phone number</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+254 7XX XXX XXX"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-colors"
            >
              Send M-Pesa Request
            </button>
          </>
        )}

        {step === 2 && selectedMethod === 'bank' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Bank Transfer</h2>
              <p className="text-gray-400">Transfer to the following account</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Bank:</span><span className="text-white font-mono">Standard Bank</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Account:</span><span className="text-white font-mono">1234567890</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Reference:</span><span className="text-white font-mono">PRD-{Date.now()}</span></div>
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors"
            >
              I've Made the Transfer
            </button>
          </>
        )}

        {step === 2 && selectedMethod === 'paypal' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">PayPal Checkout</h2>
              <p className="text-gray-400">You'll be redirected to PayPal to complete your payment</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Amount:</span>
                <span className="text-2xl font-bold text-white">${price}.00</span>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Wallet size={20} />
              Pay with PayPal
            </button>
          </>
        )}

        {step === 2 && selectedMethod === 'stripe' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Stripe Link</h2>
              <p className="text-gray-400">One-click checkout with saved payment methods</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 mt-4 text-center">
              <p className="text-sm text-purple-300">🔒 Secured by Stripe</p>
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Globe size={20} />
              Continue with Stripe Link
            </button>
          </>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Processing Payment...</h2>
            <p className="text-gray-400">Please wait while we confirm your payment</p>
          </div>
        )}

        <button onClick={onClose} className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
