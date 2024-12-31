<script setup lang="ts">
import type { InvestmentPortfolio } from "~/types";

const portfolios = ref<InvestmentPortfolio[]>([]);
const { fetchStockPortfolios } = useFetchPortfolios();

onBeforeMount(async () => {
  const data = await fetchStockPortfolios();
  if (data) {
    console.log("this is portfolios.value");
    console.log(portfolios.value);
    portfolios.value = data;
    console.log("this is portfolios.value");
    console.log(portfolios.value);
  }
});
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div v-for="portfolio in portfolios" :key="portfolio.id">
        <router-link :to="`/portfolio/${portfolio.name}`">
          <InvestmentSummary :type="portfolio.type" :name="portfolio.name" />
        </router-link>
      </div>
    </section>
    <NewPortfolio />
  </main>
</template>
