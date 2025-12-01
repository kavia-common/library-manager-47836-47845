<template>
  <div v-if="open" class="overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
    <div class="panel card">
      <h3 id="confirm-title" style="margin:0 0 .25rem 0;">{{ title }}</h3>
      <p style="margin:0 0 .75rem 0; color:#374151;">{{ message }}</p>
      <div style="display:flex; gap:.5rem; justify-content:flex-end;">
        <button class="btn" @click="$emit('cancel')">Cancel</button>
        <button class="btn btn-danger" @click="$emit('confirm')">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
  title?: string;
  message?: string;
}>();
defineEmits<{
  cancel: [];
  confirm: [];
}>();
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.35);
  display: grid; place-items: center;
  padding: 1rem;
  z-index: 50;
}
.panel {
  max-width: 420px;
  width: 100%;
  padding: 1rem;
}
</style>
