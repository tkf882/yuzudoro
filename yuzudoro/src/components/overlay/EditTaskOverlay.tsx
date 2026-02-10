import { useState, useRef, useEffect } from 'react'
import { user } from '../../data/user';
import { Task } from '../../data/task';
import type { modalStatus } from '../../data/modalStatus';

import './Overlay.css'

interface taskFormat {
  workDuration: number,
  breakDuration: number,
}


interface EditTaskOverlayProps {
  modalStatus: modalStatus; 
  setModalStatus: (value: modalStatus) => void;
  resetTimer: () => void;
}
export function EditTaskOverlay({modalStatus, setModalStatus, resetTimer}:EditTaskOverlayProps) {
  const current:(Task | null) = user.getTask(modalStatus.info);

  const taskInputRef = useRef(null);
  const [taskFormat, setTaskFormat] = useState(current 
    ? {workDuration: current['workDuration'], breakDuration: current['breakDuration']} 
    : {workDuration: 1500, breakDuration: 300});
  const [errorMessage, setErrorMessage] = useState('');
  // 5:00 = 300
  // 10:00 = 600
  // 25:00 = 1500
  // 30:00 = 1800
  // 50:00 = 3000

  function handleFormatButton(format:taskFormat) {
    setTaskFormat(format);
    console.log('set task format');
  }

  function handleEditTask() {
    console.log('edit task');
    const inputElement = taskInputRef.current;
    // console.log(inputElement.value);
    if (inputElement) { // Nested if statement since otherwise gives warning: Could be null
      if (inputElement['value'] !== '') { // inputElement.value will give warning: ['Property does not exist on type 'never']
        const [workDuration, breakDuration] = [taskFormat.workDuration, taskFormat.breakDuration];
        user.editTask(modalStatus.info, inputElement['value'], workDuration, breakDuration);

        // if editing the currently active task, then reset the timer (set it to the new values)
        if (user.currentTask === modalStatus.info) {
          resetTimer();
        }
        

        handleModalToggle();
      } else {
        setErrorMessage('Error: Please enter a task name.');
      }
    }
  }

  function handleModalToggle() {
    setModalStatus({type: 0, info: ''});
    setErrorMessage('');
  }

  useEffect(() =>{
    const inputElement = taskInputRef.current;
    if (current && inputElement) {
      inputElement['value'] = current['title']
    }
  }, [current])
  

  return (
    <div className="modal">
      <h2>Edit task</h2>
      <input className="modal-input" placeholder="Currently working on..." ref={taskInputRef}/>
      {errorMessage !== '' && <p style={{color: 'red'}}>{errorMessage}</p>}
      <div>
        <button className={`modal-button ${(taskFormat.workDuration === 1500 && taskFormat.breakDuration === 300) && 'modal-button-selected'}`} 
          onClick={() => {handleFormatButton({workDuration: 1500, breakDuration: 300})}}>25/5</button>
        <button className={`modal-button ${(taskFormat.workDuration === 1800 && taskFormat.breakDuration === 600) && 'modal-button-selected'}`} 
          onClick={() => {handleFormatButton({workDuration: 1800, breakDuration: 600})}}>30/10</button>
        <button className={`modal-button ${(taskFormat.workDuration === 3000 && taskFormat.breakDuration === 600) && 'modal-button-selected'}`} 
          onClick={() => {handleFormatButton({workDuration: 3000, breakDuration: 600})}}>50/10</button>
      </div>
      
      <div>
        <button className="modal-button" onClick={handleModalToggle}>Cancel</button>
        <button className="modal-button" onClick={handleEditTask}>Confirm</button>
      </div>
    </div>
  )
}