<script setup lang="ts">
const route = useRoute()

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
  price: '80000',
  amount: '5',
}, {
  name: 'Ethereum',
  price: '4000',
  amount: '2',
}, {
  name: 'Polkadot',
  price: '5',
  amount: '100',
}]
</script>

<template>
    <UContainer class="py-8">
        <span class="font-bold"> Your Portfolio {{ route.params.id }}</span>
   
    <UCard class="mt-6">
        <UTable :columns="cryptoColumns" :rows="coins" />
    </UCard>
</UContainer>
</template>