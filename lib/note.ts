import { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Note = models.Note || model('Note', NoteSchema);
