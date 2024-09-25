export const useFetchCoinPrice = (coin: string) => {
  const config = useRuntimeConfig();
  const pending = ref(false);
  const toast = useToast();
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&x_cg_demo_api_key=${config.secretApiKey}`;

  const fetchCoin = async () => {
    pending.value = true;

    try {
      const { data } = await useAsyncData("coinData", () => $fetch(url));

      return data;
    } catch (e: any) {
      toast.add({
        title: "coin data could not be fetched",
        description: e.message,
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    } finally {
      pending.value = false;
    }
  };

  return {
    fetchCoin,
    pending,
  };
};
