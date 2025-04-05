<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useFetchStockPrice } from "~/composables/useFetchStockPrice";
import { useFetchCoinPrice } from "~/composables/useFetchCoinPrice";
import type { InvestmentType } from "~/types";

const supabase = useSupabaseClient();
const route = useRoute();
const calculatedAssets = ref([]);
const rawassetList = ref([]);
const portfolioType = ref<InvestmentType>("Stocks");

const isModalOpen = ref(false);
const portfolioId = route.params.id;

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
  const { data } = await supabase
    .from("stocks")
    .select()
    .eq("portfolio_id", portfolioId);


  rawassetList.value = data;

  const assetPromises = rawassetList.value.map(async (asset) => {
    let assetPrice;

    if (portfolioType.value === "Stocks") {
      const { fetchAssetPrice } = useFetchStockPrice(asset);
      assetPrice = await fetchAssetPrice();
    } else {
      const { fetchCoinPrice } = useFetchCoinPrice("BTC");
      const coinData = await fetchCoinPrice();
      assetPrice = coinData[asset.ticker]?.usd || 0;
    }

    const total = asset.amount * assetPrice;
    return {
      ...asset,
      total,
      assetPrice
    };
  });
  calculatedAssets.value = await Promise.all(assetPromises);
}

onMounted(async () => {
  await fetchPortfolioType();
  await fetchAssetData();
});
</script>

<template>
  <UContainer class="py-8">
    <UButton class="bg-green-600 text-white hover:bg-green-700" label="Add New Asset" @click="isModalOpen = true" />
    <AssetTable :asset-data="calculatedAssets" />
  </UContainer>
  <AssetModal v-model="isModalOpen" />
</template>
