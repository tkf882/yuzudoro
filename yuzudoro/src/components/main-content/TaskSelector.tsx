import './TaskSelector.css';

import plusIcon from '../../assets/plus.svg';
import settingsIcon from '../../assets/settings.svg';
import dropdownIcon from '../../assets/drop-down-arrow.svg';

export function TaskSelector() {
  return (
    <div className="task-selector-container">
      <div className="task-selector-dropdown">
        <div className="task-option">
          <div className="task-selector-text-container">
            <p><span style={{color: 'rgb(150, 150, 150)'}}>New Task</span></p>
          </div>
          <img className="task-selector-img" src={plusIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>Studying</p>
          </div>
          <img className="task-selector-img" src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>Working on thing</p>
          </div>
          <img className="task-selector-img" src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>A well formatted and long task name</p>
          </div>
          <img className="task-selector-img" src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>a poorlyformattedandlongtasknameaaaaa</p>
          </div>
          <img className="task-selector-img" src={settingsIcon}/>
        </div>

        <div className="task-option">
          <div className="task-selector-text-container">
            <p>a wokring on this website</p>
          </div>
          <img className="task-selector-img" src={settingsIcon}/>
        </div>

      </div>
      <div className="task-selector-text-container">
        <p>Studying</p>
      </div>
      
      <button className="task-selector-button">
        <img className="task-selector-img" src={dropdownIcon}/>
      </button>
    </div>
  )
}