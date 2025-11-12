'use client';

import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreatePayload = { title: string };

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const qc = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (payload: CreatePayload) => {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Falha ao criar nota');
      return res.json();
    },
    onSuccess: () => {
      setTitle('');
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    createMutation.mutate({ title: t });
  }

  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da nota"
        className="flex-1 rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
      />
      <button
        type="submit"
        className="rounded-md border border-zinc-900 bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-800"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Criando…' : 'Criar'}
      </button>
    </form>
  );
}
