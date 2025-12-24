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
  const { setCurrentPrd, initializeAuth, onAuthStateChange } = useStore();

  React.useEffect(() => {
    // 1. Initialize Supabase Auth
    const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL?.includes('supabase.co');
    if (isSupabaseConfigured) {
      initializeAuth();
      const { data: { subscription } } = onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          initializeAuth();
        }
      });
      return () => subscription?.unsubscribe();
    }
  }, [initializeAuth, onAuthStateChange]);

  React.useEffect(() => {
    // 2. Handle Demo Data Load Event
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
      {/* Configuration Warning - Only shows if URL is conspicuously wrong */}
      {import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('supabase.co') && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white p-4 text-center font-bold z-[9999] shadow-xl">
           CRITICAL CONFIG ERROR: VITE_SUPABASE_URL is set to "{import.meta.env.VITE_SUPABASE_URL}".
           <br/>
           It should be your Supabase API URL (e.g. https://xyz.supabase.co).
           <br/>
           Please fix it in Netlify Site Settings &gt; Environment Variables.
        </div>
      )}

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
