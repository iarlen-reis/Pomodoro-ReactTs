import React, { useEffect } from "react";
import { useInterval } from "../../hooks/useInterval";
import { secundToTime } from "../../utils/secundTotime";
import Buttton from "../Button/Buttton";
import Timer from "../Timer/Timer";

const startWorkBell = new Audio("../sounds/bell-start.mp3");
const finishWorkBell = new Audio("../sounds/bell-finish.mp3");

interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTimer: number;
  circleTimer: number;
}

const PomodoroTimer = (props: PomodoroTimerProps): JSX.Element => {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCouting, setTimeCouting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCouting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    startWorkBell.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCouting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTimer);
    } else {
      setMainTime(props.shortRestTime);
    }

    finishWorkBell.play();
  };

  return (
    <div className="pomodoro">
      <h2>You are working</h2>
      <Timer mainTime={secundToTime(mainTime)} />
      <div className="buttons">
        <Buttton text="Work" className="button start" onClick={configureWork} />
        <Buttton
          text={timeCouting ? "Pause" : "Start"}
          className={!working && !resting ? "hidden" : "button stop"}
          onClick={() => setTimeCouting(!timeCouting)}
        />
        <Buttton
          text="Reset"
          className="button reset"
          onClick={() => configureRest(false)}
        />
      </div>
      <div className="details">
        <p>Time Working: </p>
        <p>Cicles: </p>
        <p>Restando: </p>
        <p>Restando: </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
