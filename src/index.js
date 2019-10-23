import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

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

const OnOff = ({ status, onClick }) => {
  return (
    <button id="start_stop" onClick={onClick}>
      {status ? "Stop" : "Start"}
    </button>
  );
};

const Reset = ({ onClick }) => {
  return (
    <button id="reset" onClick={ev => onClick()}>
      Reset
    </button>
  );
};

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

const defaultState = {
  sessionLength: 25 * 60,
  breakLength: 5 * 60,
  secondsRemaining: null,
  timerOn: false,
  timerId: "session"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      secondsRemaining: defaultState.sessionLength
    };
  }

  setTimerStatus = () => {
    this.setState(state => {
      const {
        timerOn,
        timerId,
        secondsRemaining,
        sessionLength,
        breakLength
      } = state;
      const secsRemaining = secondsRemaining
        ? secondsRemaining
        : timerId === "session"
        ? sessionLength
        : breakLength;
      return { timerOn: !timerOn, secondsRemaining: secsRemaining };
    });
  };

  setBreak = len => {
    if (this.state.timerOn || len <= 0 || len > 60) return;
    this.setState({ breakLength: len * 60 });
  };

  setSession = len => {
    if (this.state.timerOn || len <= 0 || len > 60) return;
    this.setState({ sessionLength: len * 60, secondsRemaining: len * 60 });
  };

  resetTimer = () => {
    this.buzzer.pause();
    this.buzzer.currentTime = 0;
    this.setState({
      ...defaultState,
      secondsRemaining: defaultState.sessionLength
    });
  };

  componentDidMount() {
    document.addEventListener("keypress", ev => {
      if (ev.key === " ") this.setTimerStatus();
    });
  }

  componentDidUpdate() {
    const { timerOn, secondsRemaining } = this.state;
    if (!timerOn) return;

    setTimeout(() => {
      this.setState(state => {
        const { timerOn, secondsRemaining, timerId } = state;

        if (!timerOn) return { ...state };

        // running
        if (secondsRemaining !== 0) {
          return { secondsRemaining: state.secondsRemaining - 1 };
        }

        if (timerId === "session") {
          this.buzzer.play();
          return { secondsRemaining: state.breakLength, timerId: "break" };
        }

        if (timerId === "break") {
          return { secondsRemaining: state.sessionLength, timerId: "session" };
        }
      });
    }, 1000);
  }

  render() {
    const {
      sessionLength,
      breakLength,
      secondsRemaining,
      timerOn,
      timerId
    } = this.state;

    return (
      <div className="pomClock">
        <audio
          id="beep"
          preload="auto"
          src="https://goo.gl/65cBl1"
          ref={audio => {
            this.buzzer = audio;
          }}
        />
        <div className="timeSetters">
          <TimeSetting
            id={"session"}
            value={parseInt(sessionLength / 60)}
            label={"Session Length"}
            onChange={len => this.setSession(len)}
          />
          <TimeSetting
            id={"break"}
            value={parseInt(breakLength / 60)}
            label={"Break Length"}
            onChange={len => this.setBreak(len)}
          />
        </div>

        <Timer secondsRemaining={secondsRemaining} timerId={timerId} />

        <div className="controls">
          <OnOff status={this.state.timerOn} onClick={this.setTimerStatus} />
          <Reset onClick={this.resetTimer} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
