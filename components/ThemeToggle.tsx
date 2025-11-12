'use client';

import { useTheme } from '@/app/theme-provider';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // evita hidratação desigual
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded-md border border-zinc-300 px-3 py-1 text-sm transition hover:bg-zinc-100"
        title="Alternar claro/escuro"
        onClick={toggleTheme}
      >
        {document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
      </button>

      <select
        aria-label="Modo de tema"
        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm"
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
      >
        <option value="system">Sistema</option>
        <option value="light">Claro</option>
        <option value="dark">Escuro</option>
      </select>
    </div>
  );
}
