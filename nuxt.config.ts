import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

const contentDir = fileURLToPath(new URL('./content', import.meta.url));

const toContentRoute = (filePath: string) => {
  const routePath = relative(contentDir, filePath)
    .replace(/\.(md|mdc)$/, '')
    .split(sep)
    .join('/');

  if (routePath === 'index') return '/';
  if (routePath.endsWith('/index')) return `/${routePath.replace(/\/index$/, '')}`;
  return `/${routePath}`;
};

const getContentPrerenderRoutes = (dir = contentDir): string[] => {
  return readdirSync(dir).flatMap((entry) => {
    const filePath = join(dir, entry);
    const stat = statSync(filePath);

    if (stat.isDirectory()) return getContentPrerenderRoutes(filePath);
    if (/\.(md|mdc)$/.test(entry)) return [toContentRoute(filePath)];
    return [];
  });
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    typedPages: true,
  },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/test-utils'],
  css: ['~/assets/css/ramune.css', '~/assets/css/tailwind.css'],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: getContentPrerenderRoutes(),
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ja', class: 'ram-light' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
});
