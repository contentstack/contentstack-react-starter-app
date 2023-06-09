import { Img, Link } from "./pages";

export type FooterRes = {
  uid: string;
  title: string;
  copyright: string;
  logo: Img;
  navigation: {
    link: Link[];
  };
  social: {
    social_share: {
      icon: Img;
      link: Link;
    }[];
  };
  $?: FooterRes;
};

export type HeaderRes = {
  title: string;
  uid: string;
  logo: Img;
  navigation_menu: NavigationMenu[];
  notification_bar: {
    show_announcement: boolean;
    announcement_text: string;
    $:{
      show_announcement: boolean;
      announcement_text: string;
    }
  };
  $: HeaderRes;
};

export type NavigationMenu = {
  $?: NavigationMenu;
  label: string;
  page_reference: {
    $?: {
      uid: string;
      title: string;
      url: string;
    };
    uid: string;
    title: string;
    url: string;
  }[];
};
