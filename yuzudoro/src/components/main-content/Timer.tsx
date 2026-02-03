import { useState, useEffect } from 'react'

import './Timer.css'

import breakImage from '../../assets/break.png';
import skipBackward from '../../assets/player-skip-back.svg'
import skipForward from '../../assets/player-skip-forward.svg';
import play from '../../assets/player-play.svg';
import pause from '../../assets/player-pause.svg';

export function Timer() {
  const [timer, setTimer] = useState(3); // in seconds
  const [timerStatus, setTimerStatus] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  // 5:00 = 300
  // 10:00 = 600
  // 25:00 = 1500
  // 30:00 = 1800
  // 50:00 = 3000

  // Minutes: Math.floor(timer/60)
  // Seconds: timer%60
  

  useEffect(() => {
    let timerIntervalId:number = 1;

    timerIntervalId = setInterval(function() {
      console.log('this is running');  
      if (timerStatus) {
        setTimer(timer - 1);
        if (timer <= 0) {
          console.log(timer);
          console.log('STOP')
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


  return (
    <>
      <img className="break-image" src={breakImage}/>

      <div className="timer-container">

        <h1 className="timer">{`${min<10 ? '0' : ''}${min}:${sec<10 ? '0' : ''}${sec}`}</h1>
        <div className="control-container">
          <button className="timer-button-sub">
            <img className="timer-button-sub-img" src={skipBackward}/>
          </button>
          <button className="timer-button">
            {timerStatus
              ? <img className="timer-button-img" src={pause} onClick={pausePlay}/> 
              : <img className="timer-button-img" src={play} onClick={pausePlay}/>
            }
          </button>
          <button className="timer-button-sub">
            <img className="timer-button-sub-img" src={skipForward}/>
          </button>
        </div>

      </div>


    </>
          
  )
}