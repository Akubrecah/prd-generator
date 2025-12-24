import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useStore } from '../store';

export default function AIGenerator({ onGenerate, disabled = false }) {
  const { credits, deductCredits, apiKey, setApiKey } = useStore();
  const [loading, setLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState('');

  const handleGenerate = async () => {
    if (disabled) return;
    
    if (credits < 50) {
      alert("Insufficient credits! Please top up from the navigation bar.");
      return;
    }

    // If no API key, show the input modal
    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    if (deductCredits(50)) {
      setLoading(true);
      try {
        await onGenerate();
      } catch (err) {
        console.error("Generation failed:", err);
        // Specialized error messaging
        if (err.message.includes("API Key")) {
           alert("Invalid API Key. Please check your settings.");
           setApiKey(''); // Clear bad key
           setShowKeyInput(true);
        } else {
           alert("AI Generation failed: " + (err.message || "Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const saveKeyAndGenerate = () => {
    if (tempKey.trim()) {
      setApiKey(tempKey.trim());
      setShowKeyInput(false);
      // Recursively call generate now that we have a key
      // Use setTimeout to allow state update to propagate if needed, 
      // though accessing via store.getState() in parent handles it.
      setTimeout(handleGenerate, 100);
    }
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={loading || disabled}
        className="absolute top-0 right-0 glass-button px-3 py-1.5 text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40 border-indigo-500/30 text-indigo-300"
        title="Cost: 50 Credits"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
        {loading ? 'Generating...' : 'Auto-Generate'}
      </button>

      {/* API Key Modal */}
      {showKeyInput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 rounded-xl max-w-sm w-full relative">
            <h3 className="text-lg font-bold text-white mb-2">Enter Gemini API Key</h3>
            <p className="text-gray-400 text-sm mb-4">
              To use AI features, you need a free API key from Google AI Studio.
            </p>
            <input 
              type="password" 
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="Paste your API key here..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white mb-4 focus:border-indigo-500 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowKeyInput(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveKeyAndGenerate}
                disabled={!tempKey.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
              >
                Save & Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
