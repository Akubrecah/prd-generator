import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import GeneratorWizard from './components/GeneratorWizard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Landing from './pages/Landing';
import { useStore } from './store';

function ProtectedRoute({ children }) {
  const { user } = useStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function WizardPage() {
  const { currentPrd, addPrd } = useStore();
  
  // Initialize with store state or default
  const [formData, setFormData] = React.useState(currentPrd || {
    projectName: '',
    version: '1.0.0',
    status: 'Draft',
    platform: 'Web', // Default
    vision: '',
    problemStatement: '',
    targetAudience: [],
    userStories: [],
    features: [],
    techStack: { frontend: '', backend: '', database: '', infrastructure: '' },
    timeline: []
  });

  const handleSave = (finalData) => {
    addPrd({...finalData, id: currentPrd?.id || crypto.randomUUID() });
  };

  return (
    <div className="max-w-6xl mx-auto pt-4">
       <GeneratorWizard 
          formData={formData} 
          setFormData={setFormData}
          onSave={handleSave}
       />
    </div>
  );
}

import Pricing from './pages/Pricing';

function App() {
  const { setCurrentPrd } = useStore();

  React.useEffect(() => {
    // Handle Demo Data Load Event
    const handleLoad = () => {
        const demoData = {
          projectName: 'Orbital Analytics Platform',
          version: '2.0.0-beta',
          status: 'In Review',
          platform: 'Web',
          vision: 'To provide real-time satellite imagery analysis for farmers.',
          problemStatement: 'Farmers lack data.',
          targetAudience: ['Farmers', 'NGOs'],
          userStories: ['As a farmer...'],
          features: [{ title: 'Imagery Feed', description: 'Daily Sentinel-2...' }],
          techStack: { frontend: 'React', backend: 'Python', database: 'Postgres', infrastructure: 'AWS' },
          timeline: []
        };
        setCurrentPrd({...demoData, id: crypto.randomUUID(), createdAt: Date.now(), lastModified: Date.now() });
        window.location.href = '/editor'; 
    };
    window.addEventListener('load-template', handleLoad);
    return () => window.removeEventListener('load-template', handleLoad);
  }, [setCurrentPrd]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/pricing" element={
          <ProtectedRoute>
            <Layout>
              <Pricing />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/editor" element={
          <ProtectedRoute>
            <Layout>
              <WizardPage />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
