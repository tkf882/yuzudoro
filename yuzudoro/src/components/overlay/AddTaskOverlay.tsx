import { useState, useRef, useEffect } from 'react'
import { user } from '../../data/user';
import { Task } from '../../data/task';
import type { modalStatus } from '../../data/modalStatus';

import './Overlay.css'

interface taskFormat {
  workDuration: number,
  breakDuration: number,
}


interface AddTaskOverlayProps {
  modalStatus: modalStatus; 
  setModalStatus: (value: modalStatus) => void;
}
export function AddTaskOverlay({modalStatus, setModalStatus}:AddTaskOverlayProps) {
  // const [taskName, setTaskName] = useState('');
  let current:(Task | null) = null;
  if (modalStatus.type === 2) { // edit task
    current = user.getTask(modalStatus.info);
  }
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

  function handleAddTask() {
    console.log('add task');
    const inputElement = taskInputRef.current;
    if (inputElement) {
      if (inputElement['value'] == '') {
        setErrorMessage('Error: Please add a task name.');
      } else {
        // Add the task
        const [workDuration, breakDuration] = [taskFormat.workDuration, taskFormat.breakDuration];
        user.addTask(inputElement['value'], workDuration, breakDuration);
        handleModalToggle();

        setErrorMessage('');
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
      <h2>{modalStatus.type === 1 ? 'Create new task' : 'Edit task'}</h2>
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
        <button className="modal-button" onClick={handleAddTask}>Confirm</button>
      </div>
    </div>
  )
}