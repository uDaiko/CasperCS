<script setup lang="ts">
import type { InvestmentPortfolio } from "~/types";

const portfolios = ref<InvestmentPortfolio[]>([]);
const { fetchStockPortfolios } = useFetchPortfolios();
const supabase = useSupabaseClient();
const isModalOpen = ref(false);
const editingPortfolio = ref<InvestmentPortfolio | null>(null);

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

const handleEditPortfolio = (portfolioId: string) => {
  const portfolio = portfolios.value.find(p => p.id === portfolioId);
  if (portfolio) {
    editingPortfolio.value = portfolio;
    isModalOpen.value = true;
  }
};

const handlePortfolioUpdated = async () => {
  const data = await fetchStockPortfolios();
  if (data) {
    portfolios.value = data;
  }
  editingPortfolio.value = null;
  isModalOpen.value = false;
};
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div v-for="portfolio in portfolios" :key="portfolio.id">
        <InvestmentSummary :type="portfolio.type" :name="portfolio.name" :portfolio-id="portfolio.id"
          :style="portfolio.style" @delete="handleDeletePortfolio" @edit="handleEditPortfolio" />
      </div>
      <NewPortfolioButton @portfolio-created="handlePortfolioCreated" />
    </section>
  </main>
  <PortfolioModal v-model="isModalOpen" :editing-portfolio="editingPortfolio"
    @portfolio-created="handlePortfolioCreated" @portfolio-updated="handlePortfolioUpdated" />
</template>
