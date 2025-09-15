import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import glLogo from '../assets/gl-logo.svg';
import googleLogo from '../assets/google_logo.svg';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth
    setError('Google login not implemented yet.');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', minWidth: '100vw' }} data-name="login-page" data-node-id="8061:346557">
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={0} sx={{ p: 3, width: 470, borderRadius: 2, position: 'relative', border: '1px solid rgba(33,33,33,0.23)' }} data-name="Container" data-node-id="8061:346563">
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <Stack alignItems="center" py={2} data-name="Logo Container" data-node-id="8061:346565">
                <Box component="img" src={glLogo} alt="Great Learning" sx={{ height: 40, width: 128 }} />
              </Stack>

              <Stack alignItems="center" data-name="Title Container" data-node-id="8061:346567">
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ letterSpacing: '-0.4px' }}>
                  Olympus Login
                </Typography>
              </Stack>

              {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {error}
                </Alert>
              )}

              <Stack spacing={2} data-name="Input Container" data-node-id="8061:346569">
                <TextField 
                  fullWidth 
                  label="Email Address" 
                  variant="outlined" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          aria-label="toggle password visibility" 
                          onClick={() => setShowPassword((v) => !v)} 
                          edge="end"
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" data-name="Action Container" data-node-id="8061:346572">
                <Link href="#" underline="none" sx={{ fontWeight: 500, fontSize: 14, color: '#196ae5', letterSpacing: '-0.4px' }}>
                  Forgot password?
                </Link>
                <Button 
                  type="submit"
                  variant="contained" 
                  disabled={isLoading || !email || !password}
                  sx={{ px: 5, py: 1 }}
                >
                  {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                </Button>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2} justifyContent="center" data-name="Divider Container" data-node-id="8061:346575">
                <Divider sx={{ flex: 1 }} />
                <Typography variant="subtitle1" fontWeight={500} color="text.primary">Or</Typography>
                <Divider sx={{ flex: 1 }} />
              </Stack>

              <Button
                variant="outlined"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                sx={{
                  borderColor: '#196ae5',
                  color: '#196ae5',
                  borderRadius: 1,
                  textTransform: 'capitalize',
                  height: 48,
                }}
                startIcon={<Box component="img" src={googleLogo} alt="Google" sx={{ width: 18, height: 18 }} />}
                fullWidth
              >
                Continue With Google
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}


