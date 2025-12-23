import React, { useState } from 'react';
import { Layers, Zap, CreditCard, X, LayoutTemplate, Lock } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { credits, addCredits, tier } = useStore();
  const [showPay, setShowPay] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 rounded-none px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Layers className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 font-outfit">
              PRD Generator
            </span>
          </div>
          <div className="flex items-center gap-6">
            {tier === 'free' && (
              <button 
                onClick={() => navigate('/pricing')}
                className="hidden md:block text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:opacity-80 transition-opacity"
              >
                Upgrade to Pro
              </button>
            )}
             <button 
              onClick={() => {
                 if (tier === 'free') {
                   if (confirm("Sample Data is a Pro feature. Upgrade now?")) {
                     navigate('/pricing');
                   }
                 } else {
                   // This logic needs to bubble up or be handled by context if inside Layout.
                   // Wait, Layout wraps App content, but the "Load Demo" logic was in App.
                   // Layout was modified previously to NOT take props for this.
                   // I need to emit an event or use a global store trigger.
                   // Hack: Dispatch a custom event window.dispatchEvent(new Event('load-demo'));
                   window.dispatchEvent(new Event('load-template'));
                 }
              }}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              {tier === 'free' ? <Lock size={14} className="text-gray-400" /> : <LayoutTemplate size={14} className="text-indigo-400" />}
              <span className={`text-sm font-medium ${tier === 'free' ? 'text-gray-400' : 'text-white'}`}>Load Demo</span>
            </button>

             <button 
              onClick={() => setShowPay(true)}
              className="px-4 py-1.5 rounded-full bg-gray-900/50 border border-white/10 flex items-center gap-2 hover:border-indigo-500/50 transition-colors group"
            >
              <Zap size={14} className="text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-white">{credits}</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 border-2 border-white/20"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/30 text-sm">
          <p>© {new Date().getFullYear()} PRD Generator. Built for speed and precision.</p>
        </div>
      </footer>

      {/* Payment Modal Simulation */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-8 rounded-2xl max-w-md w-full relative">
            <button onClick={() => setShowPay(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Top Up Credits</h2>
              <p className="text-gray-400">You need more credits to use AI features.</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => { addCredits(1000); setShowPay(false); }}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center px-6 hover:bg-white/10 transition-colors group"
              >
                <span className="font-bold text-white">1,000 Credits</span>
                <span className="text-indigo-300 group-hover:text-white transition-colors">$5.00</span>
              </button>
              <button 
                onClick={() => { addCredits(5000); setShowPay(false); }}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex justify-between items-center px-6 hover:brightness-110 transition-all shadow-lg shadow-indigo-500/25"
              >
                <div className="text-left">
                   <div className="font-bold text-white">5,000 Credits</div>
                   <div className="text-xs text-white/70">Most Popular</div>
                </div>
                <span className="text-white font-bold">$10.00</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
