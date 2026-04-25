import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    typedPages: true,
  },
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/image", "@nuxt/test-utils"],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
});
