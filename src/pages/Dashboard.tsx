import { Alert, Box, Container, Stack, Typography, ThemeProvider, createTheme } from '@mui/material';
import { ChartNoAxesCombined, Atom, UserCog } from 'lucide-react';
import TopBar from '../components/TopBar';
import InterviewCard from '../components/InterviewCard';

export default function Dashboard() {
  const pageTheme = createTheme({
    palette: {
      primary: { main: '#0054d6' },
      text: { primary: '#1a1b1e', secondary: '#45464f' },
      divider: 'rgba(117,118,128,0.16)'
    },
    typography: {
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      button: { textTransform: 'none', fontWeight: 500 }
    },
    shape: { borderRadius: 8 }
  });

  return (
    <ThemeProvider theme={pageTheme}>
    <Box sx={{ bgcolor: '#F2F4F7', minHeight: '100vh', minWidth: '100vw' }}>
      <TopBar />
      <ToolbarSpacer />
              <Container maxWidth="xl" sx={{ maxWidth: { xs: 'lg', lg: 1200, xl: 1536 } }}>
        <Stack spacing={3} sx={{ py: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Welcome to Your AI Hiring Journey
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Experience how our AI streamlines hiring. Take an interview and instantly see your feedback in attempt history, all in one place.
            </Typography>
          </Box>

          <Alert severity="info" sx={{bgcolor: '#FFDCC0', color: '#2D1600', '& .MuiAlert-icon': { color: '#8D4F00' }}}>
          Note: You’re currently in <strong>Test Mode</strong> to explore the product from both candidate and recruiter perspectives.
          </Alert>

          {/* Responsive grid: 1 on xs, 2 on sm, 3 on md+ */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <InterviewCard
                title="Sales Round 1 Interview"
                subtitle="Learning Consultant"
                dateRange="11 Jun, 8:30 AM - 15 Jun, 8:30 PM"
                duration="60 minutes"
                attempts={2}
                description="Evaluation of communication skills, sales acumen, client relationship management, objection handling, and target achievement."
                icon={<ChartNoAxesCombined size={24} />}
                iconColor="#6F43C0"
                interviewId="1"
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <InterviewCard
                title="Senior Data Scientist Round 1 Interview"
                subtitle="Senior Data Scientist"
                dateRange="12 Jun, 9:00 AM - 16 Jun, 6:00 PM"
                duration="45 minutes"
                attempts={1}
                description="Evaluation of advanced machine learning, statistical modeling, and real-world problem-solving capabilities."
                icon={<Atom size={24} />}
                iconColor="#0054D6"
                interviewId="2"
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <InterviewCard
                title="Program Operations Round 1 Interview"
                subtitle="Program Manager"
                dateRange="10 Jun, 10:00 AM - 14 Jun, 5:00 PM"
                duration="60 minutes"
                attempts={0}
                description="Assessment of communication, client relationship management, and problem-solving approach in cross-functional environments."
                icon={<UserCog size={24} />}
                iconColor="#006D3C"
                interviewId="3"
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
    </ThemeProvider>
  );
}

function ToolbarSpacer() {
  return <Box sx={{ height: 64 }} />;
}
