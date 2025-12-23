import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Shield, Zap, LayoutTemplate } from 'lucide-react';
import { useStore } from '../store';
import PaymentModal from '../components/PaymentModal';

export default function Pricing() {
  const navigate = useNavigate();
  const { tier, upgrade } = useStore();
  const [isYearly, setIsYearly] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0 });

  const handleUpgrade = (plan, price) => {
    if (plan === 'pro') {
      setSelectedPlan({ name: 'Pro', price: parseInt(price) });
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = () => {
    upgrade('pro');
    setShowPayment(false);
    alert("Welcome to Pro! 50,000 credits added and Demo feature unlocked.");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. 
            <span className="text-indigo-400 font-bold ml-1">Unlock AI superpowers today.</span>
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-white/10 rounded-full relative transition-colors hover:bg-white/20"
            >
              <div className={`absolute top-1 w-5 h-5 bg-indigo-500 rounded-full shadow-md transition-all ${isYearly ? 'left-8' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-xs text-green-400 ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <PricingCard 
            title="Starter"
            price="0"
            description="Perfect for hobbyists and students."
            features={[
              "5,000 AI Credits / mo",
              "Unlimited Projects",
              "PDF Export",
              "Basic AI Generation",
              "Manual Wizard"
            ]}
            disabled={tier === 'free'}
            cta="Current Plan"
          />

          {/* Pro Tier */}
          <PricingCard 
            title="Pro"
            price={isYearly ? "15" : "19"}
            description="For product managers and serious builders."
            highlight
            features={[
              "50,000 AI Credits / mo",
              "Everything in Starter",
              "Sample Data & Templates",
              "Markdown Export",
              "Priority Support",
              "Commercial Use"
            ]}
            loading={tier === 'pro'}
            cta={tier === 'pro' ? "Active Plan" : "Upgrade to Pro"}
            onClick={() => handleUpgrade('pro', isYearly ? '15' : '19')}
          />

          {/* Enterprise Tier */}
          <PricingCard 
             title="Enterprise"
             price="Custom"
             description="For large teams and organizations."
             features={[
               "Unlimited Credits",
               "SSO & Custom Auth",
               "Private Models",
               "API Access",
               "Dedicated Account Manager"
             ]}
             cta="Contact Sales"
             onClick={() => alert("Contacting sales...")}
          />
        </div>
      </div>
      
      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onComplete={handlePaymentComplete}
        plan={selectedPlan.name}
        price={selectedPlan.price}
      />
    </div>
  );
}

function PricingCard({ title, price, description, features, highlight, cta, onClick, disabled, loading }) {
  return (
    <div className={`relative p-8 rounded-3xl border ${highlight ? 'bg-white/5 border-indigo-500 shadow-2xl shadow-indigo-500/10' : 'bg-[#0f1115] border-white/10'} flex flex-col`}>
      {highlight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Most Popular
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-indigo-400' : 'text-white'}`}>{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-extrabold text-white">{price === 'Custom' ? '' : '$'}{price}</span>
        {price !== 'Custom' && <span className="text-gray-500">/mo</span>}
      </div>
      <p className="text-gray-400 text-sm mb-8 pb-8 border-b border-white/5">{description}</p>
      
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
            <Check size={16} className={`mt-0.5 ${highlight ? 'text-indigo-400' : 'text-gray-500'}`} />
            {feat}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          disabled ? 'bg-white/5 text-gray-500 cursor-not-allowed' :
          highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105' :
          'bg-white text-black hover:bg-gray-200'
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
