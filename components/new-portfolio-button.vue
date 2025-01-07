<script setup lang="ts">
const createNewPortfolio = () => {};
</script>

<template>
  <button
    class="flex items-center justify-center p-4 min-h-[132px] bg-transparent text-gray-500 border border-gray-300/50 rounded-xl hover:bg-blue-100 transition"
    @click="createNewPortfolio"
  >
    <Icon name="ep:circle-plus" class="w-10 h-10" />
  </button>
</template>
