/**
 * API Service for Resume Parser Backend
 * 
 * This service handles all API calls to the Flask Python backend
 */

// Set this to your actual backend URL
const API_BASE_URL = 'http://localhost:5000';

export interface ParsedResume {
  _id?: string;
  source_file?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    date: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    date: string;
    gpa?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  certifications: string[];
  languages: string[];
  achievements: string[];
}

export interface ParseResumesResponse {
  resumes: ParsedResume[];
  message?: string;
  error?: string;
}

export interface GetParsedResumeResponse {
  resumes: ParsedResume[];
}

export interface JobMatch {
  id: number;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  salary: string;
  description: string;
  skills: string[];
}

export interface GetJobMatchesResponse {
  matches: JobMatch[];
}

/**
 * Parse resumes by sending files to the backend
 * @param files List of files to parse
 * @returns Promise with the parsed resume data
 */
export const parseResumes = async (files: File[]): Promise<ParseResumesResponse> => {
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await fetch(`${API_BASE_URL}/parse-resumes`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to parse resumes: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error parsing resumes:', error);
    throw error;
  }
}

/**
 * Get previously parsed resume data
 * @returns Promise with the parsed resume data
 */
export async function getParsedResumes(): Promise<GetParsedResumeResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-parsed-resume`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch parsed resumes: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching parsed resumes:', error);
    throw error;
  }
}

/**
 * Get job matches based on parsed resume
 * @returns Promise with matching job data
 */
export async function getJobMatches(): Promise<JobMatch[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/job-matches`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch job matches: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching job matches:', error);
    throw error;
  }
}

/**
 * Search for specific skills or criteria in parsed resumes
 * @param query Search query
 * @returns Promise with matching results
 */
export async function searchResumes(query: string): Promise<ParsedResume[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search-resumes?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to search resumes: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching resumes:', error);
    throw error;
  }
}

/**
 * Send a message to the chatbot and get a response
 * @param message User's message
 * @returns Promise with the chatbot's reply
 */
export async function sendMessageToChatbot(message: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:5000/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Failed to communicate with chatbot: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error communicating with chatbot:', error);
    throw error;
  }
}

/**
 * Get saved resumes from the backend
 * @returns Promise with the saved resumes data
 */
export const getSavedResumes = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('http://localhost:5000/api/get-saved-resumes', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch saved resumes');
  }

  return response.json();
};

/**
 * Delete a resume by ID
 * @param resumeId ID of the resume to delete
 * @returns Promise that resolves when the resume is deleted
 */
export const deleteResume = async (resumeId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${API_BASE_URL}/api/delete-resume/${encodeURIComponent(resumeId)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete resume and associated files');
  }
};

/**
 * Delete all resumes
 * @returns Promise that resolves when all resumes are deleted
 */
export const deleteAllResumes = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const response = await fetch(`${API_BASE_URL}/api/delete-all-resumes`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete all resumes');
  }
};

// Add the function to the default export
export default {
  parseResumes,
  getParsedResumes,
  getJobMatches,
  searchResumes,
  sendMessageToChatbot, // Add this line
  getSavedResumes, // Add this line
  deleteResume, // Add this line
  deleteAllResumes, // Add this line
};
