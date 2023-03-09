import styles from "./NewNote.css";

export default function NewNote() {
  return (
    <form method="post" id="note-form">
      <p>
        <label htmlFor="note-title">Title</label>
        <input type="text" name="note-title" id="note-title" />
      </p>
      <p>
        <label htmlFor="note-body">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
