
export enum Severity {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Informational = 'Informational',
}

export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export interface Asset {
  id: string;
  name: string;
  type: 'Domain' | 'Server' | 'Application';
}

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  assetId: string;
  discoveredAt: string;
  poc?: string; // Path to proof of concept file/image
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
}
