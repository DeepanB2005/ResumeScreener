import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParsedResume } from '@/services/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResumeBasicInfo from './resume/ResumeBasicInfo';
import ResumeTabContent from './resume/ResumeTabContent';
import ResumeOverview from './resume/ResumeOverview';
import ResumeActions from './resume/ResumeActions';
import TabIcon from './resume/TabIcon';
import { IconName, VALID_ICONS } from './IconProvider';
import SaveResumeButton from './SaveResumeButton';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteResume, deleteAllResumes } from '@/services/api';

const tabSections = VALID_ICONS;

interface ResumeAnalyticsProps {
  resumesData: ParsedResume[];
}

const ResumeAnalytics: React.FC<ResumeAnalyticsProps> = ({ resumesData }) => {
  const [activeTab, setActiveTab] = useState<IconName>('skills');
  const [selectedResumeIndex, setSelectedResumeIndex] = useState(0);
  const [filteredResumes, setFilteredResumes] = useState<ParsedResume[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<number | null>(null);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  useEffect(() => {
    if (resumesData && resumesData.length > 0) {
      console.log('Resumes Data:', resumesData); // Debugging
      setFilteredResumes(resumesData);
    }
  }, [resumesData]);

  if (!resumesData || resumesData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No resume data available</p>
      </div>
    );
  }

  const currentResume = filteredResumes[selectedResumeIndex] || {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: []
  };

  const shouldRenderSection = (key: string) => {
    if (!currentResume) return false;
    const value = currentResume[key as keyof ParsedResume];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    return value !== undefined && value !== null && value !== '';
  };

  const handleDeleteClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setResumeToDelete(index);
    setShowDeleteDialog(true);
  };

  // Update the handleConfirmDelete function
  const handleConfirmDelete = async () => {
    if (resumeToDelete === null) return;

    try {
      const resumeToRemove = filteredResumes[resumeToDelete];
      if (!resumeToRemove) {
        throw new Error('Resume not found');
      }

      const resumeId = resumeToRemove._id || resumeToRemove.source_file;
      if (!resumeId) {
        throw new Error('No valid identifier found for resume');
      }

      await deleteResume(resumeId);

      // Update local state
      const newResumes = filteredResumes.filter((_, idx) => idx !== resumeToDelete);
      setFilteredResumes(newResumes);
      
      if (selectedResumeIndex >= newResumes.length) {
        setSelectedResumeIndex(Math.max(0, newResumes.length - 1));
      }
      
      toast.success('Resume and associated files deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete resume';
      toast.error(errorMessage);
      console.error('Delete error:', error);
    } finally {
      setShowDeleteDialog(false);
      setResumeToDelete(null);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllResumes();
      
      // Update local state
      setFilteredResumes([]);
      setSelectedResumeIndex(0);
      toast.success('All resumes deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resumes');
      console.error('Delete all error:', error);
    } finally {
      setShowDeleteAllDialog(false);
    }
  };

  return (
    <div className="space-y-6 w-full mx-auto animate-slide-in">
      {/* Resume Selection Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Resume Analysis</h2>
            {filteredResumes.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowDeleteAllDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
                Delete All
              </Button>
            )}
          </div>
          <div className="w-full md:w-96">
            <Select
              value={selectedResumeIndex.toString()}
              onValueChange={(value) => setSelectedResumeIndex(parseInt(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a resume to view" />
              </SelectTrigger>
              <SelectContent>
                {filteredResumes.map((resume, index) => (
                  <SelectItem 
                    key={index} 
                    value={index.toString()}
                    className="flex justify-between items-center group"
                  >
                    <span>{resume.name} - {resume.email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDeleteClick(index, e)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resume Navigation */}
        <div className="flex gap-4 overflow-x-auto py-4 mt-4">
          {filteredResumes.map((resume, index) => (
            <Card
              key={index}
              className={`p-4 min-w-[200px] cursor-pointer transition-all relative group ${
                index === selectedResumeIndex 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedResumeIndex(index)}
            >
              <div className="space-y-2">
                <h3 className="font-medium truncate">{resume.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{resume.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDeleteClick(index, e)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Current Resume Details */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="flex-1">
            <ResumeBasicInfo resumeData={currentResume} />
          </div>
          <div className="flex-shrink-0">
            <SaveResumeButton resumeData={currentResume} />
          </div>
        </div>

        {currentResume?.summary && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
            <p className="text-gray-600">{currentResume.summary}</p>
          </div>
        )}
      </Card>

      {/* Resume Content Tabs */}
      <Tabs defaultValue='skills' className="w-full">
        <TabsList className="flex flex-wrap gap-2">
          {tabSections.map((section) => (
            shouldRenderSection(section) && (
              <TabsTrigger 
                key={section} 
                value={section}
                className="capitalize"
              >
                <TabIcon name={section} className="mr-2 h-4 w-4" />
                {section}
              </TabsTrigger>
            )
          ))}
        </TabsList>

        <div className="mt-6">
          {tabSections.map((section) => (
            shouldRenderSection(section) && (
              <TabsContent key={section} value={section}>
                <ResumeTabContent 
                  tabId={section} 
                  resumeData={currentResume} 
                />
              </TabsContent>
            )
          ))}
        </div>
      </Tabs>

      {/* Resume Overview */}
      <ResumeOverview resumeData={currentResume} />
      
      {/* Actions */}
      <ResumeActions resumeId={currentResume._id} />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Confirmation Dialog */}
      <AlertDialog open={showDeleteAllDialog} onOpenChange={setShowDeleteAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Resumes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all resumes? This action cannot be undone and will remove {filteredResumes.length} resumes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAll}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeAnalytics;
