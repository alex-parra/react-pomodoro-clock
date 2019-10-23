import React from "react";

const Reset = ({ onClick }) => {
  return (
    <button id="reset" onClick={ev => onClick()}>
      Reset
    </button>
  );
};

export { Reset };
