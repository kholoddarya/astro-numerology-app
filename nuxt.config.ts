// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
  ],

  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      {
        name: "Fraunces",
        provider: "google",
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
      {
        name: "Manrope",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
      },
      { name: "IBM Plex Mono", provider: "google", weights: [400, 500, 600] },
    ],
  },

  ssr: true,

  site: {
    url: "https://astra-astrology.ru",
  },

  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      title: "Astra — натальные карты, гороскопы и нумерология",
      titleTemplate: "%s · Astra",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Astra — точные натальные карты, персональные гороскопы и нумерологические расчёты онлайн. Разбор личности по дате рождения на основе классических систем.",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { name: "yandex-verification", content: "PUT_YOUR_CODE_HERE" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
    },
  },

  nitro: {
    prerender: {
      routes: ["/robots.txt"],
      ignore: ["/api/**"],
    },
  },

  routeRules: {
    "/api/**": { cors: true },
  },

  typescript: { strict: true },
});
