import React from "react";

const TimeSetting = props => {
  const { id, label, value, onChange } = props;
  return (
    <div className="timeSetting">
      <label id={`${id}-label`}>{label}</label>
      <div>
        <button id={`${id}-decrement`} onClick={ev => onChange(value - 1)}>
          -
        </button>
        <input
          type="number"
          id={`${id}-length`}
          value={value}
          onChange={({ target }) => onChange(target.value)}
        />
        <button id={`${id}-increment`} onClick={ev => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export { TimeSetting };
