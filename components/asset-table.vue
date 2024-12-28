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
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
  },
  {
    key: "total",
    label: "Total",
    sortable: true,
  },
];

let stockDataRows: StockRow[] = [];
stockDataRows = props.assetData.map((item) => ({
  id: item.id,
  name: item.ticker,
  amount: item.amount,
  total: item.total,
}));
</script>

<template>
  <div>{{ assetData }}</div>

  <UTable :columns="columns" :rows="stockDataRows"> </UTable>
</template>
