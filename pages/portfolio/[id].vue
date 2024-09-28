<script setup lang="ts">
import type { StockRow } from '~/types';

const route = useRoute()
const toast = useToast()

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
 

//  const { fetchCoin } = useFetchCoinPrice(coins[0].name);

const {fetchStockPrice}  =useFetchStockPrice('AAPL')
const result = await fetchStockPrice();
if(result.error){
    toast.add({
          title: 'stock data could not be fetched!',
          icon: 'i-heroicons-exclamation-circle',
          color: 'red'
        })
}

console.log(result)

// const ticker:string = data.value.ticker
// const closePrice:number = data.value.results[0].c
// stockDataRows.push({ name: ticker, price: closePrice });

 
// // coinData.value = await fetchCoin(); 

// console.log(stockData.value)
</script>

<template>
    <UContainer class="py-8">
        <span class="font-bold"> Your Portfolio {{ route.params.id }}</span>
   
    <UCard class="mt-6">
        <UTable :columns="cryptoColumns" :rows="stockDataRows" />
    </UCard>
</UContainer>
</template>