<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useCalculateStockTotal } from "~/composables/useCalculateStockTotal";
const supabase = useSupabaseClient();

const route = useRoute();
const rawassetList = ref([]);
const isModalOpen = ref(false);

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
    <UButton color="gray" label="Add New Asset" @click="isModalOpen = true" />
    <AssetTable :asset-data="finalizedAssetList" />
  </UContainer>
</template>
