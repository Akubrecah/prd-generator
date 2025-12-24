import { InputField, TextArea } from '../FormFields';
import AIGenerator from '../AIGenerator';
import { generateContent, AI_PROMPTS } from '../../services/gemini';
import { useStore } from '../../store';
import { Dropdown } from '../SelectComponents';

const STATUS_OPTIONS = [
  { value: 'Draft', label: 'Draft' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Approved', label: 'Approved' },
  { value: 'On Hold', label: 'On Hold' },
];

export function StepProjectInfo({ data, updateData }) {
  // Removed unused apiKey destructuring since we access it directly from store
  
  const handleGenerateVision = async () => {
    if (!data.projectName) {
      alert("Please enter a project name first.");
      throw new Error("Project name missing");
    }
    
    // Get fresh API Key directly from store state to avoid stale closure issues
    const currentApiKey = useStore.getState().apiKey;
    
    const platformContext = data.platform ? `A ${data.platform} Application` : "A software application";
    const prompt = AI_PROMPTS.vision(data.projectName, platformContext); 
    const response = await generateContent(currentApiKey, prompt);
    
    if (!response) {
      alert("AI returned empty response. Please try again.");
      return;
    }

    // Parse JSON safely
    try {
       const jsonStr = response.substring(response.indexOf('{'), response.lastIndexOf('}') + 1);
       if (!jsonStr) throw new Error("No JSON found");
       const result = JSON.parse(jsonStr);
       updateData('vision', result.vision);
       updateData('problemStatement', result.problemStatement);
    } catch {
       // Fallback text if not JSON
       console.warn("AI Response not JSON:", response);
       updateData('vision', response);
       // Alert the user so they know it wasn't perfect
       // alert("AI Note: Response format was irregular but content was added.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Project Name"
          placeholder="e.g. SuperNova Analytics"
          value={data.projectName}
          onChange={(e) => updateData('projectName', e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Version"
            placeholder="1.0.0"
            value={data.version}
            onChange={(e) => updateData('version', e.target.value)}
          />
          <Dropdown
            label="Status"
            options={STATUS_OPTIONS}
            value={data.status}
            onChange={(value) => updateData('status', value)}
            placeholder="Select status..."
          />
        </div>
      </div>

      {/* Platform Selection */}
      <div className="grid grid-cols-2 gap-4">
         <div 
          onClick={() => updateData('platform', 'Web')}
          className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
            data.platform === 'Web' 
              ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
         >
           <span className="font-bold">Web Application</span>
         </div>
         <div 
          onClick={() => updateData('platform', 'Mobile')}
          className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
            data.platform === 'Mobile' 
              ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
          }`}
         >
           <span className="font-bold">Mobile App</span>
         </div>
      </div>

      <div className="relative">
        <TextArea
          label="Product Vision"
          placeholder="Describe the high-level goal and value proposition of the product..."
          value={data.vision}
          onChange={(e) => updateData('vision', e.target.value)}
          rows={3}
          required
        />
        <AIGenerator onGenerate={handleGenerateVision} />
      </div>

      <TextArea
        label="Problem Statement"
        placeholder="What specific problem does this product solve for its users?"
        value={data.problemStatement}
        onChange={(e) => updateData('problemStatement', e.target.value)}
        rows={3}
      />
    </div>
  );
}
