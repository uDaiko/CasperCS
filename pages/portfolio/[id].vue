<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useCalculateStockTotal } from "~/composables/useFetchStockPrice";
const supabase = useSupabaseClient();

const route = useRoute();
const toast = useToast();
const rawassetList = ref([]);

const { data, error } = await supabase.from("transactions").select();
rawassetList.value = data;

const finalizedAssetList = computed(() => {
  return rawassetList.value.map((asset) => {
    const { total } = useCalculateStockTotal(asset);
    return {
      ...asset,
      total,
    };
  });
});
</script>

<template>
  <UContainer class="py-8">
    <span class="font-bold"> Your Portfolio {{ route.params.id }}</span>

    <AssetTable :asset-data="finalizedAssetList" />
  </UContainer>
</template>
