<script setup>
const supabase = useSupabaseClient();
const portfolioCategories = ["Stocks", "Crypto"];
const portfolioStyles = [
  { name: "Purple to Indigo", value: 0, gradient: "from-purple-600 to-blue-400" },
  { name: "Red to Yellow", value: 1, gradient: "from-red-600 to-pink-500" },
  { name: "Blue to Green", value: 2, gradient: "from-blue-600 to-green-400" },
  { name: "Orange to Yellow", value: 3, gradient: "from-orange-600 to-yellow-500" }
];
const props = defineProps({
  modelValue: Boolean,
  editingPortfolio: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(["update:modelValue", "portfolio-created", "portfolio-updated"]);
const toast = useToast();

const name = ref('');
const category = ref('');
const style = ref('');
let isDisabled = ref(false);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(() => props.editingPortfolio, (newVal) => {
  if (newVal) {
    name.value = newVal.name;
    category.value = newVal.type;
    style.value = newVal.style;
  } else {
    name.value = '';
    category.value = '';
    style.value = '';
  }
}, { immediate: true });

const save = async () => {
  isDisabled.value = true;

  try {
    if (props.editingPortfolio) {
      const { error } = await supabase
        .from("portfolios")
        .update({
          name: name.value,
          type: category.value,
          style: style.value.toString(),
        })
        .eq("id", props.editingPortfolio.id);

      if (error) throw error;
      emit("portfolio-updated");
      toast.add({
        description: "Portfolio updated successfully",
        icon: "i-heroicons-check-circle",
        color: "green",
      });
    } else {
      const { error } = await supabase.from("portfolios").insert({
        id: undefined,
        name: name.value,
        type: category.value,
        style: style.value.toString(),
        user_id: undefined,
      });
      if (error) throw error;
      emit("portfolio-created");
      toast.add({
        description: "Portfolio created successfully",
        icon: "i-heroicons-check-circle",
        color: "green",
      });
    }
  } catch (err) {
    console.log(err);
    toast.add({
      description: props.editingPortfolio ? "Failed updating portfolio" : "Failed creating a new portfolio",
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
    <UCard :class="`bg-slate-800 shadow-lg`">
      <h2 class="mb-3 text-white">{{ editingPortfolio ? 'Edit portfolio' : 'Add a new portfolio' }}</h2>

      <UForm>
        <UFormGroup label="Portfolio Name" name="portfolioName" :ui="{
          label: {
            base: 'text-white'
          }
        }" class="mb-4" :required="true">
          <UInput placeholder="What should the portfolio be called" v-model="name" />
        </UFormGroup>

        <UFormGroup label="Portfolio Category" :ui="{
          label: {
            base: 'text-white'
          }
        }" :required="true" name="portfolioCategory" class="mb-4">
          <USelect placeholder="For what asset class is this portfolio?" :options="portfolioCategories"
            v-model="category" />
        </UFormGroup>

        <UFormGroup label="Portfolio Style" :ui="{
          label: {
            base: 'text-white'
          }
        }" :required="true" name="portfolioStyle" class="mb-4">
          <div class="flex gap-4">
            <div v-for="styleOption in portfolioStyles" :key="styleOption.value" class="relative cursor-pointer"
              @click="style = styleOption.value">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br"
                :class="[styleOption.gradient, { 'border-2 border-green-500': style === styleOption.value }]">
              </div>
            </div>
          </div>
        </UFormGroup>

        <UButton class="bg-green-600 text-white hover:bg-green-700" :label="editingPortfolio ? 'Update' : 'Save'"
          type="submit" @click="save" :disabled="isDisabled" />
      </UForm>
    </UCard>
  </UModal>
</template>
