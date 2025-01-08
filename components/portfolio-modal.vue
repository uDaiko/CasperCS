<script setup>
const portfolioCategories = ["Stocks", "Crypto"];
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
      <h2>Add a new portfolio</h2>

      <UForm>
        <UFormGroup
          label="Portfolio name"
          name="name"
          class="mb-4"
          :required="true"
        >
          <UInput placeholder="What should the portfolio be called" />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <USelect
            placeholder="For what asset class is this portfolio?"
            :options="portfolioCategories"
          />
        </UFormGroup>

        <UButton variant="solid" label="Save" type="submit" />
      </UForm>
    </UCard>
  </UModal>
</template>
