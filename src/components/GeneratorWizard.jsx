import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save, FileText } from 'lucide-react';
import { StepProjectInfo } from './steps/StepProjectInfo';
import { StepAudience } from './steps/StepAudience';
import { StepFeatures } from './steps/StepFeatures';
import { StepTechStack } from './steps/StepTechStack';
import DocumentPreview from './DocumentPreview';

const STEPS = [
  { id: 'basics', title: 'Project Basics', component: StepProjectInfo },
  { id: 'audience', title: 'Target Audience', component: StepAudience },
  { id: 'features', title: 'Key Features', component: StepFeatures },
  { id: 'tech', title: 'Technical Stack', component: StepTechStack },
  { id: 'preview', title: 'Preview & Export', component: DocumentPreview },
];

export default function GeneratorWizard({ formData, setFormData }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const CurrentComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      {/* Left Sidebar - Progress */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="glass-panel p-6 rounded-2xl sticky top-28">
          <h2 className="text-lg font-bold mb-6 text-white">Your Progress</h2>
          <div className="space-y-4">
            {STEPS.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  index === currentStep ? 'bg-white/10 text-white' : 
                  index < currentStep ? 'text-green-400' : 'text-gray-500'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${
                  index === currentStep ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300' : 
                  index < currentStep ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-gray-700 bg-gray-800/50'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1">
        <div className="glass-panel p-8 rounded-2xl min-h-[500px] flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">{STEPS[currentStep].title}</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CurrentComponent data={formData} updateData={updateFormData} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                currentStep === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {!isLastStep ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 border border-white/10 transition-all hover:scale-105"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
                <></> // Preview component handles its own actions
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
