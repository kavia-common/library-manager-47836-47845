<template>
  <article class="card scale-soft" style="overflow: hidden;">
    <NuxtLink
      :to="`/books/${book.id}`"
      class="card-link focus-ring"
      :aria-label="`View details for ${book.title}`"
    >
      <div class="cover-wrap">
        <img
          :src="book.coverUrl || placeholder"
          class="cover"
          :alt="`${book.title} cover`"
          @error="onImgError"
        />
      </div>
      <div class="content">
        <h3 class="title">{{ book.title }}</h3>
        <p class="meta">{{ book.author }} <span v-if="book.year">· {{ book.year }}</span></p>
        <div class="tags" v-if="book.tags?.length">
          <span class="badge" v-for="t in book.tags" :key="t">{{ t }}</span>
        </div>
        <div v-if="showRating && book.rating" class="rating" :aria-label="`Rating ${book.rating} out of 5`">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= (book.rating || 0) }">★</span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Book } from '~/composables/useBooks';
defineProps<{ book: Book }>();

const { experiments } = useFeatureFlags();
const showRating = computed(() => experiments?.bookRating === true);

const placeholder = 'https://placehold.co/400x600?text=No+Cover';

function onImgError(e: Event) {
  const el = e.target as HTMLImageElement;
  if (el && el.src !== placeholder) {
    el.src = placeholder;
  }
}
</script>

<style scoped>
.card-link {
  display: grid;
  grid-template-rows: 220px 1fr;
  color: inherit;
  border-radius: var(--radius-lg);
}

.cover-wrap {
  background: linear-gradient(135deg, rgba(59,130,246,.08), rgba(249,250,251,1));
}

.cover {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.content {
  padding: 1rem;
}

.title {
  margin: 0 0 .3rem 0;
  font-size: 1.06rem;
  color: #0f172a;
}

.meta {
  margin: 0 0 .55rem 0;
  color: #4b5563;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
  margin-top: .25rem;
}

.rating {
  margin-top: .55rem;
  color: var(--color-secondary);
}

.star {
  font-size: 1rem;
  opacity: .35;
  transition: opacity var(--transition-fast);
}

.star.filled { opacity: 1; }
</style>
