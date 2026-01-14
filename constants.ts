import { DailyReport, Project, ReportStatus, User, UserRole } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Budi Santoso', role: UserRole.WORKER, avatar: 'https://picsum.photos/100/100?random=1' },
  { id: 'u2', name: 'Asep Saepul', role: UserRole.WORKER, avatar: 'https://picsum.photos/100/100?random=2' },
  { id: 'u3', name: 'Pak Mandor Joko', role: UserRole.SUPERVISOR, avatar: 'https://picsum.photos/100/100?random=3' },
  { id: 'u4', name: 'Ibu Owner Rina', role: UserRole.OWNER, avatar: 'https://picsum.photos/100/100?random=4' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Renovasi Ruko Kelapa Gading',
    location: 'Jakarta Utara',
    startDate: '2023-10-01',
    endDate: '2023-12-20',
    progress: 65,
    status: 'ACTIVE',
  },
  {
    id: 'p2',
    name: 'Pembangunan Cluster Serpong',
    location: 'Tangerang Selatan',
    startDate: '2023-09-01',
    endDate: '2024-03-01',
    progress: 30,
    status: 'DELAYED',
  },
];

// Generate some history
export const MOCK_REPORTS: DailyReport[] = [
  {
    id: 'r1',
    projectId: 'p1',
    userId: 'u1',
    userName: 'Budi Santoso',
    date: '2023-11-10',
    jobDesk: 'Pemasangan Keramik Lantai 1',
    description: 'Memasang keramik ukuran 60x60 di area lobby utama.',
    startTime: '08:00',
    endTime: '16:00',
    progressUpdate: 5,
    issues: 'Stok semen menipis',
    status: ReportStatus.APPROVED,
  },
  {
    id: 'r2',
    projectId: 'p1',
    userId: 'u2',
    userName: 'Asep Saepul',
    date: '2023-11-10',
    jobDesk: 'Instalasi Listrik',
    description: 'Menarik kabel untuk titik lampu area belakang.',
    startTime: '08:30',
    endTime: '17:00',
    progressUpdate: 10,
    issues: '-',
    status: ReportStatus.APPROVED,
  },
  {
    id: 'r3',
    projectId: 'p2',
    userId: 'u1',
    userName: 'Budi Santoso',
    date: '2023-11-11',
    jobDesk: 'Pondasi Batu Kali',
    description: 'Galian tanah untuk pondasi pagar samping.',
    startTime: '08:00',
    endTime: '16:00',
    progressUpdate: 2,
    issues: 'Tanah terlalu keras, butuh alat tambahan',
    status: ReportStatus.PENDING,
  },
];
