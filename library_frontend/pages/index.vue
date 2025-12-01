<template>
  <section>
    <header style="margin-bottom: .75rem;">
      <h1 style="margin:0 0 .25rem 0;">Books</h1>
      <p style="margin:0; color:#4b5563;">Browse the collection, search by title or author, and filter by tag.</p>
    </header>

    <BookListToolbar
      :search="q"
      :tag="tag"
      :tags="allTags"
      @update:search="val => q = val"
      @update:tag="val => tag = val"
      @clear="clearFilters"
      style="margin-bottom: .9rem;"
    />

    <div v-if="!filtered.length" class="alert" role="status" aria-live="polite">
      No books found. Try adjusting your search or filters.
    </div>

    <div class="grid cols-4">
      <BookCard v-for="b in filtered" :key="b.id" :book="b" />
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Books' });
const { list, uniqueTags } = useBooks();

const q = ref('');
const tag = ref('');

const books = computed(() => list());
const allTags = computed(() => uniqueTags());

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
