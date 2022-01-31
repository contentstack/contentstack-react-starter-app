import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Tooltip from "../components/too-tip";



export default function Header(props) {
  const { header } = props;

  return (
    <header className='header'>
      <div className='note-div' {...header.notification_bar.$?.announcement_text}>
        {header.notification_bar.show_announcement ? parse(header.notification_bar.announcement_text) : <div style={{ visibility: 'hidden' }}>Devtools section</div>}
      </div>
      <div className='max-width header-div'>
        <div className='wrapper-logo'>
          <Link to='/' title='Contentstack'>
            <img {...header.logo.$?.url} className='logo' src={header.logo.url} alt={header.logo.filename} />
          </Link>
        </div>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>
        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {header.navigation_menu.map((list) => (
              <li key={list.label} className='nav-li'>
                <Link {...list.$?.label} to={list.page_reference[0].url} className={props.activeTab === list.label ? 'active' : ''}>
                  {list.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="json-preview">
          <Tooltip content="JSON Preview" direction="top">
            <span
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <img src="/json.svg" alt="JSON Preview icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
