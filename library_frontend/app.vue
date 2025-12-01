<template>
  <div>
    <!-- SSR-visible banner to confirm layout renders even if hydration fails -->
    <div
      role="status"
      aria-live="polite"
      style="background:#e0ecff;color:#1e3a8a;padding:.35rem .6rem;font-size:.85rem;text-align:center"
    >
      Ocean Library — SSR OK <span v-if="isHydrated">· Hydrated</span><span v-else>· Waiting for client…</span>
    </div>

    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="container" style="padding-top: 1rem; padding-bottom: 2rem;">
      <!-- Error boundary to show a friendly message instead of blank -->
      <!-- NuxtPage renders the current route; kept minimal to avoid blocking assets -->
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
const isHydrated = ref(false);
onMounted(() => {
  // Mark hydration done on client; avoids using browser APIs during SSR.
  isHydrated.value = true;
});

useHead({
  titleTemplate: (title) => (title ? `${title} · Ocean Library` : 'Ocean Library'),
  meta: [{ name: 'theme-color', content: '#2563EB' }],
});
</script>

<style>
/* Global theme CSS is loaded via nuxt.config.ts css array */
</style>
