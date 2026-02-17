import { Task } from '../../data/task'

import './TaskStat.css';

interface dashboardProps {
  task: Task;
}
export function TaskStat({task}:dashboardProps) {

  // 1: Get task associated and put name
  // 2: Get session
  // 3: Get total

  // console.log(task);
  const hours = Number((task.totalTime / 3600).toFixed(1));

  return(
    <div className="task-stat-container">
      <div className="task-name-container">
        <h2>{task.title}</h2>
      </div>
      <div className="stat-hour-container">
        {/* <p>24h (Past two weeks)</p> */}
        <p>{`${hours}`}h</p>
      </div>
    </div> 
  )
}