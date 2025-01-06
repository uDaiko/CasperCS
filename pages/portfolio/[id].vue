<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useCalculateStockTotal } from "~/composables/useCalculateStockTotal";
const supabase = useSupabaseClient();

const route = useRoute();
const rawassetList = ref([]);

const { data } = await supabase.from("stocks").select();

rawassetList.value = data;

const calculateFinalizedAssetList = async () => {
  const assetPromises = rawassetList.value.map(async (asset) => {
    const { calculateAssetPrice } = useCalculateStockTotal(asset);
    const total = await calculateAssetPrice();
    return {
      ...asset,
      total,
    };
  });
  return await Promise.all(assetPromises);
};
const finalizedAssetList = await calculateFinalizedAssetList();
</script>

<template>
  <UContainer class="py-8">
    <span class="font-bold"> Your Portfolio {{ route.params.id }}</span>
    <AssetTable :asset-data="finalizedAssetList" />
  </UContainer>
</template>
