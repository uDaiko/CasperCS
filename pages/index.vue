<script setup lang="ts">
import type { InvestmentPortfolio } from "~/types";

const portfolios = ref<InvestmentPortfolio[]>([]);
const { fetchStockPortfolios } = useFetchPortfolios();

onBeforeMount(async () => {
  const data = await fetchStockPortfolios();
  if (data) {
    portfolios.value = data;
  }
});
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div v-for="portfolio in portfolios" :key="portfolio.id">
        <NuxtLink :to="`/portfolio/${portfolio.name}`">
          <InvestmentSummary
            :type="portfolio.type"
            :name="portfolio.name"
            :portfolio-id="portfolio.id"
          />
        </NuxtLink>
      </div>
    </section>
    <NewPortfolio />
  </main>
</template>
