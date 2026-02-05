import { useState, useRef, useEffect } from 'react'
import { user } from '../../data/user';
import { Task } from '../../data/task';
import './Overlay.css'

// export const enum ModalType {
//   none,
//   newtask,
//   edittask,
//   account, // sign in, log in
// }

interface newTaskProps {
  modal: string;
  setModal: (value: string) => void;
}
interface taskFormat {
  workDuration: number,
  breakDuration: number,
}
function ManageTask({modal, setModal}:newTaskProps) {
  // const [taskName, setTaskName] = useState('');
  let current:(Task | null) = null;
  if (modal === 'edittask') {
    current = user.getTask(user.currentTask);
  }
  const taskInputRef = useRef(null);
  const [taskFormat, setTaskFormat] = useState(current 
    ? {workDuration: current['workDuration'], breakDuration: current['breakDuration']} 
    : {workDuration: 1500, breakDuration: 300});
  const [showError, setShowError] = useState(false);


  function handleFormatButton(format:taskFormat) {
    setTaskFormat(format);
  }

  function handleAddTask() {
    const inputElement = taskInputRef.current;
    if (inputElement) { // Nested if statement since otherwise gives warning: Could be null
      if (inputElement['value'] !== '') { // inputElement.value will give warning: ['Property does not exist on type 'never']
        const [workDuration, breakDuration] = [taskFormat.workDuration, taskFormat.breakDuration];
        if (modal === 'newtask') {
          user.addTask(inputElement['value'], workDuration, breakDuration);
        } else if (modal === 'edittask') {
          user.editTask(user.currentTask, inputElement['value'], workDuration, breakDuration);
        }
        handleModalToggle();
      } else {
        setShowError(true);
      }
    }
  }

  function handleModalToggle() {
    setModal('none');
    setShowError(false)
  }

  // 5:00 = 300
  // 10:00 = 600
  // 25:00 = 1500
  // 30:00 = 1800
  // 50:00 = 3000

  useEffect(() =>{
    const inputElement = taskInputRef.current;
    if (current && inputElement) {
      inputElement['value'] = current['title']
    }
  }, [current])
  

  return (
    <div className="create-task-modal">
      <h2>{modal === 'newtask' ? 'Create new task' : 'Edit task'}</h2>
      <input className="create-task-input" placeholder="Currently working on..." ref={taskInputRef}/>
      {showError && <p style={{color: 'red'}}>Error: Please enter a task name.</p>}
      <div>
        <button className={`task-input-button ${(taskFormat.workDuration === 1500 && taskFormat.breakDuration === 300) && 'task-input-button-selected'}`} 
          onClick={() => {handleFormatButton({workDuration: 1500, breakDuration: 300})}}>25/5</button>
        <button className={`task-input-button ${(taskFormat.workDuration === 1800 && taskFormat.breakDuration === 600) && 'task-input-button-selected'}`} 
          onClick={() => {handleFormatButton({workDuration: 1800, breakDuration: 600})}}>30/10</button>
        <button className={`task-input-button ${(taskFormat.workDuration === 3000 && taskFormat.breakDuration === 600) && 'task-input-button-selected'}`} 
          onClick={() => {handleFormatButton({workDuration: 3000, breakDuration: 600})}}>50/10</button>
      </div>
      
      <div>
        <button className="task-input-button" onClick={handleModalToggle}>Cancel</button>
        <button className="task-input-button" onClick={handleAddTask}>Confirm</button>
      </div>
    </div>
  )
}

interface overlayProps {
  modal: string;
  setModal: (value: string) => void;
}
export function Overlay({modal, setModal}:overlayProps) {
  return (
    <>
      {modal === 'none' ? '':
        <div className="overlay">
          {modal === 'newtask' || modal === 'edittask' ? <ManageTask modal={modal} setModal={setModal}/>: ''}
        </div>
      }
    </>
  )
}