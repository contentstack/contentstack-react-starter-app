import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./header";
import Footer from "./footer";
import DevTools from "./devtools";
import { getHeaderRes, getFooterRes, getAllEntries } from "../helper";
import { onEntryChange } from "../sdk/entry";
import { EntryProps } from "../typescript/components";
import { FooterRes, HeaderRes, NavigationMenu } from "../typescript/response";
import { Link } from "../typescript/pages";

export default function Layout({ entry }: { entry: EntryProps }) {
  const history = useNavigate();
  const [getLayout, setLayout] = useState({
    header: {} as HeaderRes,
    footer: {} as FooterRes,
    navHeaderList: [] as NavigationMenu[],
    navFooterList: [] as Link[],
  });
  const mergeObjs = (...objs: any) => Object.assign({}, ...objs);
  const jsonObj = mergeObjs(
    { header: getLayout.header },
    { footer: getLayout.footer },
    entry,
  );

  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const header = await getHeaderRes();
      const footer = await getFooterRes();
      const allEntry = await getAllEntries();
      !header || (!footer && setError(true));
      const navHeaderList = header.navigation_menu;
      const navFooterList = footer.navigation.link;
      if (allEntry.length !== header.navigation_menu.length) {
        allEntry.forEach((entry) => {
          const hFound = header.navigation_menu.find(
            (navLink) => navLink.label === entry.title,
          );
          if (!hFound) {
            navHeaderList.push({
              label: entry.title,
              page_reference: [
                { title: entry.title, url: entry.url, uid: entry.uid },
              ],
            });
          }
          const fFound = footer.navigation.link.find(
            (link) => link.title === entry.title,
          );
          if (!fFound) {
            navFooterList.push({
              title: entry.title,
              href: entry.url,
            });
          }
        });
      }

      setLayout({
        header: header,
        footer: footer,
        navHeaderList,
        navFooterList,
      });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(fetchData);
  }, []);

  useEffect(() => {
    console.error("error...", error);
    error && history("/error");
  }, [error]);

  return (
    <div className="layout">
      <Helmet>
        <script type="text/javascript">
          {`
          !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
          // Define config and initialize Lytics tracking tag.
          // - The setup below will disable the automatic sending of Page Analysis Information (to prevent duplicative sends, as this same information will be included in the jstag.pageView() call below, by default)
          jstag.init({
            src: 'https://c.lytics.io/api/tag/a577bd2ac71b22bda6f8abb9d1690285/latest.min.js',
            pageAnalysis: {
              dataLayerPull: {
                disabled: true
              }
            }
          });

          // You may need to send a page view, depending on your use-case
          jstag.pageView();
          `}
        </script>
      </Helmet>
      <Header header={getLayout.header} navMenu={getLayout.navHeaderList} />
      <DevTools response={jsonObj} />
      <Outlet />
      <Footer footer={getLayout.footer} navMenu={getLayout.navFooterList} />
    </div>
  );
}
