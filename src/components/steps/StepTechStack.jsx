import React from 'react';
import { Server, Database, Globe, Cpu } from 'lucide-react';
import { MultiSelect } from '../SelectComponents';

const FRONTEND_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'redux', label: 'Redux' },
  { value: 'graphql', label: 'GraphQL Client' },
];

const BACKEND_OPTIONS = [
  { value: 'nodejs', label: 'Node.js' },
  { value: 'express', label: 'Express' },
  { value: 'python', label: 'Python' },
  { value: 'django', label: 'Django' },
  { value: 'fastapi', label: 'FastAPI' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java/Spring' },
  { value: 'rust', label: 'Rust' },
  { value: 'graphql-server', label: 'GraphQL Server' },
];

const DATABASE_OPTIONS = [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'redis', label: 'Redis' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'firestore', label: 'Firestore' },
  { value: 'dynamodb', label: 'DynamoDB' },
  { value: 'supabase', label: 'Supabase' },
];

const INFRA_OPTIONS = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'Google Cloud' },
  { value: 'azure', label: 'Azure' },
  { value: 'vercel', label: 'Vercel' },
  { value: 'netlify', label: 'Netlify' },
  { value: 'docker', label: 'Docker' },
  { value: 'kubernetes', label: 'Kubernetes' },
  { value: 'terraform', label: 'Terraform' },
  { value: 'github-actions', label: 'GitHub Actions' },
];

export function StepTechStack({ data, updateData }) {
  const updateStack = (field, value) => {
    updateData('techStack', {
      ...data.techStack,
      [field]: value
    });
  };

  // Convert string to array for MultiSelect compatibility
  const getArrayValue = (field) => {
    const val = data.techStack?.[field];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val) return val.split(',').map(s => s.trim().toLowerCase().replace(/\s+/g, '-'));
    return [];
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Frontend */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 mb-2">
            <Globe size={18} />
            <h3 className="font-semibold">Frontend Stack</h3>
          </div>
          <MultiSelect
            options={FRONTEND_OPTIONS}
            values={getArrayValue('frontend')}
            onChange={(values) => updateStack('frontend', values)}
            placeholder="Select frontend technologies..."
          />
        </div>

        {/* Backend */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-300 mb-2">
            <Server size={18} />
            <h3 className="font-semibold">Backend Stack</h3>
          </div>
          <MultiSelect
            options={BACKEND_OPTIONS}
            values={getArrayValue('backend')}
            onChange={(values) => updateStack('backend', values)}
            placeholder="Select backend technologies..."
          />
        </div>

        {/* Database */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-pink-300 mb-2">
            <Database size={18} />
            <h3 className="font-semibold">Database</h3>
          </div>
          <MultiSelect
            options={DATABASE_OPTIONS}
            values={getArrayValue('database')}
            onChange={(values) => updateStack('database', values)}
            placeholder="Select databases..."
          />
        </div>

        {/* Infrastructure */}
         <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-300 mb-2">
            <Cpu size={18} />
            <h3 className="font-semibold">Infrastructure & DevOps</h3>
          </div>
          <MultiSelect
            options={INFRA_OPTIONS}
            values={getArrayValue('infrastructure')}
            onChange={(values) => updateStack('infrastructure', values)}
            placeholder="Select infrastructure..."
          />
        </div>

      </div>
    </div>
  );
}
