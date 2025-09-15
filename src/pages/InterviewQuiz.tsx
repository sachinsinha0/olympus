import { Box, Stack, Typography, Paper, Button, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, LinearProgress, Drawer, Switch, List, ListItem, ListItemButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar } from '@mui/material';
import { X, Clock, Check, ChevronLeft, ChevronRight, Bookmark, MessageCircle, ChevronDown, CheckCircle, Circle, Camera, VideoOff, ChartNoAxesCombined, Atom, UserCog, Square, RotateCcw, CheckCircle2, Code, FileText } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import Editor from '@monaco-editor/react';
import MDEditor from '@uiw/react-md-editor';

// Interview data structure (same as InterviewDetails)
const interviewData = {
  '1': {
    title: 'Sales Round 1 Interview',
    subtitle: 'Learning Consultant',
    dateRange: '11 Jun, 8:30 AM - 15 Jun, 8:30 PM',
    duration: '60 minutes',
    attempts: 2,
    icon: <ChartNoAxesCombined size={40} />,
    iconColor: '#6F43C0'
  },
  '2': {
    title: 'Senior Data Scientist Round 1 Interview',
    subtitle: 'Senior Data Scientist',
    dateRange: '12 Jun, 9:00 AM - 16 Jun, 6:00 PM',
    duration: '45 minutes',
    attempts: 1,
    icon: <Atom size={40} />,
    iconColor: '#0054D6'
  },
  '3': {
    title: 'Program Operations Round 1 Interview',
    subtitle: 'Program Manager',
    dateRange: '10 Jun, 10:00 AM - 14 Jun, 5:00 PM',
    duration: '60 minutes',
    attempts: 0,
    icon: <UserCog size={40} />,
    iconColor: '#006D3C'
  }
};

export default function InterviewQuiz() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const interview = interviewData[id as keyof typeof interviewData] || interviewData['1'];
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState<Record<number, string>>({});
  const [codingAnswers, setCodingAnswers] = useState<Record<number, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 59, seconds: 0 });
  const [questionsMenuOpen, setQuestionsMenuOpen] = useState(false);
  const [showOnlyRevisits, setShowOnlyRevisits] = useState(false);
  const [revisitQuestions, setRevisitQuestions] = useState<number[]>([]);
  const [revisitMenuAnchor, setRevisitMenuAnchor] = useState<null | HTMLElement>(null);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [rightSidebarType, setRightSidebarType] = useState<'camera' | 'chat' | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'admin', timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [recordingWarningOpen, setRecordingWarningOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [autoSubmitOnStop, setAutoSubmitOnStop] = useState(false);
  const [questionWidth, setQuestionWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<number>>(new Set());
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  
  // Video recording states
  const [videoRecordingState, setVideoRecordingState] = useState<'idle' | 'recording' | 'playback' | 'submitted'>('idle');
  const [recordingTimeLeft, setRecordingTimeLeft] = useState(120); // 2 minutes in seconds
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const videoRecorderRef = useRef<Webcam>(null);

  // Dynamic questions based on interview ID
  const getQuestions = (interviewId: string) => {
    if (interviewId === '1') {
      // Sales Round 1 Interview - All 10 questions are video-based
      return [
        {
          id: 1,
          type: 'video',
          question: "Can you share a bit about your background, professional journey, and what excites you about this opportunity?",
          description: "Please provide a detailed explanation of your background and motivation.",
          duration: 120, // 2 minutes in seconds
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 2,
          type: 'video',
          question: "How do you define success in a sales role, and what personal habits help you consistently aim for it?",
          description: "Share your perspective on success and the habits that drive your performance.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 3,
          type: 'video',
          question: "Share an example of a time when a potential customer had strong objections or concerns. How did you handle the situation, and what was the outcome?",
          description: "Provide a specific example of handling customer objections and the results achieved.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 4,
          type: 'video',
          question: "What steps do you take to build trust and rapport with a new client? Share an example if possible.",
          description: "Explain your approach to building relationships and provide a concrete example.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 5,
          type: 'video',
          question: "What's a recent skill you've learned or a piece of feedback you've received that helped you improve? How did you apply it?",
          description: "Share a specific example of learning and growth in your professional development.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 6,
          type: 'video',
          question: "Describe a time you had to meet a challenging sales target or deadline. How did you approach it, and what did you learn?",
          description: "Provide a detailed example of handling pressure and achieving challenging goals.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 7,
          type: 'video',
          question: "What keeps you going when work gets tough or monotonous? What's your inner drive?",
          description: "Share your motivation and resilience strategies in challenging situations.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 8,
          type: 'video',
          question: "How do you identify a customer's true needs, even when they're not clearly expressed? Walk us through your approach.",
          description: "Explain your process for uncovering and understanding customer needs.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 9,
          type: 'video',
          question: "What's a professional achievement you're especially proud of, and what did it take to get there?",
          description: "Share a significant accomplishment and the effort that went into achieving it.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        },
        {
          id: 10,
          type: 'video',
          question: "Sales strategies and tools keep evolving. Tell us about a time you had to quickly adapt to a new process, tool, or system. How did you handle it?",
          description: "Provide an example of your adaptability and learning agility in sales.",
          duration: 120,
          marks: 10,
          completed: false,
          isRevisit: false
        }
      ];
    } else if (interviewId === '2') {
      // Senior Data Scientist Round 1 Interview - Mixed question types
      return [
        {
          id: 1,
          type: 'video',
          question: "Tell us about a recent data science project you led. What was the problem, and how did your solution create impact?",
          description: "Share details about a data science project you led, including the problem statement and the impact of your solution.",
          duration: 180, // 3 minutes in seconds
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 2,
          type: 'video',
          question: "How do you approach understanding business requirements and converting them into a data science problem?",
          description: "Explain your methodology for translating business needs into actionable data science problems.",
          duration: 180,
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 3,
          type: 'video',
          question: "How do you stay updated with the latest developments in data science and machine learning?",
          description: "Describe your approach to staying current with data science and ML trends and technologies.",
          duration: 180,
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 4,
          type: 'coding',
          question: "You have a DataFrame with timestamped user login data. Write a function to calculate the average session duration per user.",
          description: "Write a Python function that calculates average session duration for each user from login data.",
          language: 'python',
          marks: 12,
          completed: false,
          isRevisit: false,
          starterCode: `import pandas as pd

def calculate_avg_session_duration(login_data):
    """
    Calculate average session duration per user from timestamped login data.
    
    Args:
        login_data: DataFrame with columns 'user_id', 'timestamp', 'action' (login/logout)
    
    Returns:
        DataFrame with 'user_id' and 'avg_session_duration' columns
    """
    # Your code here
    pass`
        },
        {
          id: 5,
          type: 'coding',
          question: "Given a dataset with user transactions, write code to find the top 3 most purchased items per user.",
          description: "Write a Python function that finds the top 3 most purchased items for each user.",
          language: 'python',
          marks: 12,
          completed: false,
          isRevisit: false,
          starterCode: `def find_top_3_items_per_user(transactions):
    """
    Given a dataset with user transactions, find the top 3 most purchased items per user.
    
    Args:
        transactions: List of dictionaries with 'user_id' and 'item_id' keys
    
    Returns:
        Dictionary with user_id as key and list of top 3 items as value
    """
    # Your code here
    pass`
        },
        {
          id: 6,
          type: 'coding',
          question: "Write a function to calculate precision, recall, and F1-score given true labels and predicted labels.",
          description: "Implement a Python function that calculates precision, recall, and F1-score for classification evaluation.",
          language: 'python',
          marks: 12,
          completed: false,
          isRevisit: false,
          starterCode: `def calculate_metrics(true_labels, predicted_labels):
    """
    Calculate precision, recall, and F1-score for classification evaluation.
    
    Args:
        true_labels: List of true class labels
        predicted_labels: List of predicted class labels
    
    Returns:
        Dictionary with 'precision', 'recall', and 'f1_score' keys
    """
    # Your code here
    pass`
        },
        {
          id: 7,
          type: 'mcq',
          question: "Which of the following techniques is best suited for reducing multicollinearity in linear regression?",
          options: [
            "One-hot encoding",
            "PCA",
            "Decision Trees",
            "Normalization"
          ],
          marks: 8,
          completed: false,
          description: "Select the most appropriate technique for handling multicollinearity in linear regression models.",
          isRevisit: false
        },
        {
          id: 8,
          type: 'mcq',
          question: "What does the ROC curve represent?",
          options: [
            "Recall vs. Precision",
            "Accuracy vs. Error",
            "True Positive Rate vs. False Positive Rate",
            "F1 Score vs. Precision"
          ],
          marks: 8,
          completed: false,
          description: "Choose the correct interpretation of what the ROC curve represents in classification evaluation.",
          isRevisit: false
        },
        {
          id: 9,
          type: 'mcq',
          question: "Which method is most appropriate for handling imbalanced classification problems?",
          options: [
            "Increasing learning rate",
            "Data normalization",
            "SMOTE",
            "Grid Search"
          ],
          marks: 8,
          completed: false,
          description: "Select the best approach for dealing with imbalanced datasets in classification problems.",
          isRevisit: false
        },
        {
          id: 10,
          type: 'mcq',
          question: "In k-means clustering, what does the \"k\" represent?",
          options: [
            "Number of features",
            "Number of clusters",
            "Number of iterations",
            "Number of dimensions"
          ],
          marks: 8,
          completed: false,
          description: "Choose the correct definition of 'k' in k-means clustering algorithm.",
          isRevisit: false
        }
      ];
    } else if (interviewId === '3') {
      // Program Operations Round 1 Interview - AI-Based Self-Interview Questions
      return [
        {
          id: 1,
          type: 'text',
          question: "Describe a time when you had to coordinate with multiple teams to ensure the smooth execution of a program. What challenges did you face and how did you overcome them?",
          description: "Provide a detailed written response about your experience coordinating with multiple teams and the strategies you used to overcome challenges.",
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 2,
          type: 'text',
          question: "How do you prioritize tasks when handling multiple programs or operations simultaneously?",
          description: "Explain your approach to task prioritization and time management when working on multiple programs.",
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 3,
          type: 'text',
          question: "What steps would you take to identify and fix inefficiencies in an ongoing operational process?",
          description: "Describe your methodology for identifying inefficiencies and implementing improvements in operational processes.",
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 4,
          type: 'text',
          question: "How do you ensure accuracy and consistency in program reporting and documentation?",
          description: "Explain your approach to maintaining high standards in reporting and documentation processes.",
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 5,
          type: 'video',
          question: "Tell us about a time when your attention to detail prevented a major issue in program execution.",
          description: "Share a specific example where your attention to detail helped prevent a significant problem.",
          duration: 120,
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 6,
          type: 'video',
          question: "How do you handle last-minute changes or disruptions in planned operations?",
          description: "Describe your approach to managing unexpected changes and maintaining operational continuity.",
          duration: 120,
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 7,
          type: 'video',
          question: "What does 'operational excellence' mean to you, and how do you strive to achieve it in your work?",
          description: "Share your understanding of operational excellence and your personal approach to achieving it.",
          duration: 120,
          marks: 15,
          completed: false,
          isRevisit: false
        },
        {
          id: 8,
          type: 'mcq',
          question: "Which of the following tools is most commonly used for managing and tracking project timelines?",
          options: [
            "Slack",
            "Trello",
            "Google Meet",
            "Zoom"
          ],
          marks: 10,
          completed: false,
          description: "Select the most appropriate tool for project timeline management.",
          isRevisit: false
        },
        {
          id: 9,
          type: 'mcq',
          question: "What is the primary purpose of an SOP (Standard Operating Procedure)?",
          options: [
            "To evaluate team performance",
            "To increase sales",
            "To standardize and streamline processes",
            "To create marketing plans"
          ],
          marks: 10,
          completed: false,
          description: "Choose the correct definition of SOP in operations management.",
          isRevisit: false
        },
        {
          id: 10,
          type: 'mcq',
          question: "In operations, a **SLA (Service Level Agreement)** is best defined as:",
          options: [
            "A project plan template",
            "A customer satisfaction survey",
            "An agreement on expected service standards",
            "A billing format"
          ],
          marks: 10,
          completed: false,
          description: "Select the most accurate definition of SLA in operational context.",
          isRevisit: false
        }
      ];
    } else {
      // Default questions for other interviews (all MCQ for now)
      return [
        {
          id: 1,
          type: 'mcq',
          question: "What is the best initial step when you encounter missing values in a dataset?",
          options: [
            "Drop all missing values immediately",
            "Replace them with zeros", 
            "Analyze the pattern and extent of missingness",
            "Fill all missing values with the column mean"
          ],
          marks: 4,
          completed: true,
          description: "Imagine you are an architect planning to design a new public library.",
          isRevisit: false
        },
        {
          id: 2,
          type: 'mcq',
          question: "How do you evaluate the performance of a classification model?",
          options: [
            "Only using accuracy",
            "Using multiple metrics like precision, recall, and F1-score",
            "Only using the training accuracy",
            "Using only the validation accuracy"
          ],
          marks: 4,
          completed: true,
          description: "What is the difference between supervised and unsupervised learning in data science?",
          isRevisit: false
        },
        {
          id: 3,
          type: 'mcq',
          question: "What are some common techniques for handling missing data in a dataset?",
          options: [
            "Only mean imputation",
            "Only median imputation",
            "Multiple techniques including mean, median, mode, and advanced methods",
            "Only dropping missing values"
          ],
          marks: 4,
          completed: false,
          description: "How does feature selection contribute to improving the performance of a machine learning model?",
          isRevisit: false
        },
        {
          id: 4,
          type: 'mcq',
          question: "How do you handle overfitting in machine learning models?",
          options: [
            "Only by increasing model complexity",
            "Only by reducing training data",
            "Using techniques like regularization, cross-validation, and early stopping",
            "Only by increasing the number of features"
          ],
          marks: 4,
          completed: false,
          description: "What are some common techniques for handling missing data in a dataset?",
          isRevisit: false
        },
        {
          id: 5,
          type: 'mcq',
          question: "What is the purpose of cross-validation in machine learning?",
          options: [
            "To increase model complexity",
            "To reduce training time",
            "To assess model performance and prevent overfitting",
            "To increase the number of features"
          ],
          marks: 4,
          completed: false,
          description: "How do you evaluate the performance of a classification model?",
          isRevisit: true
        },
        {
          id: 6,
          type: 'mcq',
          question: "What is the difference between bias and variance in machine learning?",
          options: [
            "Bias is always higher than variance",
            "Variance is always higher than bias",
            "Bias is error due to oversimplification, variance is error due to overfitting",
            "They are the same thing"
          ],
          marks: 4,
          completed: false,
          description: "What are some common techniques for handling missing data in a dataset?",
          isRevisit: false
        }
      ];
    }
  };

  const questions = getQuestions(id || '1');
  const totalQuestions = questions.length;

  const currentQ = questions.find(q => q.id === currentQuestion) || questions[0];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer reached 00:00:00
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Update selected answer when current question changes
  useEffect(() => {
    setSelectedAnswer(questionAnswers[currentQuestion] || '');
  }, [currentQuestion, questionAnswers]);

  // Auto-request camera permission on component mount
  useEffect(() => {
    requestCameraPermission();
  }, []);

  // Reset video recording state when question changes
  useEffect(() => {
    // Always reset video recording state first
    setVideoRecordingState('idle');
    setRecordedVideo(null);
    setRecordingTimeLeft(120);
    setAutoSubmitOnStop(false);
  }, [currentQuestion]);

  // Restore video state if there's a saved answer for this question
  useEffect(() => {
    if (currentQ.type === 'video') {
      const existingVideoAnswer = questionAnswers[currentQuestion];
      if (existingVideoAnswer && existingVideoAnswer !== '') {
        // Restore submitted state if video answer exists
        setVideoRecordingState('submitted');
        setRecordedVideo(existingVideoAnswer);
      }
    }
  }, [currentQuestion, questionAnswers, currentQ.type]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setSelectedAnswer(answer);
    // Store the answer for this question
    setQuestionAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    // Mark current question as attempted
    setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handleCodingChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCodingAnswers(prev => ({ ...prev, [currentQuestion]: value }));
      // Mark current question as attempted
      setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
    }
  };

  const handleTextChange = (value: string) => {
    setTextAnswers(prev => ({ ...prev, [currentQuestion]: value }));
    // Mark current question as attempted
    setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      // Show warning if currently recording
      if (videoRecordingState === 'recording') {
        setRecordingWarningOpen(true);
        return;
      }
      // Auto-submit video if in playback state (user recorded but didn't submit)
      if (currentQ.type === 'video' && videoRecordingState === 'playback' && recordedVideo) {
        setVideoRecordingState('submitted');
        setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
        setQuestionAnswers(prev => ({ 
          ...prev, 
          [currentQuestion]: recordedVideo 
        }));
      }
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      // Show warning if currently recording
      if (videoRecordingState === 'recording') {
        setRecordingWarningOpen(true);
        return;
      }
      // Auto-submit video if in playback state (user recorded but didn't submit)
      if (currentQ.type === 'video' && videoRecordingState === 'playback' && recordedVideo) {
        setVideoRecordingState('submitted');
        setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
        setQuestionAnswers(prev => ({ 
          ...prev, 
          [currentQuestion]: recordedVideo 
        }));
      }
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitDialogOpen(true);
  };

  const handleRecordingWarningClose = () => {
    setRecordingWarningOpen(false);
  };

  const handleStopRecordingAndNavigate = (direction: 'next' | 'previous') => {
    // Set flag to auto-submit when recording stops
    if (videoRecordingState === 'recording') {
      setAutoSubmitOnStop(true);
      stopVideoRecording();
    } else if (recordedVideo) {
      // If already recorded, submit immediately
      setVideoRecordingState('submitted');
      setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
      setQuestionAnswers(prev => ({ 
        ...prev, 
        [currentQuestion]: recordedVideo 
      }));
    }
    
    setRecordingWarningOpen(false);
    
    // Navigate to the next/previous question
    if (direction === 'next' && currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === 'previous' && currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleClose = () => {
    setExitDialogOpen(true);
  };

  const handleExitConfirm = () => {
    // Auto-submit any pending video recordings
    if (currentQ.type === 'video' && videoRecordingState === 'playback' && recordedVideo) {
      setVideoRecordingState('submitted');
      setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
      setQuestionAnswers(prev => ({ 
        ...prev, 
        [currentQuestion]: recordedVideo 
      }));
    }
    
    setExitDialogOpen(false);
    // Navigate back to the interview details page instead of dashboard
    navigate(`/interview/${id}`);
  };

  const handleExitCancel = () => {
    setExitDialogOpen(false);
  };

  const handleQuestionsMenuToggle = () => {
    setQuestionsMenuOpen(!questionsMenuOpen);
  };

  const handleQuestionSelect = (questionId: number) => {
    setCurrentQuestion(questionId);
    setQuestionsMenuOpen(false);
  };

  const handleRevisitToggle = (questionId: number) => {
    setRevisitQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const handleRevisitMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setRevisitMenuAnchor(event.currentTarget);
  };

  const handleRevisitMenuClose = () => {
    setRevisitMenuAnchor(null);
  };

  const handleRightSidebarOpen = (type: 'camera' | 'chat') => {
    if (rightSidebarOpen && rightSidebarType === type) {
      // If clicking the same tab, close the sidebar
      setRightSidebarOpen(false);
      setRightSidebarType(null);
    } else {
      // Open sidebar or switch to different tab
      setRightSidebarType(type);
      setRightSidebarOpen(true);
      if (type === 'camera') {
        requestCameraPermission();
      }
    }
  };

  const requestCameraPermission = async () => {
    try {
      setCameraPermission('checking');
      
      // Request camera permission (video only, no audio)
      const cameraStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      
      setCameraPermission('granted');
      setCameraError(null);
      
      // Stop the stream immediately as we'll use it in the Webcam component
      cameraStream.getTracks().forEach(track => track.stop());
    } catch (_error) {
      console.error('Error accessing camera:', _error);
      setCameraPermission('denied');
      setCameraError('Camera access denied. Please allow access to continue.');
    }
  };


  const handleCameraError = (_error: string | DOMException) => {
    setCameraError('Camera access error. Please check your camera permissions.');
    setCameraPermission('denied');
  };

  // Video recording functions
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        
        // Check if recording was stopped due to timer expiration or auto-submit
        if (recordingTimeLeft <= 1 || autoSubmitOnStop) {
          // Auto-submit when timer runs out or user wants to navigate
          setVideoRecordingState('submitted');
          setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
          setQuestionAnswers(prev => ({ 
            ...prev, 
            [currentQuestion]: videoUrl 
          }));
          setAutoSubmitOnStop(false); // Reset flag
        } else {
          // Normal stop - go to playback state
          setVideoRecordingState('playback');
        }
        setRecordingTimeLeft(120); // Reset timer
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setVideoRecordingState('recording');
      
      // Start countdown timer
      const timer = setInterval(() => {
        setRecordingTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            stopVideoRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error starting video recording:', error);
      setCameraError('Failed to start video recording. Please check your camera permissions.');
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      // Stop all tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const submitVideoRecording = () => {
    setVideoRecordingState('submitted');
    // Mark current question as attempted
    setAttemptedQuestions(prev => new Set([...prev, currentQuestion]));
    // Store video answer
    setQuestionAnswers(prev => ({ 
      ...prev, 
      [currentQuestion]: recordedVideo || 'Video recorded' 
    }));
  };

  const reRecordVideo = () => {
    setVideoRecordingState('idle');
    setRecordedVideo(null);
    setRecordingTimeLeft(120);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRightSidebarClose = () => {
    setRightSidebarOpen(false);
    setRightSidebarType(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'user' as const,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate admin response after 1 second
      setTimeout(() => {
        const adminMessage = {
          id: Date.now() + 1,
          text: "Hi, I’m here to assist you during the exam. Feel free to reach out if you face any issues.",
          sender: 'admin' as const,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, adminMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSubmitConfirm = () => {
    setSubmitDialogOpen(false);
    // Navigate to attempts page to show all user attempts after successful submission
    navigate(`/attempts/${id}`);
  };

  const handleSubmitCancel = () => {
    setSubmitDialogOpen(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const container = document.getElementById('question-answer-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Constrain between 20% and 80%
    const constrainedPercentage = Math.min(Math.max(percentage, 20), 80);
    setQuestionWidth(constrainedPercentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    setQuestionWidth(50); // Reset to equal distribution
  };

  const filteredQuestions = showOnlyRevisits 
    ? questions.filter(q => revisitQuestions.includes(q.id)) 
    : questions;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', minWidth: '100vw', display: 'flex' }}>
      {/* Main Content Area */}
      <Box sx={{ 
        flex: rightSidebarOpen ? '0 0 calc(100% - 376px)' : '0 0 calc(100% - 56px)', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'flex 0.3s linear'
      }}>
        {/* Top Navigation */}
        <Box sx={{pl: 3, pt: 1, pr: 0, pb: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={handleClose} size="small">
                <X size={16} />
              </IconButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1" fontWeight={500} color="text.primary" sx={{ fontSize: 16 }}>
                  {interview.title}
                </Typography>
                <Typography variant="subtitle1" fontWeight={500} color="text.primary" sx={{ fontSize: 16 }}>
                  •
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
                  {totalQuestions} Questions
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              {/* Revisit Dropdown */}
              {revisitQuestions.length > 0 && (
                <>
                  <Button
                    onClick={handleRevisitMenuOpen}
                    startIcon={<Bookmark size={16} />}
                    endIcon={<ChevronDown size={16} />}
                    sx={{
                      textTransform: 'none',
                      maxHeight: '34px',
                      fontSize: 14,
                      color: '#8D4F00',
                      bgcolor: '#FFDCC0',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.04)'
                      }
                    }}
                  >
                    {revisitQuestions.length} Revisits
                  </Button>
                  
                  <Menu
                    anchorEl={revisitMenuAnchor}
                    open={Boolean(revisitMenuAnchor)}
                    onClose={handleRevisitMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{
                      '& .MuiPaper-root': {
                        minWidth: 200,
                        mt: 1,
                        boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(33,33,33,0.06)',
                      }
                    }}
                  >
                    {revisitQuestions.map(questionId => (
                      <MenuItem
                        key={questionId}
                        onClick={() => {
                          setCurrentQuestion(questionId);
                          handleRevisitMenuClose();
                        }}
                        sx={{
                          fontSize: 14,
                          color: 'rgba(33,33,33,0.92)',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.04)'
                          }
                        }}
                      >
                        Question {questionId}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {/* Timer */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                px: 2, 
                py: 0.5,
                borderRadius: 1,
                minWidth: '120px',
                justifyContent: 'center',
                //border: '1px solid rgba(33,33,33,0.06)'
              }}>
                <Clock size={16} />
                <Typography variant="body2" fontWeight={500} sx={{ 
                  fontSize: 14, 
                  letterSpacing: '0.4px',
                  minWidth: '72px',
                  textAlign: 'left'
                }}>
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </Typography>
              </Box>

              {/* Submit Button */}
              <Button
                variant="outlined"
                startIcon={<Check size={16} />}
                onClick={handleSubmit}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#196ae5',
                  borderColor: 'rgba(25,106,229,0.5)',
                  backgroundColor: 'rgba(25,106,229,0.04)',
                  px: 2,
                  py: 0.5
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Main Quiz Content */}
        <Box 
          id="question-answer-container"
          sx={{ 
            flex: 1, 
            display: 'flex', 
            pl: 3, 
            pt: 0, 
            pr: 0, 
            pb: 0, 
            gap: 0,
            position: 'relative'
          }}
        >
          {/* Question Container */}
          <Paper 
            elevation={0} 
            sx={{ 
              width: `${questionWidth}%`,
              minWidth: '30%',
              borderRadius: 1, 
              border: '1px solid rgba(33,33,33,0.06)',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }}
          >
            <Box sx={{ borderBottom: '1px solid rgba(33,33,33,0.06)', pl: 2, pb: 1.5, pr: 2 ,pt: 1.5}}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    onClick={handleQuestionsMenuToggle}
                    sx={{ 
                      bgcolor: 'rgba(25,106,229,0.08)', 
                      px: 2, 
                      py: 1, 
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textTransform: 'none',
                      color: 'rgba(33,33,33,0.92)',
                      '&:hover': {
                        bgcolor: 'rgba(25,106,229,0.12)'
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: 14 }}>
                      Question {currentQuestion}
                    </Typography>
                    <ChevronDown size={16} />
                  </Button>
                  <Typography variant="caption" fontWeight={600} sx={{ fontSize: 10, letterSpacing: '1.25px', textTransform: 'uppercase' }}>
                    {currentQ.marks} Marks
                  </Typography>
                </Stack>
                <Button
                  variant={revisitQuestions.includes(currentQuestion) ? "contained" : "text"}
                  startIcon={<Bookmark size={16} />}
                  onClick={() => handleRevisitToggle(currentQuestion)}
                  sx={{ 
                    textTransform: 'none', 
                    fontSize: 14, 
                    maxHeight: '36px',
                    boxShadow: 'none',
                    color: revisitQuestions.includes(currentQuestion) ? '#8D4F00' : 'rgba(33,33,33,0.64)',
                    bgcolor: revisitQuestions.includes(currentQuestion) ? '#FFDCC0' : 'transparent',
                    '&:hover': {
                      bgcolor: revisitQuestions.includes(currentQuestion) ? '#FFDCC0' : 'rgba(0,0,0,0.04)'
                    }
                  }}
                >
                  Revisit
                </Button>
              </Stack>
            </Box>

            <Box sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(33,33,33,0.92)', mb: 2 }}>
                {currentQ.question}
              </Typography>
              
            </Box>
          </Paper>

          {/* Draggable Divider */}
          <Box 
            className="divider-container"
            sx={{ 
              width: 8, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'col-resize',
              position: 'relative',
              marginLeft: '-2px',
              marginRight: '-2px',
              '&:hover .divider-handle': {
                width: 4,
                height: '100%',
                bgcolor: '#196ae5'
              }
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
          >
            <Box 
              className="divider-handle"
              sx={{ 
                width: 2, 
                height: '80px', 
                bgcolor: 'rgba(33,33,33,0.3)', 
                borderRadius: 2,
                transition: 'all 0.2s ease'
              }} 
            />
          </Box>

          {/* Answer Container */}
          <Paper 
            elevation={0} 
            sx={{ 
              width: `${100 - questionWidth}%`,
              minWidth: '30%',
              borderRadius: 1, 
              border: '1px solid rgba(33,33,33,0.06)',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }}
          >
            {currentQ.type === 'mcq' ? (
              <>
                <Box sx={{ borderBottom: '1px solid rgba(33,33,33,0.06)', p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle1" fontWeight={500} sx={{ fontSize: 16 }}>
                      Answer Choices
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 12, letterSpacing: '0.4px' }}>
                      Select the right answer
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ p: 2 }}>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      value={selectedAnswer}
                      onChange={handleAnswerChange}
                    >
                      {(currentQ as any).options?.map((option: string, index: number) => (
                        <FormControlLabel
                          key={index}
                          value={option}
                          control={<Radio />}
                          label={
                            <Typography sx={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(33,33,33,0.92)' }}>
                              {option}
                            </Typography>
                          }
                          sx={{
                            mb: 1,
                            p: 1,
                            ml: 0,
                            borderRadius: 1,
                            border: '1px solid rgba(33,33,33,0.06)',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.02)'
                            }
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </>
            ) : currentQ.type === 'coding' ? (
              <>
                <Box sx={{ borderBottom: '1px solid rgba(33,33,33,0.06)', p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Code size={20} color="#196ae5" />
                    <Typography variant="subtitle1" fontWeight={500} sx={{ fontSize: 16 }}>
                      Code Editor
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 12, letterSpacing: '0.4px' }}>
                      Write your solution
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ p: 0, height: 'calc(100vh - 166px)' }}>
                  <Editor
                    height="100%"
                    defaultLanguage={(currentQ as any).language || 'python'}
                    value={codingAnswers[currentQuestion] || (currentQ as any).starterCode || ''}
                    onChange={handleCodingChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 4,
                      wordWrap: 'on',
                      folding: true,
                      lineDecorationsWidth: 0,
                      lineNumbersMinChars: 3,
                      renderLineHighlight: 'line',
                      selectOnLineNumbers: true,
                      glyphMargin: false,
                      contextmenu: true,
                      mouseWheelZoom: true,
                      smoothScrolling: true,
                      cursorBlinking: 'blink',
                      cursorSmoothCaretAnimation: 'on',
                      cursorStyle: 'line',
                      fontLigatures: true,
                      bracketPairColorization: { enabled: true },
                      guides: {
                        bracketPairs: true,
                        indentation: true
                      }
                    }}
                  />
                </Box>
              </>
            ) : currentQ.type === 'text' ? (
              <>
                <Box sx={{ borderBottom: '1px solid rgba(33,33,33,0.06)', p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <FileText size={20} color="#196ae5" />
                    <Typography variant="subtitle1" fontWeight={500} sx={{ fontSize: 16 }}>
                      Answer Choice
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 12, letterSpacing: '0.4px' }}>
                      Write your answer
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ p: 2, height: 'calc(100vh - 196px)' }}>
                  <Box sx={{
                    '& .w-md-editor-text': {
                      minHeight: 'calc(100vh - 226px) !important'
                    }
                  }}>
                    <MDEditor
                      value={textAnswers[currentQuestion] || ''}
                      onChange={(val) => handleTextChange(val || '')}
                      height="calc(100vh - 196px)"
                      data-color-mode="light"
                      preview="edit"
                      hideToolbar={false}
                      visibleDragbar={false}
                    />
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ borderBottom: '1px solid rgba(33,33,33,0.06)', p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle1" fontWeight={500} sx={{ fontSize: 16 }}>
                      Answer Choice
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 12, letterSpacing: '0.4px' }}>
                      {videoRecordingState === 'idle' && 'Record your answer'}
                      {videoRecordingState === 'recording' && 'Recording in progress'}
                      {videoRecordingState === 'playback' && 'Review your recording'}
                      {videoRecordingState === 'submitted' && 'Recording submitted'}
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ p: 2 }}>
                  {videoRecordingState === 'idle' && (
                    <Box sx={{ 
                      bgcolor: 'rgba(0,0,0,0.02)', 
                      border: '1px solid rgba(0,0,0,0.12)', 
                      borderRadius: 1, 
                      p: 4, 
                      textAlign: 'center',
                      minHeight: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Camera size={48} color="#666" style={{ marginBottom: 16 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontSize: 18 }}>
                        Video Recording
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
                      Start recording your video response. You have  {currentQ.type === 'video' && (currentQ as any).duration ? `${Math.floor((currentQ as any).duration / 60)}:${((currentQ as any).duration % 60).toString().padStart(2, '0')}` : '2:00'} minutes to answer.
                      </Typography>
                      <Button 
                        variant="contained" 
                        startIcon={<Camera size={18} />}
                        onClick={startVideoRecording}
                        sx={{ 
                          px: 3, 
                          py: 1.5, 
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500
                        }}
                      >
                        Start Recording
                      </Button>
                    </Box>
                  )}

                  {videoRecordingState === 'recording' && (
                    <Box sx={{ 
                      bgcolor: '#000', 
                      borderRadius: 1, 
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 300
                    }}>
                      <Webcam
                        ref={videoRecorderRef}
                        audio={true}
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                      {/* Recording indicator and timer */}
                      <Box sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        right: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Box sx={{
                          bgcolor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <Box sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: '#ff3333',
                            animation: 'pulse 1s infinite'
                          }} />
                          <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>
                            REC
                          </Typography>
                        </Box>
                        <Box sx={{
                          bgcolor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 1
                        }}>
                          <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>
                            {formatTime(recordingTimeLeft)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Stop recording button */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}>
                        <Button
                          variant="contained"
                          startIcon={<Square size={18} />}
                          onClick={stopVideoRecording}
                          sx={{
                            bgcolor: '#ff3333',
                            color: 'white',
                            px: 3,
                            py: 1.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: '#cc0000'
                            }
                          }}
                        >
                          Stop Recording
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {videoRecordingState === 'playback' && (
                    <Box sx={{ 
                      bgcolor: '#000', 
                      borderRadius: 1, 
                      overflow: 'hidden',
                      minHeight: 300
                    }}>
                      {recordedVideo && (
                        <video
                          src={recordedVideo}
                          controls
                          style={{ 
                            width: '100%', 
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                      
                      {/* Action buttons */}
                      <Box sx={{ 
                        p: 2, 
                        display: 'flex', 
                        gap: 2, 
                        justifyContent: 'center',
                        bgcolor: 'rgba(0,0,0,0.05)'
                      }}>
                        <Button
                          variant="outlined"
                          startIcon={<RotateCcw size={18} />}
                          onClick={reRecordVideo}
                          sx={{
                            px: 3,
                            py: 1.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            bgcolor: '#ffffff'
                          }}
                        >
                          Re-record
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<CheckCircle2 size={18} />}
                          onClick={submitVideoRecording}
                          sx={{
                            px: 3,
                            py: 1.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 500
                          }}
                        >
                          Submit Recording
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {videoRecordingState === 'submitted' && (
                    <Box sx={{ 
                      bgcolor: 'rgba(0,109,60,0.08)', 
                      border: '1px solid rgba(0,109,60,0.2)', 
                      borderRadius: 1, 
                      p: 3, 
                      textAlign: 'center'
                    }}>
                      <CheckCircle2 size={48} color="#006D3C" style={{ marginBottom: 16 }} />
                      <Typography variant="h6" color="#006D3C" sx={{ mb: 1, fontSize: 18, fontWeight: 600 }}>
                        Recording Submitted
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Your video response has been successfully recorded and submitted.
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<RotateCcw size={18} />}
                        onClick={reRecordVideo}
                        sx={{
                          px: 3,
                          py: 1.5,
                          borderRadius: 1,
                          textTransform: 'none',
                          fontWeight: 500,
                          borderColor: '#006D3C',
                          color: '#006D3C',
                          '&:hover': {
                            borderColor: '#004d2a',
                            color: '#004d2a'
                          }
                        }}
                      >
                        Re-record
                      </Button>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Paper>
        </Box>

        {/* Bottom Navigation */}
        <Box sx={{px: 0, py: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box sx={{ width: 232 }} />

            {/* Progress Section */}
            <Stack alignItems="center" spacing={1} paddingLeft={4}>
              <Typography variant="caption" fontWeight={600} sx={{ fontSize: 10, letterSpacing: '1.25px', textTransform: 'uppercase' }}>
                {attemptedQuestions.size}/{totalQuestions} Attempted
              </Typography>
              <Box sx={{ width: 200 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={(attemptedQuestions.size / totalQuestions) * 100} 
                  sx={{ 
                    height: 4, 
                    borderRadius: 2,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#196ae5'
                    }
                  }} 
                />
              </Box>
            </Stack>

            {/* Navigation Buttons */}
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<ChevronLeft size={16} />}
                onClick={handlePrevious}
                disabled={currentQuestion === 1}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                  minWidth: 112,
                  borderColor: 'rgba(33,33,33,0.92)'
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                endIcon={<ChevronRight size={16} />}
                onClick={handleNext}
                disabled={currentQuestion === totalQuestions}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: 14,
                  minWidth: 112,
                  backgroundColor: '#196ae5',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Right Sidebar - User Camera & Chat */}
      <Box sx={{ 
        width: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6.5,
        gap: 3
      }}>
        {/* User Live Camera */}
        <Box 
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            border: rightSidebarOpen && rightSidebarType === 'camera' ? '2px solid #196ae5' : '2px solid rgba(33,33,33,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: rightSidebarOpen && rightSidebarType === 'camera' ? 'rgba(25, 106, 229, 0.08)' : 'transparent',
            overflow: 'hidden',
            position: 'relative',
            '&:hover': {
              bgcolor: rightSidebarOpen && rightSidebarType === 'camera' ? 'rgba(25, 106, 229, 0.12)' : 'rgba(0,0,0,0.04)'
            }
          }}
          onClick={() => handleRightSidebarOpen('camera')}
        >
          {rightSidebarOpen && rightSidebarType === 'camera' ? (
            // Show icon when expanded
            <Camera size={20} color="#196ae5" />
          ) : cameraPermission === 'granted' ? (
            // Show live feed when not expanded
            <Webcam
              ref={webcamRef}
              audio={false}
              width={40}
              height={40}
              style={{ objectFit: 'cover', borderRadius: '4px' }}
              onUserMedia={() => {
                setCameraError(null);
              }}
              onUserMediaError={handleCameraError}
            />
          ) : cameraPermission === 'checking' ? (
            <Box sx={{ 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: '#f5f5f5'
            }}>
              <Camera size={16} color="#666" />
            </Box>
          ) : (
            <Box sx={{ 
              width: 40, 
              height: 40, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: '#f5f5f5'
            }}>
              <Camera size={16} color="#666" />
            </Box>
          )}
          {/* Live indicator - only show when not expanded */}
          {cameraPermission === 'granted' && !(rightSidebarOpen && rightSidebarType === 'camera') && (
            <Box sx={{ 
              position: 'absolute', 
              top: 4, 
              right: 4, 
              width: 8, 
              height: 8, 
              borderRadius: '50%',
              backgroundColor: '#4caf50',
              border: '2px solid white'
            }} />
          )}
        </Box>

        {/* Chat Icon */}
        <Box 
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: rightSidebarOpen && rightSidebarType === 'chat' ? 'rgba(25, 106, 229, 0.08)' : 'transparent',
            color: rightSidebarOpen && rightSidebarType === 'chat' ? '#196ae5' : 'inherit',
            borderRadius: 1,
            '&:hover': {
              bgcolor: rightSidebarOpen && rightSidebarType === 'chat' ? 'rgba(25, 106, 229, 0.12)' : 'rgba(0,0,0,0.04)'
            }
          }}
          onClick={() => handleRightSidebarOpen('chat')}
        >
          <MessageCircle size={20} />
        </Box>
      </Box>

      {/* Expandable Right Sidebar */}
      <Box sx={{
        width: 320,
        height: '100vh',
        bgcolor: 'white',
        borderLeft: '1px solid rgba(33,33,33,0.06)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        right: rightSidebarOpen ? 0 : -320, // Slide in from right
        top: 0,
        zIndex: 1000,
        boxShadow: '-4px 0 8px rgba(0,0,0,0.1)',
        transition: 'right 0.3s linear'
      }}>
        {/* Right Sidebar Header */}
        <Box sx={{
          p: 2,
          borderBottom: '1px solid rgba(33,33,33,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600 }}>
            {rightSidebarType === 'camera' ? 'Live Camera' : 'Invigilator'}
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleRightSidebarClose}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Right Sidebar Content */}
        <Box sx={{ flex: 1, p: 2 }}>
          {rightSidebarType === 'camera' ? (
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {/* Camera Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Live Camera
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: cameraPermission === 'granted' ? '#4caf50' : '#f44336'
                  }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {cameraPermission === 'granted' ? 'Live' : 'Offline'}
                  </Typography>
                </Box>
              </Box>

              {/* Camera Feed */}
              <Box sx={{
                width: '100%',
                height: 200,
                borderRadius: 1,
                overflow: 'hidden',
                bgcolor: '#000',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cameraPermission === 'checking' ? (
                  <Box sx={{ color: 'white', textAlign: 'center' }}>
                    <Typography variant="body2">Requesting camera access...</Typography>
                  </Box>
                ) : cameraPermission === 'denied' ? (
                  <Box sx={{ color: 'white', textAlign: 'center', p: 2 }}>
                    <Camera size={32} style={{ marginBottom: 8 }} />
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Camera access denied
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={requestCameraPermission}
                      sx={{ fontSize: 12 }}
                    >
                      Retry
                    </Button>
                  </Box>
                ) : cameraPermission === 'granted' ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'cover' }}
                    onUserMedia={() => {
                      setCameraError(null);
                    }}
                    onUserMediaError={handleCameraError}
                  />
                ) : (
                  <Box sx={{ color: 'white', textAlign: 'center' }}>
                    <VideoOff size={32} style={{ marginBottom: 8 }} />
                    <Typography variant="body2">Camera unavailable</Typography>
                  </Box>
                )}
              </Box>

              {/* Camera Status */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {cameraPermission === 'granted' ? 'Recording' : 'Camera off'}
                </Typography>
              </Box>
            </Box>
            ) : (
              <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                {/* Messages Area */}
                <Box sx={{
                  flex: 1,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                  border: '1px solid rgba(33,33,33,0.06)',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  {chatMessages.length === 0 ? (
                    <Box sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <MessageCircle size={32} color="rgba(33,33,33,0.3)" />
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        No messages yet
                      </Typography>
                      <Typography variant="caption" color="text.secondary" textAlign="center">
                        Invigilator instructions will appear here.
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{
                      flex: 1,
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      {chatMessages.map((message) => (
                        <Box
                          key={message.id}
                          sx={{
                            display: 'flex',
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            mb: 1
                          }}
                        >
                          <Box sx={{
                            maxWidth: '80%',
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: message.sender === 'user' ? '#196ae5' : 'white',
                            color: message.sender === 'user' ? 'white' : 'text.primary',
                            border: message.sender === 'admin' ? '1px solid rgba(33,33,33,0.06)' : 'none',
                            boxShadow: message.sender === 'admin' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                          }}>
                            <Typography variant="body2" sx={{ fontSize: 14, lineHeight: 1.4 }}>
                              {message.text}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: 11, 
                                opacity: 0.7, 
                                display: 'block', 
                                mt: 0.5,
                                textAlign: 'right'
                              }}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                
                {/* Input Area */}
                <Box sx={{
                  display: 'flex',
                  gap: 1
                }}>
                  <Box sx={{
                    flex: 1,
                    height: 40,
                    border: '1px solid rgba(33,33,33,0.06)',
                    borderRadius: 1,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'white'
                  }}>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        outline: 'none',
                        width: '100%',
                        fontSize: '14px',
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        color: 'rgba(33,33,33,0.92)'
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    sx={{
                      minWidth: 40,
                      height: 40,
                      px: 2,
                      backgroundColor: '#196ae5',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      },
                      '&:disabled': {
                        backgroundColor: 'rgba(0,0,0,0.12)',
                        color: 'rgba(0,0,0,0.26)'
                      }
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            )}
        </Box>
      </Box>

      {/* Questions Menu Drawer */}
      <Drawer
        anchor="left"
        open={questionsMenuOpen}
        onClose={handleQuestionsMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 360,
            bgcolor: 'white',
            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.07), 0px 3px 14px 2px rgba(0,0,0,0.06)',
            borderRight: '1px solid rgba(33,33,33,0.06)'
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(33,33,33,0.06)' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight={500} sx={{ fontSize: 16, color: 'rgba(33,33,33,0.92)' }}>
              Questions
            </Typography>
            <IconButton onClick={handleQuestionsMenuToggle} size="small">
              <X size={16} />
            </IconButton>
          </Stack>
        </Box>

        {/* Filter Section */}
        <Box sx={{ px: 2, py: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" sx={{ fontSize: 12, color: 'rgba(33,33,33,0.92)' }}>
              Show Only Revisits
            </Typography>
            <Switch
              checked={showOnlyRevisits}
              onChange={(e) => setShowOnlyRevisits(e.target.checked)}
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#196ae5',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#196ae5',
                },
              }}
            />
          </Stack>
        </Box>

        {/* Questions List */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List sx={{ p: 0 }}>
            {filteredQuestions.map((question) => (
              <ListItem key={question.id} disablePadding>
                <ListItemButton
                  onClick={() => handleQuestionSelect(question.id)}
                  sx={{
                    p: 2,
                    borderBottom: '1px solid rgba(33,33,33,0.06)',
                    bgcolor: question.id === currentQuestion ? 'rgba(25,106,229,0.08)' : 'transparent',
                    '&:hover': {
                      bgcolor: question.id === currentQuestion ? 'rgba(25,106,229,0.12)' : 'rgba(0,0,0,0.04)'
                    }
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {question.completed ? (
                          <CheckCircle size={20} color="#196ae5" />
                        ) : (
                          <Circle size={20} color="rgba(33,33,33,0.6)" />
                        )}
                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: 14, color: 'rgba(33,33,33,0.92)' }}>
                          Question {question.id}
                        </Typography>
                        {question.type === 'coding' && (
                          <Code size={16} color="#196ae5" />
                        )}
                        {question.type === 'text' && (
                          <FileText size={16} color="#196ae5" />
                        )}
                        {revisitQuestions.includes(question.id) && (
                          <Bookmark size={18} color="#FF9800" />
                        )}
                      </Stack>
                      <Typography variant="caption" fontWeight={600} sx={{ fontSize: 10, color: 'rgba(33,33,33,0.72)', textTransform: 'uppercase', letterSpacing: '1.25px' }}>
                        {question.marks} marks
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontSize: 12, color: 'rgba(33,33,33,0.92)', lineHeight: 1.66 }}>
                      {question.description}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Submit Confirmation Dialog */}
      <Dialog
        open={submitDialogOpen}
        onClose={handleSubmitCancel}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            p: 0
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          pt: 3, 
          px: 3,
          textAlign: 'left',
          fontSize: 18,
          fontWeight: 600,
          color: 'text.primary'
        }}>
          Submit Interview
        </DialogTitle>
        
        <DialogContent sx={{ px: 3, py: 0 }}>
          <Box sx={{ textAlign: 'left', mb: 0 }}>
            <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', fontSize: 16 }}>
              Are you sure you want to submit your interview? You will not be able to resume this interview once submitted.
            </Typography>
            
            {/* Questions Attempted Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" fontWeight={600} sx={{ 
                fontSize: 10, 
                letterSpacing: '1.25px', 
                textTransform: 'uppercase',
                color: 'text.primary',
                display: 'block',
                mb: 1
              }}>
                {attemptedQuestions.size}/{totalQuestions} Attempted
              </Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={(attemptedQuestions.size / totalQuestions) * 100} 
                  sx={{ 
                    height: 4, 
                    borderRadius: 2,
                    backgroundColor: 'rgba(33,33,33,0.08)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#196ae5',
                      borderRadius: 2
                    }
                  }} 
                />
              </Box>
            </Box>

            {/* Marked for Revisit Section */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Bookmark size={16} color="#FF9800" />
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary'
                }}>
                  {revisitQuestions.length} Marked for Revisit
                </Typography>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          px: 3, 
          pb: 3, 
          pt: 2,
          gap: 1,
          justifyContent: 'flex-end'
        }}>
          <Button
            onClick={handleSubmitCancel}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 80,
              height: 36,
              borderColor: 'rgba(33,33,33,0.3)',
              color: 'text.primary',
              fontSize: 14,
              '&:hover': {
                borderColor: 'rgba(33,33,33,0.5)',
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitConfirm}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 80,
              height: 36,
              backgroundColor: '#196ae5',
              fontSize: 14,
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Recording Warning Dialog */}
      <Dialog
        open={recordingWarningOpen}
        onClose={handleRecordingWarningClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            boxShadow: '0px 24px 48px -12px rgba(16,24,40,0.18)',
            maxWidth: 480
          }
        }}
      >
        <DialogTitle sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ fontSize: 20, lineHeight: '24px' }}>
            Video Recording in Progress
          </Typography>
          <IconButton onClick={handleRecordingWarningClose} size="small" sx={{ p: 0.5 }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 1 }}>
          <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px', mb: 2 }}>
          You are currently recording a video response. If you navigate to another question now, your current recording will be submitted.
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
            Would you like to submit and continue?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="text"
            onClick={handleRecordingWarningClose}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 16,
              color: '#0054d6',
              px: 2,
              py: 1
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleStopRecordingAndNavigate('next')}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 16,
              backgroundColor: 'primary.main',
              color: 'white',
              px: 2,
              py: 1
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Exit Confirmation Dialog */}
      <Dialog
        open={exitDialogOpen}
        onClose={handleExitCancel}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            boxShadow: '0px 24px 48px -12px rgba(16,24,40,0.18)',
            maxWidth: 640
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          pt: 3, 
          px: 3,
          textAlign: 'left',
          fontSize: 20,
          fontWeight: 600,
          color: '#1a1b1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          Are you sure you want to exit the interview?
          <IconButton onClick={handleExitCancel} size="small" sx={{ p: 0.5 }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Typography variant="body2" sx={{ 
            color: '#1a1b1e', 
            fontSize: 14,
            lineHeight: '20px'
          }}>
            Exiting now will auto-submit your interview and you will not be able to make any further changes.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ px: 4, py: 3, gap: 2, justifyContent: 'flex-end' }}>
          <Button
            onClick={handleExitCancel}
            variant="text"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              color: '#0054d6',
              px: 3,
              py: 1,
              minWidth: 80
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExitConfirm}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              backgroundColor: '#0054d6',
              color: 'white',
              px: 3,
              py: 1,
              minWidth: 80,
              '&:hover': {
                backgroundColor: '#0041a3'
              }
            }}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Camera Error Snackbar */}
      <Snackbar
        open={!!cameraError}
        autoHideDuration={6000}
        onClose={() => setCameraError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setCameraError(null)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {cameraError}
        </Alert>
      </Snackbar>
    </Box>
  );
}
