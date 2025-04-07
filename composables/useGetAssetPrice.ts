import type { InvestmentType } from "~/types";

export const useGetAssetPrice = (
  asset: { ticker: string },
  type: InvestmentType
) => {
  const { fetchAssetPrice } = useFetchStockPrice(asset);
  const { fetchCoinPrice } = useFetchCoinPrice(asset.ticker);

  const getPrice = async () => {
    if (type === "Stocks") {
      const stockData = await fetchAssetPrice();
      return stockData[asset.ticker]?.usd || 0;
    } else {
      const coinData = await fetchCoinPrice();
      return coinData?.data?.[asset.ticker]?.quote?.USD?.price || 0;
    }
  };

  return {
    getPrice,
  };
};
