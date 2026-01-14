# Sistem Laporan Pekerjaan Kontraktor (SiPro)

## 1. Gambaran Arsitektur Sistem
Sistem ini dibangun sebagai Single Page Application (SPA) menggunakan React.
- **Frontend**: React + TypeScript + Tailwind CSS.
- **State Management**: React Context / Hooks (Simulasi data lokal untuk demo).
- **Architecture Pattern**: Component-based architecture dengan pemisahan antara UI (Components) dan Data Logic (Services/Hooks).

## 2. Struktur Database (Simulasi)
Berikut adalah desain skema database (Relational) yang direpresentasikan dalam TypeScript interfaces:

- **Users**: `id, name, role (WORKER, SUPERVISOR, OWNER), avatar`
- **Projects**: `id, name, location, startDate, endDate, status, progress`
- **Reports**: `id, projectId, userId, date, jobDesk, description, progressUpdate, status (PENDING, APPROVED), issues`

## 3. User Flow
1. **Worker**: Login -> Pilih Proyek -> Isi Form Harian (Foto, Deskripsi, Progres) -> Submit.
2. **Supervisor**: Login -> Dashboard Validasi -> Review Laporan -> Approve/Reject.
3. **Owner**: Login -> Main Dashboard -> Melihat Grafik Progres & Isu -> Download Excel.

## 4. Tech Stack Rekomendasi
- **Frontend**: React, Tailwind, Recharts (Visualisasi), Lucide (Icons).
- **Backend (Real World)**: Node.js/GoLang, PostgreSQL (Data Relasional), S3 (Penyimpanan Foto).
- **Infra**: Docker, Nginx.

## 5. Ruang Lingkup MVP
- Input Laporan Harian (CRUD).
- Validasi Mandor.
- Dashboard Visual Statistik.
- Manajemen Data Proyek Sederhana.
