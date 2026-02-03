import './Header.css';
import yuzuIcon from '../assets/yuzu.png';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';

interface headerProps {
  darkmode: boolean;
  setDarkmode: (value: boolean) => void;
}

export function Header({darkmode, setDarkmode}:headerProps) {

  function toggleDark() {
    setDarkmode(!darkmode);
  }

  return (
    <div className={`header ${darkmode ? 'header-dark' : ''}`}>
      <div className="header-left">
        <img className="icon" src={yuzuIcon}/>
        <a href="https://github.com/tkf882"><h2>Yuzudoro</h2></a>
      </div>

      <div className="header-right">
        <button className="header-button" onClick={toggleDark}>
          <img className={`header-button-img ${darkmode ? 'header-button-img-dark' : ''}`} src={darkmode ? `${sunIcon}` : `${moonIcon}`}/>
        </button>
      </div>
    </div>
  )
}