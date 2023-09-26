import React, { useState, useEffect } from 'react';
import "./timer.css";

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (timerRunning) {
      setTimerInterval(
        setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(timerInterval);
              setTimerRunning(false);

              if (!isBreak) {
                setIsBreak(true);
                setMinutes(5);
                setSeconds(0);
                startTimer();
              }
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000)
      );
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [minutes, seconds, timerRunning, isBreak]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
    setTimerRunning(false);
    clearInterval(timerInterval);
  };

  return (
    <div className="countdown-timer">
      <div>
      <h1>{isBreak ? 'Break Timer' : 'Work Timer'}</h1>
      <div className="timer">
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="timer-controls">
        <button onClick={startTimer} disabled={timerRunning} className={`${timerRunning?"active":""}`}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!timerRunning} className={`${!timerRunning?"active":""}`}>
          Pause
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      </div>
    </div>
  );
};

export default Timer;
