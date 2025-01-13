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
      <UForm>
        <UFormGroup
          label="Portfolio Name"
          name="name"
          class="mb-4"
          :required="true"
        >
          <UInput
            placeholder="What should the portfolio be called"
            v-model="name"
          />
        </UFormGroup>
      </UForm>
    </UCard>
  </UModal>
</template>
