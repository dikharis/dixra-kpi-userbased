import React from 'react';
import { Project } from '../types';
import { Calendar } from 'lucide-react';

interface ProjectTimelineProps {
  projects: Project[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
        Timeline Proyek
      </h3>
      
      <div className="space-y-8">
        {projects.map(project => (
          <div key={project.id}>
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="font-bold text-gray-900">{project.name}</h4>
                <p className="text-xs text-gray-500">
                  {project.startDate} — {project.endDate}
                </p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                project.status === 'DELAYED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {project.status === 'ACTIVE' ? 'Tepat Waktu' : 'Terlambat'}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${project.status === 'DELAYED' ? 'bg-red-500' : 'bg-blue-600'}`} 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Mulai</span>
              <span>Target: {project.progress}%</span>
              <span>Selesai</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
