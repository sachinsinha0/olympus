import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import InterviewDetails from './pages/InterviewDetails'
import InterviewQuiz from './pages/InterviewQuiz'
import AttemptsPage from './pages/AttemptsPage'
import UserAttemptsPage from './pages/UserAttemptsPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview/:id" element={<InterviewDetails />} />
          <Route path="/quiz/:id" element={<InterviewQuiz />} />
          <Route path="/attempts/:id" element={<AttemptsPage />} />
          <Route path="/user-attempts/:userId/:attemptId" element={<UserAttemptsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
