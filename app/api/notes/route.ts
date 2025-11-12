import { NOTES, addNote, removeNote } from './store';

// GET → lista todas as notas
export async function GET() {
  return Response.json(NOTES);
}

// POST → cria nova nota
export async function POST(req: Request) {
  const { title } = await req.json();
  const t = String(title || '').trim();

  if (!t) {
    return Response.json({ message: 'title é obrigatório' }, { status: 400 });
  }

  const note = addNote(t);
  return Response.json(note, { status: 201 });
}

// DELETE → remove uma nota informando ?id=...
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ message: 'id é obrigatório' }, { status: 400 });
  }

  const ok = removeNote(id);
  if (!ok) {
    return Response.json({ message: 'nota não encontrada' }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
