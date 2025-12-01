<template>
  <div class="card" style="padding: .75rem; display: grid; gap: .75rem; grid-template-columns: 1fr 220px;">
    <label class="sr-only" for="search">Search</label>
    <input
      id="search"
      type="search"
      class="input"
      :value="search"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      placeholder="Search by title or author…"
      aria-label="Search books by title or author"
    />

    <div style="display:flex; gap:.5rem; align-items:center;">
      <label for="tag" class="sr-only">Filter by tag</label>
      <select
        id="tag"
        class="select"
        :value="tag"
        @change="$emit('update:tag', ($event.target as HTMLSelectElement).value)"
        aria-label="Filter by tag"
      >
        <option value="">All tags</option>
        <option v-for="t in tags" :key="t" :value="t">{{ t }}</option>
      </select>
      <button class="btn btn-secondary" @click="$emit('clear')" type="button">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string;
  tag: string;
  tags: string[];
}>();
defineEmits<{
  'update:search': [value: string];
  'update:tag': [value: string];
  'clear': [];
}>();
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}
@media (max-width: 640px) {
  div.card {
    grid-template-columns: 1fr;
  }
}
</style>
