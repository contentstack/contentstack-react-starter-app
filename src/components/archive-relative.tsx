import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { BlogPostRes } from "../typescript/pages";

export default function ArchiveRelative({ blogs }: {blogs:BlogPostRes[]}) {  
  return (
    <>
      {blogs?.map((blog) => (
        <Link to={blog.url} key={blog.title}>
          <div {...blog.$?.body as {}}>
            <h4 {...blog.$?.title as {}}>{blog.title}</h4>
            {blog.body && (
            <div {...blog.$?.body as {}}>{parse(blog.body.slice(0, 80))}</div>
            )}
          </div>
        </Link>
      ))}
    </>
  );
}
