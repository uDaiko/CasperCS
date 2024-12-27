<script setup lang="ts">
import type { StockRow } from "~/types";

const props = defineProps({
  assetData: Object,
});

let stockDataRow: StockRow[] = [];
</script>

<template>
  <div>{{ assetData }}</div>

  <UTable> </UTable>
</template>
