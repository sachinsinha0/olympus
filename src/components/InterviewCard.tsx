import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock3, FileText } from 'lucide-react';
import type { ReactNode } from 'react';

type InterviewCardProps = {
  title: string;
  subtitle: string;
  dateRange: string;
  duration: string;
  attempts: number;
  description: string;
  icon: ReactNode;
  iconColor?: string;
  interviewId: string;
};

export default function InterviewCard({ title, subtitle, dateRange, duration, attempts, description, icon, iconColor, interviewId }: InterviewCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        p: 3,
        height: '100%',
        borderColor: 'rgba(117,118,128,0.16)',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack spacing={2}>
          <Stack spacing={1.5}>
            <Box
              sx={{
                width: 64,
                height: 64,
                color: 'primary.main',
                p: 0,
                borderRadius: 1,
                border: '1px solid rgba(0,84,214,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // If you want it shrink-to-content instead of fixed size, remove width/height
                // display: 'inline-flex', // add if you want *multiple* such icons on same row
                // bgcolor, boxShadow, etc. if needed
              }}
            >
              <Box sx={{ color: iconColor ?? 'primary.main', height: '24px' }}>{icon}</Box>
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} color="#1a1b1e">
                {title}
              </Typography>
              <Typography variant="body2" color="#45464f">
                {subtitle}
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={1}>
            <DetailRow icon={<Calendar size={16} />} text={dateRange} />
            <DetailRow icon={<Clock3 size={16} />} text={`Duration: ${duration}`} />
            <DetailRow icon={<FileText size={16} />} text={`${attempts} attempts`} />
          </Stack>

          <Typography 
            variant="body2" 
            color="#45464f"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '4.5rem', // 3 lines * 1.5 line-height
              lineHeight: 1.5,
              fontSize: '0.875rem'
            }}
          >
            {description}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 0, pt: 2, pb: 0, gap: 1 }}>
        <Button 
          variant="text" 
          color="primary" 
          sx={{ flex: 1, borderRadius: 1, textTransform: 'none', fontWeight: 500 }}
          onClick={() => navigate(`/attempts/${interviewId}`)}
        >
          Attempts
        </Button>
        <Button variant="contained" color="primary" sx={{ flex: 1, borderRadius: 1, textTransform: 'none', fontWeight: 500 }} onClick={() => navigate(`/interview/${interviewId}`)}>
          View Interview
        </Button>
      </CardActions>
    </Card>
  );
}

function DetailRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ color: '#45464f', display: 'inline-flex' }}>{icon}</Box>
      <Typography variant="body2" color="#45464f">
        {text}
      </Typography>
    </Stack>
  );
}


