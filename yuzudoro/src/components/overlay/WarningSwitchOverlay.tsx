import { user } from '../../data/user';
import type { modalStatus } from '../../data/modalStatus';

import './Overlay.css'

interface WarningSwitchOverlayProps {
  modalStatus: modalStatus; 
  setModalStatus: (value: modalStatus) => void;
  setDropdownStatus: (value: boolean) => void;
  resetTimer: () => void;
}
export function WarningSwitchOverlay({modalStatus, setModalStatus, setDropdownStatus, resetTimer}:WarningSwitchOverlayProps) {
  function handleConfirm() {
    user.setCurrent(modalStatus.info);

    setModalStatus({type: 0, info: ''});
    setDropdownStatus(false);

    resetTimer();
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