<script setup lang="ts">
import type { InvestmentCollection } from '~/types';

const summaries: InvestmentCollection[] = [
    {
        type: 'Crypto',
        name: 'Default Crypto Tracking',

    },
    {
        type: 'Stocks',
        name: 'Default Stock Tracking'

    }
]
</script>

<template>
    <main class="container mx-auto px-4 py-8">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div v-for="summary in summaries" :key="summary.name">
                <router-link :to="`/portfolio/${summary.name}`">
                    <InvestmentSummary :type="summary.type" :name="summary.name" />
                </router-link>
            </div>
        </section>
    </main>
</template>
