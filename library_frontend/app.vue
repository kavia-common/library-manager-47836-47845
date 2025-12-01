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
@import url('/assets/styles/theme.css');
</style>
