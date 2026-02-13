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

  return(
    <div className="task-stat-container">
      <div className="task-name-container">
        <h2>{task.title}</h2>
      </div>
      <div className="stat-hour-container">
        <p>24h (Past two weeks)</p>
        <p>136h (Total)</p>
      </div>
    </div> 
  )
}