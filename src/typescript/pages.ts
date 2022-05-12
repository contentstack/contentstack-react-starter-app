import { Component } from "../typescript/component";

type Object = {
    title: string;
    body: string;
    date: string;
    related_post: [];
  }

type Author = {
    title: string;
    $: Object;
  }

type Blog = {
    url: string;
    body: string;
    title: string;
    $: Object;
  }

export type PageEntry = {
    url: string;
    page_components: Component[];
    uid: string;
    locale: string;
  }
  
export type Prop = {
    entry: Function
  }
  
export type Entry = {
    uid: string;
    page_components: Component[];
    locale: string;
  };
  
export type BlogData = {
    is_archived: boolean;
  }
  
export type ArchiveBlogList = [
    blogs:{
      url: string;
      body: string;
      title: string;
      $: Object;
    }
  ]

export type Banner = {
    uid: string;
    page_components:Component[];
    locale: string;
  }

export type Post = {
    url: string;
    page_components:[];
    title: string;
    date:string;
    author:Author[];
    body:string;
    related_post:[Blog];
    $:Object;
  }