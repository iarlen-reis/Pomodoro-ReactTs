import React from "react";
import { useInterval } from "../../hooks/useInterval";
import { secundToTime } from "../../utils/secundTotime";
import Buttton from "../Button/Buttton";
import Timer from "../Timer/Timer";
interface PomodoroTimerProps {
  pomodoroTime: number;
  shortRestTime?: number;
  longRestTimer?: number;
  circleTimer?: number;
}

const PomodoroTimer = (props: PomodoroTimerProps): JSX.Element => {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You are working</h2>
      <Timer mainTime={secundToTime(mainTime)} />
      <div className="buttons">
        <Buttton text="Start" className="button start" />
        <Buttton text="Pause" className="button stop" />
        <Buttton text="Reset" className="button reset" />
      </div>
    </div>
  );
};

export default PomodoroTimer;
