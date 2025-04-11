
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import IconProvider from '@/components/IconProvider';

interface CertificationsTabProps {
  certifications: string[];
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ certifications }) => {
  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <Check size={20} className="text-primary" />
        Certifications
      </h2>
      <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        {certifications.map((cert, index) => (
          <li key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-md border-l-4 border-green-400">
            <div className="h-6 w-6 bg-green-200 rounded-full flex items-center justify-center text-green-800">
              <Check size={14} />
            </div>
            <span className="text-sm font-medium">{cert}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CertificationsTab;
