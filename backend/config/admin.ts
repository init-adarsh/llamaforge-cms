import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: ['https://llamaforge-cms.vercel.app', 'http://localhost:4321'],
      async handler(uid, { documentId, locale, status }) {
        if (uid === 'api::page.page') {
          return `https://llamaforge-cms.vercel.app/preview?id=${documentId}&secret=tnv_preview_secret_2026`;
        }
        if (uid === 'api::post.post') {
          // For posts, let's see if preview.astro supports it, or if it has another page.
          // Let's check.
          return `https://llamaforge-cms.vercel.app/preview?id=${documentId}&secret=tnv_preview_secret_2026`;
        }
        return `https://llamaforge-cms.vercel.app/preview?id=${documentId}&secret=tnv_preview_secret_2026`;
      },
    },
  },
});

export default config;
