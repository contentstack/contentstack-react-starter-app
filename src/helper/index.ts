import { getEntry, getEntryByUrl } from "../sdk/entry";
import { addEditableTags } from "@contentstack/utils";
import { FooterRes, HeaderRes } from "../typescript/response";
import { BlogPostRes, Page } from "../typescript/pages";

const liveEdit = process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async (): Promise<HeaderRes> => {
  const response = (await getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  })) as HeaderRes[][];
  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async (): Promise<FooterRes> => {
  const response = (await getEntry({
    contentTypeUid: "footer",
    jsonRtePath: ["copyright"],
    referenceFieldPath: undefined,
  })) as FooterRes[][];
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: "page",
    jsonRtePath: undefined,
    referenceFieldPath: undefined,
  })) as Page[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  return response[0];
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  })) as Page[];
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getBlogListRes = async (): Promise<{
  archivedBlogs: BlogPostRes[];
  recentBlogs: BlogPostRes[];
}> => {
  const response = (await getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as BlogPostRes[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  const archivedBlogs = [] as BlogPostRes[];
  const recentBlogs = [] as BlogPostRes[];

  response[0].forEach((blogs) => {
    if (blogs.is_archived) {
      archivedBlogs.push(blogs);
    } else {
      recentBlogs.push(blogs);
    }
  });
  return { archivedBlogs, recentBlogs };
};

export const getBlogPostRes = async (
  entryUrl: string
): Promise<BlogPostRes> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  })) as BlogPostRes[];
  liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};
