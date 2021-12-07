const bodyParser = require('body-parser')

export default {
  mode: 'universal',
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'WD blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Welcome to Wb Development blogs website' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/custom-plg.js',
    '~/plugins/date-filter.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'https://blogs-2f7f2-default-rtdb.firebaseio.com',
    credentials: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['log', 'auth', 'check-auth']
  },

  // Loading bar
  loading: {
    color: 'green',
    height: '5px',
    duration: 5000,
  },

  // Loading in SPA
  loadingIndicator: {
    name: 'circle',
    color: 'green'
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://blogs-2f7f2-default-rtdb.firebaseio.com',
    FB_API_KEY: 'AIzaSyDiG_OyQ-_21qsdCz-4BPQCrr6XDPCRWEQ'
  },

  router: {
    linkActiveClass: 'active'
  },

  transition: {
    // Transition component name or class
    name: 'fade',
    mode: 'out-in'
  },

  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ]
}
