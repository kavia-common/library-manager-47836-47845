<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="container" style="padding-top: 1rem; padding-bottom: 2rem;">
      <!-- Error boundary to show a friendly message instead of blank -->
      <NuxtErrorBoundary>
        <NuxtPage />
        <template #error="{ error }">
          <div class="alert" role="alert">
            A rendering error occurred. Please refresh.
            <pre style="white-space:pre-wrap;overflow:auto;background:#fff;border-radius:8px;padding:.5rem;margin-top:.5rem">
{{ error?.message || error }}</pre>
          </div>
        </template>
      </NuxtErrorBoundary>
    </main>
  </div>
</template>

<script setup lang="ts">
import { } from 'vue';

useHead({
  titleTemplate: (title) => (title ? `${title} · Ocean Library` : 'Ocean Library'),
  meta: [{ name: 'theme-color', content: '#2563EB' }],
});
</script>

<style>
/* Global theme CSS is loaded via nuxt.config.ts css array */
</style>
