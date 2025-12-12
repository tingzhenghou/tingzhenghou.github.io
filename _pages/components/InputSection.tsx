import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Trash2, HelpCircle } from 'lucide-react';
import { DEMO_DATA } from '../utils/parser';

interface InputSectionProps {
  onParse: (text: string) => void;
  rawText: string;
  setRawText: (text: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onParse, rawText, setRawText }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleDemo = () => {
    setRawText(DEMO_DATA);
    onParse(DEMO_DATA);
  };

  const handleClear = () => {
    setRawText('');
    onParse('');
  };

  const handleParse = () => {
    onParse(rawText);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div 
        className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-1 rounded">
             {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          <h2 className="font-semibold text-slate-700">Slurm Data Input</h2>
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline-block">
          Paste output from <code>sinfo</code> commands
        </span>
      </div>

      {isOpen && (
        <div className="p-4 transition-all animate-in slide-in-from-top-2 duration-200">
           <div className="mb-3 text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
              <HelpCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
              <div className="space-y-1">
                <p><strong>Recommended Command:</strong></p>
                <code className="bg-white px-2 py-0.5 rounded border border-slate-200 block w-fit my-1">
                  sinfo -N -O "NodeList:5,CPUsState:15,Gres:40,GresUsed:40"
                </code>
                <p className="mt-2 text-xs text-slate-500">
                  This format provides Node Name, CPU State, Configured GPUs (Total), and Used GPUs.
                </p>
              </div>
           </div>
          <textarea
            className="w-full h-48 p-4 font-mono text-sm bg-slate-900 text-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y mb-4"
            placeholder={`NODELCPUS(A/I/O/T)  GRES                                    GRES_USED
cn28 74/22/0/96     gpu:4090:1(S:0)                         gpu:4090:1(IDX:0)
...`}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleParse}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm active:scale-95 transform"
            >
              <Play size={16} fill="currentColor" /> Visualize
            </button>
            <button 
              onClick={handleDemo}
              className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              Load Demo Data
            </button>
             <button 
              onClick={handleClear}
              className="px-5 py-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg font-medium flex items-center gap-2 transition-colors ml-auto"
            >
              <Trash2 size={16} /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSection;
