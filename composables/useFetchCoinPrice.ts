export const useFetchCoinPrice = (coin: string) => {

  const url = "https://api.coingecko.com/api/v3/simple/price?";

  const fetchCoin = async () => {
    const { data, error } = await useAsyncData("myData", () =>
      $fetch(url, {
        query: {
          ids: coin,
          vs_currencies: "usd",
          x_cg_pro_api_key: process.env.COINGECKO_KEY,
        },
        headers: {
          'x-cg-demo-api-key': process.env.COINGECKO_KEY
        }
      })
    );

    if (error.value) {
     
      return error
    }
    return  data.value
  };
  return {
    fetchCoin,
  };
};
