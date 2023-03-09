import { redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/newNote";
import { getStoredNotes } from "~/data/notes";
import { storeNotes } from "../data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks()];
}
