import { connectDB } from '@/lib/db';
import { Note } from '@/lib/note';

// GET → lista todas as notas (Mongo)
export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 }).lean();
  return Response.json(
    notes.map((n: any) => ({ id: String(n._id), title: n.title }))
  );
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
  return Response.json({ id: String(created._id), title: created.title }, { status: 201 });
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
