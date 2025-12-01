<template>
  <section class="section" v-if="book">
    <div class="card" style="padding: 1.1rem;">
      <div style="display:grid; grid-template-columns: 220px 1fr; gap: 1rem;">
        <div>
          <img
            :src="book.coverUrl || placeholder"
            :alt="`${book.title} cover`"
            class="cover"
            @error="onImgError"
          />
        </div>
        <div>
          <h1 style="margin:.25rem 0 .25rem 0;">{{ book.title }}</h1>
          <p style="margin:0 0 .5rem 0; color:#374151;">
            By {{ book.author }} <span v-if="book.year">· {{ book.year }}</span>
          </p>
          <div style="display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:.8rem;" v-if="book.tags?.length">
            <span class="badge" v-for="t in book.tags" :key="t">{{ t }}</span>
          </div>
          <div v-if="showRating && book.rating" class="rating" :aria-label="`Rating ${book.rating} out of 5`">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= (book.rating || 0) }">★</span>
          </div>
          <p style="margin-top:.8rem; white-space: pre-wrap;">{{ book.description }}</p>

          <div style="display:flex; gap:.6rem; margin-top:1rem;">
            <NuxtLink :to="`/books/${book.id}/edit`" class="btn btn-primary">Edit</NuxtLink>
            <button class="btn btn-danger" @click="askDelete = true">Delete</button>
            <NuxtLink to="/" class="btn">Back</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <ConfirmDialog
      :open="askDelete"
      title="Delete book"
      :message="`Are you sure you want to delete “${book.title}” by ${book.author}? This cannot be undone.`"
      @cancel="askDelete = false"
      @confirm="onDelete"
    />
  </section>

  <section v-else class="section">
    <div class="alert">Book not found.</div>
    <NuxtLink to="/" class="btn" style="margin-top:.8rem; display:inline-block;">Back to list</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import type { Book } from '~/composables/useBooks';
useHead({ title: 'Book details' });

const route = useRoute();
const router = useRouter();
const { getById, remove } = useBooks();
const { experiments } = useFeatureFlags();
const showRating = computed(() => experiments?.bookRating === true);

const id = route.params.id as string;
const book = ref<Book | undefined>(getById(id));

watchEffect(() => {
  book.value = getById(id);
});

const placeholder = 'https://placehold.co/400x600?text=No+Cover';
const askDelete = ref(false);

function onImgError(e: Event) {
  const el = e.target as HTMLImageElement;
  if (el && el.src !== placeholder) {
    el.src = placeholder;
  }
}

function onDelete() {
  askDelete.value = false;
  const ok = remove(id);
  if (ok) {
    router.push('/');
  }
}
</script>

<style scoped>
.cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  background: linear-gradient(135deg, rgba(59,130,246,.08), rgba(249,250,251,1));
}
.rating { color: var(--color-secondary); }
.star { opacity:.35; font-size:1.1rem; transition: opacity var(--transition-fast); }
.star.filled { opacity:1; }
</style>
