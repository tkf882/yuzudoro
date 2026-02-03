import './Dashboard.css'

export function Dashboard() {
  return(
    <div className="dashboard">
      <h1>Good morning!</h1>
      
      <div className="dashboard-grid">
        
        <div className="dashboard-container">
          
          <div className="task-stat-flex">
            <div>

              <h1>Session stats:</h1>

              <div className="task-stat-container">
                <div className="task-name-container">
                  <h2>task1</h2>
                </div>
                <div className="stat-hour-container">
                  <p>24h (Past two weeks)</p>
                  <p>136h (Total)</p>
                </div>
              </div>
              
              <div className="task-stat-container">
                <div className="task-name-container">
                  <h2>Studyingaaaaaaaaaaaaaaa</h2>
                </div>
                <div className="stat-hour-container">
                  <p>24h (Past two weeks)</p>
                  <p>136h (Total)</p>
                </div>
              </div>

              <div className="task-stat-container">
                <div className="task-name-container">
                  <h2>working on this website</h2>
                </div>
                <div className="stat-hour-container">
                  <p>24h (Past two weeks)</p>
                  <p>136h (Total)</p>
                </div>
              </div>

              <div className="task-stat-container">
                <div className="task-name-container">
                  <h2>A very long but well formatted task</h2>
                </div>
                <div className="stat-hour-container">
                  <p>24h (Past two weeks)</p>
                  <p>136h (Total)</p>
                </div>
              </div>

            </div>

            <div className="task-stat-container">
              <h2>Total</h2>
              <div className="stat-hour-container">
                <p>24h (Past two weeks)</p>
                <p>136h (Total)</p>
              </div>
            </div>




          </div>

        </div>

        <div className="small-panels">
          <div className="dashboard-container">
            <div className="stats-chart-container">
              <div className="stats-chart-date">
                <p>Today</p>
                <p>Jan 21</p>
                <p>Jan 14</p>
              </div>

              <div className="bar-chart">
      
                {/* <div className="bar">
                  <div className="filled" style={{flex: '10'}}>
                    <div className="bar-stack-left" style="flex: 5; background-color: lightgreen;">
                      <div className="bar-stack-tooltip">Task 3 (5h)</div>
                    </div>
                    <div className="bar-stack" style="flex: 3; background-color: lightblue;">
                      <div className="bar-stack-tooltip">Task 1 (3h)</div>
                    </div>
                    <div className="bar-stack-right" style="flex: 2; background-color: lightcoral;">
                      <div className="bar-stack-tooltip">Task 2 (2h)</div>
                    </div>
                  </div>
                  <div className="bar-stack" style="flex: 14; pointer-events: none; background-color: rgba(0, 0, 0, 0)"></div>
                </div> */}

                {/* <div className="bar">
                  <div className="filled" style={{flex: '0'}}>
                  </div>
                  <div className="bar-stack" style="flex: 24; pointer-events: none; background-color: rgba(0, 0, 0, 0)"></div>
                </div> */}

              </div>
            </div>
          </div>
          <div className="dashboard-container">
            <h1>About</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto soluta placeat libero eius. Ducimus quia culpa quod alias modi est, maiores animi? Ad odit mollitia corrupti accusamus aspernatur quibusdam sint.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora labore accusantium, magnam animi dolore dolorum culpa officiis obcaecati doloribus corrupti placeat neque maxime cupiditate eveniet repellat iure architecto eaque soluta!</p>
          </div>
        </div>






      </div>
      
    </div>
  )
}