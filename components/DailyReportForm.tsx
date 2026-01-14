import React, { useState } from 'react';
import { Project, User, DailyReport, ReportStatus } from '../types';
import { Camera, MapPin, AlertTriangle, CheckCircle, Save } from 'lucide-react';

interface DailyReportFormProps {
  currentUser: User;
  projects: Project[];
  onSubmit: (report: DailyReport) => void;
}

export const DailyReportForm: React.FC<DailyReportFormProps> = ({ currentUser, projects, onSubmit }) => {
  const [projectId, setProjectId] = useState<string>(projects[0]?.id || '');
  const [jobDesk, setJobDesk] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [progressUpdate, setProgressUpdate] = useState<number>(0);
  const [issues, setIssues] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReport: DailyReport = {
      id: Math.random().toString(36).substr(2, 9),
      projectId,
      userId: currentUser.id,
      userName: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      jobDesk,
      description,
      startTime,
      endTime,
      progressUpdate,
      issues: issues || '-',
      status: ReportStatus.PENDING,
      photoUrl: 'https://picsum.photos/400/300', // Mock photo
    };

    // Simulate network delay
    setTimeout(() => {
      onSubmit(newReport);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form partially
      setJobDesk('');
      setDescription('');
      setProgressUpdate(0);
      setIssues('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-green-50 rounded-lg border border-green-200 m-4">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-green-800">Laporan Terkirim!</h2>
        <p className="text-green-700 mt-2">Data berhasil disimpan. Mandor akan segera melakukan validasi.</p>
        <button 
          onClick={() => setShowSuccess(false)}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700"
        >
          Isi Laporan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-sm md:shadow-md rounded-xl overflow-hidden">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="text-lg font-bold flex items-center">
          <Save className="w-5 h-5 mr-2" />
          Input Laporan Harian
        </h2>
        <p className="text-blue-100 text-sm">Selamat bekerja, {currentUser.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        
        {/* Project Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Proyek</label>
          <div className="relative">
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full pl-3 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
              required
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Job Desk */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan (Job Desk)</label>
          <input
            type="text"
            value={jobDesk}
            onChange={(e) => setJobDesk(e.target.value)}
            placeholder="Contoh: Pemasangan Bata"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Detail Kegiatan</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan apa yang dikerjakan hari ini..."
            rows={3}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
            <div className="relative">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Selesai</label>
            <div className="relative">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Progress Volume */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Volume/Progres Harian (%)</label>
          <div className="flex items-center">
            <input
              type="number"
              min="0"
              max="100"
              value={progressUpdate}
              onChange={(e) => setProgressUpdate(Number(e.target.value))}
              className="w-24 p-3 bg-gray-50 border border-gray-300 rounded-lg text-center font-bold"
            />
            <span className="ml-3 text-gray-500 text-sm">Estimasi persentase selesai hari ini</span>
          </div>
        </div>

        {/* Issues */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1 text-amber-500" />
            Kendala / Catatan (Opsional)
          </label>
          <textarea
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
            placeholder="Ada masalah di lapangan? Kekurangan bahan?"
            className="w-full p-3 bg-amber-50 border border-amber-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {/* Photo Upload Simulation */}
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Foto Pekerjaan</label>
           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition">
              <Camera className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">Ketuk untuk ambil foto</p>
              <input type="file" className="hidden" accept="image/*" />
           </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-lg flex justify-center items-center transition-all ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
        </button>

      </form>
    </div>
  );
};