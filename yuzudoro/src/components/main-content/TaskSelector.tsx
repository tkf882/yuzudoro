import './TaskSelector.css';

import plusIcon from '../../assets/plus.svg';
import settingsIcon from '../../assets/settings.svg';
import dropdownIcon from '../../assets/drop-down-arrow.svg';

interface taskSelectorProps {
  darkmode: boolean;
}

export function TaskSelector({darkmode}:taskSelectorProps) {
  // for dark StrictMode, add -dark to task-selector-container, task-selector-dropdown, task-selector-img

  return (
    <div className={`task-selector-container ${darkmode ? 'task-selector-container-dark' : ''}`}>
      <div className={`task-selector-dropdown ${darkmode ? 'task-selector-dropdown-dark' : ''}`}>
        <div className="task-option">
          <div className="task-selector-text-container">
            <p><span style={{filter: 'brightness(110%) saturate(50%)'}}>New Task</span></p>
          </div>
          <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={plusIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>Studying</p>
          </div>
          <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>Working on thing</p>
          </div>
          <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>A well formatted and long task name</p>
          </div>
          <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>a poorlyformattedandlongtasknameaaaaa</p>
          </div>
          <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>a wokring on this website</p>
          </div>
          <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={settingsIcon}/>
        </div>

      </div>
      <div className="task-selector-text-container">
        <p>Studying</p>
      </div>
      
      <button className="task-selector-button">
        <img className={`task-selector-img ${darkmode ? 'task-selector-img-dark' : ''}`} src={dropdownIcon}/>
      </button>
    </div>
  )
}