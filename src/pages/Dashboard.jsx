import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus, Clock, MoreVertical, Trash2, Edit } from 'lucide-react';
import { useStore } from '../store';

export default function Dashboard() {
  const navigate = useNavigate();
  const { history, deletePrd, setCurrentPrd, resetCurrentPrd, credits } = useStore();

  const handleNewProject = () => {
    resetCurrentPrd();
    navigate('/editor');
  };

  const handleEditProject = (project) => {
    setCurrentPrd(project);
    navigate('/editor');
  };

  return (
    <div className="animate-fadeIn">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Available Credits</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">{credits}</span>
            <span className="text-sm text-indigo-400">tokens</span>
          </div>
          <button className="mt-4 text-xs font-bold text-indigo-300 uppercase tracking-wider hover:text-white transition-colors">
            + Top Up Balance
          </button>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Projects</h3>
          <div className="text-4xl font-bold text-white">{history.length}</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group" onClick={handleNewProject}>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <PlusIcon />
            </div>
            <h3 className="font-bold text-white">Create New PRD</h3>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <h2 className="text-2xl font-bold text-white mb-6">Your Projects</h2>
      
      {history.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <FilePlus className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Start your first PRD to see it here.</p>
          <button 
            onClick={handleNewProject}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors"
          >
            Start First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((project) => (
            <div key={project.id} className="glass-panel p-6 rounded-2xl hover:border-indigo-500/30 transition-all group relative">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <FilePlus className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => deletePrd(project.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 truncate">{project.projectName || 'Untitled'}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 h-10 mb-4">{project.vision || 'No vision statement defined.'}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> {new Date(project.lastModified).toLocaleDateString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  project.status === 'Approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                  project.status === 'In Review' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/10 border-gray-500/20 text-gray-400'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="absolute inset-0 cursor-pointer" onClick={() => handleEditProject(project)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}
