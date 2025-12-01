<template>
  <Transition name="slide-up">
    <form
      class="card"
      style="padding: 1.1rem; display:grid; gap:.9rem; max-width: 820px;"
      @submit.prevent="onSubmit"
    >
      <div class="grid" style="grid-template-columns: 1fr 1fr; gap:.9rem;">
        <div>
          <label for="title" class="label">Title <span aria-hidden="true" style="color:var(--color-error)">*</span></label>
          <input id="title" v-model.trim="form.title" class="input" type="text" required aria-required="true" />
          <div class="helper">Enter the full book title.</div>
        </div>
        <div>
          <label for="author" class="label">Author <span aria-hidden="true" style="color:var(--color-error)">*</span></label>
          <input id="author" v-model.trim="form.author" class="input" type="text" required aria-required="true" />
          <div class="helper">Primary author(s) of this book.</div>
        </div>
      </div>

      <div class="grid" style="grid-template-columns: 1fr 1fr; gap:.9rem;">
        <div>
          <label for="year" class="label">Year</label>
          <input id="year" v-model.number="form.year" class="input" type="number" min="0" placeholder="e.g., 2020" />
          <div class="helper">Publication year (optional).</div>
        </div>
        <div v-if="showRating">
          <label for="rating" class="label">Rating</label>
          <select id="rating" v-model.number="form.rating" class="select" aria-label="Select rating from 1 to 5">
            <option :value="undefined">No rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
          </select>
          <div class="helper">Optional 1–5 star rating.</div>
        </div>
      </div>

      <div>
        <label for="tags" class="label">Genre/Tags</label>
        <input id="tags" v-model.trim="tagsText" class="input" type="text" placeholder="e.g., Software, Programming" />
        <div class="helper">Comma separated, used for filtering.</div>
      </div>

      <div>
        <label for="coverUrl" class="label">Cover URL</label>
        <input id="coverUrl" v-model.trim="form.coverUrl" class="input" type="url" placeholder="https://..." />
      </div>

      <div>
        <label for="description" class="label">Description</label>
        <textarea id="description" v-model.trim="form.description" class="textarea" rows="6"></textarea>
      </div>

      <div v-if="error" class="alert" role="alert">{{ error }}</div>

      <div style="display:flex; gap:.6rem; justify-content:flex-end;">
        <NuxtLink v-if="bookId" :to="`/books/${bookId}`" class="btn">Cancel</NuxtLink>
        <NuxtLink v-else to="/" class="btn">Cancel</NuxtLink>
        <button class="btn btn-primary" type="submit">{{ bookId ? 'Save Changes' : 'Add Book' }}</button>
      </div>
    </form>
  </Transition>
</template>

<script setup lang="ts">
import type { Book } from '~/composables/useBooks';

const props = defineProps<{ bookId?: string }>();
const emit = defineEmits<{ saved: [id: string] }>();

const { experiments } = useFeatureFlags();
const showRating = computed(() => experiments?.bookRating === true);

const { add, getById, update } = useBooks();

const placeholder: Book = {
  id: '',
  title: '',
  author: '',
  year: undefined,
  tags: [],
  description: '',
  coverUrl: '',
  rating: undefined
};

const source = computed<Book | undefined>(() => (props.bookId ? getById(props.bookId) : undefined));

const form = reactive<Partial<Book>>(
  source.value ? { ...source.value } : { ...placeholder }
);

watch(source, (val) => {
  if (val) {
    Object.assign(form, val);
    tagsText.value = (val.tags || []).join(', ');
  }
}, { immediate: true });

const tagsText = ref<string>(Array.isArray(form.tags) ? (form.tags || []).join(', ') : '');

const error = ref<string>('');

function onSubmit() {
  error.value = '';
  if (!form.title || !form.author) {
    error.value = 'Please provide both Title and Author.';
    return;
  }
  const cleanTags = tagsText.value
    ? tagsText.value.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const payload: Omit<Book, 'id'> = {
    title: form.title!.trim(),
    author: form.author!.trim(),
    year: form.year ? Number(form.year) : undefined,
    tags: cleanTags,
    description: form.description?.trim() || '',
    coverUrl: form.coverUrl?.trim(),
    rating: showRating.value ? (form.rating ? Number(form.rating) : undefined) : undefined,
  };

  if (props.bookId) {
    const updated = update(props.bookId, payload);
    if (updated) {
      emit('saved', updated.id);
    } else {
      error.value = 'Unable to update the book (not found).';
    }
  } else {
    const created = add(payload);
    emit('saved', created.id);
  }
}
</script>
