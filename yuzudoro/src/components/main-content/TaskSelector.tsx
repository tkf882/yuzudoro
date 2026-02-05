import { TaskOption } from './TaskOption'
import { user } from '../../data/user';
import { Task } from '../../data/task';
import { useState } from 'react';

import plusIcon from '../../assets/plus.svg';
// import settingsIcon from '../../assets/settings.svg';
import dropdownIcon from '../../assets/drop-down-arrow.svg';

import './TaskSelector.css';

interface taskSelectorProps {
  darkmode: boolean;
  setModal: (value: string) => void;
}

export function TaskSelector({darkmode, setModal}:taskSelectorProps) {
  const [dropdownStatus, setDropdownStatus] = useState(false);

  function handleDropdownToggle() {
    setDropdownStatus(!dropdownStatus);
  }

  function handleCreateTask() {
    setModal('newtask');
  }

  // CHECK TO MAKE SURE USER CURRENT CLASS EXISTS 
  const current:(Task | null) = user.getTask(user.currentTask);

  return (
    <div className={`task-selector ${darkmode && 'task-selector-dark'}`}>

      <div className='create-new-task' onClick={handleCreateTask}>
        <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={plusIcon}/>
      </div>

      <div className={`task-selector-container ${darkmode && 'task-selector-container-dark'}`} onClick={handleDropdownToggle}>
        <div className="task-selector-text-container">
          {current ? current['title'] : '--'}
        </div>
        
        <button className="task-selector-button">
          <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={dropdownIcon}/>
        </button>
      </div>


      <div className={`task-selector-dropdown ${darkmode && 'task-selector-dropdown-dark'} ${dropdownStatus && 'task-selector-active'}`}>

        {
          user.tasks.map((task) => {
            return (
              <TaskOption key={task.tid} darkmode={darkmode} setModal={setModal} setDropdownStatus={setDropdownStatus} task={task}/>
            );
          })
        }

        {/* <div className="task-option">
          <div className="task-selector-text-container">
            <p>Studying</p>
          </div>
          <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>not studying</p>
          </div>
          <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={settingsIcon}/>
        </div> */}

      </div>
    </div>
  )
}