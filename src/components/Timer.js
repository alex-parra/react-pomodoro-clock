import React from "react";

const Timer = ({ secondsRemaining, timerId }) => {
  const minutes = parseInt(secondsRemaining / 60);
  const seconds =
    secondsRemaining >= 60 ? secondsRemaining % 60 : secondsRemaining;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <div className="timer">
      <label id="timer-label">{timerId}</label>
      <div id="time-left">{[mm, ss].join(":")}</div>
    </div>
  );
};

export { Timer };
