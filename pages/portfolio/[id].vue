<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useFetchStockPrice } from "~/composables/useFetchStockPrice";
import { useFetchCoinPrice } from "~/composables/useFetchCoinPrice";
import { useGetAssetPrice } from "~/composables/useGetAssetPrice";
import type { InvestmentType, StockRow } from "~/types";

const supabase = useSupabaseClient();
const route = useRoute();
const calculatedAssets = ref<StockRow[]>([]);
const rawassetList = ref([]);
const portfolioType = ref<InvestmentType>("Stocks");
const isLoading = ref(true);

const isModalOpen = ref(false);
const portfolioId = typeof route.params.id === 'string' ? route.params.id : route.params.id[0];

const fetchPortfolioType = async () => {
  const { data } = await supabase
    .from("portfolios")
    .select("type")
    .eq("id", portfolioId)
    .single<{ type: string }>();

  if (data) {
    portfolioType.value = data.type as InvestmentType;
  }
};

const fetchAssetData = async () => {
  try {
    const { data } = await supabase
      .from("assets")
      .select("id, amount, ticker")
      .eq("portfolio_id", portfolioId);

    rawassetList.value = data || [];

    const assetPromises = rawassetList.value.map(async (asset) => {
      const { getPrice } = useGetAssetPrice(asset, portfolioType.value);
      const assetPrice = await getPrice();
      const total = asset.amount * assetPrice;

      return {
        id: asset.id,
        ticker: asset.ticker,
        amount: asset.amount,
        total,
        assetPrice
      };
    });
    calculatedAssets.value = await Promise.all(assetPromises);
  } catch (error) {
    console.error('Error fetching asset data:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await fetchPortfolioType();
  await fetchAssetData();
});
</script>

<template>
  <UContainer class="py-8">
    <UButton class="bg-green-600 text-white hover:bg-green-700" label="Add New Asset" @click="isModalOpen = true" />

    <div v-if="isLoading" class="flex justify-center items-center">
      <UIcon name="i-heroicons-arrow-path" class="w-16  h-16 animate-spin text-white" />
      <span class=" text-white">Loading assets...</span>
    </div>

    <AssetTable v-else :asset-data="calculatedAssets" />
  </UContainer>
  <AssetModal v-model="isModalOpen" :portfolio-id="portfolioId" />
</template>
