import "./main.css";
type NoteProps = {
  title: string;
  description: string;
  hours: number;

  onEdit: () => void;
  onDelete: () => void;
  onDo: () => void;
  onlyTitle?: boolean;
};

export default function NoteCard({
  title,
  description,
  hours,

  onEdit,
  onDelete,
  onDo,
  onlyTitle = false,
}: NoteProps) {
  return (
    <div className="task">
      <div className="tasky">
        <h2>{title}</h2>
        {!onlyTitle && (
          <div>
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
        )}
      </div>
      {!onlyTitle && (
        <div className="reward">
          <button className="do-button" onClick={onDo}>
            Do
          </button>
        </div>
      )}
    </div>
  );
}
