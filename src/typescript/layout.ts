import { Image } from "./action";

type Object = {
  title: {};
  copyright: string;
  announcement_text: string;
  label: {};
};

type SocialLink = {
  href: string;
  title: string;
};

type Announcement = {
  show_announcement: boolean;
  announcement_text: string;
  $: Object;
};

type Page = {
  url: string;
};

type List = {
  label: string;
  page_reference: [Page];
  $: Object;
};

type Posts = {
  locale: string;
  author: [];
  body: string;
  date: string;
  featured_image: {};
  is_archived: boolean;
  related_post: [];
  seo: {};
  url: string;
  title: string;
  _owner: {};
};

type PageList = {
  locale: string;
  page_components: [];
  seo: {};
  url: string;
  title: string;
  _owner: {};
};

export type EntryProps = {
  blogPost: [Posts];
  page: [PageList];
};

export type Entry = {
  title: string;
  url: string;
};

export type NavLink = {
  label: string;
};

export type Links = {
  title: string;
  href: string;
  $: Object;
};

export type HeaderProps = {
  notification_bar: Announcement;
  logo: Image;
};

export type Social = {
  link: SocialLink;
  icon: Image;
  social_share: [];
};

export type NavmenuProps = [link: Links];

export type HeadermenuProps = [link: List];

export type FooterProps = {
  logo: Image;
  copyright: string;
  social: Social;
  $: Object;
};
