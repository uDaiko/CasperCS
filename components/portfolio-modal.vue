<script setup>
const supabase = useSupabaseClient();
const portfolioCategories = ["Stocks", "Crypto"];
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const toast = useToast();

const name = ref();
const category = ref();
let isDisabled = ref(false);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const save = async () => {
  isDisabled.value = true;

  try {
    const { error } = await supabase.from("portfolios").insert({
      id: undefined,
      name: name.value,
      type: category.value,
      user_id: undefined,
    });
    if (error) throw error;
  } catch (err) {
    console.log(err);
    toast.add({
      description: "Failed creating a new portfolio",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isDisabled.value = false;
    isModalOpen.value = false;
  }
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

        <UButton
          color="black"
          label="Save"
          type="submit"
          @click="save"
          :disabled="isLoading"
        />
      </UForm>
    </UCard>
  </UModal>
</template>
