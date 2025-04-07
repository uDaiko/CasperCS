<script setup lang="ts">
import type { InvestmentType } from "~/types";
import { useGetAssetPrice } from "~/composables/useGetAssetPrice";

const props = defineProps<{
  type: InvestmentType;
  name: string;
  portfolioId: string;
  style: string;
}>();

const rawassetList = ref([]);
const isLoading = ref(true)
const totalResults = ref([])
const supabase = useSupabaseClient();

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
</script>

<template>
  <div :class="[getGradientClass, 'rounded-xl p-4 shadow-lg']" v-if="type === 'Crypto'">
    <div class="flex justify-between items-center mb-4">
      <span class="text-lg font-semibold">{{ name }} Crypto Portfolio</span>
      <span class="text-green-300"></span>
    </div>
    <div class="text-4xl font-bold mb-4">
      <template v-if="isLoading">
        Fetching Total...
      </template>
      <template v-else>
        ${{ isNaN(portfolioValue) ? 0 : Math.ceil(portfolioValue) }}
      </template>
    </div>
  </div>

  <div :class="[getGradientClass, 'rounded-xl p-4 shadow-lg']" v-if="type === 'Stocks'">
    <div class="flex justify-between items-center mb-4">
      <span class="text-lg font-semibold">{{ name }} Stock Portfolio</span>
      <span class="text-green-300"></span>
    </div>
    <div class="text-4xl font-bold mb-4">
      <template v-if="isLoading">
        Fetching Total...
      </template>
      <template v-else>
        ${{ isNaN(portfolioValue) ? 0 : Math.ceil(portfolioValue) }}
      </template>
    </div>
  </div>
</template>
