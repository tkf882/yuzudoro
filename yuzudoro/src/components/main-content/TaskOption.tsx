import { user } from '../../data/user';
import { Task } from '../../data/task';
import type { modalStatus } from '../../data/modalStatus';

import settingsIcon from '../../assets/settings.svg';

import './TaskOption.css';

interface taskOption {
  darkmode: boolean;
  setModalStatus: (value: modalStatus) => void;
  taskOptionTask: Task;
}
export function TaskOption({darkmode, setModalStatus, taskOptionTask}:taskOption) {

  function handleEditButton() {
    console.log('EDIT');
    if (taskOptionTask.tid === user.currentTask) {
      // Selected the same task
      console.log('same')
      setModalStatus({type: 4, info: taskOptionTask.tid}); // edit warning modal
    } else {
      // Selected a different task
      console.log('different')
      setModalStatus({type: 2, info: taskOptionTask.tid}); // edit modal
    }
  }

  function handleSwitchTask() {
    if (taskOptionTask.tid !== user.currentTask) {
      // Selected a different task
      setModalStatus({type: 3, info: taskOptionTask.tid}); // switch warning modal
    }
  }
  
  return (
    <div className="task-option">
      <div className="task-selector-text-container" onClick={handleSwitchTask}>
        <p className={`${taskOptionTask.tid === user.currentTask && 'text-selected'}`}>{taskOptionTask.title}</p>
      </div>
      <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={settingsIcon} onClick={handleEditButton}/>
    </div>
  )
}