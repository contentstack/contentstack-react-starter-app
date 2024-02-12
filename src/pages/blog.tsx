import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArchiveRelative from "../components/archive-relative";
import RenderComponents from "../components/render-components";
import BlogList from "../components/blog-list";
import { getBlogListRes, getPageRes } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useLivePreviewCtx } from "../context/live-preview-context-provider";
import { BlogPostRes, Page } from "../typescript/pages";
import { EntryProps } from "../typescript/components";

export default function Blog({ entry }:{entry:({page, blogPost}:EntryProps)=> void}) {
  const history = useNavigate();
  const [getEntry, setEntry] = useState({} as Page);
  const [getList, setList] = useState({
    archive: [] as BlogPostRes[],
    list: [] as BlogPostRes[],
  });
  const [error, setError] = useState(false);
  const lpTs = useLivePreviewCtx();

  async function fetchData() {
    try {
      const blog = await getPageRes("/blog");
      const {archivedBlogs,recentBlogs} = await getBlogListRes();
      setEntry(blog);
      setList({ archive: archivedBlogs, list: recentBlogs });
      const blogList = recentBlogs.concat(archivedBlogs)
      entry({ page: [blog], blogPost: blogList });
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    fetchData();
    error && history("/404");
  }, [error, lpTs]);

  return (
    <>
      {Object.keys(getEntry).length ? (
        <RenderComponents
          pageComponents={getEntry.page_components}
          blogsPage
          contentTypeUid='page'
          entryUid={getEntry.uid}
          locale={getEntry.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='blog-container'>
        <div className='blog-column-left'>
          {Object.keys(getList.list).length ? (
            getList.list.map((bloglist, index) => (
              <BlogList bloglist={bloglist} key={index} />
            ))
          ) : (
            <Skeleton height={400} width={400} count={3} />
          )}
        </div>
        <div className='blog-column-right'>
          {Object.keys(getEntry).length &&
          getEntry.page_components[1].widget ? (
            <h2 {...(getEntry?.page_components[1].widget.$?.title_h2 as {})}>
              {getEntry?.page_components[1].widget.title_h2}
            </h2>
          ) : (
            <h2>
              <Skeleton />
            </h2>
          )}
          {getList.archive.length ? (
            <ArchiveRelative blogs={getList.archive} />
          ) : (
            <Skeleton height={600} width={300} />
          )}
        </div>
      </div>
    </>
  );
}
