import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { HeroBanner as HeroBannerProp } from "../typescript/components";

export default function HeroBanner({hero_banner:banner}: {hero_banner:HeroBannerProp}) {
  return (
    <div
      className='hero-banner'
      style={{
        background: banner.bg_color ? banner.bg_color : '',
      }}
    >
      <div
        className='home-content'
        style={{ color: banner.text_color ? banner.text_color : '#222' }}
      >
        <h1 {...banner.$?.banner_title as {}} className='hero-title'>
          {banner.banner_title || <Skeleton />}
        </h1>

        {banner.banner_description ? (
          <p
            {...banner.$?.banner_description as {}}
            className='hero-description'
            style={{ color: banner.text_color ? banner.text_color : '#737b7d' }}
          >
            {banner.banner_description}
          </p>
        ) : (
          ''
        )}
        {banner.call_to_action ? (
          <Link
            {...banner.call_to_action.$?.title as {}}
            to={banner.call_to_action.href}
            className='btn tertiary-btn'
          >
            {banner.call_to_action.title}
          </Link>
        ) : (
          ''
        )}
      </div>
      {banner.banner_image ? (
        <img
          {...banner.banner_image.$?.url as {}}
          alt={banner.banner_image.filename}
          src={banner.banner_image.url}
        />
      ) : (
        ''
      )}
    </div>
  );
}
