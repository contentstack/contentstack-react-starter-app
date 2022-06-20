import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import {BlogListProps} from '../typescript/archive-relative';

export default function ArchiveRelative({ blogs }: BlogListProps) {  
  return (
    <>
      {blogs?.map((blog) => (
        <Link to={blog.url} key={blog.title}>
          <div>
            <h4>{blog.title}</h4>
            {blog.body && (
            <div>{parse(blog.body.slice(0, 80))}</div>
            )}
          </div>
        </Link>
      ))}
    </>
  );
}
