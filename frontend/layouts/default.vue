<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup>
</script>
