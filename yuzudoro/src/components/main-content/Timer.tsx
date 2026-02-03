import { useState, useEffect } from 'react'
import alarm from '../../assets/alarm.wav';

import './Timer.css'

import breakImage from '../../assets/break.png';
import skipBackward from '../../assets/player-skip-back.svg'
import skipForward from '../../assets/player-skip-forward.svg';
import play from '../../assets/player-play.svg';
import pause from '../../assets/player-pause.svg';

interface timerProps {
  darkmode: boolean;
}

export function Timer({darkmode}:timerProps) {
  // 5:00 = 300
  // 10:00 = 600
  // 25:00 = 1500
  // 30:00 = 1800
  // 50:00 = 3000

  // Minutes: Math.floor(timer/60)
  // Seconds: timer%60
  const [timer, setTimer] = useState(3); // in seconds
  const [timerStatus, setTimerStatus] = useState(false);
  const [onBreak, setOnBreak] = useState(false);


  useEffect(() => {
    const audio = new Audio(alarm)
    let timerIntervalId:number = 1;

    timerIntervalId = setInterval(function() {
      console.log('this is running');  
      if (timerStatus) {
        setTimer(timer - 1);
        if (timer <= 0) {
          console.log(timer);
          console.log('STOP')
          audio.play();
          if (onBreak) {
            setTimer(3);
          } else {
            setTimer(5);
          }
          setOnBreak(!onBreak);
          setTimerStatus(!timerStatus);
          clearInterval(timerIntervalId);
        }
      }
    }, 1000)
    return() => {
      clearInterval(timerIntervalId);
    }
  }, [timer, timerStatus, onBreak])

  function pausePlay() {
    setTimerStatus(!timerStatus);
  }

  const min:number = Math.floor(timer/60);
  const sec:number = timer%60;

  const timeFormat:string = `${min<10 ? '0' : ''}${min}:${sec<10 ? '0' : ''}${sec}`;


  return (
    <>
      <title>{`${timeFormat} - Yuzudoro`}</title>

      <img className={`break-image ${!onBreak ? 'break-image-focus' : ''}`} src={breakImage}/>
      <h2 className={`state-text ${darkmode ? 'state-text-dark' : ''}`}>{onBreak ? 'Let\'s take a break.' : 'Let\'s focus.'}</h2>
      <div className={`timer-container ${darkmode ? 'timer-container-dark' : ''}`}>
        <h1 className={`timer ${darkmode ? 'timer-dark' : ''}`}>{timeFormat}</h1>
        <div className="control-container">
          <button className="timer-button-sub">
            <img className={`timer-button-sub-img ${darkmode ? 'timer-button-sub-img-dark' : ''}`} src={skipBackward}/>
          </button>
          <button className={`timer-button ${darkmode ? 'timer-button-dark' : ''}`}>
            {timerStatus
              ? <img className={`timer-button-img ${darkmode ? 'timer-button-img-dark' : ''}`} src={pause} onClick={pausePlay}/> 
              : <img className={`timer-button-img ${darkmode ? 'timer-button-img-dark' : ''}`} src={play} onClick={pausePlay}/>
            }
          </button>
          <button className="timer-button-sub">
            <img className={`timer-button-sub-img ${darkmode ? 'timer-button-sub-img-dark' : ''}`} src={skipForward}/>
          </button>
        </div>
      </div>
    </>  
  )
}