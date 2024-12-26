<script setup lang="ts">
import AssetTable from "~/components/asset-table.vue";
import { useCalculateStockTotal } from "~/composables/useFetchStockPrice";
const supabase = useSupabaseClient();

const route = useRoute();
const toast = useToast();
const rawassetList = ref([]);

const { data, error } = await supabase.from("transactions").select();
rawassetList.value = data;

const { total } = useCalculateStockTotal(rawassetList.value[0]);
console.log("this is the total");
console.log(total);

const finalizedAssetList = computed(() => {
  return rawassetList.value.map((asset) => {
    const { total } = useCalculateStockTotal(asset);
    return {
      ...asset,
      total,
    };
  });
});

// const {fetchStockPrice}  =useFetchStockPrice('AAPL')
// const result = await fetchStockPrice();
// if(result.error){
//     toast.add({
//           title: 'stock data could not be fetched!',
//           icon: 'i-heroicons-exclamation-circle',
//           color: 'red'
//         })
// }

// console.log(result)

// const ticker:string = data.value.ticker
// const closePrice:number = data.value.results[0].c
// stockDataRows.push({ name: ticker, price: closePrice });

// // coinData.value = await fetchCoin();

// console.log(stockData.value)
</script>

<template>
  <UContainer class="py-8">
    <span class="font-bold"> Your Portfolio {{ route.params.id }}</span>

    <AssetTable :asset-data="finalizedAssetList" />
  </UContainer>
</template>
