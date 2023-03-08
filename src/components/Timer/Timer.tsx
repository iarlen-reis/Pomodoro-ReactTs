import React from "react";

interface TimerProps {
  mainTime: string;
}

const Timer = (props: TimerProps): JSX.Element => {
  return <div className="timer">{props.mainTime}</div>;
};

export default Timer;
