<script setup lang="ts">
import type { StockRow } from "~/types";

const props = defineProps<{
  assetData: StockRow[] | null
}>();

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
    key: "assetPrice",
    label: "Price",
    sortable: true,
  },
  {
    key: "total",
    label: "Total Value",
    sortable: true,
  }
];

const stockDataRows = computed(() => {
  if (!props.assetData) return [];
  return props.assetData.map((item) => ({
    id: item.id,
    ticker: item.ticker,
    amount: item.amount,
    assetPrice: Number(item.assetPrice.toFixed(4)),
    total: Number(item.total.toFixed(4))
  }));
});
</script>

<template>
  <UTable :columns="columns" :rows="stockDataRows" />
</template>
