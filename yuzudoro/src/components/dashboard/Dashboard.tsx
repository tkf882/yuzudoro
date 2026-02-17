import { TaskStat } from './TaskStat';
import { Bar } from './Bar';
import { user } from '../../data/user';
import { Session } from '../../data/session';
import dayjs from 'dayjs';

import './Dashboard.css'


// interface dashboardProps {
//   darkmode: boolean;
//   setDarkmode: (value: boolean) => void;
// }
export function Dashboard() {
  const today = dayjs();
  const timeHour = Number(today.format('H')); // 0-23
  let message:string = '';
  if (timeHour < 10) {
    message = 'Good morning!';
  } else if (10 <= timeHour && timeHour < 14) {
    message = 'Hello!';
  } else if (14 <= timeHour && timeHour < 17) {
    message = 'Good afternoon!';
  } else if (17 <= timeHour && timeHour < 23) {
    message = 'Good evening!';
  }

  const sessionArray = [];
  let j:number = 0;
  const sessionLength:number = user.sessions.length;
  let max:number = 0;
  for (let i = 0; i < 15; i++) {
    const today = (dayjs().subtract(i, 'days')).format('DD/MM/YYYY');
    if (j < sessionLength) {
      if (user.sessions[j].date === today) {
        sessionArray.push(user.sessions[j]);
        const hours = Number((user.sessions[j].totalDuration / 3600).toFixed(1));
        if (hours > max) {
          max = hours;
        }
        j++;
        continue;
      }
    }
    sessionArray.push(new Session({
      sid: `emptySession-${i}`,
      uid: user.uid,
      sessionTasks: [],
      date: today,
      totalDuration: 0
    }))
  }
  // console.log(`final max is : ${max}`)
  const barMax:boolean = max > 12 // If greater than 12, set bar to 24h width

  // console.log(sessionArray);

  let totalHours:number = 0;
  user.tasks.forEach((task) => {
    totalHours += Number((task.totalTime / 3600).toFixed(1));
  })
  totalHours = Number(totalHours.toFixed(1));

  return(
    <div className="dashboard">
      <h1>{message}</h1>
      
      <div className="dashboard-grid">
        
        <div className="dashboard-container">
          
          <div className="task-stat-flex">
            <div>

              <h1>Session stats:</h1>

              {
                user.tasks.map((task) => {
                  return (
                    <TaskStat
                      key={task.tid}
                      task={task}
                    />
                  );
                })
              }

            </div>

            <div className="task-stat-container">
              <h2>Total</h2>
              <div className="stat-hour-container">
                {/* <p>24h (Past two weeks)</p> */}
                <p>{`${totalHours}`}h</p>
              </div>
            </div>

          </div>

        </div>

        <div className="small-panels">
          <div className="dashboard-container">
            <div className="stats-chart-container">
              <div className="stats-chart-date">
                <p>Today</p>
                <p>{today.subtract(7, 'days').format('MMM D')}</p>
                <p>{today.subtract(14, 'days').format('MMM D')}</p>
              </div>

              <div className="bar-chart">
                <div className="bar-chart-line-container">
                  <div className="bar-chart-quarter">
                    <div className="bar-chart-quarter-value">{barMax ? `${6}` : `${3}`}h</div>
                  </div>
                  <div className="bar-chart-quarter">
                    <div className="bar-chart-quarter-value">{barMax ? `${12}` : `${6}`}h</div>
                  </div>
                  <div className="bar-chart-quarter">
                    <div className="bar-chart-quarter-value">{barMax ? `${18}` : `${9}`}h</div>
                  </div>
                  <div className="bar-chart-quarter">
                    <div className="bar-chart-quarter-value">{barMax ? `${24}` : `${12}`}h</div>
                  </div>
                </div>

                {
                  sessionArray.map((session) => {
                    return < Bar key={session.sid} session={session} max={max} />
                  })
                }
      
              </div>
            </div>
          </div>
          <div className="dashboard-container">
            <h1>About</h1>
            <p>The Pomodoro technique is a time management method used to focus on work and take breaks at set intervals (25/5, 30/10, or 50/10).</p>
            <p>Use one of the presets or create your own task and start focusing.</p>
          </div>
        </div>






      </div>
      
    </div>
  )
}
