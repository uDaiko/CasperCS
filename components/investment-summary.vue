<script setup lang="ts">
import type { InvestmentType } from "~/types";
import { useGetAssetPrice } from "~/composables/useGetAssetPrice";

const props = defineProps<{
  type: InvestmentType;
  name: string;
  portfolioId: string;
  style: string;
}>();

const emit = defineEmits<{
  (e: 'delete', id: string): void,
  (e: 'edit', id: string): void
}>();

const rawassetList = ref([]);
const isLoading = ref(true)
const totalResults = ref([])
const supabase = useSupabaseClient();
const isDropdownOpen = ref(false);

const getGradientClass = computed(() => {
  const styleValue = props.style;

  switch (styleValue) {
    case '0':
      return 'bg-gradient-to-br from-purple-600 to-blue-400';
    case '1':
      return 'bg-gradient-to-br from-red-600 to-pink-500';
    case '2':
      return 'bg-gradient-to-br from-blue-600 to-green-400';
    case '3':
      return 'bg-gradient-to-br from-orange-600 to-yellow-500';
    default:
      return 'bg-gradient-to-br from-red-600 to-orange-600';
  }
});

const fetchAssetData = async () => {
  try {
    const { data } = await supabase
      .from("assets")
      .select("id, amount, ticker")
      .eq("portfolio_id", props.portfolioId);

    rawassetList.value = data || [];

    const assetPromises = rawassetList.value.map(async (asset) => {
      const { getPrice } = useGetAssetPrice(asset, props.type);
      const assetPrice = await getPrice();
      const total = asset.amount * assetPrice;

      return {
        ...asset,
        total,
        assetPrice
      };
    });

    totalResults.value = await Promise.all(assetPromises);
  } catch (error) {
    console.error('Error fetching asset data:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchAssetData)

const portfolioValue = computed(() => {
  return totalResults.value.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.total;
  }, 0);
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleEdit = (event: Event) => {
  emit('edit', props.portfolioId);
  isDropdownOpen.value = false;
};

const handleDelete = () => {
  emit('delete', props.portfolioId);
  isDropdownOpen.value = false;
};
</script>

<template>
  <div :class="[getGradientClass, 'rounded-xl p-4 shadow-lg relative']">
    <NuxtLink :to="{
      name: 'portfolio-id',
      params: { id: props.portfolioId },
      query: { name: props.name },
    }" class="block no-underline text-inherit">
      <div class="flex justify-between items-center mb-4 pointer-events-none">
        <span class="text-lg font-semibold pointer-events-auto">{{ name }} {{ type }} Portfolio</span>
      </div>
      <div class="text-4xl font-bold mb-4 pointer-events-none">
        <template v-if="isLoading">Fetching Total...</template>
        <template v-else>${{ isNaN(portfolioValue) ? 0 : Math.ceil(portfolioValue) }}</template>
      </div>
    </NuxtLink>

    <div class="absolute top-4 right-4 z-20">
      <UButton icon="i-heroicons-pencil" color="white" variant="ghost" @click="toggleDropdown" />
      <div v-if="isDropdownOpen" class="absolute right-1 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
        <UButton block variant="ghost" @click="handleEdit"
          class="text-white hover:bg-gray-700 w-full text-left px-4 py-2">
          Edit
        </UButton>
        <UButton block variant="ghost" @click="handleDelete"
          class="text-red-400 hover:bg-gray-700 w-full text-left px-4 py-2">
          Delete
        </UButton>
      </div>
    </div>
  </div>
</template>
