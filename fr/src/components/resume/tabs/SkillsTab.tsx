import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';

interface SkillsTabProps {
  skills: string[];
}

const SkillsTab: React.FC<SkillsTabProps> = ({ skills }) => {
  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <Wrench className="w-5 h-5 text-primary" />
        Skills
      </h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="hover-lift bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 text-sm"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default SkillsTab;