import { Session } from '../../data/session';
// import type { sessionTask } from '../../data/sessionTask';

import './Bar.css'

// Default format:
/*
<div className="bar">
  <div className="filled" style={{flex: '10'}}>
    <div className="bar-stack-left" style={{flex: '5', backgroundColor: 'lightgreen'}}>
      <div className="bar-stack-tooltip">Task 3 (5h)</div>
    </div>
    <div className="bar-stack" style={{flex: '3', backgroundColor: 'lightblue'}}>
      <div className="bar-stack-tooltip">Task 1 (3h)</div>
    </div>
    <div className="bar-stack-right" style={{flex: '2', backgroundColor: 'lightcoral'}}>
      <div className="bar-stack-tooltip">Task 2 (2h)</div>
    </div>
  </div>
  <div className="bar-stack" style={{flex: '14', pointerEvents: 'none', backgroundColor: 'rgba(0, 0, 0, 0)'}}></div>
</div>
*/

// Only one task
/*
<div class="bar">
  <div class="filled" style="flex: 6">
    <div class="bar-stack-left bar-stack-right" style="flex: 6; background-color: lightblue;">
      <div class="bar-stack-tooltip">Task 1 (6h)</div>
    </div>
  </div>
  <div class="bar-stack" style="flex: 18; pointer-events: none; background-color: rgba(0, 0, 0, 0)"></div>
</div>
*/

// Empty format:
/*
<div className="bar">
  <div className="filled" style={{flex: '0'}}>
  </div>
  <div className="bar-stack" style={{flex: '24', pointerEvents: 'none', backgroundColor: 'rgba(0, 0, 0, 0)'}}></div>
</div>
*/

interface barProps {
  session: Session;
  max: number;
}
export function Bar({session, max}:barProps) {

  const sessionTaskArrLength:number = session.sessionTasks.length;

  const hours = Number((session.totalDuration/ 3600).toFixed(1));
  const filledDivLength:number = hours;
  // console.log(`filled: ${filledDivLength}`);
  const emptyDivLength:number = (12 < max ? 24 : 12) - filledDivLength; // if maximum larger than 12h, use 24h. Otherwise 12h maximum.
  // console.log(`empty: ${emptyDivLength}`);

  return(
    <div className="bar">
      <div className="filled" style={{flex: `${filledDivLength}`}}>

        {
          session.sessionTasks.map((task, index) => {
            const taskHours = Number((task.duration / 3600).toFixed(1));
            return (
              <div 
                key={task.tid}
                className={`bar-stack ${index === 0 && 'bar-stack-left'} ${index === sessionTaskArrLength - 1 && 'bar-stack-right'}`}
                style={{flex: `${taskHours}`, backgroundColor: `${task.barColor}`}}>
                <div className="bar-stack-tooltip">{`${task.title}`} ({`${taskHours}`}h)</div>
              </div>
            )
          })
        }

      </div>
      
      <div className="bar-stack" style={{flex: `${emptyDivLength}`, pointerEvents: 'none', backgroundColor: 'rgba(0, 0, 0, 0)'}}></div>

    </div>
  )
}