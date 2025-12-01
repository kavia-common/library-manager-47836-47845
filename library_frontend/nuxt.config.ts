/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/styles/theme.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href:
            'data:image/svg+xml;utf8,' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
            '<circle cx="50" cy="50" r="48" fill="#2563EB"/></svg>'
        }
      ]
    }
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
      EXPERIMENTS_ENABLED: process.env.NUXT_PUBLIC_EXPERIMENTS_ENABLED || ''
    }
  },
  nitro: {
    // Ensure health endpoints are public and cached minimally
    routeRules: {
      '/health': { cache: false },
      '/api/health': { cache: false },
      '/**': {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    },
    preset: process.env.NITRO_PRESET || undefined
  },
  vite: {
    server: {
      host: '0.0.0.0',
      // allow all hosts (useful in preview environments)
      allowedHosts: true,
      port: 3000
    },
    preview: {
      host: '0.0.0.0',
      port: 3000
    }
  }
});
