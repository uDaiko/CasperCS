import type { StockApiResponse } from "~/types";

export const useCalculateStockTotal = (asset) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const lastClosePrice = ref(null);

  const total = computed(() => {
    if (!lastClosePrice.value) return null;
    return lastClosePrice.value * asset.amount;
  });

  const fetchStockPrice = async () => {
    const { data, error } = await useAsyncData<StockApiResponse>(
      "stockdata",
      () =>
        $fetch(`/api/stock-price`, {
          params: { ticker: asset.ticker },
        })
    );
    console.log("response data");
    console.log(data);
    if (error.value) {
      console.error("Error fetching stock price:", error.value.message);
      return;
    }
    lastClosePrice.value = data.value.results[0].c;
  };

  fetchStockPrice();
  return {
    total,
    fetchStockPrice,
  };
};
