import "./main.css";
type NoteProps = {
  title: string;
  description: string;
  hours: number;
  onEdit: () => void;
  onDelete: () => void;
  onDo: () => void;
  onFavourite: () => void;
};

export default function NoteCard({
  title,
  description,
  hours,
  onEdit,
  onDelete,
  onDo,
}: NoteProps) {
  const minutes = Number(hours) * 60;
  return (
    <div className="task">
      <div className="tasky">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <strong>Duration:</strong> {hours} minutes
        </p>
        <button className="modify-button" onClick={onEdit}>
          Edit
        </button>
        <button className="modify-button" onClick={onDelete}>
          Delete
        </button>
      </div>
      <div className="reward">
        <button className="do-button" onClick={onDo}>
          Do
        </button>
      </div>
    </div>
  );
}
