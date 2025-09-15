import { Box, Container, Stack, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import TopBar from '../components/TopBar';
import { ChartNoAxesCombined, Atom, UserCog, Calendar, Clock3, FileText, Play, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Interview data structure
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

export default function InterviewDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const interview = interviewData[id as keyof typeof interviewData] || interviewData['1'];
  const [openDialog, setOpenDialog] = useState(false);

  const handleStartClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    setOpenDialog(false);
    // Navigate to the quiz page
    navigate(`/quiz/${id}`);
  };
  return (
    <Box sx={{ bgcolor: '#F2F4F7', minHeight: '100vh', minWidth: '100vw' }}>
      <TopBar />
      <Box sx={{ height: 64 }} />
      <Container maxWidth="xl" sx={{ maxWidth: { xs: 'lg', lg: 1200, xl: 1536 } }}>
        <Stack spacing={3} sx={{ py: 3 }}>
          {/* Top details card as per Figma */}
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
                  <Detail icon={<Clock3 size={16} />} text={`Duration: ${interview.duration}`} />
                  <Detail icon={<FileText size={16} />} text={`Attempts: ${interview.attempts}`} />
                </Stack>
              </Box>
            </Stack>
          </Paper>

          {/* Instructions section */}
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            {/* Instructions Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(117,118,128,0.16)' }}>
              <Typography variant="subtitle1" fontWeight={500} color="text.primary">
                Instructions
              </Typography>
            </Box>
            
            {/* Instructions Content */}
            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  Dear Candidate, <br/><br/>Please read the following instructions carefully before starting the interview:
                </Typography>
                <Stack component="ol" spacing={1} sx={{ pl: 2, m: 0 }}>
                  <Typography component="li" variant="body2" color="text.secondary">The maximum time allowed for this interview is 60 minutes.</Typography>
                  <Typography component="li" variant="body2" color="text.secondary">Once you begin answering a question, you will have 2 minutes to complete your response. Please be as detailed as possible. </Typography>
                  <Typography component="li" variant="body2" color="text.secondary">Speak clearly and maintain a moderate pace.</Typography>
                  <Typography component="li" variant="body2" color="text.secondary">This is a video interview. Please allow access to your camera and microphone when prompted.</Typography>
                  <Typography component="li" variant="body2" color="text.secondary">Ensure you are in a quiet environment with a stable internet connection. Use headphones with a microphone for better audio clarity.</Typography>
                  <Typography component="li" variant="body2" color="text.secondary">If you face any technical difficulties, please contact our support team.</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Regards,<br/>Recruitment Team
                </Typography>
              </Stack>
            </Box>
          </Paper>

          <Box>
            <Button variant="contained" startIcon={<Play size={18} />} sx={{ px: 5, py: 1 }} onClick={handleStartClick}>Start</Button>
          </Box>
        </Stack>
      </Container>

      {/* Proctored Interview Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            boxShadow: '0px 24px 48px -12px rgba(16,24,40,0.18)',
            maxWidth: 720
          }
        }}
      >
        <DialogTitle sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ fontSize: 20, lineHeight: '24px' }}>
            Start proctored interview
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small" sx={{ p: 0.5 }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 1 }}>
          <Stack spacing={1.5}>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
              1. You are about to take a proctored interview and you will not be allowed to switch screens/tabs.
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
              2. Your interview will auto-submit if you try to switch screens/tabs more than the allowed limit.
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
              3. Please close all the background notifications, anti-virus programs, chat before starting the interview.
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
              4. Do NOT refresh the browser while taking the interview.
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
              5. Switching off video/webcam during the interview will submit the interview.
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 14, lineHeight: '20px' }}>
              6. This interview is being monitored to eliminate the use of any unfair means during the conduct of the examination.
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="text"
            onClick={handleCloseDialog}
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
            onClick={handleConfirm}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 16,
              backgroundColor: '#0054d6',
              color: 'white',
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: '#0041a3'
              }
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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