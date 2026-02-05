import { user } from '../../data/user';
import { Task } from '../../data/task';

import settingsIcon from '../../assets/settings.svg';

import './TaskOption.css';

interface taskOption {
  darkmode: boolean;
  setModal: (value: string) => void;
  setDropdownStatus: (value: boolean) => void;
  task: Task;
}
export function TaskOption({darkmode, setModal, setDropdownStatus, task}:taskOption) {

  function handleEditButton() {
    setModal('edittask');
    handleSwitchTask();
  }

  function handleSwitchTask() {
    user.setCurrent(task.tid);
    setDropdownStatus(false);
  }
  
  return (
    <div className="task-option" onClick={handleSwitchTask}>
      <div className="task-selector-text-container">
        {task.title}
      </div>
      <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={settingsIcon} onClick={handleEditButton}/>
    </div>
  )
}