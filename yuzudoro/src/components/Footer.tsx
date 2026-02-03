import './Footer.css';

import githubIcon from '../assets/github.svg';

export function Footer() {
  return (
    <div className="footer">
      <p>Created by tkf882</p>
      <button className="footer-button">
        <a href="https://github.com/tkf882">
          <img className="footer-button-img" src={githubIcon}/>
        </a>
      </button>
    </div>
  )
}