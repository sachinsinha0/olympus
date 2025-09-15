import { Box, Stack, Typography, Paper, Container, IconButton, Tooltip } from '@mui/material';
import { Calendar, Clock, FileText, ChartNoAxesCombined, Atom, UserCog, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import type { ReactNode } from 'react';

export default function AttemptsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Interview data structure - same as InterviewDetails
  const interviewData = {
    '1': {
      title: 'Sales Round 1 Interview',
      subtitle: 'Learning Consultant',
      dateRange: '11 Jun, 8:30 AM - 15 Jun, 8:30 PM',
      duration: '60 minutes',
      attempts: 3,
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

  const interview = interviewData[id as keyof typeof interviewData] || interviewData['1'];

  // Attempts data - Multiple users' attempts (newest first)
  const attemptsData = [
    {
      id: 1,
      userName: 'John Smith',
      userEmail: 'john.smith@email.com',
      date: '2024-01-23',
      time: '2:45 PM',
      status: 'Evaluating',
      score: 'Evaluating'
    },
    {
      id: 2,
      userName: 'Sarah Johnson',
      userEmail: 'sarah.johnson@email.com',
      date: '2024-01-20',
      time: '10:30 AM',
      status: 'Completed',
      score: '85/100'
    },
    {
      id: 3,
      userName: 'Michael Brown',
      userEmail: 'michael.brown@email.com',
      date: '2024-01-18',
      time: '3:15 PM',
      status: 'Completed',
      score: '78/100'
    },
    {
      id: 4,
      userName: 'Emily Davis',
      userEmail: 'emily.davis@email.com',
      date: '2024-01-15',
      time: '11:00 AM',
      status: 'Completed',
      score: '92/100'
    }
  ];


  const getScoreColor = (score: string) => {
    if (score === 'Evaluating') {
      return '#757E8C'; // Grey for evaluating
    }
    
    const numericScore = parseInt(score.split('/')[0]);
    
    if (numericScore >= 80) {
      return '#006D3C'; // Success Green
    } else if (numericScore >= 60) {
      return '#F57C00'; // Warning Amber
    } else {
      return '#D32F2F'; // Error Red
    }
  };

  const getScoreBgColor = (score: string) => {
    if (score === 'Evaluating') {
      return 'rgba(117, 126, 140, 0.08)'; // Grey background for evaluating
    }
    
    const numericScore = parseInt(score.split('/')[0]);
    
    if (numericScore >= 80) {
      return 'rgba(0, 109, 60, 0.08)'; // Success Green background
    } else if (numericScore >= 60) {
      return 'rgba(245, 124, 0, 0.08)'; // Warning Amber background
    } else {
      return 'rgba(211, 47, 47, 0.08)'; // Error Red background
    }
  };

  const handleAttemptClick = (attemptId: number) => {
    // Navigate to user attempts page with userId and interviewId
    // attemptId is the individual attempt number, but we need the interview ID
    navigate(`/user-attempts/${attemptId}/${id}`);
  };

  return (
    <Box sx={{ bgcolor: '#F2F4F7', minHeight: '100vh', minWidth: '100vw' }}>
      <TopBar />
      <Box sx={{ height: 64 }} />
      <Container maxWidth="xl" sx={{ maxWidth: { xs: 'lg', lg: 1200, xl: 1536 } }}>
        <Stack spacing={3} sx={{ py: 3 }}>
          {/* Top details card as per Figma - exact same as InterviewDetails */}
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Box
                sx={{
                  width: 76,
                  height: 76,
                  borderRadius: 1,
                  border: '1px solid rgba(0,84,214,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: interview.iconColor,
                  flex: '0 0 auto'
                }}
              >
                {interview.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                  {interview.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {interview.subtitle}
                </Typography>

                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  sx={{ mt: 0.5 }}
                  divider={
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{
                        mx: 1,
                        display: { xs: 'none', md: 'block' }
                      }}
                    >
                      &bull;
                    </Typography>
                  }
                >
                  <Detail icon={<Calendar size={16} />} text={interview.dateRange} />
                  <Detail icon={<Clock size={16} />} text={`Duration: ${interview.duration}`} />
                  <Detail icon={<FileText size={16} />} text={`Attempts: ${interview.attempts}`} />
                </Stack>
              </Box>
            </Stack>
          </Paper>

          {/* Attempts section */}
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            {/* Attempts Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(117,118,128,0.16)' }}>
              <Typography variant="subtitle1" fontWeight={500} color="text.primary">
                Attempts
              </Typography>
            </Box>
            
            {/* Attempts Content */}
            <Box sx={{ p: 0 }}>
              {attemptsData.map((attempt, index) => {
                const isLatestEvaluating = index === 0 && attempt.status === 'Evaluating';
                
                return (
                  <Tooltip 
                    key={attempt.id}
                    title={isLatestEvaluating ? 'Evaluating' : ''}
                    placement="top"
                  >
                    <Box
                      onClick={() => handleAttemptClick(attempt.id)}
                      sx={{
                        p: 2,
                        borderBottom: index < attemptsData.length - 1 ? '1px solid rgba(117,118,128,0.16)' : 'none',
                        cursor: isLatestEvaluating ? 'not-allowed' : 'pointer',
                        '&:hover': {
                          bgcolor: isLatestEvaluating ? 'transparent' : 'rgba(0,0,0,0.02)'
                        }
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 0.5 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography variant="subtitle1" sx={{ 
                                fontSize: 16, 
                                fontWeight: 500, 
                                color: isLatestEvaluating ? 'text.secondary' : 'text.primary'
                              }}>
                                {attempt.userName}
                              </Typography>
                              <Typography
                                component="span"
                                color="text.secondary"
                                sx={{
                                  fontSize: 16,
                                  fontWeight: 400
                                }}
                              >
                                &bull;
                              </Typography>
                              <Typography variant="body1" sx={{ 
                                fontSize: 14, 
                                fontWeight: 400, 
                                color: 'text.secondary'
                              }}>
                                {attempt.userEmail}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography variant="body2" sx={{ 
                            color: isLatestEvaluating ? 'text.secondary' : 'text.secondary'
                          }}>
                            {attempt.date} at {attempt.time}
                          </Typography>
                        </Box>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: getScoreBgColor(attempt.score),
                            color: getScoreColor(attempt.score),
                            fontSize: 12,
                            fontWeight: 500
                          }}>
                            {attempt.score === 'Evaluating' ? 'Evaluating' : `Score: ${attempt.score}`}
                          </Box>
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'text.primary',
                                backgroundColor: 'rgba(0,0,0,0.04)'
                              }
                            }}
                          >
                            <ChevronRight size={20} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

function Detail({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ color: 'text.secondary', display: 'inline-flex' }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary">{text}</Typography>
    </Stack>
  );
}
