<script setup lang="ts">
import type { InvestmentType } from "~/types";
const props = defineProps<{
  type: InvestmentType;
  name: string;
  portfolioId: string;
}>();
const rawassetList = ref([]);
const isLoading = ref(true)
const totalResults = ref([])
const supabase = useSupabaseClient();

const fetchAssetData = async() => {
  const { data } = await supabase
  .from("stocks")
  .select()
  .eq("portfolio_id", props.portfolioId);

rawassetList.value = data;


  const assetPromises = rawassetList.value.map(async (asset) => {
    const { fetchAssetPrice } = useFetchStockPrice(asset);
    const assetPrice = await fetchAssetPrice();
    const total = asset.amount * assetPrice
    return {
      ...asset,
      total,
      assetPrice
    };
  });
  totalResults.value = await Promise.all(assetPromises);
  isLoading.value = false

}

onMounted(fetchAssetData)

const portfolioValue = computed(() => {
  return totalResults.value.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.total;
  }, 0);
});
</script>

<template>
  <div
    class="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-xl p-4 shadow-lg"
    v-if="type === 'Crypto'"
  >
    <div class="flex justify-between items-center mb-4">
      <span class="text-lg font-semibold">{{ name }} Portfolio</span>
      <span class="text-green-300"></span>
    </div>
    <div class="text-4xl font-bold mb-4">$24,369.41</div>
  </div>

  <div
    class="bg-gradient-to-br from-red-600 to-yellow-800 rounded-xl p-4 shadow-lg"
    v-if="type === 'Stocks'"
  >
    <div class="flex justify-between items-center mb-4">
      <span class="text-lg font-semibold">{{ name }} portfolio</span>
      <span class="text-green-300"></span>
    </div>
    <div class="text-4xl font-bold mb-4">
      <template v-if="isLoading">
        Fetching Total...
      </template>
      <template v-else>
        ${{ isNaN(portfolioValue) ? 0 : parseFloat(portfolioValue.toFixed(4)) }}
      </template>
    </div>
  </div>
</template>
