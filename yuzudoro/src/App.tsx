// import { Overlay } from './components/overlay/Overlay';
// import { ModalType } from './components/overlay/modalType.ts';
import { AddTaskOverlay } from './components/overlay/AddTaskOverlay';
import { EditTaskOverlay } from './components/overlay/EditTaskOverlay';
import { WarningSwitchOverlay } from './components/overlay/WarningSwitchOverlay';
import { WarningEditOverlay } from './components/overlay/WarningEditOverlay';
import { Header } from './components/Header';
import { Timer } from './components/main-content/Timer';
import { TaskSelector } from './components/main-content/TaskSelector';
import { Dashboard } from './components/dashboard/Dashboard';
import { Footer } from './components/Footer';

import { useState, useRef } from 'react'
import { user } from './data/user'
// import type { modalStatus } from './data/modalStats';

import yuzuIcon from './assets/yuzu.png';

import './App.css';


function App() {
  const [darkmode, setDarkmode] = useState(user.darkmode);

  // const [timerTask, setTimerTask] = useState(user.currentTask); // string
  const [isCounting, setIsCounting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [onBreak, setOnBreak] = useState(false);  // also required for the page to update.
  const onBreakRef = useRef(false); // required to be a ref since the setInterval function uses the value of the state variable at the time of declaration, doesn't update it.

  const [modalStatus, setModalStatus] = useState({type: 0, info: ''})
  const [dropdownStatus, setDropdownStatus] = useState(false);

  function resetTimer() {
    // Used when switching tasks and editing the currently active task
    setIsCounting(false);
    setOnBreak(false);
    onBreakRef.current = false;
    setTimeElapsed(0);

    console.log('reset from resetTimer');
  }

  console.log(user);

  // user.updateSession(3600*1000);

  // console.log(user.tasks);
  // console.log('current ' + user.currentTask);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700&display=swap" rel="stylesheet"/>

      <title>Yuzudoro</title>
      <link rel="icon" type="image/svg+xml" href={yuzuIcon} />

      {modalStatus.type === 0 ? '' :
        <div className="overlay">
          {(modalStatus.type === 1) &&
            <AddTaskOverlay 
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            />}
          {(modalStatus.type === 2) &&
            <EditTaskOverlay 
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            resetTimer={resetTimer}
            />}
          {(modalStatus.type === 3) &&
            <WarningSwitchOverlay
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              setDropdownStatus={setDropdownStatus}
              resetTimer={resetTimer}
            />}
          {(modalStatus.type === 4) &&
            <WarningEditOverlay
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
            />
          }
        </div>
      }

      <Header
        darkmode={darkmode}
        setDarkmode={setDarkmode}
      />

      <div className={`background-image ${darkmode && 'background-image-dark'}`}>
          <div className="main-content">
            
            <Timer
              darkmode={darkmode}
              isCounting={isCounting}
              setIsCounting={setIsCounting}
              timeElapsed={timeElapsed}
              setTimeElapsed={setTimeElapsed}
              onBreak={onBreak}
              setOnBreak={setOnBreak}
              onBreakRef={onBreakRef}
            />

            <TaskSelector
              darkmode={darkmode}
              setModalStatus={setModalStatus}
              dropdownStatus={dropdownStatus}
              setDropdownStatus={setDropdownStatus}
            />

          </div>
      </div>

      <Dashboard />

      <Footer/>

    </>
  )
}

export default App
