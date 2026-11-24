import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import { supabase } from '../lib/supabase'
import { traducir } from '../lib/errores'
import { useAuth } from '../auth/AuthContext'

export default function Reset() {
  const { session, clearRecovery } = useAuth()
  const nav = useNavigate()
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setErr('')
    if (pw.length < 8 || !/[A-Z]/.test(pw) || !/[a-z]/.test(pw) || !/\d/.test(pw)) return setErr('Mínimo 8 caracteres con mayúscula, minúscula y número.')
    if (pw !== pw2) return setErr('Las contraseñas no coinciden.')
    setBusy(true)
    const { error } = await supabase.auth.updateUser({ password: pw })
    setBusy(false)
    if (error) return setErr(traducir(error.message))
    clearRecovery()
    nav('/', { replace: true })
  }

  if (!session)
    return (
      <AuthShell title="Enlace no válido">
        <p className="mt-3 text-sm">El enlace ha caducado o ya se usó. Pide uno nuevo.</p>
        <Link className="btn mt-5 block text-center" to="/recuperar">Pedir otro enlace</Link>
      </AuthShell>
    )

  return (
    <AuthShell title="Nueva contraseña">
      <form onSubmit={submit}>
        <label className="lbl">Nueva contraseña</label><input className="input" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <label className="lbl">Repetir contraseña</label><input className="input" type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
        {err && <p className="mt-3 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{err}</p>}
        <button className="btn mt-5" disabled={busy}>{busy ? 'Guardando…' : 'Guardar contraseña'}</button>
      </form>
    </AuthShell>
  )
}
