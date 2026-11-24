# PROJECT TRACKER — v0.1 (acceso y cuentas con Supabase)

React + TypeScript + Tailwind CSS + Supabase. Se publica en GitHub Pages con GitHub Actions
(GitHub compila la web por ti: no necesitas instalar nada en tu ordenador).

Incluye: registro, inicio de sesión, "recordarme", recuperar y cambiar contraseña, cierre de sesión,
rutas protegidas y panel inicial que muestra tu rol (Propietario / Superadministrador / Usuario).
Espacios, archivos y tareas llegan en las siguientes versiones.

## 1. Subir a GitHub
1. En github.com: **New repository** → nombre `project-tracker` → Public → **Create repository**.
2. **uploading an existing file** y arrastra TODO el contenido de esta carpeta (incluida `.github` y `public`).
   Comprueba que en el repositorio aparece `.github/workflows/deploy.yml`.
3. **Commit changes**.

## 2. Activar GitHub Pages
**Settings → Pages → Build and deployment → Source: GitHub Actions.**
En la pestaña **Actions** verás "Desplegar en GitHub Pages" ejecutándose (2-3 min).
Tu web: `https://TU_USUARIO.github.io/project-tracker/`

## 3. Configurar Supabase (imprescindible para que funcione el login)
En tu proyecto de Supabase → **Authentication → URL Configuration**:
- **Site URL**: `https://TU_USUARIO.github.io/project-tracker/`
- **Redirect URLs → Add URL**: `https://TU_USUARIO.github.io/project-tracker/**`
En **Authentication → Sign In / Providers → Email**: deja activado **Confirm email**.

## 4. Cuenta propietaria
Regístrate en la web con `dariusheredea6@gmail.com`, confirma el correo, inicia sesión:
el panel debe mostrar el rol **Propietario**. El rol lo asigna la base de datos (no el navegador) y solo
si el correo está confirmado y aún no existe otro propietario.

## Claves
La app incluye la URL y la clave PÚBLICA (`sb_publishable_…`) de tu proyecto: son seguras en el
navegador porque los datos están protegidos con RLS. NUNCA subas la clave `sb_secret_` / `service_role`.

## Desarrollo local (opcional)
`npm install` y `npm run dev`.

## Actualizar la web
Cambia los archivos en GitHub (o sube versiones nuevas) y haz commit: se vuelve a desplegar sola.
