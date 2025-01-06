// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700],
    },
  },
  supabase: {
    redirect: true,
  },
  runtimeConfig: {
    STOCKAPI_KEY: process.env.STOCKAPI_KEY,

    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  },
});
