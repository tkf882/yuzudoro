import { TaskOption } from './TaskOption'

import { user } from '../../data/user';
import { Task } from '../../data/task';
import type { modalStatus } from '../../data/modalStatus';
// import { useState } from 'react';

import plusIcon from '../../assets/plus.svg';
import dropdownIcon from '../../assets/drop-down-arrow.svg';

import './TaskSelector.css';

interface taskSelectorProps {
  darkmode: boolean;
  setModalStatus: (value: modalStatus) => void;
  dropdownStatus: boolean;
  setDropdownStatus: (value: boolean) => void;
}

export function TaskSelector({darkmode, setModalStatus, dropdownStatus, setDropdownStatus}:taskSelectorProps) {
  function handleDropdownToggle() {
    setDropdownStatus(!dropdownStatus);
  }

  function handleCreateTask() {
    setModalStatus({type: 1, info: ''});
  }

  const current:(Task | null) = user.getTask(user.currentTask);

  return (
    <div className={`task-selector ${darkmode && 'task-selector-dark'}`}>

      <div className='create-new-task' onClick={handleCreateTask}>
        <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={plusIcon}/>
      </div>

      <div className={`task-selector-container ${darkmode && 'task-selector-container-dark'}`} onClick={handleDropdownToggle}>
        <div className="task-selector-text-container">
          <p>{current ? current['title'] : '--'}</p>
        </div>
        
        <button className="task-selector-button">
          <img className={`task-selector-img ${darkmode && 'task-selector-img-dark'}`} src={dropdownIcon}/>
        </button>
      </div>


      <div className={`task-selector-dropdown ${darkmode && 'task-selector-dropdown-dark'} ${dropdownStatus && 'task-selector-active'}`}>

        {
          user.tasks.map((task) => {
            return (
              <TaskOption
                key={task.tid}
                darkmode={darkmode}
                setModalStatus={setModalStatus}
                taskOptionTask={task}
              />
            );
          })
        }

      </div>
    </div>
  )
}