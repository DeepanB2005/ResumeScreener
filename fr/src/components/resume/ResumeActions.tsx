import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ResumeActionsProps {
  resumeId?: string;
}

const ResumeActions: React.FC<ResumeActionsProps> = ({ resumeId }) => {
  const navigate = useNavigate();

  const handleJobMatchClick = () => {
    // Navigate to job recommendations page
    navigate('/jobs');
    toast.success("Redirecting to job recommendations");
  };

  const handleJobMatch = () => {
    if (resumeId) {
      navigate(`/job-matches?resumeId=${resumeId}`);
    }
  };

  return (
    <div className="flex justify-end mt-6">
      <Button 
        onClick={handleJobMatchClick}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        View Job Matches
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default ResumeActions;
