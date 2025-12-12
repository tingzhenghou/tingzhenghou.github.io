import React, { useMemo } from 'react';
import { SlurmNode, ClusterStats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Activity, Cpu, Server, Layers } from 'lucide-react';

interface StatsOverviewProps {
  nodes: SlurmNode[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ nodes }) => {
  const stats: ClusterStats = useMemo(() => {
    const totalNodes = nodes.length;
    const totalCPUs = nodes.reduce((acc, node) => acc + node.total, 0);
    const totalAllocated = nodes.reduce((acc, node) => acc + node.allocated, 0);
    const totalIdle = nodes.reduce((acc, node) => acc + node.idle, 0);
    const totalOther = nodes.reduce((acc, node) => acc + node.other, 0);
    const avgUtilization = totalCPUs > 0 ? (totalAllocated / totalCPUs) * 100 : 0;
    
    let totalGPUs = 0;
    let usedGPUs = 0;

    nodes.forEach(node => {
        if (node.gpus) {
            node.gpus.forEach(gpu => {
                totalGPUs += gpu.total;
                usedGPUs += gpu.used;
            });
        }
    });

    return {
      totalNodes,
      totalCPUs,
      totalAllocated,
      totalIdle,
      totalOther,
      avgUtilization,
      totalGPUs,
      usedGPUs
    };
  }, [nodes]);

  const chartData = [
    { name: 'Allocated', value: stats.totalAllocated, color: '#6366f1' }, // Indigo 500
    { name: 'Idle', value: stats.totalIdle, color: '#34d399' },      // Emerald 400
    { name: 'Other', value: stats.totalOther, color: '#fbbf24' },     // Amber 400
  ].filter(d => d.value > 0);

  if (nodes.length === 0) return null;

  // Grid layout adaptation:
  // If GPUs exist: 4 cards (Nodes, CPU Usage, GPUs, Load) -> 4 columns
  // If no GPUs: 3 cards (Nodes, CPU Usage, Load) -> 3 columns
  const gridCols = stats.totalGPUs > 0 
    ? "lg:col-span-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
    : "lg:col-span-3 grid-cols-1 sm:grid-cols-3";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {/* Key Metrics Cards */}
      <div className={`grid gap-4 ${gridCols}`}>
        
        {/* Total Nodes */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Server size={20} />
                </div>
                <span className="text-sm font-semibold text-slate-500">Nodes</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{stats.totalNodes}</div>
        </div>

        {/* CPU Usage (Combined Total & Free) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Cpu size={20} />
                </div>
                <span className="text-sm font-semibold text-slate-500">CPU Usage</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-800">{stats.totalAllocated.toLocaleString()}</span>
                <span className="text-lg text-slate-400 font-medium">/ {stats.totalCPUs.toLocaleString()}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
                {stats.totalIdle.toLocaleString()} Free
            </div>
        </div>
        
        {/* GPU Stats (Conditional) */}
        {stats.totalGPUs > 0 && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                      <Layers size={20} />
                  </div>
                  <span className="text-sm font-semibold text-slate-500">GPUs</span>
              </div>
              <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-800">{stats.usedGPUs}</span>
                  <span className="text-lg text-slate-400 font-medium">/ {stats.totalGPUs}</span>
              </div>
          </div>
        )}

        {/* Avg Utilization */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Activity size={20} />
                </div>
                <span className="text-sm font-semibold text-slate-500">Avg CPU Load</span>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-800">{stats.avgUtilization.toFixed(1)}%</span>
            </div>
             <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div style={{ width: `${stats.avgUtilization}%` }} className="h-full bg-indigo-500 rounded-full"></div>
            </div>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[200px]">
         <h4 className="text-sm font-semibold text-slate-500 mb-2 w-full text-left">CPU State Distribution</h4>
         <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: 'none' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                    />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }}/>
                </PieChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};

export default StatsOverview;