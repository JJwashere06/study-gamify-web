import { useState, useEffect } from "react";
import "./NoteForm.css";

type Note = {
  title: string;
  description: string;
  hours: number;
};

export default function NoteForm({
  onDone,
  onClose,
  existingNote,
}: {
  onDone: (note: Note) => void;
  onClose: () => void;
  existingNote: Note | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState<number>(0);

  // preload values when editing
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setDescription(existingNote.description);
      setHours(existingNote.hours);
    }
  }, [existingNote]);

  const handleDone = () => {
    if (!title.trim()) return alert("Title required");
    onDone({ title, description, hours });
  };

  return (
    <div className="overlay">
      <div className="form-window">
        <h2>{existingNote ? "Edit task" : "Add new task"}</h2>

        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          value={hours}
          type="number"
          placeholder="Duration (Hours)"
          onChange={(e) => setHours(Number(e.target.value))}
        />

        <div className="buttons">
          <button className="button" onClick={handleDone}>
            {existingNote ? "Save" : "Done"}
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
