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
    experimental: {
      openAPI: false
    },
    hooks: {
      request: (event) => {
        try {
          const url = event.node?.req?.url || '';
          if (url === '/health' || url === '/api/health') return;
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
    server: {
      host: true, // binds to 0.0.0.0
      port: Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000),
      strictPort: true,
      cors: true,
      allowedHosts: (() => {
        const base = [
          'vscode-internal-34023-qa.qa01.cloud.kavia.ai',
          'vscode-internal-*.qa01.cloud.kavia.ai',
          '*.qa01.cloud.kavia.ai',
          '*.cloud.kavia.ai',
        ];
        const extra = String(process.env.ALLOWED_HOSTS || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        return Array.from(new Set([...base, ...extra]));
      })(),
      // Safer origin: use FRONTEND_URL if provided, otherwise avoid forcing origin
      origin: (() => {
        const envOrigin =
          process.env.NUXT_PUBLIC_FRONTEND_URL ||
          process.env.FRONTEND_URL ||
          '';
        return envOrigin || undefined;
      })(),
      hmr: (() => {
        const port = Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000);
        const clientPort =
          process.env.HMR_CLIENT_PORT ||
          process.env.NUXT_PUBLIC_PORT ||
          process.env.PORT ||
          String(port);
        const host =
          process.env.HMR_HOST ||
          process.env.PREVIEW_HOST ||
          undefined;
        // Choose protocol only when we have an explicit external origin and it's https
        const externalOrigin =
          process.env.NUXT_PUBLIC_FRONTEND_URL ||
          process.env.FRONTEND_URL ||
          '';
        const isHttps = externalOrigin.startsWith('https://');
        const hmrConfig: Record<string, any> = {
          clientPort: Number(clientPort),
        };
        if (host) hmrConfig.host = host;
        if (isHttps) {
          // Only force wss when truly behind https origin
          hmrConfig.protocol = 'wss';
        }
        return hmrConfig;
      })(),
    },
    preview: {
      host: true,
      port: Number(process.env.NUXT_PUBLIC_PORT || process.env.PORT || 3000),
      strictPort: true,
      allowedHosts: (() => {
        const base = [
          'vscode-internal-34023-qa.qa01.cloud.kavia.ai',
          'vscode-internal-*.qa01.cloud.kavia.ai',
          '*.qa01.cloud.kavia.ai',
          '*.cloud.kavia.ai',
        ];
        const extra = String(process.env.ALLOWED_HOSTS || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        return Array.from(new Set([...base, ...extra]));
      })(),
    },
    build: {
      target: 'es2020'
    }
  },
  typescript: {
    typeCheck: false,
    strict: false
  },
  eslint: {
    // When using @nuxt/eslint-module, we would disable during build.
  }
});
