import './Overlay.css'

export function Overlay() {
  return(<></>)
  return (
    <div className="overlay">
      <div className="create-task-modal">
        <h2>Create new task</h2>
        <input className="create-task-input" placeholder="Currently working on..."/>
        <div>
          <button className="task-input-button task-input-button-selected">25/5</button>
          <button className="task-input-button">30/10</button>
          <button className="task-input-button">50/10</button>
        </div>
        
        <div>
          <button className="task-input-button">Cancel</button>
          <button className="task-input-button">Confirm</button>
        </div>
      </div>
    </div>
  )
}