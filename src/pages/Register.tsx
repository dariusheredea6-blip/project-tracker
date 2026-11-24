import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import { supabase, siteUrl } from '../lib/supabase'
import { traducir } from '../lib/errores'

export default function Register() {
  const [f, setF] = useState({ first_name: '', last_name: '', username: '', email: '', pw: '', pw2: '' })
  const [err, setErr] = useState('')
  const [ok, setOk] = useState(false)
  const [busy, setBusy] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value })

  const reglas = [
    ['Mínimo 8 caracteres', f.pw.length >= 8],
    ['Una mayúscula y una minúscula', /[A-Z]/.test(f.pw) && /[a-z]/.test(f.pw)],
    ['Un número', /\d/.test(f.pw)],
  ] as const

  async function submit(e: FormEvent) {
    e.preventDefault()
    setErr('')
    if (!f.first_name.trim() || !f.last_name.trim()) return setErr('Escribe tu nombre y apellidos.')
    if (!/^[A-Za-z0-9_.-]{3,30}$/.test(f.username)) return setErr('El nombre de usuario debe tener de 3 a 30 caracteres: letras, números, punto, guion o guion bajo.')
    if (!reglas.every((r) => r[1])) return setErr('La contraseña no cumple los requisitos.')
    if (f.pw !== f.pw2) return setErr('Las contraseñas no coinciden.')
    setBusy(true)
    const { data, error } = await supabase.auth.signUp({
      email: f.email.trim(),
      password: f.pw,
      options: {
        emailRedirectTo: siteUrl(),
        data: { first_name: f.first_name.trim(), last_name: f.last_name.trim(), username: f.username.trim() },
      },
    })
    setBusy(false)
    if (error) return setErr(traducir(error.message))
    if (data.user && data.user.identities && data.user.identities.length === 0) return setErr('Ese correo ya está registrado.')
    setOk(true)
  }

  if (ok)
    return (
      <AuthShell title="¡Revisa tu correo!">
        <p className="mt-3 text-sm text-violet-100">Te hemos enviado un enlace de confirmación a <b>{f.email}</b>. Ábrelo para activar tu cuenta y después inicia sesión.</p>
        <Link className="btn mt-5 block text-center" to="/login">Ir al inicio de sesión</Link>
      </AuthShell>
    )

  return (
    <AuthShell title="Crear cuenta">
      <form onSubmit={submit}>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="lbl">Nombre</label><input className="input" value={f.first_name} onChange={set('first_name')} /></div>
          <div><label className="lbl">Apellidos</label><input className="input" value={f.last_name} onChange={set('last_name')} /></div>
        </div>
        <label className="lbl">Nombre de usuario</label><input className="input" autoComplete="username" value={f.username} onChange={set('username')} />
        <label className="lbl">Correo electrónico</label><input className="input" type="email" autoComplete="email" required value={f.email} onChange={set('email')} />
        <label className="lbl">Contraseña</label><input className="input" type="password" autoComplete="new-password" value={f.pw} onChange={set('pw')} />
        <ul className="mt-2 space-y-0.5 text-xs">
          {reglas.map(([t, v]) => <li key={t} className={v ? 'text-green-400' : 'text-violet-300/60'}>{v ? '✓' : '○'} {t}</li>)}
        </ul>
        <label className="lbl">Confirmar contraseña</label><input className="input" type="password" autoComplete="new-password" value={f.pw2} onChange={set('pw2')} />
        {err && <p className="mt-3 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{err}</p>}
        <button className="btn mt-5" disabled={busy}>{busy ? 'Creando cuenta…' : 'Registrarme'}</button>
      </form>
      <p className="mt-5 text-center text-sm"><Link className="lnk" to="/login">← Volver al inicio de sesión</Link></p>
    </AuthShell>
  )
}
