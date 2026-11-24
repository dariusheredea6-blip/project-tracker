import { createClient } from '@supabase/supabase-js'

// URL y clave PÚBLICA (publishable). Son seguras en el navegador porque los datos
// están protegidos con políticas RLS. NUNCA pongas aquí la clave secret / service_role.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://gdgpdsxxtjaaphxkflwa.supabase.co'
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_MOWN2HVX1kX1u0tMC9BciA_wTKLK1eM'

// "Recordarme": si está desmarcado, la sesión vive solo mientras la pestaña esté abierta
const pick = () => (localStorage.getItem('pt_remember') === '0' ? sessionStorage : localStorage)
const storage = {
  getItem: (k: string) => localStorage.getItem(k) ?? sessionStorage.getItem(k),
  setItem: (k: string, v: string) => pick().setItem(k, v),
  removeItem: (k: string) => { localStorage.removeItem(k); sessionStorage.removeItem(k) },
}

export const supabase = createClient(url, key, {
  auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage },
})

// Dirección a la que Supabase devuelve al usuario desde los correos (sin la parte #/ruta)
export const siteUrl = () => window.location.origin + window.location.pathname
