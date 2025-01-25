<script setup>
const supabase = useSupabaseClient();
const props = defineProps({
  modelValue: Boolean,
  portfolioId: String | String([]),
});
const emit = defineEmits(["update:modelValue"]);
const toast = useToast();

const name = ref();
const amount = ref();
let isDisabled = ref(false);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const save = async () => {
  isDisabled.value = true;

  try {
    const { error } = await supabase.from("stocks").insert({
      id: undefined,
      ticker: name.value,
      amount: amount.value,
      user_id: undefined,
    });
    if (error) throw error;
  } catch (err) {
    console.log(err);
    toast.add({
      description: "Failed adding the asset info",
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
          label="Asset Ticker"
          name="name"
          class="mb-4"
          :required="true"
        >
          <UInput
            placeholder="What is your asset's ticker information?"
            v-model="name"
          />
        </UFormGroup>

        <UFormGroup
          label="Asset Amount"
          :required="true"
          name="asset-amount"
          class="mb-4"
        >
          <UInput placeholder="How many?" v-model="amount" />
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
