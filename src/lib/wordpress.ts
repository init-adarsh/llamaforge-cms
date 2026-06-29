import * as strapi from './strapi';

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  acf?: any;
  blocks?: any[];
}

export interface WPPage {
  id: number;
  date: string;
  slug: string;
  parent: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  acf?: any;
  blocks?: any[];
}

export async function fetchPosts(): Promise<WPPost[]> {
  return strapi.fetchPosts();
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  return strapi.fetchPostBySlug(slug);
}

export async function fetchPages(): Promise<WPPage[]> {
  return strapi.fetchPages();
}

export async function fetchPageBySlug(slug: string): Promise<WPPage | null> {
  return strapi.fetchPageBySlug(slug);
}
