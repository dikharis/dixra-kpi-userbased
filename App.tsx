import React, { useState } from 'react';
import { MOCK_PROJECTS, MOCK_REPORTS, MOCK_USERS } from './constants';
import { DailyReport, Project, ReportStatus, User, UserRole } from './types';
import { DailyReportForm } from './components/DailyReportForm';
import { SupervisorView } from './components/SupervisorView';
import { OwnerDashboard } from './components/OwnerDashboard';
import { ProjectTimeline } from './components/ProjectTimeline';
import { HardHat } from 'lucide-react';

const App: React.FC = () => {
  // State Simulation for Database
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Default to Worker
  const [reports, setReports] = useState<DailyReport[]>(MOCK_REPORTS);
  const [projects] = useState<Project[]>(MOCK_PROJECTS);

  // Handlers
  const handleReportSubmit = (newReport: DailyReport) => {
    setReports(prev => [newReport, ...prev]);
  };

  const handleStatusUpdate = (reportId: string, status: ReportStatus) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center text-blue-700 font-bold text-xl">
                <HardHat className="w-8 h-8 mr-2" />
                SiPro
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Role Switcher for Demo */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                {MOCK_USERS.map(user => (
                  <button
                    key={user.id}
                    onClick={() => setCurrentUser(user)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      currentUser.id === user.id 
                        ? 'bg-white shadow-sm text-blue-700' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {user.role}
                  </button>
                ))}
              </div>

              {/* User Profile */}
              <div className="flex items-center">
                <div className="flex flex-col items-end mr-3 hidden sm:flex">
                  <span className="text-sm font-medium text-gray-900">{currentUser.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{currentUser.role.toLowerCase()}</span>
                </div>
                <img className="h-8 w-8 rounded-full border border-gray-200" src={currentUser.avatar} alt="User" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Role Switcher */}
        <div className="md:hidden px-4 pb-3 overflow-x-auto scrollbar-hide">
             <div className="flex space-x-2">
                {MOCK_USERS.map(user => (
                  <button
                    key={user.id}
                    onClick={() => setCurrentUser(user)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium border ${
                      currentUser.id === user.id 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    As {user.role} ({user.name.split(' ')[0]})
                  </button>
                ))}
             </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW: WORKER */}
        {currentUser.role === UserRole.WORKER && (
          <div className="animate-fade-in">
             <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Halo, {currentUser.name.split(' ')[0]}!</h1>
                <p className="text-gray-600">Silakan isi laporan pekerjaan hari ini.</p>
             </div>
             <DailyReportForm 
                currentUser={currentUser}
                projects={projects}
                onSubmit={handleReportSubmit}
             />
             <div className="mt-8 text-center text-sm text-gray-400">
               <p>Riwayat laporan anda dapat dilihat melalui menu Profil.</p>
             </div>
          </div>
        )}

        {/* VIEW: SUPERVISOR */}
        {currentUser.role === UserRole.SUPERVISOR && (
          <div className="animate-fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                   <SupervisorView 
                      reports={reports}
                      projects={projects}
                      onUpdateStatus={handleStatusUpdate}
                   />
                </div>
                <div>
                   <ProjectTimeline projects={projects} />
                </div>
             </div>
          </div>
        )}

        {/* VIEW: OWNER */}
        {currentUser.role === UserRole.OWNER && (
          <div className="animate-fade-in">
             <OwnerDashboard projects={projects} reports={reports} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;