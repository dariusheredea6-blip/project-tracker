import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import { supabase } from '../lib/supabase'
import { traducir } from '../lib/errores'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setErr(''); setBusy(true)
    localStorage.setItem('pt_remember', remember ? '1' : '0')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw })
    setBusy(false)
    if (error) setErr(traducir(error.message))
  }

  return (
    <AuthShell title="Bienvenido de nuevo" subtitle="Inicia sesión para continuar">
      <form onSubmit={submit}>
        <label className="lbl">Correo electrónico</label>
        <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
        <label className="lbl">Contraseña</label>
        <div className="relative">
          <input className="input pr-16" type={show ? 'text' : 'password'} autoComplete="current-password" required value={pw} onChange={(e) => setPw(e.target.value)} />
          <button type="button" className="lnk absolute right-3 top-2.5 text-sm" onClick={() => setShow(!show)}>{show ? 'Ocultar' : 'Ver'}</button>
        </div>
        <div className="my-4 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Recordarme</label>
          <Link className="lnk" to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>
        {err && <p className="mb-3 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? 'Entrando…' : 'Iniciar sesión'}</button>
      </form>
      <p className="mt-5 text-center text-sm text-violet-200/70">¿No tienes cuenta? <Link className="lnk" to="/registro">Crear una cuenta</Link></p>
    </AuthShell>
  )
}
