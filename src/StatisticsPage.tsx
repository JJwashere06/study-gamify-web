import { useNavigate } from "react-router-dom";
import "./StatisticsPage.css";
type Note = {
  title: string;
  description: string;
  minutes: number;
  completed?: boolean;
};

export default function StatisticsPage({ notes }: { notes: Note[] }) {
  const navigate = useNavigate();

  const totalTasks = notes.length;
  const finishedTasks = notes.filter((n) => n.completed).length;

  const totalMinutes = notes.reduce((sum, n) => sum + n.minutes, 0);
  const finishedMinutes = notes
    .filter((n) => n.completed)
    .reduce((sum, n) => sum + n.minutes, 0);

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((finishedTasks / totalTasks) * 100);

  return (
    <div className="statistics-page">
      <div
        className="statistics-content"
        style={{ padding: "30px", textAlign: "center" }}
      >
        <h1>📊 Statistics</h1>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Total Tasks:</strong> {totalTasks}
          </p>
          <p>
            <strong>Finished Tasks:</strong> {finishedTasks}
          </p>

          <p>
            <strong>Completion Rate:</strong> {completionRate}%
          </p>
        </div>

        <button className="back-button" onClick={() => navigate("/")}>
          Back to note
        </button>
      </div>
    </div>
  );
}
