import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

// Dropdown Select Component
export function Dropdown({ label, options, value, onChange, placeholder = "Select..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-white/20 transition-colors focus:outline-none focus:border-indigo-500"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/5 transition-colors ${
                value === option.value ? 'bg-indigo-500/20 text-white' : 'text-gray-300'
              }`}
            >
              {option.label}
              {value === option.value && <Check size={16} className="text-indigo-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Multi-Select Component
export function MultiSelect({ label, options, values = [], onChange, placeholder = "Select options..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (value) => {
    if (values.includes(value)) {
      onChange(values.filter(v => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  const removeValue = (value) => {
    onChange(values.filter(v => v !== value));
  };

  const selectedLabels = options.filter(opt => values.includes(opt.value));

  return (
    <div className="relative">
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition-colors"
      >
        {selectedLabels.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map((opt) => (
              <span 
                key={opt.value}
                className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-md text-sm text-white"
              >
                {opt.label}
                <button 
                  onClick={(e) => { e.stopPropagation(); removeValue(opt.value); }}
                  className="hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-white/10">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/5 transition-colors ${
                  values.includes(option.value) ? 'bg-indigo-500/10 text-white' : 'text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    values.includes(option.value) 
                      ? 'bg-indigo-500 border-indigo-500' 
                      : 'border-white/20'
                  }`}>
                    {values.includes(option.value) && <Check size={14} className="text-white" />}
                  </div>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
