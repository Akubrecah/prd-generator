import React, { useState } from 'react';
import { Plus, X, Users, MessageSquare, Sparkles } from 'lucide-react';
import { InputField, TextArea } from '../FormFields';
import { MultiSelect } from '../SelectComponents';

const PERSONA_OPTIONS = [
  { value: 'developers', label: 'Software Developers' },
  { value: 'designers', label: 'UI/UX Designers' },
  { value: 'product-managers', label: 'Product Managers' },
  { value: 'startup-founders', label: 'Startup Founders' },
  { value: 'enterprise', label: 'Enterprise Teams' },
  { value: 'students', label: 'Students' },
  { value: 'freelancers', label: 'Freelancers' },
  { value: 'small-business', label: 'Small Business Owners' },
  { value: 'marketers', label: 'Marketing Teams' },
  { value: 'data-analysts', label: 'Data Analysts' },
  { value: 'devops', label: 'DevOps Engineers' },
  { value: 'c-level', label: 'C-Level Executives' },
];

const STORY_TEMPLATES = [
  "As a [user], I want to [action] so that [benefit].",
  "As an admin, I want to manage users so that I can control access.",
  "As a user, I want to export data as PDF so that I can share reports.",
  "As a mobile user, I want offline access so that I can work anywhere.",
  "As a team lead, I want to assign tasks so that work is distributed evenly.",
];

export function StepAudience({ data, updateData }) {
  const [newPersona, setNewPersona] = useState('');
  const [newStory, setNewStory] = useState('');
  const [selectedPersonas, setSelectedPersonas] = useState([]);

  const addPersona = () => {
    if (newPersona.trim()) {
      updateData('targetAudience', [...data.targetAudience, newPersona.trim()]);
      setNewPersona('');
    }
  };

  const removePersona = (index) => {
    const updated = data.targetAudience.filter((_, i) => i !== index);
    updateData('targetAudience', updated);
  };

  const handlePresetsChange = (values) => {
    setSelectedPersonas(values);
    // Convert selected preset values to labels and merge with existing
    const presetLabels = PERSONA_OPTIONS
      .filter(opt => values.includes(opt.value))
      .map(opt => opt.label);
    const customPersonas = data.targetAudience.filter(
      p => !PERSONA_OPTIONS.some(opt => opt.label === p)
    );
    updateData('targetAudience', [...new Set([...customPersonas, ...presetLabels])]);
  };

  const addStory = () => {
    if (newStory.trim()) {
      updateData('userStories', [...data.userStories, newStory.trim()]);
      setNewStory('');
    }
  };

  const removeStory = (index) => {
    const updated = data.userStories.filter((_, i) => i !== index);
    updateData('userStories', updated);
  };

  const addTemplateStory = (template) => {
    setNewStory(template);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Target Audience Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 mb-2">
          <Users size={18} />
          <h3 className="font-semibold text-lg">Target Audience & Personas</h3>
        </div>
        
        {/* Preset Personas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">Quick Select Common Personas</label>
          <MultiSelect
            options={PERSONA_OPTIONS}
            values={selectedPersonas}
            onChange={handlePresetsChange}
            placeholder="Select from common personas..."
          />
        </div>

        {/* Custom Persona Input */}
        <div className="flex gap-2">
          <InputField
            label="Add Custom Persona"
            value={newPersona}
            onChange={(e) => setNewPersona(e.target.value)}
            placeholder="e.g. Remote Healthcare Workers"
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addPersona()}
          />
          <button 
            onClick={addPersona}
            className="glass-button px-4 rounded-lg mt-7 h-[50px] flex items-center justify-center bg-indigo-500/20 hover:bg-indigo-500/30"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {data.targetAudience.map((persona, index) => (
            <div key={index} className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1.5 rounded-full text-sm border border-indigo-500/30">
              <span>{persona}</span>
              <button onClick={() => removePersona(index)} className="hover:text-pink-400 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
          {data.targetAudience.length === 0 && (
            <p className="text-white/30 text-sm italic py-2">No personas added yet.</p>
          )}
        </div>
      </div>

      <div className="h-px bg-white/10 my-6"></div>

      {/* User Stories Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-purple-300 mb-2">
          <MessageSquare size={18} />
          <h3 className="font-semibold text-lg">Key User Stories</h3>
        </div>

        {/* Story Templates */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
            <Sparkles size={14} className="text-yellow-400" /> Quick Templates
          </label>
          <div className="flex flex-wrap gap-2">
            {STORY_TEMPLATES.map((template, i) => (
              <button
                key={i}
                onClick={() => addTemplateStory(template)}
                className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/30 transition-all"
              >
                {template.substring(0, 40)}...
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <TextArea
            label="Write User Story"
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            placeholder="As a [user type], I want to [action] so that [benefit]..."
            className="flex-1"
            rows={2}
          />
          <button 
            onClick={addStory}
            className="glass-button px-4 rounded-lg mt-7 h-auto flex items-center justify-center bg-purple-500/20 hover:bg-purple-500/30"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-2 mt-3">
          {data.userStories.map((story, index) => (
            <div key={index} className="flex items-start gap-3 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-colors group">
              <div className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0"></div>
              <p className="flex-1 text-sm text-gray-300">{story}</p>
              <button onClick={() => removeStory(index)} className="text-white/20 group-hover:text-pink-400 transition-colors">
                <X size={16} />
              </button>
            </div>
          ))}
          {data.userStories.length === 0 && (
            <p className="text-white/30 text-sm italic py-2">No user stories added yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
