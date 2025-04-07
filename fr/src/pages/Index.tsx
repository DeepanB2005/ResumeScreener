import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import FileUploadArea from '@/components/FileUploadArea';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import ResumeAnalytics from '@/components/ResumeAnalytics';
import ParticleBackground from '@/components/ParticleBackground';
import Chatbot from '@/components/Chatbot';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseResumes, getParsedResumes } from '@/services/api';

interface FileWithPreview extends File {
  preview?: string;
}

const Index: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResume, setParsedResume] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    document.body.classList.add('no-scrollbar');
    
    return () => {
      document.body.classList.remove('no-scrollbar');
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const showAnalyticsParam = searchParams.get('showAnalytics');
    
    if (showAnalyticsParam === 'true') {
      setShowAnalytics(true);
      
      const fetchParsedResumeData = async () => {
        try {
          try {
            const data = await getParsedResumes();
            
            if (data.resumes && data.resumes.length > 0) {
              setParsedResume(data.resumes[0]);
              return;
            }
          } catch (error) {
            console.log("Backend not available or no resume data, using demo data");
          }
          
          setParsedResume({
            name: "Demo User",
            email: "demo@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            summary: "Experienced software engineer with expertise in web development, cloud computing, and AI integration.",
            skills: ["React", "TypeScript", "UI/UX", "Node.js", "Python", "Machine Learning"],
            experience: [
              {
                title: "Senior Frontend Developer",
                company: "Tech Company Inc.",
                date: "2020 - Present",
                description: "Developed responsive web applications using React and TypeScript. Led a team of 5 developers on various client projects."
              },
              {
                title: "UI Designer",
                company: "Design Studio",
                date: "2018 - 2020",
                description: "Created user interfaces for mobile and web applications. Collaborated with UX researchers to implement user-centered design principles."
              }
            ],
            education: [
              {
                degree: "Bachelor of Science in Computer Science",
                institution: "University of Technology",
                date: "2014 - 2018",
                gpa: "3.8"
              }
            ],
            projects: [
              {
                name: "E-commerce Platform",
                description: "Built a complete e-commerce solution with React, Node.js, and MongoDB.",
                technologies: ["React", "Node.js", "MongoDB", "Express"]
              },
              {
                name: "AI Resume Parser",
                description: "Developed an AI-based resume parsing system using Python and Google's Gemini API.",
                technologies: ["Python", "Flask", "Gemini AI", "OCR"]
              }
            ],
            certifications: ["AWS Certified Developer", "Google Cloud Professional"],
            languages: ["English", "Spanish", "French"],
            achievements: ["Best Developer Award 2022", "Published research paper on AI"]
          });
        } catch (error) {
          console.error('Error fetching resume data:', error);
          toast.error('Failed to load resume data. Please try again.');
          navigate('/');
        }
      };
      
      fetchParsedResumeData();
    } else {
      setShowAnalytics(false);
      setParsedResume(null);
    }
  }, [location.search, navigate]);
  
  const handleFilesSelected = (files: FileWithPreview[]) => {
    setSelectedFiles(files);
  };
  
  const handleParseResumes = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please upload at least one resume file');
      return;
    }
    
    setIsProcessing(true);
    
    const uploadResumes = async () => {
      try {
        try {
          const data = await parseResumes(selectedFiles);
          console.log("Resume parsing response:", data);
          
          setTimeout(handleProcessingComplete, 1000);
          return;
        } catch (error) {
          console.log("Backend not available, simulating processing");
          setTimeout(handleProcessingComplete, 3000);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to parse resumes. Please try again.');
        setIsProcessing(false);
      }
    };
    
    uploadResumes();
  };
  
  const handleProcessingComplete = () => {
    setIsProcessing(false);
    
    navigate('/?showAnalytics=true');
  };
  
  const handleBackToUpload = () => {
    navigate('/');
    setShowAnalytics(false);
    setParsedResume(null);
  };
  
  
  return (
    <div className="min-h-screen">
      
      <div className="absolute top-4 right-4">
        {!isAuthenticated ? (
          <Button
            onClick={() => navigate('/auth')} // Updated to navigate to the correct route
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Login / Sign Up
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Go to Dashboard
          </Button>
        )}
      </div>
      <div 
        className="cursor-glow" 
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(147, 51, 234, 0.3) 40%, transparent 70%)`,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(40px)',
          opacity: 0.6
        }}
      ></div>
      
      <ParticleBackground />
      
      <div className="container mx-auto px-1 py-2">
        <header className="text-center mb-12">
          <div className="inline-block">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in relative z-10 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Resume Parser
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Upload, parse, and analyze resumes with our advanced AI tools for faster candidate screening
          </p>
        </header>
        
        <main className="max-w-5xl mx-auto">
          {showAnalytics ? (
            <>
              <div className="mb-6 flex justify-between items-center animate-fade-in">
                <Button 
                  onClick={handleBackToUpload}
                  variant="outline"
                  className="hover:scale-105 transition-transform"
                >
                  ← Back to Upload
                </Button>
                <h2 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Resume Analysis</h2>
              </div>
              <ResumeAnalytics resumeData={parsedResume} />
            </>
          ) : (
            <FileUploadArea 
              onFilesSelected={handleFilesSelected} 
              onParseClick={handleParseResumes} 
            />
          )}
        </main>
      </div>
      
      <ProcessingAnimation 
        visible={isProcessing} 
        onComplete={handleProcessingComplete}
      />
      
      <Chatbot />
      
      <style>
        {`
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        `}
      </style>
    </div>
  );
};

export default Index;
