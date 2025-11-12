'use client';

import { useEffect, useState } from 'react';

type Note = { id: string; title: string };

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/notes', { cache: 'no-store' });
      if (!res.ok) throw new Error('Falha ao carregar notas');
      const data = (await res.json()) as Note[];
      setNotes(data);
    } catch (err) {
      setErrorMsg('Não foi possível carregar as notas.');
    } finally {
      setLoading(false);
    }
  }

  async function createNote(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    setErrorMsg(null);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: t }),
      });
      if (!res.ok) throw new Error('Falha ao criar nota');

      setTitle('');
      await load();
    } catch {
      setErrorMsg('Não foi possível criar a nota.');
    }
  }

  async function removeNote(id: string) {
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      // 204 = sucesso sem corpo
      if (!(res.ok || res.status === 204)) throw new Error('Falha ao apagar');
      await load();
    } catch {
      setErrorMsg('Não foi possível apagar a nota.');
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Notas</h1>

      <form onSubmit={createNote} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da nota"
          style={{
            flex: 1,
            padding: 8,
            border: '1px solid #ccc',
            borderRadius: 6,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #000',
            cursor: 'pointer',
            background: '#000',
            color: '#fff',
          }}
        >
          Criar
        </button>
      </form>

      {errorMsg && (
        <div
          role="alert"
          style={{
            marginBottom: 12,
            padding: 10,
            borderRadius: 6,
            border: '1px solid #f5c2c7',
            background: '#f8d7da',
            color: '#842029',
          }}
        >
          {errorMsg}
        </div>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : notes.length === 0 ? (
        <p>Nenhuma nota ainda. Crie a primeira ✨</p>
      ) : (
        <ul style={{ display: 'grid', gap: 8 }}>
          {notes.map((n) => (
            <li
              key={n.id}
              style={{
                border: '1px solid #ddd',
                padding: 12,
                borderRadius: 6,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{n.title}</span>
              <button
                onClick={() => removeNote(n.id)}
                style={{
                  border: '1px solid #900',
                  color: '#900',
                  padding: '4px 8px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: '#fff',
                }}
                aria-label={`Apagar nota ${n.title}`}
              >
                Apagar
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
