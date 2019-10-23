import React from "react";

const OnOff = ({ status, onClick }) => {
  return (
    <button id="start_stop" onClick={onClick}>
      {status ? "Stop" : "Start"}
    </button>
  );
};

export { OnOff };
