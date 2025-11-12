export type Note = { id: string; title: string };

// garante um único array compartilhado entre reloads no modo dev
declare global {
  // eslint-disable-next-line no-var
  var __NOTES__: Note[] | undefined;
}

const shared: Note[] = globalThis.__NOTES__ ?? [];
if (!globalThis.__NOTES__) {
  globalThis.__NOTES__ = shared;
}

export const NOTES = shared;

export function addNote(title: string) {
  const note: Note = { id: crypto.randomUUID(), title: title.trim() };
  NOTES.unshift(note);
  return note;
}

export function removeNote(id: string) {
  const idx = NOTES.findIndex((n) => n.id === id);
  if (idx === -1) return false;
  NOTES.splice(idx, 1);
  return true;
}
