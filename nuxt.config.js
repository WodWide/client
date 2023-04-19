export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Wod Wide",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
      },
      { rel: "icon", type: "image/x-icon", href: "logo.png" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/validations.js",
    "~plugins/vue-the-mask.js",
    "~plugins/tooltip.js",
  ],

  middleware: ["auth"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxt/postcss8",
    "@nuxtjs/fontawesome",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-breakpoints",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyC4nvWAMeo_Y7UnOfJ_AGLAwXjTLOlkU_I",
          authDomain: "wodwide-a5ab1.firebaseapp.com",
          projectId: "wodwide-a5ab1",
          storageBucket: "wodwide-a5ab1.appspot.com",
          messagingSenderId: "1096779834802",
          appId: "1:1096779834802:web:a0c2e2ce08c3e7c8da70ab",
          measurementId: "G-E2QR4E5RW6",
        },
        // add all services from firebase for nuxt
        services: {
          auth: true,
          firestore: true,
        },
      },
    ],
  ],

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
    postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue|ts)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
