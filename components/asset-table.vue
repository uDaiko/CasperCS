<script setup lang="ts">
import type { StockRow } from "~/types";

const props = defineProps<{
  assetData: StockRow[] | null
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void
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
  },
  {
    key: "actions",
    label: "",
    sortable: false,
  }
];

const stockDataRows = computed(() => {
  if (!props.assetData) return [];
  return props.assetData.map((item) => ({
    id: item.id,
    ticker: item.ticker,
    amount: item.amount,
    assetPrice: Number(item.assetPrice.toFixed(4)),
    total: Number(item.total.toFixed(4)),
    actions: item.id
  }));
});

const handleDelete = (id: number) => {
  emit('delete', id);
};
</script>

<template>
  <UTable :columns="columns" :rows="stockDataRows" class="mt-4" :ui="{
    th: {
      base: ' bg-slate-900',
    },
    td: {
      base: 'text-slate-300 bg-slate-950',
    },
    wrapper: 'rounded-lg border border-slate-800',
  }">

    <template #total-data="{ row }">
      <span class="text-green-500">{{ row.total }}</span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="[[{
        label: 'Delete',
        icon: 'i-heroicons-trash',
        click: () => handleDelete(row.id),
        class: 'text-red-500'
      }]]" :ui="{
        background: 'bg-slate-900',
        item: {
          base: 'text-slate-300 hover:bg-slate-800/50'
        }
      }">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" class="text-slate-400" />
      </UDropdown>
    </template>
  </UTable>
</template>
