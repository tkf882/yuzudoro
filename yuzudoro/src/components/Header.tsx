import './Header.css';
import yuzuIcon from '../assets/yuzu.png';
import moonIcon from '../assets/moon.svg';

export function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img className="icon" src={yuzuIcon}/>
        <a href="https://github.com/tkf882"><h2>Yuzudoro</h2></a>
      </div>

      <div className="header-right">
        <button className="header-button">
          <img className="header-button-img" src={moonIcon}/>
        </button>
      </div>
    </div>
  )
}