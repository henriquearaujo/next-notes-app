'use client';

import { useQuery } from '@tanstack/react-query';
import NoteForm from '@/components/NoteForm';
import NoteItem from '@/components/NoteItem';

type Note = { id: string; title: string };

async function fetchNotes(): Promise<Note[]> {
  const res = await fetch('/api/notes', { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao carregar notas');
  return res.json();
}

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-3 text-2xl font-bold">Notas</h1>

      <p className="my-10 text-gray-500">Aplicação para gerenciamento de Notas simples com Next.js + MongoDB + Tailwind + Theme Toggle, para fins didáticos</p>

      {/* Formulário de criação */}
      <NoteForm />

      {/* Estados */}
      {isLoading && <p>Carregando…</p>}

      {isError && (
        <div
          role="alert"
          className="mb-3 rounded-md border border-red-200 bg-red-100 px-3 py-2 text-red-800"
        >
          Não foi possível carregar as notas.
        </div>
      )}

      {/* Lista */}
      {!isLoading && !isError && (data?.length ?? 0) === 0 && (
        <p>Nenhuma nota ainda. Crie a primeira ✨</p>
      )}

      {!isLoading && !isError && (data?.length ?? 0) > 0 && (
        <ul className="grid gap-2">
          {data!.map((n) => (
            <NoteItem key={n.id} note={n} />
          ))}
        </ul>
      )}
    </main>
  );
}
