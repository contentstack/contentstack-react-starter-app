import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

export default function Footer(props) {
  const { footer } = props;
  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-quarter'>
          <Link to='/'>{footer.logo && <img {...footer.logo.$?.url} src={footer.logo.url} alt='contentstack logo' title='contentstack' className='logo footer-logo' />}</Link>
        </div>
        <div className='col-half'>
          <nav>
            <ul className='nav-ul'>
              {footer.navigation.link?.map((link) => (
                <li key={link.title} className='footer-nav-li'>
                  <Link {...link.$?.title} to={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className='col-quarter social-link'>
          <div className='social-nav'>
            {footer.social.social_share?.map((social) => (
              <a href={social.link.href} title={social.link.title} key={social.link.title}>
                <img {...social.icon.$?.url} src={social.icon.url} alt='social icon' />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className='copyright' {...footer.$?.copyright}>
        {parse(footer.copyright)}
      </div>
    </footer>
  );
}
