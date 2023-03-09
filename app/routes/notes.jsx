import { json, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { storeNotes, getStoredNotes } from "~/data/notes";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />"
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Title must be at least 5 characters long" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function CatchBoundary({ error }) {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || "Data not found";

  return (
    <main>
      <p className="info-message">{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
