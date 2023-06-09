import {
  Widget,
  Section,
  OurTeam,
  FromBlog,
  HeroBanner,
  SectionWithCards,
  SectionWithBuckets,
  SectionWithHtmlCode,
} from "./components";

export type SEO = {
  enable_search_indexing: boolean;
  keywords: string;
  meta_description: string;
  meta_title: string;
  $: SEO;
};

export type Img = {
  url: string;
  uid: string;
  title: string;
  filename: string;
  $: Img;
};

export type Link = {
  title: string;
  href: string;
  $?: Link;
};

export type ComponentsProps = {
  widget: Widget;
  section: Section;
  our_team: OurTeam;
  from_blog: FromBlog;
  hero_banner: HeroBanner;
  section_with_cards: SectionWithCards;
  section_with_buckets: SectionWithBuckets;
  section_with_html_code: SectionWithHtmlCode;
};
export type Page = {
  $: Page;
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  locale: string;
  page_components: ComponentsProps[];
};

export type BlogPostRes = {
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  body: string;
  locale: string;
  author: [{ $: { uid: string; title: string }; uid: string; title: string }];
  date: string;
  featured_image: Img;
  related_post: BlogPostRes[];
  is_archived: boolean;
  $: BlogPostRes;
};
