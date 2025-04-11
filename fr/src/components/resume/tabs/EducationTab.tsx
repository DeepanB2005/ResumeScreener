import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, GraduationCap } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  date: string;
  gpa?: string;
}

interface EducationTabProps {
  education: Education[];
}

const EducationTab: React.FC<EducationTabProps> = ({ education }) => {
  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        Education
      </h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2 hover:bg-blue-50 p-3 rounded-lg transition-colors">
            {index > 0 && <Separator className="my-3" />}
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg text-primary">{edu.degree}</h3>
              {edu.date && (
                <div className="flex items-center gap-1 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <CalendarDays size={14} />
                  <span>{edu.date}</span>
                </div>
              )}
            </div>
            {edu.institution && (
              <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
            )}
            {edu.gpa && (
              <p className="text-sm mt-1 bg-green-100 text-green-800 px-2 py-1 rounded inline-block">GPA: {edu.gpa}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EducationTab;