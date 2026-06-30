import type { WPPost, WPPage } from './wordpress';
import { renderBlocks } from './blocks-renderer';

const STRAPI_API_URL = import.meta.env.STRAPI_API_URL || 'http://127.0.0.1:1337';

/**
 * Maps a Strapi v5 Dynamic Zone component to a WordPress-style Gutenberg block.
 */
function mapStrapiBlock(block: any): any {
  if (!block || !block.__component) return null;

  const component = block.__component;
  const attrs = { ...block };
  delete attrs.__component;
  delete attrs.id;

  let blockName = '';
  switch (component) {
    case 'blocks.hero':
      blockName = 'lazyblock/hero-block';
      break;
    case 'blocks.stats':
      blockName = 'lazyblock/stats-block';
      break;
    case 'blocks.timeline':
      blockName = 'lazyblock/timeline-block';
      break;
    case 'blocks.features':
      blockName = 'lazyblock/features-block';
      break;
    case 'blocks.cta':
      blockName = 'lazyblock/cta-block';
      break;
    case 'blocks.faq':
      blockName = 'lazyblock/faq-block';
      break;
    case 'blocks.rich-text':
      blockName = 'lazyblock/richtext-block';
      attrs.content = Array.isArray(block.content) ? renderBlocks(block.content) : block.content;
      break;
    default:
      return null;
  }

  return {
    blockName,
    attrs,
  };
}

/**
 * Transforms a Strapi Page response into a WordPress-compatible WPPage.
 */
export function transformPage(strapiPage: any): WPPage {
  const blocks = Array.isArray(strapiPage.blocks)
    ? strapiPage.blocks.map(mapStrapiBlock).filter(Boolean)
    : [];

  // Also construct post.acf structure if any code expects it
  const acf: any = {};
  if (Array.isArray(strapiPage.blocks)) {
    for (const block of strapiPage.blocks) {
      if (block.__component === 'blocks.hero') acf.hero_block = { ...block, enabled: block.enabled !== false };
      if (block.__component === 'blocks.stats') acf.stats_block = { ...block, enabled: block.enabled !== false };
      if (block.__component === 'blocks.timeline') acf.timeline_block = { ...block, enabled: block.enabled !== false };
      if (block.__component === 'blocks.features') acf.features_block = { ...block, enabled: block.enabled !== false };
      if (block.__component === 'blocks.cta') acf.cta_block = { ...block, enabled: block.enabled !== false };
      if (block.__component === 'blocks.faq') acf.faq_block = { ...block, enabled: block.enabled !== false };
      if (block.__component === 'blocks.rich-text') acf.richtext_block = { ...block, enabled: block.enabled !== false };
    }
  }

  return {
    id: strapiPage.id,
    date: strapiPage.publishedAt || strapiPage.createdAt,
    slug: strapiPage.slug,
    parent: strapiPage.parent || 0,
    title: {
      rendered: strapiPage.title || '',
    },
    content: {
      rendered: Array.isArray(strapiPage.content)
        ? renderBlocks(strapiPage.content)
        : strapiPage.content || '',
    },
    excerpt: {
      rendered: strapiPage.excerpt || '',
    },
    blocks,
    acf,
    template: strapiPage.template || 'default',
    template_country: strapiPage.template_country || null,
    template_about: strapiPage.template_about || null,
    template_process: strapiPage.template_process || null,
    template_faq: strapiPage.template_faq || null,
  };
}

/**
 * Transforms a Strapi Post response into a WordPress-compatible WPPost.
 */
export function transformPost(strapiPost: any): WPPost {
  return {
    id: strapiPost.id,
    date: strapiPost.date || strapiPost.publishedAt || strapiPost.createdAt,
    slug: strapiPost.slug,
    title: {
      rendered: strapiPost.title || '',
    },
    content: {
      rendered: Array.isArray(strapiPost.content)
        ? renderBlocks(strapiPost.content)
        : strapiPost.content || '',
    },
    excerpt: {
      rendered: strapiPost.excerpt || '',
    },
    acf: {},
    blocks: [],
  };
}

/**
 * Fetch all pages from Strapi.
 */
export async function fetchPages(locale?: string): Promise<WPPage[]> {
  try {
    const localeQuery = locale ? `&locale=${locale}` : '';
    const res = await fetch(`${STRAPI_API_URL}/api/pages?populate=*&status=published${localeQuery}&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch pages from Strapi, status: ${res.status}`);
    }
    const payload = await res.json();
    const data = payload.data || [];
    return data.map(transformPage);
  } catch (error) {
    console.error('Error fetching pages from Strapi:', error);
    return [];
  }
}

/**
 * Fetch a single page by slug. Supports preview drafts.
 */
export async function fetchPageBySlug(slug: string, isPreview = false, locale?: string): Promise<WPPage | null> {
  const status = isPreview ? 'preview' : 'published';
  try {
    const localeQuery = locale ? `&locale=${locale}` : '';
    const res = await fetch(
      `${STRAPI_API_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*&status=${status}${localeQuery}&t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch page ${slug} from Strapi, status: ${res.status}`);
    }
    const payload = await res.json();
    const data = payload.data || [];
    return data.length > 0 ? transformPage(data[0]) : null;
  } catch (error) {
    console.error(`Error fetching page ${slug} from Strapi:`, error);
    return null;
  }
}

/**
 * Fetch a single page by ID or documentId. Supports preview drafts.
 */
export async function fetchPageById(id: string | number, isPreview = false): Promise<WPPage | null> {
  const status = isPreview ? 'preview' : 'published';
  try {
    const isDocId = typeof id === 'string' && isNaN(Number(id));
    const filterField = isDocId ? 'documentId' : 'id';
    const res = await fetch(
      `${STRAPI_API_URL}/api/pages?filters[${filterField}][$eq]=${id}&populate=*&status=${status}&t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch page with ID ${id} from Strapi, status: ${res.status}`);
    }
    const payload = await res.json();
    const data = payload.data || [];
    return data.length > 0 ? transformPage(data[0]) : null;
  } catch (error) {
    console.error(`Error fetching page with ID ${id} from Strapi:`, error);
    return null;
  }
}


/**
 * Fetch all posts from Strapi.
 */
export async function fetchPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(`${STRAPI_API_URL}/api/posts?populate=*&status=published&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch posts from Strapi, status: ${res.status}`);
    }
    const payload = await res.json();
    const data = payload.data || [];
    return data.map(transformPost);
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug. Supports preview drafts.
 */
export async function fetchPostBySlug(slug: string, isPreview = false): Promise<WPPost | null> {
  const status = isPreview ? 'preview' : 'published';
  try {
    const res = await fetch(
      `${STRAPI_API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*&status=${status}&t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch post ${slug} from Strapi, status: ${res.status}`);
    }
    const payload = await res.json();
    const data = payload.data || [];
    return data.length > 0 ? transformPost(data[0]) : null;
  } catch (error) {
    console.error(`Error fetching post ${slug} from Strapi:`, error);
    return null;
  }
}
