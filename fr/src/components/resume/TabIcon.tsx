import React from 'react';
import { IconName } from '../IconProvider';
import { 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Award, 
  FolderGit2,
  Languages,
  Trophy
} from 'lucide-react';

interface TabIconProps {
  name: IconName;
  className?: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, className }) => {
  const iconProps = {
    size: 16,
    className: className || 'text-primary'
  };

  switch (name) {
    case 'skills':
      return <Wrench {...iconProps} />;
    case 'experience':
      return <Briefcase {...iconProps} />;
    case 'education':
      return <GraduationCap {...iconProps} />;
    case 'projects':
      return <FolderGit2 {...iconProps} />;
    case 'certifications':
      return <Award {...iconProps} />;
    case 'languages':
      return <Languages {...iconProps} />;
    case 'achievements':
      return <Trophy {...iconProps} />;
    default:
      return null;
  }
};

export default TabIcon;
