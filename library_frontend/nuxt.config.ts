/* https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/styles/theme.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue'],
      // Only auto-import .vue files; TS barrel file remains for manual imports if needed
      global: false
    }
  ],
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
    // Allow proxy trust if running behind a preview proxy
    // Trust proxy via env; default true to be safe in preview
    nitro: {
      routeRules: {}
    },
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
      TRUST_PROXY: process.env.NUXT_PUBLIC_TRUST_PROXY || 'true',
      LOG_LEVEL: process.env.NUXT_PUBLIC_LOG_LEVEL || '',
      HEALTHCHECK_PATH: process.env.NUXT_PUBLIC_HEALTHCHECK_PATH || '/health',
      EXPERIMENTS_ENABLED: process.env.NUXT_PUBLIC_EXPERIMENTS_ENABLED || ''
    }
  },
  nitro: {
    // Listen on 0.0.0.0 and honor NUXT_PUBLIC_PORT (defaults to 3000)
    // At runtime, Nuxt/Nitro respect NITRO_PORT/PORT envs; we set dev/preview host/port in vite below.
    // Expose health endpoints and basic CORS
    routeRules: {
      '/health': { cache: false },
      '/api/health': { cache: false },
      '/**': {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    },
    // Trust upstream proxy by default in preview envs
    experimental: {
      openAPI: false
    },
    // Hook minimal logging for SSR safety diagnostics
    hooks: {
      'request': (event) => {
        try {
          const url = event.node?.req?.url || '';
          if (url === '/health' || url === '/api/health') {
            // keep logs minimal for health checks
            return;
          }
          // eslint-disable-next-line no-console
          console.log('[nitro] request', { url });
        } catch {
          // no-op
        }
      },
      'render:response': (response, { event }) => {
        try {
          const url = event.node?.req?.url || '';
          // eslint-disable-next-line no-console
          console.log('[nitro] render', { url, status: response.status });
        } catch {
          // no-op
        }
      }
    },
    preset: process.env.NITRO_PRESET || undefined
  },
  vite: {
    // Respect NUXT_PUBLIC_PORT if provided; fallback to 3000
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: Number(process.env.NUXT_PUBLIC_PORT || 3000)
    },
    preview: {
      host: '0.0.0.0',
      port: Number(process.env.NUXT_PUBLIC_PORT || 3000)
    },
    build: {
      // Avoid type-check blocking during build; Vite handles transpile only
      // Type checks can be run separately with `npm run lint` if desired
      target: 'es2020'
    }
  },
  // Reduce risk of preview blocking on type/lint by disabling type-check during build
  typescript: {
    typeCheck: false,
    strict: false
  },
  eslint: {
    // When using @nuxt/eslint-module (not installed here), we would disable during build.
    // Keeping note for clarity.
  }
});
