<script setup>
const supabase = useSupabaseClient();
const props = defineProps({
  modelValue: Boolean,
  portfolioId: String,
  editingAsset: {
    type: Object,
    default: null
  }
});
const emit = defineEmits(["update:modelValue", "asset-updated"]);
const toast = useToast();

const name = ref();
const amount = ref();
let isDisabled = ref(false);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(() => props.editingAsset, (newVal) => {
  if (newVal) {
    name.value = newVal.ticker;
    amount.value = newVal.amount;
  } else {
    name.value = '';
    amount.value = '';
  }
}, { immediate: true });

const save = async () => {
  isDisabled.value = true;

  try {
    if (props.editingAsset) {
      const { error } = await supabase
        .from("assets")
        .update({
          ticker: name.value,
          amount: amount.value,
        })
        .eq("id", props.editingAsset.id);

      if (error) throw error;
      toast.add({
        description: "Asset updated successfully",
        icon: "i-heroicons-check-circle",
        color: "green",
      });
      emit("asset-updated");
    } else {
      const { error } = await supabase.from("assets").insert({
        id: undefined,
        ticker: name.value,
        amount: amount.value,
        created_at: new Date(),
        portfolio_id: props.portfolioId,
        user_id: undefined,
      });
      if (error) throw error;
      toast.add({
        description: "Asset added successfully",
        icon: "i-heroicons-check-circle",
        color: "green",
      });
      emit("asset-updated");
    }
  } catch (err) {
    console.log(err);
    toast.add({
      description: props.editingAsset ? "Failed updating the asset" : "Failed adding the asset",
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
    <UCard class="bg-slate-800 shadow-lg">
      <h2 class="mb-3 text-white">{{ editingAsset ? 'Edit asset' : 'Add a new asset' }}</h2>

      <UForm>
        <UFormGroup label="Asset Ticker" name="name" class="mb-4" :ui="{
          label: {
            base: 'text-white'
          }
        }" :required="true">
          <UInput placeholder="What is your asset's ticker information?" v-model="name" />
        </UFormGroup>

        <UFormGroup label="Asset Amount" :ui="{
          label: {
            base: 'text-white'
          }
        }" :required="true" name="asset-amount" class="mb-4">
          <UInput placeholder="How many?" v-model="amount" />
        </UFormGroup>

        <UButton class="bg-green-600 text-white hover:bg-green-700" :label="editingAsset ? 'Update' : 'Save'"
          type="submit" @click="save" :disabled="isDisabled" />
      </UForm>
    </UCard>
  </UModal>
</template>
