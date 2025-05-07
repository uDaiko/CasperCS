<script setup lang="ts">
import type { InvestmentPortfolio } from "~/types";

const portfolios = ref<InvestmentPortfolio[]>([]);
const { fetchStockPortfolios } = useFetchPortfolios();
const supabase = useSupabaseClient();


onBeforeMount(async () => {
  const data = await fetchStockPortfolios();
  if (data) {
    portfolios.value = data;
  }
});

const handleDeletePortfolio = async (portfolioId: string) => {
  await supabase.from("portfolios").delete().eq("id", portfolioId);
  portfolios.value = portfolios.value.filter(p => p.id !== portfolioId);
};

const handlePortfolioCreated = async () => {
  const data = await fetchStockPortfolios();
  if (data) {
    portfolios.value = data;
  }
};

</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div v-for="portfolio in portfolios" :key="portfolio.id">
        <InvestmentSummary :type="portfolio.type" :name="portfolio.name" :portfolio-id="portfolio.id"
          :style="portfolio.style" @delete="handleDeletePortfolio" />
      </div>
      <NewPortfolioButton @portfolio-created="handlePortfolioCreated" />
    </section>
  </main>
</template>
