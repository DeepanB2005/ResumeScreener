import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

interface LanguagesTabProps {
  languages: string[];
}

const LanguagesTab: React.FC<LanguagesTabProps> = ({ languages }) => {
  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <Globe className="h-5 w-5 text-primary" />
        Languages
      </h2>
      <div className="flex flex-wrap gap-3">
        {languages.map((language, index) => (
          <Badge key={index} className="py-1.5 px-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm">
            {language}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default LanguagesTab;