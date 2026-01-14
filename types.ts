export enum UserRole {
  WORKER = 'WORKER', // Tim Lapangan
  SUPERVISOR = 'SUPERVISOR', // Mandor
  OWNER = 'OWNER', // Pemilik / Manajemen
}

export enum ReportStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  status: 'ACTIVE' | 'COMPLETED' | 'DELAYED';
}

export interface DailyReport {
  id: string;
  projectId: string;
  userId: string; // Worker ID
  userName: string;
  date: string;
  jobDesk: string; // e.g., "Pemasangan Keramik"
  description: string;
  startTime: string;
  endTime: string;
  progressUpdate: number; // Volume or Percentage added today
  issues: string; // Kendala
  status: ReportStatus;
  photoUrl?: string; // Placeholder for image
}
