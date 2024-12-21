<script setup lang="ts">
import AssetList from '~/components/asset-list.vue';
import type { StockRow } from '~/types';
const supabase = useSupabaseClient()

const route = useRoute()
const toast = useToast()
const assetList = ref([])

const cryptoColumns = [{
  key: 'name',
  label: 'Name'
}, {
  key: 'price',
  label: 'Price'
}, {
  key: 'amount',
  label: 'Amount'
}]


const coins = [{
  name: 'Bitcoin',
 }]

 let stockDataRows:StockRow[] = []
 

 const {data, error} = await supabase.from('transactions').select()
 assetList.value = data
 console.log(assetList.value)
 

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
   
    <AssetList :asset-list="assetList"/>
</UContainer>
</template>