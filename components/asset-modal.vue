<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <UModal v-model="isModalOpen">
    <UCard>
      <h2 class="mb-3">Add a new asset</h2>
    </UCard>
  </UModal>
</template>
