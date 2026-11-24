export function traducir(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'Correo o contraseña incorrectos.'
  if (m.includes('not confirmed')) return 'Debes confirmar tu correo antes de entrar. Revisa tu bandeja de entrada.'
  if (m.includes('rate limit') || m.includes('too many')) return 'Demasiados intentos o correos enviados. Espera unos minutos y vuelve a probar.'
  if (m.includes('already registered')) return 'Ese correo ya está registrado.'
  if (m.includes('database error saving new user')) return 'No se pudo crear la cuenta: el nombre de usuario ya existe o no es válido.'
  if (m.includes('same password')) return 'La nueva contraseña debe ser distinta de la anterior.'
  return msg
}
