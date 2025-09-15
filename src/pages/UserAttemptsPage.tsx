import { Box, Stack, Typography, Paper, IconButton, Tabs, Tab, LinearProgress, Chip, Accordion, AccordionSummary, AccordionDetails, Container } from '@mui/material';
import { X, FileText, Award, CheckCircle2, XCircle, ChevronDown, ChevronLeft, ChevronRight, Atom, ChartNoAxesCombined, UserCog } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getInterviewData } from '../data/interviewData';

export default function UserAttemptsPage() {
  const navigate = useNavigate();
  const { attemptId } = useParams<{ userId: string; attemptId: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState(1); // First question expanded by default
  const [activeRecordingTab, setActiveRecordingTab] = useState(0); // 0 for Video, 1 for Anomalies
  const [selectedAnomaly, setSelectedAnomaly] = useState(0); // Currently selected anomaly index

  // Get the appropriate interview data based on attemptId (interview ID)
  // attemptId is the interview type ID (1, 2, 3), userId is the individual attempt ID
  const userAttemptData = getInterviewData(attemptId || '1');

  // Get the correct icon and color based on interview ID
  const getInterviewIcon = (interviewId: string) => {
    switch (interviewId) {
      case '1': // Sales Round 1 Interview
        return {
          icon: <ChartNoAxesCombined size={32} />,
          color: '#6F43C0'
        };
      case '2': // Senior Data Scientist Round 1 Interview
        return {
          icon: <Atom size={32} />,
          color: '#0054D6'
        };
      case '3': // Program Operations Round 1 Interview
        return {
          icon: <UserCog size={32} />,
          color: '#006D3C'
        };
      default:
        return {
          icon: <ChartNoAxesCombined size={32} />,
          color: '#6F43C0'
        };
    }
  };

  const interviewIcon = getInterviewIcon(attemptId || '1');

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAccordionChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedQuestion(isExpanded ? panel : 0);
  };

  const handleRecordingTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveRecordingTab(newValue);
  };

  const handleAnomalySelect = (anomalyIndex: number) => {
    setSelectedAnomaly(anomalyIndex);
  };

  const handlePreviousAnomaly = () => {
    if (selectedAnomaly > 0) {
      setSelectedAnomaly(selectedAnomaly - 1);
    }
  };

  const handleNextAnomaly = () => {
    if (selectedAnomaly < userAttemptData.anomalies.length - 1) {
      setSelectedAnomaly(selectedAnomaly + 1);
    }
  };


  return (
    <Box sx={{ bgcolor: '#f2f4f7', minHeight: '100vh', minWidth: '100vw' }}>
      {/* Top Header */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid rgba(117,118,128,0.16)',
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Container maxWidth="xl" sx={{ maxWidth: { xs: 'lg', lg: 1200, xl: 1536 } }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" sx={{ 
                fontSize: 16, 
                fontWeight: 600, 
                color: '#1a1b1e'
              }}>
                {userAttemptData.userName}
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#1a1b1e' }}>
                &bull;
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: 16, 
                fontWeight: 400, 
                color: '#1a1b1e'
              }}>
                {userAttemptData.userEmail}
              </Typography>
            </Stack>
            <IconButton onClick={handleClose} sx={{ p: 0.5 }}>
              <X size={24} />
            </IconButton>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ maxWidth: { xs: 'lg', lg: 1200, xl: 1536 } }}>
        <Box sx={{ py: 3, overflowY: 'auto' }}>
        {/* Interview Details Card */}
        <Paper elevation={0} sx={{ 
          borderRadius: 2, 
          border: '1px solid rgba(117,118,128,0.16)',
          mb: 2,
          overflow: 'hidden'
        }}>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{
                width: 64,
                height: 64,
                borderRadius: 1,
                border: `1px solid ${interviewIcon.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: interviewIcon.color
              }}>
                {interviewIcon.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ 
                  fontSize: 16, 
                  fontWeight: 600, 
                  color: '#1a1b1e',
                  mb: 0.5
                }}>
                  {userAttemptData.interviewTitle}
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontSize: 14, 
                  color: '#45464f'
                }}>
                  {userAttemptData.interviewRole} • {userAttemptData.interviewDate}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={3}>
              {/* Summary Section */}
              <Box sx={{ 
                flex: 1, 
                bgcolor: '#f4f3f7', 
                borderRadius: 1, 
                p: 2 
              }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <FileText size={20} color="#45464f" />
                  <Typography variant="subtitle1" sx={{ 
                    fontSize: 16, 
                    fontWeight: 500, 
                    color: '#1a1b1e'
                  }}>
                    Summary
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ 
                  fontSize: 14, 
                  color: '#45464f',
                  lineHeight: 1.4
                }}>
                  {userAttemptData.summary}
                </Typography>
              </Box>

              {/* Overall Score Section */}
              <Box sx={{ 
                width: 220, 
                bgcolor: '#f4f3f7', 
                borderRadius: 1, 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <Award size={20} color="#45464f" />
                  <Typography variant="subtitle1" sx={{ 
                    fontSize: 16, 
                    fontWeight: 500, 
                    color: '#1a1b1e'
                  }}>
                    Overall Score
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 2 }}>
                  <Typography variant="h4" sx={{ 
                    fontSize: 24, 
                    fontWeight: 600, 
                    color: '#1a1b1e'
                  }}>
                    {userAttemptData.overallScore}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontSize: 14, 
                    color: '#45464f'
                  }}>
                    / 100
                  </Typography>
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={userAttemptData.overallScore} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 5,
                      backgroundColor: '#e4e2e6',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#0054d6',
                        borderRadius: 5
                      }
                    }} 
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* Tabs Section */}
        <Box sx={{ ml: 2 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#0054d6',
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              label="Skill Ratings" 
              sx={{ 
                textTransform: 'none',
                fontWeight: activeTab === 0 ? 600 : 400,
                color: activeTab === 0 ? '#0054d6' : '#45464f',
                fontSize: 14
              }} 
            />
            <Tab 
              label="Question Ratings" 
              sx={{ 
                textTransform: 'none',
                fontWeight: activeTab === 1 ? 600 : 400,
                color: activeTab === 1 ? '#0054d6' : '#45464f',
                fontSize: 14
              }} 
            />
            <Tab 
              label="Recording" 
              sx={{ 
                textTransform: 'none',
                fontWeight: activeTab === 2 ? 600 : 400,
                color: activeTab === 2 ? '#0054d6' : '#45464f',
                fontSize: 14
              }} 
            />
          </Tabs>
        </Box>

        {/* Skill Ratings Content */}
        {activeTab === 0 && (
          <Paper elevation={0} sx={{ 
            borderRadius: 1, 
            border: '1px solid rgba(117,118,128,0.16)',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 3 }}>
              <Stack spacing={3}>
                {/* First Row */}
                <Stack direction="row" spacing={3}>
                  {userAttemptData.skills.slice(0, 2).map((skill: any, index: number) => (
                    <Box key={index} sx={{ 
                      flex: 1, 
                      bgcolor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid rgba(117,118,128,0.16)',
                      p: 3
                    }}>
                      <Stack spacing={4}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ 
                              bgcolor: '#dae1ff', 
                              borderRadius: 1, 
                              p: 1, 
                              height: 36
                            }}>
                              {skill.icon}
                            </Box>
                            <Typography variant="subtitle1" sx={{ 
                              fontSize: 16, 
                              fontWeight: 500, 
                              color: '#1a1b1e'
                            }}>
                              {skill.name}
                            </Typography>
                          </Stack>
                          <Chip 
                            label={skill.rating}
                            size="small"
                            sx={{
                              backgroundColor: 'transparent',
                              color: skill.ratingColor,
                              border: `1px solid ${skill.ratingColor}`,
                              fontSize: 12,
                              fontWeight: 400,
                              height: 24
                            }}
                          />
                        </Stack>
                        <Stack spacing={2}>
                          {skill.feedback.map((item: any, feedbackIndex: number) => (
                            <Stack key={feedbackIndex} direction="row" spacing={1} alignItems="flex-start">
                              <Box sx={{ mt: 0.5 }}>
                                {item.positive ? (
                                  <CheckCircle2 size={20} color="#006d3c" />
                                ) : (
                                  <XCircle size={20} color="#BA1A17" />
                                )}
                              </Box>
                              <Typography variant="body1" sx={{ 
                                fontSize: 16, 
                                color: '#45464f',
                                lineHeight: 1.5
                              }}>
                                {item.text}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                {/* Second Row */}
                <Stack direction="row" spacing={3}>
                  {userAttemptData.skills.slice(2, 4).map((skill: any, index: number) => (
                    <Box key={index} sx={{ 
                      flex: 1, 
                      bgcolor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid rgba(117,118,128,0.16)',
                      p: 3
                    }}>
                      <Stack spacing={4}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ 
                              bgcolor: '#dae1ff', 
                              borderRadius: 1, 
                              p: 1, 
                              height: 36
                            }}>
                              {skill.icon}
                            </Box>
                            <Typography variant="subtitle1" sx={{ 
                              fontSize: 16, 
                              fontWeight: 500, 
                              color: '#1a1b1e'
                            }}>
                              {skill.name}
                            </Typography>
                          </Stack>
                          <Chip 
                            label={skill.rating}
                            size="small"
                            sx={{
                              backgroundColor: 'transparent',
                              color: skill.ratingColor,
                              border: `1px solid ${skill.ratingColor}`,
                              fontSize: 12,
                              fontWeight: 400,
                              height: 24
                            }}
                          />
                        </Stack>
                        <Stack spacing={2}>
                          {skill.feedback.map((item: any, feedbackIndex: number) => (
                            <Stack key={feedbackIndex} direction="row" spacing={1} alignItems="flex-start">
                              <Box sx={{ mt: 0.5 }}>
                                {item.positive ? (
                                  <CheckCircle2 size={20} color="#006d3c" />
                                ) : (
                                  <XCircle size={20} color="#BA1A17" />
                                )}
                              </Box>
                              <Typography variant="body1" sx={{ 
                                fontSize: 16, 
                                color: '#45464f',
                                lineHeight: 1.5
                              }}>
                                {item.text}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                {/* Third Row */}
                <Stack direction="row" spacing={3}>
                  {userAttemptData.skills.slice(4, 6).map((skill: any, index: number) => (
                    <Box key={index} sx={{ 
                      flex: 1, 
                      bgcolor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid rgba(117,118,128,0.16)',
                      p: 3
                    }}>
                      <Stack spacing={4}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ 
                              bgcolor: '#dae1ff', 
                              borderRadius: 1, 
                              p: 1,
                              height: 36 
                            }}>
                              {skill.icon}
                            </Box>
                            <Typography variant="subtitle1" sx={{ 
                              fontSize: 16, 
                              fontWeight: 500, 
                              color: '#1a1b1e'
                            }}>
                              {skill.name}
                            </Typography>
                          </Stack>
                          <Chip 
                            label={skill.rating}
                            size="small"
                            sx={{
                              backgroundColor: 'transparent',
                              color: skill.ratingColor,
                              border: `1px solid ${skill.ratingColor}`,
                              fontSize: 12,
                              fontWeight: 400,
                              height: 24
                            }}
                          />
                        </Stack>
                        <Stack spacing={2}>
                          {skill.feedback.map((item: any, feedbackIndex: number) => (
                            <Stack key={feedbackIndex} direction="row" spacing={1} alignItems="flex-start">
                              <Box sx={{ mt: 0.5 }}>
                                {item.positive ? (
                                  <CheckCircle2 size={20} color="#006d3c" />
                                ) : (
                                  <XCircle size={20} color="#BA1A17" />
                                )}
                              </Box>
                              <Typography variant="body1" sx={{ 
                                fontSize: 16, 
                                color: '#45464f',
                                lineHeight: 1.5
                              }}>
                                {item.text}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Paper>
        )}

        {/* Question Ratings Content */}
        {activeTab === 1 && (
          <Paper elevation={0} sx={{ 
            borderRadius: 1, 
            border: '1px solid rgba(117,118,128,0.16)',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 3 }}>
              {userAttemptData.questions.map((question: any) => (
              <Accordion
                key={question.id}
                expanded={expandedQuestion === question.id}
                onChange={handleAccordionChange(question.id)}
                sx={{
                  mb: 3,
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: 0,
                    marginBottom: 3,
                  },
                  boxShadow: 'none',
                  border: '1px solid rgba(117,118,128,0.16)',
                  borderRadius: '8px !important',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 84, 214, 0.08)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown size={20} />}
                  sx={{
                    backgroundColor: 'transparent',
                    borderRadius: expandedQuestion === question.id ? '8px 8px 0 0' : '8px',
                    minHeight: 72,
                    alignItems: 'center',
                    '&.Mui-expanded': {
                      minHeight: 72,
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: '24px 0',
                      alignItems: 'center',
                      '&.Mui-expanded': {
                        margin: '24px 0',
                      },
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      color: '#45464f',
                      '&.Mui-expanded': {
                        transform: 'rotate(180deg)',
                      },
                    },
                  }}
                >
                  <Box sx={{ width: '100%', pr: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle1" sx={{ 
                          fontSize: 16, 
                          fontWeight: 500, 
                          color: '#1a1b1e'
                        }}>
                          Question {question.id}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          fontSize: 14, 
                          color: '#45464f'
                        }}>
                          ({question.questionType})
                        </Typography>
                      </Stack>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Show Correct/Incorrect chips for Multiple Choice Questions */}
                        {question.questionType === "Multiple Choice Question" && question.userAnswer && question.correctAnswer && (
                          <>
                        {question.userAnswer === question.correctAnswer ? (
                          <Chip 
                            label="Correct Answer"
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(0, 109, 60, 0.08)',
                              color: '#006d3c',
                              border: '1px solid #006d3c',
                              fontSize: 12,
                              fontWeight: 500,
                              height: 24
                            }}
                          />
                        ) : (
                          <Chip 
                            label="Incorrect Answer"
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(211, 47, 47, 0.08)',
                              color: '#d32f2f',
                              border: '1px solid #d32f2f',
                              fontSize: 12,
                              fontWeight: 500,
                              height: 24
                            }}
                          />
                        )}
                          </>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails sx={{ 
                  backgroundColor: '#fafafa',
                  borderRadius: '0 0 8px 8px',
                  p: 2,
                  borderTop: '1px solid rgba(117,118,128,0.16)'
                }}>
                  <Stack spacing={3}>
                    {/* Question Details */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ 
                        fontSize: 14, 
                        fontWeight: 600, 
                        color: '#1a1b1e',
                        mb: 1
                      }}>
                        Question Details
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        fontSize: 14, 
                        color: '#text.primary',
                        lineHeight: 1.5,
                        mb: 2
                      }}>
                        {question.question}
                      </Typography>
                      
                      {/* Question Type Specific Answer Rendering */}
                      {question.questionType === "Video/Audio based question" ? (
                        <>
                          {/* Video Answer */}
                          <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ 
                          fontSize: 12, 
                          fontWeight: 600, 
                          color: '#45464f',
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                              Answer
                        </Typography>
                            <Box sx={{
                              bgcolor: '#212121',
                              borderRadius: 1,
                              height: 200,
                              width: 360,
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              border: '1px solid rgba(117,118,128,0.16)'
                            }}>
                              {/* Video Player Placeholder */}
                              <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%',
                                width: '100%',
                                p: 1
                              }}>
                                {/* Top spacer */}
                                <Box sx={{ height: 24 }} />
                                
                                {/* Play Button */}
                                <Box sx={{
                                  bgcolor: 'rgba(255,255,255,0.16)',
                                  borderRadius: '100px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  p: 1.5,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.24)'
                                  }
                                }}>
                                  <Box sx={{
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                  }}>
                                    {/* Play Icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                  </Box>
                                </Box>
                                
                                {/* Video Controls */}
                                <Box sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1
                                }}>
                                  <Box sx={{
                                    bgcolor: 'rgba(33,33,33,0.64)',
                                    borderRadius: 0.5,
                                    px: 2,
                                    py: 0.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                  }}>
                                    <Typography sx={{ 
                                      color: 'white',
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: 'Inter'
                                    }}>
                                      00:00
                                    </Typography>
                                    <Typography sx={{
                                      color: 'white',
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: 'Inter'
                                    }}>
                                      /
                                    </Typography>
                                    <Typography sx={{
                                      color: 'white',
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: 'Inter'
                                    }}>
                                      02:00
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>

                          {/* Transcribed Answer */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ 
                              fontSize: 12, 
                              fontWeight: 600, 
                              color: '#45464f',
                              mb: 1,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              Transcribed Answer
                            </Typography>
                            <Box sx={{
                              p: 2,
                              bgcolor: 'white',
                              borderRadius: 1,
                              border: '1px solid rgba(117,118,128,0.16)'
                            }}>
                              <Typography variant="body2" sx={{ 
                                fontSize: 14, 
                                color: '#1a1b1e',
                                lineHeight: 1.5
                              }}>
                                {question.userAnswer}
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      ) : question.questionType === "Coding Question" ? (
                        <>
                          {/* Coding Answer */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ 
                              fontSize: 12, 
                              fontWeight: 600, 
                              color: '#45464f',
                              mb: 1,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              Your Solution
                            </Typography>
                            <Box sx={{
                              bgcolor: '#1e1e1e',
                              borderRadius: 1,
                              border: '1px solid rgba(117,118,128,0.16)',
                              overflow: 'hidden'
                            }}>
                              <Box sx={{
                                bgcolor: '#2d2d30',
                                px: 2,
                                py: 1,
                                borderBottom: '1px solid rgba(117,118,128,0.16)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }}>
                                <Box sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: '#ff5f56'
                                }} />
                                <Box sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: '#ffbd2e'
                                }} />
                                <Box sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: '#27ca3f'
                                }} />
                                <Typography variant="caption" sx={{
                                  color: '#cccccc',
                                  fontSize: 12,
                                  ml: 2
                                }}>
                                  Python
                                </Typography>
                              </Box>
                              <Box sx={{
                                p: 2,
                                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                                fontSize: 14,
                                      lineHeight: 1.5, 
                                color: '#d4d4d4',
                                whiteSpace: 'pre-wrap',
                                overflow: 'auto',
                                maxHeight: 300
                              }}>
                                {question.userAnswer}
                              </Box>
                            </Box>
                          </Box>
                        </>
                      ) : question.questionType === "Multiple Choice Question" ? (
                        <>
                          {/* Multiple Choice Answer */}
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ 
                              fontSize: 12, 
                              fontWeight: 600, 
                              color: '#45464f',
                              mb: 2,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              Answer Choices
                            </Typography>
                            <Stack spacing={1}>
                              {question.options?.map((option: string, index: number) => {
                                const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                                const isUserSelected = question.userAnswer === optionLetter;
                                const isCorrectAnswer = question.correctAnswer === optionLetter;
                                const isUserCorrect = question.userAnswer === question.correctAnswer;
                                
                                return (
                                  <Box key={index} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                    border: '1px solid rgba(117,118,128,0.16)',
                                    position: 'relative'
                                  }}>
                                    <Box sx={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: '50%',
                                      border: '2px solid #d1d5db',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      mr: 2,
                                      bgcolor: isUserSelected ? (isUserCorrect ? '#006d3c' : '#d32f2f') : (isCorrectAnswer ? '#006d3c' : 'transparent'),
                                      borderColor: isUserSelected ? (isUserCorrect ? '#006d3c' : '#d32f2f') : (isCorrectAnswer ? '#006d3c' : '#d1d5db')
                                    }}>
                                      {(isUserSelected || isCorrectAnswer) && (
                                        <Box sx={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: '50%',
                                          bgcolor: 'white'
                                        }} />
                                      )}
                                    </Box>
                                    <Typography sx={{
                                      fontSize: 14,
                                      color: '#1a1b1e',
                                      fontWeight: (isUserSelected || isCorrectAnswer) ? 500 : 400
                                    }}>
                                      {option}
                                    </Typography>
                                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                                      {isUserSelected && (
                                      <Chip 
                                          label="User Selected"
                                        size="small"
                                        sx={{
                                            backgroundColor: isUserCorrect ? 'rgba(0, 109, 60, 0.08)' : 'rgba(211, 47, 47, 0.08)',
                                            color: isUserCorrect ? '#006d3c' : '#d32f2f',
                                            border: `1px solid ${isUserCorrect ? '#006d3c' : '#d32f2f'}`,
                                          fontSize: 12,
                                          fontWeight: 500,
                                          height: 24
                                        }}
                                      />
                                    )}
                                      {isCorrectAnswer && !isUserSelected && (
                                      <Chip 
                                          label="Correct Answer"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(0, 109, 60, 0.08)',
                                            color: '#006d3c',
                                            border: '1px solid #006d3c',
                                          fontSize: 12,
                                          fontWeight: 500,
                                          height: 24
                                        }}
                                      />
                                    )}
                                  </Box>
                                  </Box>
                                );
                              })}
                            </Stack>
                          </Box>
                        </>
                      ) : null}

                      {/* Skills Evaluation - Side by Side (Not for Multiple Choice Questions) */}
                      {question.skillFeedback && question.questionType !== "Multiple Choice Question" && (
                        <Box>
                          <Typography variant="body2" sx={{ 
                            fontSize: 12, 
                            fontWeight: 600, 
                            color: '#45464f',
                            mb: 2,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Skills Evaluation
                          </Typography>
                          <Stack direction="row" spacing={3}>
                            {Object.entries(question.skillFeedback).map(([skillName, feedback]) => (
                              <Box key={skillName} sx={{ 
                                flex: 1, 
                                  bgcolor: 'white',
                                borderRadius: 1, 
                                border: '1px solid rgba(117,118,128,0.16)',
                                p: 2
                              }}>
                                <Stack spacing={2}>
                                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <Typography variant="subtitle1" sx={{ 
                                        fontSize: 16, 
                                        fontWeight: 500, 
                                        color: '#1a1b1e'
                                      }}>
                                        {skillName}
                                      </Typography>
                                    </Stack>
                                    <Chip 
                                      label="Good"
                                      size="small"
                                      sx={{
                                        backgroundColor: 'transparent',
                                        color: '#006d3c',
                                        border: '1px solid #006d3c',
                                        fontSize: 12,
                                        fontWeight: 400,
                                        height: 24
                                      }}
                                    />
                                  </Stack>
                                  <Stack spacing={2}>
                                    {(feedback as any).covered && (feedback as any).covered.map((item: string, feedbackIndex: number) => (
                                      <Stack key={feedbackIndex} direction="row" spacing={1} alignItems="flex-start">
                                        <Box sx={{ mt: 0.5 }}>
                                          <CheckCircle2 size={20} color="#006d3c" />
                                        </Box>
                                        <Typography variant="body1" sx={{ 
                                          fontSize: 16, 
                                          color: '#45464f',
                                          lineHeight: 1.5
                                        }}>
                                          {item}
                                        </Typography>
                                      </Stack>
                                    ))}
                                    {(feedback as any).notCovered && (feedback as any).notCovered.map((item: string, feedbackIndex: number) => (
                                      <Stack key={feedbackIndex} direction="row" spacing={1} alignItems="flex-start">
                                        <Box sx={{ mt: 0.5 }}>
                                          <XCircle size={20} color="#BA1A17" />
                      </Box>
                                        <Typography variant="body1" sx={{ 
                                          fontSize: 16, 
                                          color: '#45464f',
                                          lineHeight: 1.5
                                        }}>
                                          {item}
                                        </Typography>
                                      </Stack>
                                    ))}
                                  </Stack>
                                </Stack>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
            </Box>
          </Paper>
        )}

        {/* Recording Content */}
        {activeTab === 2 && (
          <Paper elevation={0} sx={{ 
            borderRadius: 1, 
            border: '1px solid rgba(117,118,128,0.16)',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 0 }}>
              {/* Recording Sub-tabs */}
              <Box sx={{ 
                borderBottom: '1px solid rgba(117,118,128,0.16)',
                px: 3
              }}>
                <Tabs 
                  value={activeRecordingTab} 
                  onChange={handleRecordingTabChange}
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#0054d6',
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    }
                  }}
                >
                  <Tab 
                    label="Video" 
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: activeRecordingTab === 0 ? 600 : 400,
                      color: activeRecordingTab === 0 ? '#0054d6' : '#45464f',
                      fontSize: 14
                    }} 
                  />
                  <Tab 
                    label="Anomalies" 
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: activeRecordingTab === 1 ? 600 : 400,
                      color: activeRecordingTab === 1 ? '#0054d6' : '#45464f',
                      fontSize: 14
                    }} 
                  />
                </Tabs>
              </Box>

              {/* Recording Tab Content */}
              <Box sx={{ p: 3 }}>
                {activeRecordingTab === 0 && (
                  <Box>
                    {/* Video Player */}
                    <Box sx={{
                      bgcolor: '#212121',
                      borderRadius: 1,
                      height: 360,
                      width: '100%',
                      maxWidth: 640,
                      mx: 'auto',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      {/* Video Player Placeholder */}
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%',
                        p: 1
                      }}>
                        {/* Top spacer */}
                        <Box sx={{ height: 24 }} />
                        
                        {/* Play Button */}
                        <Box sx={{
                          bgcolor: 'rgba(255,255,255,0.16)',
                          borderRadius: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 1.5,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.24)'
                          }
                        }}>
                          <Box sx={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            {/* Play Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </Box>
                        </Box>
                        
                        {/* Video Controls */}
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}>
                          <Box sx={{
                            bgcolor: 'rgba(33,33,33,0.64)',
                            borderRadius: 0.5,
                            px: 2,
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}>
                            <Typography sx={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: 'Inter'
                            }}>
                              00:00
                            </Typography>
                            <Typography sx={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: 'Inter'
                            }}>
                              /
                            </Typography>
                            <Typography sx={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: 'Inter'
                            }}>
                              02:00
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}

                {activeRecordingTab === 1 && (
                  <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
                    {/* Left Sidebar - Anomalies List */}
                    <Box sx={{ 
                      flex: 1, 
                      bgcolor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid rgba(33,33,33,0.06)',
                      overflow: 'hidden'
                    }}>
                      {userAttemptData.anomalies.map((anomaly: any, index: number) => (
                        <Box
                          key={anomaly.id}
                          onClick={() => handleAnomalySelect(index)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 2,
                            borderBottom: '1px solid rgba(117,118,128,0.16)',
                            cursor: 'pointer',
                            bgcolor: selectedAnomaly === index ? 'rgba(0,84,214,0.08)' : 'transparent',
                            '&:hover': {
                              bgcolor: selectedAnomaly === index ? 'rgba(0,84,214,0.12)' : 'rgba(0,0,0,0.02)'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ 
                              fontSize: 16, 
                              color: '#45464f',
                              fontWeight: 400,
                              minWidth: 96
                            }}>
                              {anomaly.time}
                            </Typography>
                            <Typography sx={{ 
                              fontSize: 16, 
                              color: '#ba1a17',
                              fontWeight: 400
                            }}>
                              {anomaly.issue}
                            </Typography>
                          </Box>
                          <ChevronRight size={20} color="#45464f" />
                        </Box>
                      ))}
                    </Box>

                    {/* Right Side - Anomaly Details */}
                    <Box sx={{ 
                      flex: 1, 
                      bgcolor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid rgba(33,33,33,0.06)',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {/* Anomaly Image */}
                      <Box sx={{
                        height: 320,
                        backgroundImage: `url('${userAttemptData.anomalies[selectedAnomaly]?.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {/* Navigation Buttons */}
                        <Box sx={{
                          position: 'absolute',
                          top: '50%',
                          left: 16,
                          transform: 'translateY(-50%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconButton
                            onClick={handlePreviousAnomaly}
                            disabled={selectedAnomaly === 0}
                            sx={{
                              bgcolor: 'rgba(218, 225, 255, 1)',
                              borderRadius: '40px',
                              width: 40,
                              height: 40,
                              '&:hover': {
                                bgcolor: 'rgba(218, 225, 255, 0.8)'
                              },
                              '&:disabled': {
                                bgcolor: 'rgba(218, 225, 255, 0.3)',
                                color: 'rgba(0,0,0,0.26)'
                              }
                            }}
                          >
                            <ChevronLeft size={20} color="#0054d6" />
                          </IconButton>
                        </Box>

                        <Box sx={{
                          position: 'absolute',
                          top: '50%',
                          right: 16,
                          transform: 'translateY(-50%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconButton
                            onClick={handleNextAnomaly}
                            disabled={selectedAnomaly === userAttemptData.anomalies.length - 1}
                            sx={{
                              bgcolor: 'rgba(218, 225, 255, 1)',
                              borderRadius: '40px',
                              width: 40,
                              height: 40,
                              '&:hover': {
                                bgcolor: 'rgba(218, 225, 255, 0.8)'
                              },
                              '&:disabled': {
                                bgcolor: 'rgba(218, 225, 255, 0.3)',
                                color: 'rgba(0,0,0,0.26)'
                              }
                            }}
                          >
                            <ChevronRight size={20} color="#0054d6" />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Anomaly Details */}
                      <Box sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ 
                          fontSize: 16, 
                          fontWeight: 600, 
                          color: '#1a1b1e',
                          mb: 1
                        }}>
                          {userAttemptData.anomalies[selectedAnomaly]?.issue}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: 14, 
                          color: '#45464f',
                          lineHeight: 1.5
                        }}>
                          {userAttemptData.anomalies[selectedAnomaly]?.description}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: 12, 
                          color: '#45464f',
                          mt: 1,
                          fontWeight: 500
                        }}>
                          Time: {userAttemptData.anomalies[selectedAnomaly]?.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        )}
        </Box>
      </Container>
    </Box>
  );
}
