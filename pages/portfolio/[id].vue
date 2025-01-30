<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useFetchStockPrice } from "~/composables/useFetchStockPrice";
const supabase = useSupabaseClient();

const route = useRoute();
const calculatedAssets = ref([]);
const rawassetList = ref([]);

const isModalOpen = ref(false);
const portfolioId = route.params.id;

const fetchAssetData = async() => {
  const { data } = await supabase
  .from("stocks")
  .select()
  .eq("portfolio_id", portfolioId);

  
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
  calculatedAssets.value = await Promise.all(assetPromises);

}
onMounted(fetchAssetData)

</script>

<template>
  <UContainer class="py-8">
    <UButton color="gray" label="Add New Asset" @click="isModalOpen = true" />
    <AssetTable :asset-data="calculatedAssets" />
  </UContainer>
  <AssetModal v-model="isModalOpen" />
</template>
