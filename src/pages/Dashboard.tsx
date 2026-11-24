import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

const NAV = [['🏠', 'Inicio'], ['📁', 'Mis espacios'], ['🌐', 'Todos los espacios'], ['🕒', 'Recientes'], ['⭐', 'Favoritos'], ['🗑', 'Papelera']]

export default function Dashboard() {
  const { session, profile, signOut } = useAuth()
  const [col, setCol] = useState(false)
  const nombre = profile?.first_name || session?.user.email || ''
  const esAdmin = profile?.platform_role === 'owner' || profile?.platform_role === 'superadmin'
  const rol = profile?.platform_role === 'owner' ? 'Propietario' : profile?.platform_role === 'superadmin' ? 'Superadministrador' : 'Usuario'
  const ini = (profile ? profile.first_name[0] + (profile.last_name[0] || '') : nombre.slice(0, 2)).toUpperCase()
  const base = import.meta.env.BASE_URL

  return (
    <div className="flex min-h-screen">
      <aside className={`${col ? 'w-[68px]' : 'w-60'} sticky top-0 flex h-screen flex-col gap-1 border-r border-white/10 bg-[#100a1d] p-3 transition-all`}>
        <div className="mb-4 flex items-center gap-2">
          <img src={`${base}icono.png`} alt="" className="h-10 w-10 rounded-xl object-contain" />
          {!col && <img src={`${base}logo-horizontal.png`} alt="Project Tracker" className="h-8 rounded-lg bg-black px-1" />}
        </div>
        {NAV.map(([i, t]) => (
          <div key={t} title="Próximamente" className="flex cursor-not-allowed items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-violet-200/50">
            <span>{i}</span>{!col && <span>{t}</span>}
          </div>
        ))}
        {esAdmin && (
          <div title="Próximamente" className="flex cursor-not-allowed items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-violet-200/50">
            <span>🛡</span>{!col && <span>Administración</span>}
          </div>
        )}
        <div className="flex-1" />
        <button onClick={() => setCol(!col)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-violet-200/70 hover:bg-white/5"><span>↔</span>{!col && <span>Contraer</span>}</button>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-end gap-3 border-b border-white/10 px-6 py-3.5">
          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200">{rol}</span>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 font-bold text-white">{ini}</div>
          <button onClick={signOut} className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:border-violet-400">Cerrar sesión</button>
        </header>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Hola, {nombre} 👋</h1>
          <p className="text-violet-200/70">Has iniciado sesión correctamente con tu cuenta real.</p>
          <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#171027] p-5">
              <h2 className="font-semibold">Tu cuenta</h2>
              <dl className="mt-3 space-y-1 text-sm text-violet-100/90">
                <div><dt className="inline text-violet-300/70">Correo: </dt><dd className="inline">{session?.user.email}</dd></div>
                <div><dt className="inline text-violet-300/70">Usuario: </dt><dd className="inline">{profile?.username ?? '—'}</dd></div>
                <div><dt className="inline text-violet-300/70">Rol: </dt><dd className="inline">{rol}</dd></div>
              </dl>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#171027] p-5">
              <h2 className="font-semibold">Estado del proyecto</h2>
              <p className="mt-3 text-sm text-violet-100/90">Versión 0.1: acceso y cuentas conectados a Supabase. Los espacios, archivos y tareas llegan en los siguientes pasos.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
