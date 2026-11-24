import { ReactNode } from 'react'

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-5"
      style={{ background: 'radial-gradient(60% 50% at 20% 10%,#5b17d6aa,transparent),radial-gradient(50% 50% at 90% 90%,#a21cafaa,transparent),#07040f' }}
    >
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-xl">
        <div className="mb-5 text-center">
          <img src={`${import.meta.env.BASE_URL}logo-horizontal.png`} alt="Project Tracker" className="mx-auto h-16 object-contain" />
        </div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-violet-200/70">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
