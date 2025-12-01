<template>
  <!-- Keep only header and page to avoid any splash or blocking render -->
  <div>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="container section">
      <NuxtErrorBoundary>
        <Transition name="fade" mode="out-in">
          <NuxtPage />
        </Transition>
        <template #error="{ error }">
          <div class="alert" role="alert">
            A rendering error occurred. Please refresh.
            <pre style="white-space:pre-wrap;overflow:auto;background:#fff;border-radius:8px;padding:.5rem;margin-top:.5rem">{{ error?.message || error }}</pre>
          </div>
        </template>
      </NuxtErrorBoundary>
    </main>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Root app shell: renders AppHeader and NuxtPage without conditional gates.
 * Ensures SSR-first paint and no blocking splash screens.
 */
useHead({
  titleTemplate: (title) => (title ? `${title} · Ocean Library` : 'Ocean Library'),
  meta: [{ name: 'theme-color', content: '#2563EB' }],
});
</script>

<style>
/* Global theme CSS is loaded via nuxt.config.ts css array */
</style>
