import type { StockApiResponse } from "~/types";

export const useCalculateStockTotal = (asset) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const calculateAssetPrice = async () => {
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
    return data.value.results[0].c * asset.amount;
  };

  return {
    calculateAssetPrice,
  };
};
