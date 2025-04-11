import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

interface ProjectsTabProps {
  projects: Project[];
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ projects }) => {
  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <FileText className="h-5 w-5 text-primary" />
        Projects
      </h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2 hover:bg-blue-50 p-3 rounded-lg transition-colors">
            {index > 0 && <Separator className="my-3" />}
            <h3 className="font-medium text-lg text-primary">{project.name}</h3>
            {project.description && (
              <p className="text-sm leading-relaxed">{project.description}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" className="text-xs bg-purple-100 text-purple-800 border-purple-300">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectsTab;