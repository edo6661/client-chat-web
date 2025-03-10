import './font.css'
import { useEffect } from 'react'
import Navbar from './components/features/header/Navbar'
import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from './components/ui/shared/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'
import GuestRoute from './components/ui/shared/GuestRoute'


const App = () => {
  const { checkAuth, isCheckingAuth, authUser, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isCheckingAuth) {
    return <div>loading...</div>
  }



  return (
    <>
      <Toaster
        position='bottom-right'
        theme='system'
        swipeDirections={['left', 'right']}
        dir='ltr'
        toastOptions={{
          closeButton: true,
          duration: 3000,
        }}

      />
      <Navbar
        user={authUser}
        logout={logout}
      />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App