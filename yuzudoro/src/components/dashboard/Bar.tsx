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
}
export function Bar({session}:barProps) {
  // Each bar gets a session
  // Each task's flex property is equal to task.totalTime (in hours)
  
  // flex of the filledDiv = sum(session.sessions.totalTime) (this cannot exceed 24h)
  // flex of the empty div = 24 - filledDiv

  // console.log(session);
  
  const sessionTaskArrLength:number = session.sessionTasks.length;
  let filledDivLength:number = 0;
  session.sessionTasks.forEach((sessionTask) => {
    filledDivLength += sessionTask.duration;
  });
  const emptyDivLength:number = 24 - filledDivLength;
  

  return(
    <div className="bar">
      <div className="filled" style={{flex: `${filledDivLength}`}}>

        {
          session.sessionTasks.map((task, index) => {
            return (
              <div 
                key={task.tid}
                className={`bar-stack ${index === 0 && 'bar-stack-left'} ${index === sessionTaskArrLength - 1 && 'bar-stack-right'}`}
                style={{flex: `${task.duration}`, backgroundColor: `${task.barColor}`}}>
                <div className="bar-stack-tooltip">{`${task.title}`} ({`${task.duration}`}h)</div>
              </div>
            )
          })
        }


        {/* <div className="bar-stack-left" style={{flex: '5', backgroundColor: '#F9989F'}}>
          <div className="bar-stack-tooltip">Task 3 (5h)</div>
        </div>
        <div className="bar-stack" style={{flex: '3', backgroundColor: 'rgb(252, 203, 143)'}}>
          <div className="bar-stack-tooltip">Task 1 (3h)</div>
        </div>
        <div className="bar-stack-right" style={{flex: '2', backgroundColor: 'rgb(250, 240, 150)'}}>
          <div className="bar-stack-tooltip">Task 2 (2h)</div>
        </div> */}



      </div>
      
      <div className="bar-stack" style={{flex: `${emptyDivLength}`, pointerEvents: 'none', backgroundColor: 'rgba(0, 0, 0, 0)'}}></div>

    </div>
  )
}