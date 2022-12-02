import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { BucketProps } from "../typescript/section";

export default function SectionBucket({ section }: {section: BucketProps}) {

  return (
    <div className='member-main-section'>
      <div className='member-head'>
        {section.title_h2 && <h2 {...section.$?.title_h2 as {}}>{section.title_h2}</h2>}
        {section.description && <p {...section.$?.description as {}}>{section.description}</p>}
      </div>
      <div className='member-section'>
        {section.buckets?.map((bucket) => (
          <div className='content-section' key={bucket.title_h3} {...bucket.$?.description as {}}>
            {bucket.icon && <img {...bucket.icon.$?.url as {}} src={bucket.icon.url} alt='bucket icon' />}

            {bucket.title_h3 ? <h3 {...bucket.$?.title_h3 as {}}>{bucket.title_h3}</h3> : ''}
            <div {...bucket.$?.description as {}}> {bucket.description && parse(bucket.description)}</div>
            {bucket.call_to_action.title ? (
              <Link to={bucket.call_to_action.href ? bucket.call_to_action.href : '#'} {...bucket.call_to_action.$?.title}>
                {`${bucket.call_to_action.title} -->`}
              </Link>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}