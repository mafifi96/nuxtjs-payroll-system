// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools : {enabled : false},

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Payroll',
      meta: [{
        name: 'description',
        content: 'My amazing site.'
      }],
    }
  },

  modules: [
    
    //'pinia-plugin-persistedstate/nuxt'
    '@pinia/nuxt',
    '@nuxt/ui',
  ],

  css: [
    '~/assets/css/font-awesome.min.css'
  ],

  compatibilityDate: '2024-11-12',
})