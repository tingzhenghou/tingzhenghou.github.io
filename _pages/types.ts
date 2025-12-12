export interface SlurmNode {
  id: string; // Unique ID based on name and index
  name: string;
  configuredCPUs: number;
  allocated: number;
  idle: number;
  other: number;
  total: number;
  utilization: number; // 0-100
  gpus?: {
    type: string;
    total: number;
    used: number;
  }[];
}

export interface ClusterStats {
  totalNodes: number;
  totalCPUs: number;
  totalAllocated: number;
  totalIdle: number;
  totalOther: number;
  avgUtilization: number;
  totalGPUs: number;
  usedGPUs: number;
}