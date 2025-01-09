<script setup>
const supabase = useSupabaseClient();
const portfolioCategories = ["Stocks", "Crypto"];
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const name = ref();
const category = ref();

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const save = async () => {
  const { error } = await supabase
    .from("portfolios")
    .insert({
      id: undefined,
      name: name.value,
      type: category.value,
      user_id: undefined,
    });
};
</script>

<template>
  <UModal v-model="isModalOpen">
    <UCard>
      <h2 class="mb-3">Add a new portfolio</h2>

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

        <UFormGroup
          label="Portfolio Category"
          :required="true"
          name="portfolioCategory"
          class="mb-4"
        >
          <USelect
            placeholder="For what asset class is this portfolio?"
            :options="portfolioCategories"
            v-model="category"
          />
        </UFormGroup>

        <UButton color="black" label="Save" type="submit" @click="save" />
      </UForm>
    </UCard>
  </UModal>
</template>
