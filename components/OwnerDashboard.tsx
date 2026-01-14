import React from 'react';
import { Project, DailyReport, ReportStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, AlertOctagon, Briefcase, FileText, Download } from 'lucide-react';

interface OwnerDashboardProps {
  projects: Project[];
  reports: DailyReport[];
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ projects, reports }) => {
  
  // Quick Stats
  const activeProjects = projects.filter(p => p.status === 'ACTIVE').length;
  const delayedProjects = projects.filter(p => p.status === 'DELAYED').length;
  const totalReports = reports.length;
  const issueReports = reports.filter(r => r.issues !== '-' && r.issues !== '').length;

  // Chart Data Preparation
  const reportsByStatus = [
    { name: 'Pending', value: reports.filter(r => r.status === ReportStatus.PENDING).length },
    { name: 'Approved', value: reports.filter(r => r.status === ReportStatus.APPROVED).length },
    { name: 'Rejected', value: reports.filter(r => r.status === ReportStatus.REJECTED).length },
  ];
  
  const COLORS = ['#F59E0B', '#10B981', '#EF4444'];

  const progressData = projects.map(p => ({
    name: p.name.split(' ').slice(0, 2).join(' '), // Shorten name
    progress: p.progress,
    target: 100
  }));

  const handleExport = () => {
    alert("Mengunduh laporan dalam format .xlsx...");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Executive Dashboard</h2>
          <p className="text-gray-500">Ringkasan performa seluruh proyek.</p>
        </div>
        <button 
          onClick={handleExport}
          className="mt-4 md:mt-0 flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Laporan (.xlsx)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Proyek Aktif</p>
            <h3 className="text-2xl font-bold text-gray-900">{activeProjects}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg mr-4">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Proyek Terlambat</p>
            <h3 className="text-2xl font-bold text-gray-900">{delayedProjects}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Progres</p>
            <h3 className="text-2xl font-bold text-gray-900">48%</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg mr-4">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Laporan Masuk</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalReports}</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-gray-800 mb-4">Progres Tiap Proyek</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="progress" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Status Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4">Status Laporan Harian</h3>
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {reportsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
           </div>
           <div className="text-center mt-2 text-sm text-gray-500">
             Total {issueReports} laporan memiliki kendala
           </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Laporan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">Proyek</th>
                <th className="px-6 py-3">Pekerja</th>
                <th className="px-6 py-3">Job Desk</th>
                <th className="px-6 py-3">Kendala</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.slice().reverse().slice(0, 5).map(report => (
                <tr key={report.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap">{report.date}</td>
                  <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{projects.find(p => p.id === report.projectId)?.name || '-'}</td>
                  <td className="px-6 py-3">{report.userName}</td>
                  <td className="px-6 py-3">{report.jobDesk}</td>
                  <td className="px-6 py-3">
                    {report.issues && report.issues !== '-' ? (
                      <span className="text-red-600 flex items-center">
                        <AlertOctagon className="w-3 h-3 mr-1" /> Isu
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === ReportStatus.APPROVED ? 'bg-green-100 text-green-800' :
                      report.status === ReportStatus.REJECTED ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
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