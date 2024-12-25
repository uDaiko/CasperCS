type StockApiResponse = {
  results: Array<{
    c: number; // c represents the closing price of the previous day
  }>;
};

export const useCalculateStockTotal = (asset) => {
  const url = computed(
    () =>
      `https://api.polygon.io/v2/aggs/ticker/${asset.name}/prev?apiKey=${process.env.STOCKAPI_KEY}`
  );
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const lastClosePrice = ref(null);

  const total = computed(() => {
    if (!lastClosePrice.value) return null;
    return lastClosePrice.value * asset.amount;
  });

  const fetchStockPrice = async () => {
    const { data, error } = await useFetch<StockApiResponse>(url.value);

    if (error.value) {
      console.error("Error fetching stock price:", error.value.message);
      return;
    }

    lastClosePrice.value = data.value.results[0].c;
  };
  fetchStockPrice();
  return {
    total,
  };
};
