// import { user } from '../../data/user';
import type { modalStatus } from '../../data/modalStatus';

import './Overlay.css'

interface WarningEditOverlayProps {
  modalStatus: modalStatus; 
  setModalStatus: (value: modalStatus) => void;
}
export function WarningEditOverlay({modalStatus, setModalStatus}:WarningEditOverlayProps) {
  function handleConfirm() {
    console.log('Edit')

    setModalStatus({type: 2, info: modalStatus.info});
  }
  function handleModalToggle() {
    setModalStatus({type: 0, info: ''});
  }
  return(
    <div className='modal'>
      <h2>Warning: This action will reset the timer.</h2>
      <div>
        <button className="modal-button" onClick={handleModalToggle}>Cancel</button>
        <button className="modal-button" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  )
}