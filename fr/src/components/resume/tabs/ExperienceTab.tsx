
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays } from 'lucide-react';
import { BriefcaseIcon } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
}

interface ExperienceTabProps {
  experience: Experience[];
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({ experience }) => {
  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <BriefcaseIcon size={20} className="text-primary" />
        Work Experience
      </h2>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-2 hover:bg-blue-50 p-3 rounded-lg transition-colors">
            {index > 0 && <Separator className="my-3" />}
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg text-primary">{exp.title}</h3>
              {exp.date && (
                <div className="flex items-center gap-1 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <CalendarDays size={14} />
                  <span>{exp.date}</span>
                </div>
              )}
            </div>
            {exp.company && (
              <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
            )}
            {exp.description && (
              <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExperienceTab;
