import type { StockApiResponse } from "~/types";

export const useFetchStockPrice = (asset) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const fetchAssetPrice = async () => {
    const { data, error } = await useAsyncData<StockApiResponse>(
      "stockdata",
      () =>
        $fetch(`/api/stock-price`, {
          params: { ticker: asset.ticker },
        })
    );
    if (error.value) {
      console.error("Error fetching stock price:", error.value.message);
      return;
    }
    return data;
  };

  return {
    fetchAssetPrice,
  };
};
