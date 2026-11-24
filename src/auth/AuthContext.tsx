import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type Profile = {
  id: string
  first_name: string
  last_name: string
  username: string
  email: string
  platform_role: 'user' | 'superadmin' | 'owner'
  theme: string
}
type Ctx = {
  session: Session | null
  profile: Profile | null
  loading: boolean
  recovery: boolean
  clearRecovery: () => void
  signOut: () => Promise<void>
}
const AuthCtx = createContext<Ctx>({
  session: null, profile: null, loading: true, recovery: false, clearRecovery: () => {}, signOut: async () => {},
})
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [recovery, setRecovery] = useState(false)

  async function loadProfile(uid?: string) {
    if (!uid) { setProfile(null); return }
    const { data } = await supabase
      .from('profiles')
      .select('id,first_name,last_name,username,email,platform_role,theme')
      .eq('id', uid)
      .maybeSingle()
    setProfile((data as Profile) ?? null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      loadProfile(data.session?.user.id).finally(() => setLoading(false))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s)
      if (event === 'PASSWORD_RECOVERY') setRecovery(true)
      // Evitar llamadas a Supabase dentro del propio callback
      setTimeout(() => { loadProfile(s?.user.id) }, 0)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  return (
    <AuthCtx.Provider
      value={{
        session, profile, loading, recovery,
        clearRecovery: () => setRecovery(false),
        signOut: async () => { await supabase.auth.signOut() },
      }}
    >
      {children}
    </AuthCtx.Provider>
  )
}
