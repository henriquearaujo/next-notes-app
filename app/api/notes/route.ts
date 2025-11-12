import { connectDB } from '@/lib/db';
import { Note } from '@/lib/note';
import { Types } from 'mongoose';

type NoteLean = { _id: Types.ObjectId; title: string };
type NoteDTO = { id: string; title: string };

const toDTO = (n: NoteLean): NoteDTO => ({ id: n._id.toString(), title: n.title });

// GET → lista todas as notas (Mongo)
export async function GET() {
  await connectDB();
  const notes = await Note.find()
    .sort({ createdAt: -1 })
    .select('_id title')
    .lean<NoteLean[]>();
  return Response.json(notes.map(toDTO));
}

// POST → cria nova nota (Mongo)
export async function POST(req: Request) {
  await connectDB();
  const { title } = await req.json();
  const t = String(title || '').trim();

  if (!t) {
    return Response.json({ message: 'title é obrigatório' }, { status: 400 });
  }

  const created = await Note.create({ title: t });
  // seleciona apenas os campos necessários
  const leanCreated: NoteLean = { _id: created._id as Types.ObjectId, title: created.title };
  return Response.json(toDTO(leanCreated), { status: 201 });
}

// PATCH → atualiza o título informando ?id=...
export async function PATCH(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ message: 'id é obrigatório' }, { status: 400 });

  const { title } = await req.json();
  const t = String(title || '').trim();
  if (!t) return Response.json({ message: 'title é obrigatório' }, { status: 400 });

  const updated = await Note.findByIdAndUpdate(id, { title: t }, { new: true })
    .select('_id title')
    .lean<NoteLean | null>();
  if (!updated) return Response.json({ message: 'nota não encontrada' }, { status: 404 });

  return Response.json(toDTO(updated));
}

// DELETE → remove uma nota informando ?id=...
export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ message: 'id é obrigatório' }, { status: 400 });
  }

  const res = await Note.deleteOne({ _id: id });
  if (res.deletedCount === 0) {
    return Response.json({ message: 'nota não encontrada' }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
