<script setup lang="ts">
import type { InvestmentType } from '~/types';
const props = defineProps<{
  type: InvestmentType;
  name: string; 
}>();
</script>

<template>
  
    <div class="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-xl p-6 shadow-lg" v-if="type === 'Crypto'">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-semibold">{{ name }} Portfolio</span>
        <span class="text-green-300">24HR +5.94%</span>
      </div>
      <div class="text-4xl font-bold mb-4">$24,369.41</div>
     
    </div>


  
    <div class="bg-gradient-to-br from-red-600 to-yellow-800 rounded-xl p-6 shadow-lg" v-if="type === 'Stocks'">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-semibold">{{ name }} Portfolio</span>
        <span class="text-green-300">24HR +5.94%</span>
      </div>
      <div class="text-4xl font-bold mb-4">$24,369.41</div>
      
    </div>

</template>