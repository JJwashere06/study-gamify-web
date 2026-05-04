import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TimerPage.css";
import NoteCard from "./NoteCard";

import Clock from "./Clock";

export default function TimerPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { hours } = location.state || { hours: 1 };

  //const totalSeconds = hours * 3600;
  const totalSeconds = hours * 60;

  const [time, setTime] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (time <= 0 || isPaused) return;

    const countdown = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [time, isPaused]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h : ${m}m : ${s}s`;
    return `${m}m : ${s}s`;
  };

  return (
    <div className="timer-page">
      <div className="timer-content">
        <h1 className="title">Study Timer</h1>
        {/*add only title of the card of the one that we do??*/}

        <div className="timer">
          <Clock progress={time / totalSeconds} size={200} />
          <h2 className="timer-text">{formatTime(time)}</h2>
        </div>

        {time === 0 && <h2>Time's Up!</h2>}
        {time > 0 && (
          <button className="p" onClick={() => setIsPaused((p) => !p)}>
            {isPaused ? (
              <img
                className="pause-button"
                src="/pictureformyweb/resumeButton.png"
              />
            ) : (
              <img
                className="pause-button"
                src="/pictureformyweb/pauseButton.png"
              />
            )}
          </button>
        )}

        {time > 0 && (
          <button className="back-button" onClick={() => navigate("/")}>
            Back to notes
          </button>
        )}
        {time === 0 && (
          <button
            className="back-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
