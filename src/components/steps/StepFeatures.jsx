import React, { useState } from 'react';
import { Plus, X, Zap, Trash2 } from 'lucide-react';
import { InputField, TextArea } from '../FormFields';

export function StepFeatures({ data, updateData }) {
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureDesc, setFeatureDesc] = useState('');

  const addFeature = () => {
    if (featureTitle.trim()) {
      const newFeature = {
        title: featureTitle.trim(),
        description: featureDesc.trim()
      };
      updateData('features', [...data.features, newFeature]);
      setFeatureTitle('');
      setFeatureDesc('');
    }
  };

  const removeFeature = (index) => {
    const updated = data.features.filter((_, i) => i !== index);
    updateData('features', updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl mb-6">
        <h3 className="flex items-center gap-2 text-indigo-300 font-semibold mb-4">
          <Zap size={18} /> Add New Feature
        </h3>
        <div className="space-y-4">
          <InputField
            label="Feature Name"
            placeholder="e.g. Real-time Notifications"
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
          />
          <TextArea
            label="Description & Acceptance Criteria"
            placeholder="Describe how this feature functions and what criteria must be met..."
            value={featureDesc}
            onChange={(e) => setFeatureDesc(e.target.value)}
            rows={2}
          />
          <button
            onClick={addFeature}
            disabled={!featureTitle.trim()}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Feature to PRD
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Feature List ({data.features.length})</h3>
        <div className="grid grid-cols-1 gap-4">
          {data.features.map((feature, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 group hover:border-white/20 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-indigo-300">{feature.title}</h4>
                <button 
                  onClick={() => removeFeature(index)}
                  className="text-white/20 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {feature.description || "No description provided."}
              </p>
            </div>
          ))}
          {data.features.length === 0 && (
            <div className="text-center py-10 bg-white/5 rounded-xl border border-dashed border-white/10">
              <Zap className="mx-auto h-8 w-8 text-white/20 mb-2" />
              <p className="text-white/40">No features added yet. Add your first feature above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
