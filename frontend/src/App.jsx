import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import NotificationsPage from './pages/NotificationsPage'
import LoginPage from './pages/LoginPage'

import { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore'

function App() {

  const { isLoading, authUser } = useAuthUser()
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />} />
        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationsPage />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to='/login' />} />
        <Route path='/chat/:id' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />
        <Route path='/onboarding' element={isAuthenticated ? (!isOnboarded ? <OnboardingPage /> : <Navigate to='/' />) : (<Navigate to='/login' />)} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
