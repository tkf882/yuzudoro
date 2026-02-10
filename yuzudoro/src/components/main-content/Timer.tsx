import { useEffect, useRef } from 'react'
import { user } from '../../data/user';
import { Task } from '../../data/task';

import './Timer.css'

import breakImage from '../../assets/break.png';
import skipBackward from '../../assets/player-skip-back.svg'
import skipForward from '../../assets/player-skip-forward.svg';
import play from '../../assets/player-play.svg';
import pause from '../../assets/player-pause.svg';
import alarm from '../../assets/alarm.wav';

// interface taskFormat {
//   workDuration: number,
//   breakDuration: number,
// }

interface timerProps {
  darkmode: boolean;
  isCounting: boolean;
  setIsCounting: (value: boolean) => void;
  timeElapsed: number;
  setTimeElapsed: (value: number) => void;
  onBreak: boolean;
  setOnBreak: (value: boolean) => void;
  onBreakRef: React.RefObject<boolean>
}

export function Timer({darkmode, isCounting, setIsCounting, timeElapsed, setTimeElapsed, onBreak, setOnBreak, onBreakRef}:timerProps) {
  // 5:00 = 300
  // 10:00 = 600
  // 25:00 = 1500
  // 30:00 = 1800
  // 50:00 = 3000
  
  // state variables moved to app.tsx
  const startTimeRef = useRef(0);
  const intervalIdRef= useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  function reset() {
    setIsCounting(false);
    setTimeElapsed(0);
    // console.log('reset');
  }

  function playback() {
    startTimeRef.current = Date.now() - timeElapsed;
    setIsCounting(!isCounting);
  }

  function skip() {
    const audio = new Audio(alarm);
    audio.play();

    onBreakRef.current = !onBreakRef.current;
    setOnBreak(onBreakRef.current);

    setIsCounting(false);
    setTimeElapsed(0);
  }

  useEffect(() => {
    console.log('USE EFFECT ACTIVATED')
    const audio = new Audio(alarm);
    const currentTask:(Task | null) = user.getTask(user.currentTask);
    const currentTaskWorkDuration = currentTask ? currentTask['workDuration'] : 0;
    const currentTaskBreakDuration = currentTask ? currentTask['breakDuration'] : 0;
    if (isCounting) {
      intervalIdRef.current = setInterval(() => {
        // console.log('here')
        const millisecondElapsed = Math.floor(((Date.now() - startTimeRef.current))/1000)*1000; // avoid time errors by rounding down
        const secondsElapsed:number = millisecondElapsed/1000; // no need to round.
        console.log(`onBreak is ${onBreakRef.current}`)
        if (secondsElapsed >= currentTaskWorkDuration && !onBreakRef.current) {
          // work duration up, switch to break
          setOnBreak(true);
          onBreakRef.current = true;
          audio.play();
          reset();
        } else if (secondsElapsed >= currentTaskBreakDuration && onBreakRef.current) {
          // break duration up, switch to work
          setOnBreak(false);
          onBreakRef.current = false;
          audio.play();
          reset();
        } else {
          setTimeElapsed(millisecondElapsed); 
          // console.log(millisecondElapsed);
          console.log(secondsElapsed);
        }


      }, 1000)
    }
    return () => {
      console.log('Interval was cleared');
      clearInterval(intervalIdRef.current);
    }
  }, [isCounting]) // 


  function formatTime() {
    // const min:number = Math.floor(timeElapsed/60);
    // const sec:number = timeElapsed%60;
    const currentTask:(Task | null) = user.getTask(user.currentTask);
    const currentTaskWorkDuration = currentTask ? currentTask['workDuration'] : 0;
    const currentTaskBreakDuration = currentTask ? currentTask['breakDuration'] : 0;

    const secondsElapsed:number = (onBreak ? currentTaskBreakDuration : currentTaskWorkDuration) - Math.floor(timeElapsed/1000);

    const min:string = String(Math.floor(secondsElapsed/60)).padStart(2, "0");
    const sec:string = String(Math.floor((secondsElapsed%60))).padStart(2, "0");
    return `${min}:${sec}`;
  }

  return (
    <>
      <title>{`${formatTime()} - Yuzudoro`}</title>
      <img className={`break-image ${!onBreak ? 'break-image-focus' : ''}`} src={breakImage}/>
      <h2 className={`state-text ${darkmode ? 'state-text-dark' : ''}`}>{onBreak ? 'Let\'s take a break.' : 'Let\'s focus.'}</h2>
      <div className={`timer-container ${darkmode ? 'timer-container-dark' : ''}`}>
        <h1 className={`timer ${darkmode ? 'timer-dark' : ''}`}>{formatTime()}</h1>
        <div className="control-container">
          <button className="timer-button-sub">
            <img className={`timer-button-sub-img ${darkmode ? 'timer-button-sub-img-dark' : ''}`} src={skipBackward} onClick={reset}/>
          </button>
          <button className={`timer-button ${darkmode ? 'timer-button-dark' : ''}`}>
            {isCounting
              ? <img className={`timer-button-img ${darkmode ? 'timer-button-img-dark' : ''}`} src={pause} onClick={playback}/> 
              : <img className={`timer-button-img ${darkmode ? 'timer-button-img-dark' : ''}`} src={play} onClick={playback}/>
            }
          </button>
          <button className="timer-button-sub">
            <img className={`timer-button-sub-img ${darkmode ? 'timer-button-sub-img-dark' : ''}`} src={skipForward} onClick={skip}/>
          </button>
        </div>
      </div>
    </>  
  )
}