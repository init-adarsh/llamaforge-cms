import type { Core } from '@strapi/strapi';

const frontendUrl = process.env.ASTRO_FRONTEND_URL;

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Allow local dev + any deployed Vercel/custom domain via env var
      origin: ['http://localhost:4321', 'http://localhost:3000', ...(frontendUrl ? [frontendUrl] : ['*'])],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
