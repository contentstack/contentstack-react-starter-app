import React from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Stack from '../sdk/entry';
import Layout from '../components/layout';
import ArchiveRelative from '../components/archive-relative';
import RenderComponents from '../components/render-components';
import { onEntryChange } from '../sdk/entry';
import { addEditableTags } from '@contentstack/utils';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: undefined,
      blogList: [],
      archived: [],
      header: undefined,
      footer: undefined,
      error: {
        errorStatus: false,
        errorCode: undefined,
        errorData: undefined,
      },
    };
  }

  async fetchData() {
    try {
      const { location } = this.props;
      const blog = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: location.pathname,
      });
      const result = await Stack.getEntry({
        contentTypeUid: 'blog_post',
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body'],
      });
      const header = await Stack.getEntry({
        contentTypeUid: 'header',
        referenceFieldPath: ['navigation_menu.page_reference'],
        jsonRtePath: ['notification_bar.announcement_text'],
      });
      const footer = await Stack.getEntry({
        contentTypeUid: 'footer',
        jsonRtePath: ['copyright'],
      });

      const archive = [];
      const blogLists = [];

      result[0].forEach((blogs) => {
        if (blogs.is_archived) {
          archive.push(blogs);
        } else {
          blogLists.push(blogs);
        }
      });
      if (process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === 'true') {
        result[0].forEach(async (blog) => await addEditableTags(blog, 'blog_post', true));
        addEditableTags(blog[0], 'page', true);
        addEditableTags(header[0][0], 'header', true);
        addEditableTags(footer[0][0], 'footer', true);
      }
      this.setState({
        entry: blog[0],
        header: header[0][0],
        footer: footer[0][0],
        blogList: blogLists,
        archived: archive,
        error: { errorStatus: false },
      });
    } catch (error) {
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      });
    }
  }

  componentDidMount() {
    this.fetchData();
    onEntryChange(() => {
      if (process.env.REACT_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        return this.fetchData();
      }
    });
  }

  render() {
    const { header, footer, entry, error, archived, blogList } = this.state;
    const { history } = this.props;
    const list = blogList.concat(archived);
    if (!error.errorStatus && entry) {
      return (
        <Layout header={header} footer={footer} page={entry} blogpost={list} activeTab='Blog'>
          <RenderComponents pageComponents={entry.page_components} blogsPage contentTypeUid='page' entryUid={entry.uid} locale={entry.locale} />
          <div className='blog-container'>
            <div className='blog-column-left'>
              {blogList?.map((bloglist) => (
                <div className='blog-list' key={bloglist.title}>
                  {bloglist.featured_image && (
                    <Link to={bloglist.url}>
                      <img {...bloglist.featured_image.$?.url} alt='blog img' className='blog-list-img' src={bloglist.featured_image.url} />
                    </Link>
                  )}
                  <div className='blog-content' {...bloglist.$?.blog}>
                    {bloglist.title && (
                      <Link to={bloglist.url}>
                        <h3 {...bloglist.$?.title}>{bloglist.title}</h3>
                      </Link>
                    )}
                    <p {...bloglist.$?.date}>
                      {moment(bloglist.date).format('ddd, MMM D YYYY')}, <strong {...bloglist.author[0].$?.title}>{bloglist.author[0].title}</strong>
                    </p>
                    <div {...bloglist.$?.body}>{bloglist.body && parse(bloglist.body.slice(0, 300))}</div>

                    {bloglist.url ? (
                      <Link to={bloglist.url}>
                        <span>{'Read more -->'}</span>
                      </Link>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className='blog-column-right'>
              {entry.page_components[1].widget && <h2 {...entry.page_components[1].widget.$?.title_h2}>{entry.page_components[1].widget.title_h2} </h2>}
              <ArchiveRelative blogs={archived} />
            </div>
          </div>
        </Layout>
      );
    }
    if (error.errorStatus) {
      history.push('/error', [error]);
    }
    return '';
  }
}

export default Blog;
