import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useStore } from '../store';

export default function AIGenerator({ onGenerate, prompt, disabled = false }) {
  const { credits, deductCredits, apiKey } = useStore();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled) return;
    
    if (credits < 50) {
      alert("Insufficient credits! Please top up from the navigation bar.");
      return;
    }

    if (!apiKey) {
      const key = prompt("Please enter your Google Gemini API Key to use AI features:");
      if (key) {
        useStore.getState().setApiKey(key);
      } else {
        return;
      }
    }

    if (deductCredits(50)) {
      setLoading(true);
      try {
        await onGenerate();
      } catch (err) {
        alert("AI Generation failed: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      className="absolute top-0 right-0 glass-button px-3 py-1.5 text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40 border-indigo-500/30 text-indigo-300"
      title="Cost: 50 Credits"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
      {loading ? 'Generating...' : 'Auto-Generate'}
    </button>
  );
}
