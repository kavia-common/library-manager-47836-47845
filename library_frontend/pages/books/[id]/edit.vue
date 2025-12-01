<template>
  <section v-if="bookId" class="section">
    <header class="card" style="padding:1rem; margin-bottom:.9rem;">
      <h1 style="margin:0 0 .25rem 0;">Edit Book</h1>
      <p style="margin:0; color:#4b5563;">Update the information for this book.</p>
    </header>
    <BookForm :book-id="bookId" @saved="onSaved" />
  </section>
  <section v-else class="section">
    <div class="alert">Invalid book.</div>
    <NuxtLink to="/" class="btn" style="margin-top:.8rem; display:inline-block;">Back to list</NuxtLink>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Edit Book' });
const router = useRouter();
const route = useRoute();
const bookId = route.params.id as string | undefined;

function onSaved(id: string) {
  router.push(`/books/${id}`);
}
</script>
