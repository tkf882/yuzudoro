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
    message = 'Good day!';
  } else if (14 <= timeHour && timeHour < 17) {
    message = 'Good afternoon!';
  } else if (17 <= timeHour && timeHour < 23) {
    message = 'Good evening!';
  }

  const sessionArray = [];
  let j:number = 0;
  const sessionLength:number = user.sessions.length;
  for (let i = 0; i < 15; i++) {
    const today = (dayjs().subtract(i, 'days')).format('DD/MM/YYYY');
    if (j < sessionLength) {
      if (user.sessions[j].date === today) {
        sessionArray.push(user.sessions[j]);
        j++;
        continue;
      }
    }
    sessionArray.push(new Session({
      sid: `emptySession-${i}`,
      uid: user.uid,
      sessionTasks: [],
      date: today
    }))
  }

  console.log(sessionArray);


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
                <p>24h (Past two weeks)</p>
                <p>136h (Total)</p>
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


                {
                  sessionArray.map((session) => {
                    return < Bar key={session.sid} session={session} />
                  })
                }


                {/* {
                  user.sessions.map((session) => {
                    return < Bar key={session.sid} session={session} />
                  })
                } */}
      
              </div>
            </div>
          </div>
          <div className="dashboard-container">
            <h1>About</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto soluta placeat libero eius. Ducimus quia culpa quod alias modi est, maiores animi? Ad odit mollitia corrupti accusamus aspernatur quibusdam sint.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora labore accusantium, magnam animi dolore dolorum culpa officiis obcaecati doloribus corrupti placeat neque maxime cupiditate eveniet repellat iure architecto eaque soluta!</p>
          </div>
        </div>






      </div>
      
    </div>
  )
}
