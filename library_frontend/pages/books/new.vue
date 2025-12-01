<template>
  <section>
    <header style="margin-bottom:.5rem;">
      <h1 style="margin:0 0 .25rem 0;">Add Book</h1>
      <p style="margin:0; color:#4b5563;">Enter details for the new book.</p>
    </header>
    <BookForm @saved="onSaved" />
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Add Book' });
const router = useRouter();

function onSaved(id: string) {
  router.push(`/books/${id}`);
}
</script>
