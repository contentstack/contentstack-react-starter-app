import React from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import Stack from '../sdk/entry';
import Layout from '../components/layout';

import ArchiveRelative from '../components/archive-relative';
import RenderComponents from '../components/render-components';
import { onEntryChange } from '../sdk/entry';
import { addEditableTags } from '@contentstack/utils';

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: undefined,
      banner: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    };
  }

  async fetchData() {
    try {
      let { blog, banner, header, footer } = await this.getBlogs();
      if (process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === 'true') {
        addEditableTags(blog[0], 'blog_post', true);
        addEditableTags(banner[0], 'page', true);
        addEditableTags(header[0][0], 'header', true);
        addEditableTags(footer[0][0], 'footer', true);
      }
      this.setState({
        entry: blog[0],
        banner: banner[0],
        header: header[0][0],
        footer: footer[0][0],
        error: { errorStatus: false },
      });
    } catch (error) {
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      });
    }
  }

  async getBlogs() {
    try {
      const banner = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: '/blog',
      });
      const { location } = this.props;
      const blog = await Stack.getEntryByUrl({
        contentTypeUid: 'blog_post',
        entryUrl: location.pathname,
        referenceFieldPath: ['author', 'related_post'],
        jsonRtePath: ['body', 'related_post.body'],
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
      return {
        blog,
        banner,
        header,
        footer,
      };
    } catch (error) {
      console.error(error);
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

  async componentDidUpdate(prevProps) {
    try {
      if (prevProps.match.params.uid !== this.props.match.params.uid) {
        let { blog, banner, header, footer } = await this.getBlogs();
        this.setState({
          entry: blog[0],
          banner: banner[0],
          header: header[0][0],
          footer: footer[0][0],
          error: { errorStatus: false },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { header, footer, entry, error, banner } = this.state;
    const { history } = this.props;
    if (!error.errorStatus && entry) {
      return (
        <Layout header={header} footer={footer} page={banner} blogpost={entry} activeTab='Blog'>
          <RenderComponents pageComponents={banner.page_components} blogsPage contentTypeUid='blog_post' entryUid={entry.uid} locale={entry.locale} />
          <div className='blog-container'>
            <article className='blog-detail'>
              <h2 {...entry.$?.title}>{entry.title ? entry.title : ''}</h2>
              <p {...entry.$?.date}>
                {moment(entry.date).format('ddd, MMM D YYYY')}, <strong {...entry.author[0].$?.title}>{entry.author[0].title}</strong>
              </p>
              <div {...entry.$?.body}>{parse(entry.body)}</div>
            </article>
            <div className='blog-column-right'>
              <div className='related-post'>
                {banner.page_components[2].widget && <h2 {...banner.page_components[2].widget.$?.title_h2}>{banner.page_components[2].widget.title_h2}</h2>}
                {entry.related_post && <ArchiveRelative {...entry.$?.related_post} blogs={entry.related_post} />}
              </div>
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
export default BlogPost;
