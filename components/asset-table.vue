<script setup lang="ts">
import type { StockRow } from "~/types";

const props = defineProps<{
  assetData: StockRow[] | null
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'edit', id: number): void
}>();

const isDropdownOpen = ref<number | null>(null);
const dropdownPosition = ref({ top: 0, left: 0 });
const activeDropdown = ref<HTMLElement | null>(null);

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
  isDropdownOpen.value = null;
};

const handleEdit = (id: number) => {
  emit('edit', id);
  isDropdownOpen.value = null;
};

const updateDropdownPosition = () => {
  if (activeDropdown.value && isDropdownOpen.value !== null) {
    const rect = activeDropdown.value.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    dropdownPosition.value = {
      top: rect.bottom,
      left: screenWidth <= 1385 ? rect.left - 192 : rect.left
    };
  }
};

const toggleDropdown = (id: number, event: MouseEvent) => {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const screenWidth = window.innerWidth;
  activeDropdown.value = event.target as HTMLElement;

  dropdownPosition.value = {
    top: rect.bottom,
    left: screenWidth <= 1385 ? rect.left - 192 : rect.left
  };

  isDropdownOpen.value = isDropdownOpen.value === id ? null : id;
};

onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownPosition);
});
</script>

<template>
  <div>
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
        <div class="relative">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" class="text-slate-400"
            @click="toggleDropdown(row.id, $event)" />
        </div>
      </template>
    </UTable>

    <div v-if="isDropdownOpen !== null"
      class="fixed w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border-2 border-gray-600" :style="{
        top: dropdownPosition.top + 'px',
        left: dropdownPosition.left + 'px'
      }">
      <UButton block variant="ghost" @click="handleEdit(isDropdownOpen)"
        class="text-white hover:bg-gray-700 w-full text-left px-4 py-2">
        Edit
      </UButton>
      <UButton block variant="ghost" @click="handleDelete(isDropdownOpen)"
        class="text-red-400 hover:bg-gray-700 w-full text-left px-4 py-2">
        Delete
      </UButton>
    </div>
  </div>
</template>
