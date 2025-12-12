import { SlurmNode } from '../types';

export const parseSlurmOutput = (input: string): SlurmNode[] => {
  const lines = input.trim().split('\n');
  const nodesMap = new Map<string, SlurmNode>();

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const upper = trimmed.toUpperCase();
    if (upper.startsWith('NODELIST') || upper.startsWith('NODEL') || upper.startsWith('GRES') || upper.startsWith('PARTITION')) return;

    const parts = trimmed.split(/\s+/);

    // Look for the state pattern "A/I/O/T" (e.g., 64/0/0/64)
    const stateIndex = parts.findIndex(p => p.match(/^\d+\/\d+\/\d+\/\d+$/));
    
    if (stateIndex === -1) return;

    const name = parts[0];
    if (!name || nodesMap.has(name)) return; 

    // Parse State
    const stateStr = parts[stateIndex];
    const [allocated, idle, other, total] = stateStr.split('/').map(n => parseInt(n, 10));
    
    const configuredCPUs = total;
    const utilization = total > 0 ? (allocated / total) * 100 : 0;

    // Parse GPUs
    const gpuMap = new Map<string, { total: number; used: number }>();

    for (let i = stateIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (part === '(null)' || part === '(null),') continue;

        // Split comma separated values in a single column
        const items = part.split(',');

        items.forEach(item => {
            if (!item.toLowerCase().startsWith('gpu')) return;

            // Analyze item
            // e.g. gpu:4090:1(S:0) or gpu:4090:1(IDX:0)
            
            const cleanItem = item.split('(')[0]; // gpu:4090:1
            const gpuParts = cleanItem.split(':');
            
            let type = 'gpu';
            let count = 0;
            
            // Parsing type/count
            if (gpuParts.length === 2) {
                 // gpu:0 or gpu:type
                 if (/^\d+$/.test(gpuParts[1])) {
                     count = parseInt(gpuParts[1], 10);
                 } else {
                     type = gpuParts[1];
                     count = 1;
                 }
            } else if (gpuParts.length >= 3) {
                 type = gpuParts[1];
                 const countStr = gpuParts[2];
                 if (/^\d+$/.test(countStr)) {
                     count = parseInt(countStr, 10);
                 }
            }
            
            // If count is 0, we generally ignore it for adding to map, 
            // BUT we should interpret what it means.
            // gpu:0 usually means "none".
            // gpu:4090:0(IDX:N/A) means 0 used.
            
            if (count === 0) return;

            if (!gpuMap.has(type)) {
                gpuMap.set(type, { total: 0, used: 0 });
            }
            const entry = gpuMap.get(type)!;

            const isExplicitTotal = item.includes('(S:');
            const isExplicitUsed = item.includes('(IDX:');

            if (isExplicitUsed) {
                entry.used += count;
            } else if (isExplicitTotal) {
                entry.total += count; 
            } else {
                // Heuristic for "neither"
                // If it looks like gpu:4090:4 without S: or IDX:, usually Total.
                entry.total += count;
            }
        });
    }

    // Post-processing
    // Ensure Total >= Used (Graceful fallback if Total wasn't provided or parsed)
    gpuMap.forEach(stats => {
        if (stats.total < stats.used) {
            stats.total = stats.used;
        }
    });

    const gpus = Array.from(gpuMap.entries())
        .map(([type, stats]) => ({
            type,
            total: stats.total,
            used: stats.used
        }));

    nodesMap.set(name, {
      id: name,
      name,
      configuredCPUs,
      allocated,
      idle,
      other,
      total,
      utilization,
      gpus: gpus.length > 0 ? gpus : undefined
    });
  });

  return Array.from(nodesMap.values());
};

export const DEMO_DATA = `NODELCPUS(A/I/O/T)  GRES                                    GRES_USED                               
cn1  64/0/0/64      (null)                                  gpu:0                                   
cn2  64/0/0/64      (null)                                  gpu:0                                   
cn3  64/0/0/64      (null)                                  gpu:0                                   
cn15 0/96/0/96      (null)                                  gpu:0                                   
cn16 64/32/0/96     (null)                                  gpu:0                                   
cn28 74/22/0/96     gpu:4090:1(S:0)                         gpu:4090:1(IDX:0)                       
cn29 74/22/0/96     gpu:4090:1(S:0)                         gpu:4090:1(IDX:0)                       
cn30 64/32/0/96     gpu:4090:1(S:0)                         gpu:4090:0(IDX:N/A)                     
cn31 64/32/0/96     gpu:4090:1(S:0)                         gpu:4090:0(IDX:N/A)                     
gn1  38/2/0/40      gpu:4090:8(S:0)                         gpu:4090:8(IDX:0-7)                     
gn2  80/16/0/96     gpu:a6000:1(S:0),gpu:4090:6(S:0-1)      gpu:a6000:1(IDX:0),gpu:4090:6(IDX:1-6)`;
