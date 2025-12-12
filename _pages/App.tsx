import React, { useState, useEffect } from 'react';
import { SlurmNode } from './types';
import { parseSlurmOutput, DEMO_DATA } from './utils/parser';
import NodeCard from './components/NodeCard';
import StatsOverview from './components/StatsOverview';
import InputSection from './components/InputSection';
import { LayoutGrid, Search, AlertCircle, Github } from 'lucide-react';

const App: React.FC = () => {
  const [rawText, setRawText] = useState<string>("");
  const [nodes, setNodes] = useState<SlurmNode[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'utilization' | 'free'>('name');

  // Initialize with demo data if empty on first load? 
  // Maybe better to start empty or just let the user click "Demo".
  // Let's start with nothing but the input open.
  
  const handleParse = (text: string) => {
    const parsedNodes = parseSlurmOutput(text);
    setNodes(parsedNodes);
  };

  // Filter and Sort Logic
  const filteredNodes = nodes.filter(node => 
    node.name.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name, undefined, {numeric: true});
    if (sortBy === 'utilization') return b.utilization - a.utilization;
    if (sortBy === 'free') return b.idle - a.idle;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <LayoutGrid size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Sycamore State Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <InputSection 
          onParse={handleParse} 
          rawText={rawText} 
          setRawText={setRawText}
        />

        {nodes.length > 0 ? (
          <>
            <StatsOverview nodes={nodes} />

            {/* Filter & Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sticky top-20 z-20 bg-slate-50/95 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 shadow-sm">
               <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search nodes..." 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
               </div>

               <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
                  <select 
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="name">Name</option>
                    <option value="utilization">Highest Load</option>
                    <option value="free">Most Free CPUs</option>
                  </select>
               </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-300">
              {filteredNodes.map((node) => (
                <NodeCard key={node.id} node={node} />
              ))}
            </div>

            {filteredNodes.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No nodes found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your search filter.</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
             <div className="bg-indigo-50 p-4 rounded-full mb-4">
                <LayoutGrid size={32} className="text-indigo-400" />
             </div>
             <h3 className="text-xl font-bold text-slate-700 mb-2">No Data Visualized Yet</h3>
             <p className="text-slate-500 max-w-md mb-6">Paste your Slurm <code>sinfo</code> output above or click "Load Demo Data" to see how it looks.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;