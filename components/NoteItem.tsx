'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';

type Note = { id: string; title: string };

export default function NoteItem({ note }: { note: Note }) {
  const qc = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!(res.ok || res.status === 204)) throw new Error('Falha ao apagar');
      return true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar nota');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
      setIsEditing(false);
    },
  });

  function onSubmitEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = title.trim();
    if (!t || t === note.title) {
      setIsEditing(false);
      setTitle(note.title);
      return;
    }
    updateMutation.mutate({ id: note.id, title: t });
  }

  if (isEditing) {
    return (
      <li className="flex items-center justify-between gap-2 rounded-md border border-zinc-200 p-3">
        <form onSubmit={onSubmitEdit} className="flex w-full items-center gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
            autoFocus
          />
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-md border border-zinc-900 bg-zinc-900 px-3 py-2 text-white transition hover:bg-zinc-800 disabled:opacity-60"
          >
            {updateMutation.isPending ? 'Salvando…' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setTitle(note.title);
            }}
            className="rounded-md border border-zinc-300 px-3 py-2 transition hover:bg-zinc-100"
          >
            Cancelar
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between rounded-md border border-zinc-200 p-3">
      <span className="truncate">{note.title}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-md border border-zinc-300 px-3 py-1 transition hover:bg-zinc-100"
        >
          Editar
        </button>
        <button
          onClick={() => deleteMutation.mutate(note.id)}
          className="rounded-md border border-red-800 px-3 py-1 text-red-800 transition hover:bg-red-50 disabled:opacity-60"
          aria-label={`Apagar nota ${note.title}`}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? 'Apagando…' : 'Apagar'}
        </button>
      </div>
    </li>
  );
}
