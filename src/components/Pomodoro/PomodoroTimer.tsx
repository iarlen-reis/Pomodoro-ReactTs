import React, { useEffect, useState, useCallback } from "react";
import { useInterval } from "../../hooks/useInterval";
import { secundToMinutes } from "../../utils/secundToMinutes";
import { secundToTime } from "../../utils/secundToTime";
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
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCouting, setTimeCouting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.circleTimer - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);

      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCouting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    startWorkBell.play();
  }, [setTimeCouting, setWorking, setResting, setMainTime, props.pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCouting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTimer);
      } else {
        setMainTime(props.shortRestTime);
      }

      finishWorkBell.play();
    },
    [
      setTimeCouting,
      setWorking,
      setResting,
      props.longRestTimer,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.circleTimer - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    configureWork,
    setCyclesQtdManager,
    props.circleTimer,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está {working ? "trabalhando" : "descansando"}</h2>
      <Timer mainTime={secundToMinutes(mainTime)} />
      <div className="buttons">
        <Buttton text="work" className="button start" onClick={configureWork} />
        <Buttton
          text={timeCouting ? "stop" : "start"}
          className={!working && !resting ? "hidden" : "button start"}
          onClick={() => setTimeCouting(!timeCouting)}
        />
        <Buttton
          text="reset"
          className="button reset"
          onClick={() => configureRest(false)}
        />
      </div>
      <div className="details">
        <p>Ciclos: {completedCycles} </p>
        <p>Tempo: {secundToTime(fullWorkingTime)} </p>
        <p>Pomodoros: {numberOfPomodoros} </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
