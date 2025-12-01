/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2248%22 fill=%22%232563EB%22/></svg>' }
      ],
    },
  },
  runtimeConfig: {
    public: {
      API_BASE: process.env.NUXT_PUBLIC_API_BASE || '',
      BACKEND_URL: process.env.NUXT_PUBLIC_BACKEND_URL || '',
      FRONTEND_URL: process.env.NUXT_PUBLIC_FRONTEND_URL || '',
      WS_URL: process.env.NUXT_PUBLIC_WS_URL || '',
      FEATURE_FLAGS: process.env.NUXT_PUBLIC_FEATURE_FLAGS || '',
      NODE_ENV: process.env.NUXT_PUBLIC_NODE_ENV || '',
      NEXT_TELEMETRY_DISABLED: process.env.NUXT_PUBLIC_NEXT_TELEMETRY_DISABLED || '',
      ENABLE_SOURCE_MAPS: process.env.NUXT_PUBLIC_ENABLE_SOURCE_MAPS || '',
      PORT: process.env.NUXT_PUBLIC_PORT || '',
      TRUST_PROXY: process.env.NUXT_PUBLIC_TRUST_PROXY || '',
      LOG_LEVEL: process.env.NUXT_PUBLIC_LOG_LEVEL || '',
      HEALTHCHECK_PATH: process.env.NUXT_PUBLIC_HEALTHCHECK_PATH || '',
      EXPERIMENTS_ENABLED: process.env.NUXT_PUBLIC_EXPERIMENTS_ENABLED || '',
    }
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
