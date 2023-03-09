import { Form, useActionData, useNavigation } from "@remix-run/react";

import styles from "./NewNote.css";

export default function NewNote() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="note-title">Title</label>
        <input type="text" name="title" id="title" />
      </p>
      <p>
        <label htmlFor="note-body">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>Add Note</button>
      </div>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
