// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
  tailwindcss: {
    cssPath: '~/assets/main.css'
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI
  },
  nitro: {
    plugins: ['@/server/db/index.ts']
  },
  build: {
    transpile: [
      '@headlessui/vue',
      'vue-toastification',
      '@headlessui/tailwindcss'
    ]
  }
})
