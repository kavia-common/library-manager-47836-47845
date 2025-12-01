<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="container" style="padding-top: 1rem; padding-bottom: 2rem;">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} · Ocean Library` : 'Ocean Library',
  meta: [
    { name: 'theme-color', content: '#2563EB' },
  ]
});
</script>

<style>
/* Global theme CSS is loaded via nuxt.config.ts css array */
</style>
