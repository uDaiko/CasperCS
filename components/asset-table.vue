<script setup lang="ts">
import type { StockRow } from "~/types";

const props = defineProps({
  assetData: Object,
});

const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "ticker",
    label: "Ticker",
    sortable: true,
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
];

console.log("die props")
console.log(props.assetData)
let stockDataRows: StockRow[] = [];
stockDataRows = props.assetData.map((item) => ({
  id: item.id,
  ticker: item.ticker,
  amount: item.amount,
  price: item.assetPrice,
  
}));
</script>

<template>
  <UTable :columns="columns" :rows="stockDataRows"> </UTable>
</template>
