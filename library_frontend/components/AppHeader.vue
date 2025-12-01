<template>
  <header class="header" role="banner">
    <div class="header-inner">
      <NuxtLink to="/" class="header-brand focus-ring" aria-label="Ocean Library Home">
        <div class="logo" aria-hidden="true"></div>
        <span>Ocean Library</span>
      </NuxtLink>
      <nav class="nav" aria-label="Main" style="display:flex; align-items:center; gap:.5rem;">
        <NuxtLink to="/" exact-active-class="active" class="focus-ring">Books</NuxtLink>
        <NuxtLink to="/books/new" class="btn btn-primary">+ Add Book</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// purely presentational
</script>

<style scoped>
/* extra scoped tweak if needed */
</style>
