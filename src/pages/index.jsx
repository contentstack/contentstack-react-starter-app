import React from 'react';
import Stack from '../sdk/entry';
import { onEntryChange } from '../sdk/entry';

import Layout from '../components/layout';
import RenderComponents from '../components/render-components';
import { addEditableTags } from '@contentstack/utils';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    };
  }

  async fetchData() {
    try {
      const result = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: this.props.location.pathname,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: ['page_components.from_blog.featured_blogs.body', 'page_components.section_with_buckets.buckets.description'],
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
      if (process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === 'true') {
        addEditableTags(result[0], 'page', true);
        addEditableTags(header[0][0], 'header', true);
        addEditableTags(footer[0][0], 'footer', true);
      }
      this.setState({
        entry: result[0],
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

  componentDidMount() {
    this.fetchData();
    onEntryChange(() => {
      if (process.env.REACT_APP_CONTENTSTACK_LIVE_PREVIEW === 'true') {
        return this.fetchData();
      }
    });
  }

  render() {
    const { header, footer, entry, error } = this.state;
    const { history } = this.props;
    if (!error.errorStatus && entry) {
      return (
        <Layout header={header} footer={footer} page={entry} activeTab='Home'>
          <RenderComponents pageComponents={entry.page_components} contentTypeUid='page' entryUid={entry.uid} locale={entry.locale} />
        </Layout>
      );
    }

    if (error.errorStatus) {
      history.push('/error', [error]);
    }
    return '';
  }
}
export default Home;
