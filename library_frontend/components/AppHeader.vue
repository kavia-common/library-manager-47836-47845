<template>
  <header class="header" role="banner">
    <div class="header-inner">
      <NuxtLink to="/" class="header-brand" aria-label="Ocean Library Home">
        <div class="logo" aria-hidden="true"></div>
        <span>Ocean Library</span>
      </NuxtLink>
      <nav class="nav" aria-label="Main">
        <NuxtLink to="/" exact-active-class="active">Books</NuxtLink>
        <NuxtLink to="/books/new" class="btn btn-primary" style="margin-left: .5rem;">
          + Add Book
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// No specific logic needed; navigation links provided
</script>

<style scoped>
.active {
  background: rgba(37,99,235,0.12);
}
</style>
