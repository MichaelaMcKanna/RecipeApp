import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'recipe-manager',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
    mongodbUri: process.env.MONGODB_URI,
    databaseName: process.env.DATABASE_NAME,
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
      },
    },
  },
  css: [],
  plugins: [],
  components: true,

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  typescript: {
    strict: true,
  },

  vite: {
    optimizeDeps: {
      include: ['vue'],
    },
    server: {
      port: 3000,
    },
  },

  compatibilityDate: '2024-07-25',
})
