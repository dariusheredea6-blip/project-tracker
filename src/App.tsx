import { ReactNode } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import Reset from './pages/Reset'
import Dashboard from './pages/Dashboard'

const Splash = () => <div className="grid min-h-screen place-items-center text-violet-200/70">Cargando…</div>

function Protected({ children }: { children: ReactNode }) {
  const { session, loading, recovery } = useAuth()
  if (loading) return <Splash />
  if (recovery) return <Navigate to="/restablecer" replace />
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}
function Public({ children }: { children: ReactNode }) {
  const { session, loading, recovery } = useAuth()
  if (loading) return <Splash />
  if (recovery) return <Navigate to="/restablecer" replace />
  if (session) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Public><Login /></Public>} />
          <Route path="/registro" element={<Public><Register /></Public>} />
          <Route path="/recuperar" element={<Public><Forgot /></Public>} />
          <Route path="/restablecer" element={<Reset />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
