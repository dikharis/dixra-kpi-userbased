import React from 'react';
import { DailyReport, Project, ReportStatus } from '../types';
import { Check, X, Clock, AlertTriangle, User, Calendar } from 'lucide-react';

interface SupervisorViewProps {
  reports: DailyReport[];
  projects: Project[];
  onUpdateStatus: (reportId: string, status: ReportStatus) => void;
}

export const SupervisorView: React.FC<SupervisorViewProps> = ({ reports, projects, onUpdateStatus }) => {
  const pendingReports = reports.filter(r => r.status === ReportStatus.PENDING);
  const validatedReports = reports.filter(r => r.status !== ReportStatus.PENDING);

  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Validasi Laporan</h2>
          <p className="text-gray-500">Tinjau laporan harian dari tim lapangan.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
          {pendingReports.length} Laporan Perlu Review
        </div>
      </div>

      {/* Pending List */}
      <div className="space-y-4">
        {pendingReports.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
            <Check className="w-12 h-12 mx-auto text-green-300 mb-3" />
            <p>Semua laporan telah divalidasi!</p>
          </div>
        ) : (
          pendingReports.map(report => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 mb-1 block">
                      {getProjectName(report.projectId)}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">{report.jobDesk}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3 mr-1" />
                    {report.date}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-sm text-gray-600">
                    <p className="mb-2"><span className="font-medium text-gray-900">Deskripsi:</span> {report.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center"><User className="w-3 h-3 mr-1"/> {report.userName}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {report.startTime} - {report.endTime}</span>
                    </div>
                  </div>
                  
                  {report.issues !== '-' && (
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <p className="text-amber-800 text-sm flex items-start">
                        <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Kendala:</strong> {report.issues}</span>
                      </p>
                    </div>
                  )}
                </div>

                {report.photoUrl && (
                  <div className="mb-4">
                     <img src={report.photoUrl} alt="Bukti Kerja" className="w-full h-32 object-cover rounded-lg sm:w-48" />
                  </div>
                )}

                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => onUpdateStatus(report.id, ReportStatus.APPROVED)}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 flex justify-center items-center"
                  >
                    <Check className="w-4 h-4 mr-2" /> Terima
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(report.id, ReportStatus.REJECTED)}
                    className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 flex justify-center items-center"
                  >
                    <X className="w-4 h-4 mr-2" /> Tolak
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* History (Simplified) */}
      <div className="pt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Riwayat Validasi Terakhir</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Pekerja</th>
                <th className="px-4 py-3">Job Desk</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {validatedReports.slice(0, 5).map(report => (
                <tr key={report.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">{report.date}</td>
                  <td className="px-4 py-3">{report.userName}</td>
                  <td className="px-4 py-3">{report.jobDesk}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      report.status === ReportStatus.APPROVED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {report.status === ReportStatus.APPROVED ? 'Diterima' : 'Ditolak'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
