import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import TabIcon from '@/components/resume/TabIcon';

interface AchievementsTabProps {
  achievements: string[];
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <Card className="p-6 glossy-card shadow-md">
        <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Achievements
        </h2>
        <p className="text-muted-foreground">No achievements listed</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 glossy-card shadow-md">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2 border-b pb-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        Achievements
      </h2>
      <ul className="space-y-3">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-colors">
            <div className="h-6 w-6 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 mt-0.5 shrink-0">
              <span className="text-xs">{index + 1}</span>
            </div>
            <p className="text-sm">{achievement}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AchievementsTab;