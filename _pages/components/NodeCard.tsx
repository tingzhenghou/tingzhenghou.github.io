import React from 'react';
import { SlurmNode } from '../types';
import { Server, Cpu, AlertTriangle, Layers } from 'lucide-react';

interface NodeCardProps {
  node: SlurmNode;
}

const NodeCard: React.FC<NodeCardProps> = ({ node }) => {
  const isDown = node.other === node.total && node.total > 0;
  const isFull = node.allocated === node.total && node.total > 0;
  const isIdle = node.allocated === 0 && node.other === 0;

  // Percentage calculations for bar widths
  const allocPct = node.total > 0 ? (node.allocated / node.total) * 100 : 0;
  const otherPct = node.total > 0 ? (node.other / node.total) * 100 : 0;

  let borderColor = "border-slate-200";
  
  if (isDown) {
    borderColor = "border-amber-400";
  } else if (isFull) {
    borderColor = "border-indigo-400";
  } else if (isIdle) {
    borderColor = "border-emerald-400";
  }

  return (
    <div className={`relative flex flex-col p-4 rounded-xl border-2 ${borderColor} bg-white shadow-sm hover:shadow-md transition-all duration-200 group`}>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isDown ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
            {isDown ? <AlertTriangle size={18} /> : <Server size={18} />}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-tight">{node.name}</h3>
            <span className="text-xs text-slate-500 font-medium">{node.total > 0 ? `${node.total} CPUs` : 'No CPU Data'}</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold ${isDown ? 'text-amber-600' : 'text-slate-800'}`}>
            {Math.round(node.utilization)}%
          </span>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Load</p>
        </div>
      </div>

      {/* Visualization Bar */}
      {node.total > 0 ? (
        <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden flex relative shadow-inner">
          {/* Allocated Segment */}
          {node.allocated > 0 && (
            <div 
              style={{ width: `${allocPct}%` }} 
              className="h-full bg-indigo-500 hover:bg-indigo-600 transition-colors flex items-center justify-center group/segment"
            >
            </div>
          )}
          
          {/* Other Segment */}
          {node.other > 0 && (
            <div 
              style={{ width: `${otherPct}%` }} 
              className="h-full bg-amber-400 hover:bg-amber-500 transition-colors group/segment"
            >
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-400">
           No State Data
        </div>
      )}

      {/* GPU Section */}
      {node.gpus && node.gpus.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            {node.gpus.map((gpu, index) => {
                const unused = Math.max(0, gpu.total - gpu.used);
                return (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Layers size={16} className={`shrink-0 ${gpu.used > 0 ? 'text-pink-600' : 'text-slate-300'}`}/>
                            <span>{gpu.used} <span className="text-slate-400">/ {gpu.total}</span></span>
                            <span className="text-slate-500 uppercase text-xs font-bold tracking-wide">
                                {gpu.type === 'gpu' || gpu.type === 'generic' ? 'GPU' : gpu.type}
                            </span>
                        </div>
                        {/* Visual indicator for GPU usage */}
                        <div className="flex gap-1">
                            {/* Used GPUs */}
                            {[...Array(Math.min(gpu.used, 10))].map((_, i) => (
                                <div key={`used-${i}`} className="w-1.5 h-3 bg-pink-500 rounded-sm" title="Active GPU"></div>
                            ))}
                            {/* Unused GPUs */}
                            {[...Array(Math.min(unused, 10))].map((_, i) => (
                                <div key={`unused-${i}`} className="w-1.5 h-3 bg-slate-200 rounded-sm" title="Idle GPU"></div>
                            ))}
                            {(gpu.used + unused > 20) && <span className="text-[10px] text-slate-400 leading-none self-end">+</span>}
                        </div>
                    </div>
                );
            })}
        </div>
      )}

      {/* Stats Details (Only show if CPU data exists) */}
      {node.total > 0 && (
          <div className="flex justify-between items-center mt-3 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span>{node.allocated} Alloc</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>{node.idle} Idle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <span>{node.other} Other</span>
            </div>
          </div>
      )}
    </div>
  );
};

export default NodeCard;