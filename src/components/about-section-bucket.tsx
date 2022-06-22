import React from 'react';
import parse from 'html-react-parser';
import { BucketProps, Bucket } from "../typescript/about-section-bucket";

export default function AboutSectionBucket({ sectionWithBuckets }: {sectionWithBuckets:BucketProps}) {

  function bucketContent(bucket: Bucket, index: number) {
    return (
      <div className='mission-content-section' key={index}>
        {bucket.icon && <img {...bucket.icon.$?.url as {}} className='mission-icon' src={bucket.icon.url} alt='art work' />}

        <div className='mission-section-content'>
          {bucket.title_h3 && <h3 {...bucket.$?.title_h3 as {}}>{bucket.title_h3}</h3>}
          <div {...bucket.$?.description as {}}> {bucket.description && parse(bucket.description)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='member-main-section'>
      <div className='member-head'>{sectionWithBuckets.title_h2 && <h2 {...sectionWithBuckets.$?.title_h2 as {}}>{sectionWithBuckets.title_h2}</h2>}</div>
      <div className='mission-section'>
        <div className='mission-content-top'>{sectionWithBuckets.buckets.map((bucket, index: number) => index < 2 && bucketContent(bucket, index))}</div>
        <div className='mission-content-bottom'>{sectionWithBuckets.buckets.map((bucket, index: number) => index >= 2 && bucketContent(bucket, index))}</div>
      </div>
    </div>
  );
}
