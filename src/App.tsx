import React from "react";

import PomodoroTimer from "./components/Pomodoro/PomodoroTimer";

import "./index.css";

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTimer={900}
        circleTimer={4}
      />
    </div>
  );
}

export default App;
