import { Overlay } from './components/Overlay';
import { Header } from './components/Header';
import { Timer } from './components/main-content/Timer';
import { TaskSelector } from './components/main-content/TaskSelector';
import { Dashboard } from './components/dashboard/Dashboard';
import { Footer } from './components/Footer';

import './App.css';

import yuzuIcon from './assets/yuzu.png';

function App() {

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700&display=swap" rel="stylesheet"/>

      <title>24:59 - Yuzudoro</title>
      <link rel="icon" type="image/svg+xml" href={yuzuIcon} />

      <Overlay/>

      <Header/>

      <div className="background-image">
        <div className="blur-container">
          <div className="main-content">
            
            <Timer/>

            <TaskSelector/>

          </div>
        </div>
      </div>

      <Dashboard />

      <Footer/>

    </>
  )
}

export default App
