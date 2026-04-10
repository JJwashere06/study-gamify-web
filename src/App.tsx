import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";
import TimerPage from "./TimerPage";
import StatisticsPage from "./StatisticsPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { STORAGE_KEYS } from "./utils/StorageKey";

type Note = {
  title: string;
  description: string;
  hours: number;
};

function App() {
  const navigate = useNavigate();
  //check local storage for saved note
  //json.parse(string->object)
  //json.stringify(object->string)
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("study_notes");
    return saved ? JSON.parse(saved) : [];
  });

  //check to show form or not
  const [showForm, setShowForm] = useState(false);
  //check which is one is editing
  const [editIndex, setEditIndex] = useState<number | null>(null);

  //save feature everytime after update note
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  const openAddForm = () => {
    setEditIndex(null); // ensure no editing
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDone = (note: Note) => {
    if (editIndex !== null) {
      // update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // add new note
      setNotes([...notes, note]);
    }

    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
    setShowForm(false); // close mini window after saving
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <div className="container">
              <img className="container" src="/pictureformyweb/head2.png" />
              <h1 className="webheader">Study Progress Gamify</h1>

              {/*<p id="coinDisplay">
                <img
                  className="coinDisplayPic"
                  src="/pictureformyweb/coin-image.png"
                />
                0
              </p>*/}
            </div>

            <div
              className="menu"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <p className="Menu">Menu</p>

              <div
                className="menubutton"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  columnGap: "50px",
                }}
              >
                <button className="store">store</button>
                <button className="achievement">achievement</button>
                <button className="stat" onClick={() => navigate("/stats")}>
                  statistic
                </button>
              </div>
            </div>

            <div className="todolist">
              <div className="addNote">
                <button onClick={openAddForm}>
                  <img
                    src="/pictureformyweb/addNotes.png"
                    className="addNotes-button"
                  />
                </button>
              </div>
            </div>
            {showForm && (
              <NoteForm
                onDone={handleDone}
                onClose={() => setShowForm(false)}
                existingNote={editIndex !== null ? notes[editIndex] : null}
              />
            )}

            {notes.map((note, index) => (
              <NoteCard
                key={index}
                title={note.title}
                description={note.description}
                hours={note.hours}
                onEdit={() => openEditForm(index)}
                onDelete={() => handleDelete(index)}
                onDo={() =>
                  navigate("/timer", { state: { hours: note.hours } })
                }
              />
            ))}
          </div>
        }
      />

      <Route path="/timer" element={<TimerPage />} />
      <Route path="/stats" element={<StatisticsPage notes={notes} />} />
    </Routes>
  );
}

export default App;
