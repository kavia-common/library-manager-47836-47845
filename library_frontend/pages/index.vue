<template>
  <section>
    <header style="margin-bottom: .75rem;">
      <h1 style="margin:0 0 .25rem 0;">Books</h1>
      <p style="margin:0; color:#4b5563;">Browse the collection, search by title or author, and filter by tag.</p>
      <p style="margin:.4rem 0 0 0; color:#6b7280; font-size:.9rem;">This page always renders server-side for an immediate first paint.</p>
    </header>

    <!-- Always SSR-rendered status row -->
    <div class="card" style="padding:.5rem .75rem; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center;">
      <span style="color:#1f2937;">SSR OK</span>
      <span v-if="hydrated" style="color:#2563EB;">Hydrated</span>
      <span v-else style="color:#6b7280;">Awaiting hydration…</span>
    </div>

    <!-- Error alert if store fails -->
    <div v-if="storeError" class="alert" role="alert">
      The books store failed to initialize. Showing a minimal page.
      <div style="margin-top:.5rem; font-size:.9rem; color:#6b7280;">
        Please reload the page. If this persists, check /health and /api/health.
      </div>
    </div>

    <!-- Toolbar is visible on SSR with empty values to avoid blocking -->
    <BookListToolbar
      v-if="!storeError"
      :search="q"
      :tag="tag"
      :tags="allTags"
      @update:search="val => q = val"
      @update:tag="val => tag = val"
      @clear="clearFilters"
      style="margin-bottom: .9rem;"
    />

    <!-- Skeleton for first paint (SSR) -->
    <div v-if="!hydrated && !storeError" class="grid cols-4" aria-hidden="true">
      <div v-for="i in 8" :key="i" class="card" style="height: 280px; background:linear-gradient(135deg, rgba(59,130,246,.06), rgba(249,250,251,1));"></div>
    </div>

    <!-- Real content -->
    <div v-if="!storeError" class="grid cols-4">
      <BookCard v-for="b in filtered" :key="b.id" :book="b" />
    </div>

    <div v-if="!storeError && hydrated && !filtered.length" class="alert" role="status" aria-live="polite" style="margin-top:.75rem;">
      No books found. Try adjusting your search or filters.
    </div>

    <div v-else-if="storeError" style="margin-top:1rem;">
      <p>Ocean Library is running. Try the health checks:</p>
      <ul>
        <li><a href="/health" target="_self" rel="noopener">/health</a></li>
        <li><a href="/api/health" target="_self" rel="noopener">/api/health</a></li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Home page renders SSR-visible skeleton and toolbar immediately,
 * then hydrates client state after mount to avoid any splash screen.
 */
useHead({ title: 'Books' });

// Defer any client-only operations to mounted
const hydrated = ref(false);

const q = ref('');
const tag = ref('');
const storeError = ref(false);

// Access composable (safe on SSR; it guards localStorage internally)
const { list, uniqueTags } = useBooks();

const books = computed(() => {
  try {
    return list();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Books store list() failed', e);
    storeError.value = true;
    return [];
  }
});

const allTags = computed(() => {
  try {
    return uniqueTags();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Books store uniqueTags() failed', e);
    storeError.value = true;
    return [];
  }
});

const filtered = computed(() => {
  const needle = q.value.trim().toLowerCase();
  const t = tag.value.trim().toLowerCase();
  return books.value.filter(b => {
    const matchesSearch = !needle ||
      b.title.toLowerCase().includes(needle) ||
      b.author.toLowerCase().includes(needle);
    const matchesTag = !t || (b.tags || []).some(x => x.toLowerCase() === t);
    return matchesSearch && matchesTag;
  });
});

function clearFilters() {
  q.value = '';
  tag.value = '';
}

onMounted(() => {
  // Mark hydration complete after client mount to switch from skeleton to real content guards
  hydrated.value = true;
});
</script>
