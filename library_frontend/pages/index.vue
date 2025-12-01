<template>
  <section>
    <header style="margin-bottom: .75rem;">
      <h1 style="margin:0 0 .25rem 0;">Books</h1>
      <p style="margin:0; color:#4b5563;">Browse the collection, search by title or author, and filter by tag.</p>
      <p style="margin:.4rem 0 0 0; color:#6b7280; font-size:.9rem;">This list renders immediately with server-side HTML for a fast first paint.</p>
    </header>

    <div v-if="storeError" class="alert" role="alert">
      The books store failed to initialize. Showing a minimal page.
      <div style="margin-top:.5rem; font-size:.9rem; color:#6b7280;">
        Please reload the page. If this persists, check /health and /api/health.
      </div>
    </div>

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

    <div v-if="!storeError && !filtered.length" class="alert" role="status" aria-live="polite">
      No books found. Try adjusting your search or filters.
    </div>

    <div v-if="!storeError" class="grid cols-4">
      <BookCard v-for="b in filtered" :key="b.id" :book="b" />
    </div>

    <div v-else style="margin-top:1rem;">
      <p>Ocean Library is running. Try the health checks:</p>
      <ul>
        <li><a href="/health" target="_self" rel="noopener">/health</a></li>
        <li><a href="/api/health" target="_self" rel="noopener">/api/health</a></li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Books' });
const { list, uniqueTags } = useBooks();

const q = ref('');
const tag = ref('');
const storeError = ref(false);

const safeList = () => {
  try {
    return list();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Books store list() failed', e);
    storeError.value = true;
    return [];
  }
};
const safeTags = () => {
  try {
    return uniqueTags();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Books store uniqueTags() failed', e);
    storeError.value = true;
    return [];
  }
};

const books = computed(() => safeList());
const allTags = computed(() => safeTags());

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
</script>
