import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Sparkles, Shield, ArrowRight, FileText, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useStore();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-panel border-b border-white/5 bg-[#0f1115]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Layers className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 font-outfit">
              PRD Generator
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Sign In
            </button>
            {/* Direct link for guest users? Or strict auth? 
                Let's redirect to login for now, but adding a Pricing section or link would be good. 
                I'll add a 'Pricing' text link. */}
             <button onClick={() => alert("Sign in to see full pricing details!")} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Pricing
            </button>
            <button 
              onClick={handleStart}
              className="px-5 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fadeIn">
            <Sparkles size={14} className="text-yellow-400" />
            <span className="text-xs font-medium text-gray-300">Powered by Gemini AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-slideUp">
            Stop writing PRDs.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Start generating them.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Turns your rough ideas into professional Product Requirements Documents in seconds. 
            AI-powered, structured, and ready for development.
          </p>
          
          <button 
            onClick={handleStart}
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-indigo-500/25 animate-slideUp"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="flex items-center gap-2">
              Start Building for Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Hero Visual */}
          <div className="mt-20 glass-panel p-2 rounded-2xl border-white/10 shadow-2xl animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="bg-[#0f1115] rounded-xl overflow-hidden aspect-[16/9] relative group">
               {/* Abstract UI Representation */}
               <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black p-8 flex flex-col items-center justify-center text-gray-600">
                  <div className="w-3/4 h-4 bg-gray-800 rounded mb-4 w-1/2"></div>
                  <div className="w-1/2 h-4 bg-gray-800 rounded mb-8"></div>
                  <div className="grid grid-cols-2 gap-4 w-3/4">
                    <div className="h-32 bg-gray-800/50 rounded-lg border border-gray-700/50"></div>
                    <div className="h-32 bg-gray-800/50 rounded-lg border border-gray-700/50"></div>
                  </div>
                  <div className="mt-8 text-sm font-mono text-indigo-400/50"> Generating Specifications... </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Sparkles className="text-indigo-400" />}
            title="AI-Powered Context"
            description="Describe your idea in one sentence. Our built-in integration with Google Gemini expands it into full user stories and technical specs."
          />
          <FeatureCard 
            icon={<Shield className="text-purple-400" />}
            title="Secure Workspace"
            description="Your data is encrypted and stored locally. Create a personal account to manage your history and credit balance."
          />
          <FeatureCard 
            icon={<FileText className="text-pink-400" />}
            title="Export Ready"
            description="Generate beautifully formatted PDF or Markdown documents that you can immediately share with your engineering team."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} PRD Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
