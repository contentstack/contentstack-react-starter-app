import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FooterProps,NavmenuProps, Social } from "../typescript/layout";

export default function Footer({ footer, navMenu }: {footer: FooterProps, navMenu: NavmenuProps}) {
  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-quarter'>
          <Link to='/'>
            {footer.logo ? (
              <img
                {...footer.logo.$?.url as {}}
                src={footer.logo.url}
                alt='contentstack logo'
                title='contentstack'
                className='logo footer-logo'
              />
            ) : (
              <Skeleton width={100} />
            )}
          </Link>
        </div>
        <div className='col-half'>
          <nav>
            <ul className='nav-ul'>
              {navMenu.length ? (
                navMenu?.map((link) => (
                  <li key={link.title} className='footer-nav-li'>
                    <NavLink {...link.$?.title} to={link.href}>
                      {link.title}
                    </NavLink>
                  </li>
                ))
              ) : (
                <li className='footer-nav-li'>
                  <Skeleton width={200} />
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className='col-quarter social-link'>
          <div className='social-nav'>
            {Object.keys(footer).length ? (
              footer.social.social_share?.map((social: Social) => (
                <a
                  href={social.link.href}
                  title={social.link.title}
                  key={social.link.title}
                >
                  <img
                    {...social.icon.$?.url as {}}
                    src={social.icon.url}
                    alt='social icon'
                  />
                </a>
              ))
            ) : (
              <a>
                <Skeleton width={100} />
              </a>
            )}
          </div>
        </div>
      </div>
      {footer.copyright ? (
        <div className='copyright' {...footer.$?.copyright as {}}>
          {parse(footer.copyright)}
        </div>
      ) : (
        <div className='copyright'>
          <Skeleton width={500} />
        </div>
      )}
    </footer>
  );
}
