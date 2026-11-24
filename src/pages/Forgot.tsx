import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import { supabase, siteUrl } from '../lib/supabase'
import { traducir } from '../lib/errores'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setErr(''); setBusy(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: siteUrl() })
    setBusy(false)
    if (error) setErr(traducir(error.message)); else setSent(true)
  }

  return (
    <AuthShell title="Recuperar contraseña" subtitle="Te enviaremos un enlace para crear una nueva">
      {sent ? (
        <p className="mt-4 text-sm">Si ese correo tiene una cuenta, recibirás un enlace en unos minutos. Revisa también la carpeta de spam.</p>
      ) : (
        <form onSubmit={submit}>
          <label className="lbl">Correo electrónico</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          {err && <p className="mt-3 rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{err}</p>}
          <button className="btn mt-5" disabled={busy}>{busy ? 'Enviando…' : 'Enviar enlace'}</button>
        </form>
      )}
      <p className="mt-5 text-center text-sm"><Link className="lnk" to="/login">← Volver al inicio de sesión</Link></p>
    </AuthShell>
  )
}
