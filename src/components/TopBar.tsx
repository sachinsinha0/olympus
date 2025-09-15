import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Avatar, Popover, Typography, Divider, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';
import { useState } from 'react';

import glLogo from '../assets/gl-logo.svg';
import { useAuth } from '../contexts/AuthContext';

export default function TopBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid rgba(33,33,33,0.12)', margin: 0, maxWidth: '100vw' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 2 }}>
            <Box component="img" src={glLogo} alt="Great Learning" sx={{ height: 32, width: 102 }} />
          </Stack>

          <Button startIcon={<Briefcase size={18} />} sx={{ textTransform: 'none', fontWeight: 600, px: 3 }} color="primary" onClick={() => navigate('/dashboard')}>
            Interview
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton size="small" onClick={handleClick}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user ? getUserInitials(user.name) : 'U'}
            </Avatar>
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiPopover-paper': {
                borderRadius: 2,
                boxShadow: '0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)',
                minWidth: 200,
                mt: 1
              }
            }}
          >
            <Box sx={{ p: 2 }}>
              {/* User Info Section */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  {user ? getUserInitials(user.name) : 'U'}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} color="text.primary" sx={{ fontSize: 16, lineHeight: '24px' }}>
                    {user ? user.name : 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, lineHeight: '20px' }}>
                    {user ? user.email : 'user@example.com'}
                  </Typography>
                </Box>
              </Stack>

              {/* Divider */}
              <Divider sx={{ mb: 1 }} />

              {/* Logout Menu Item */}
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <LogOut size={20} color="#45464f" />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      fontSize: 14, 
                      color: '#45464f',
                      lineHeight: '20px'
                    } 
                  }} 
                />
              </ListItemButton>
            </Box>
          </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


