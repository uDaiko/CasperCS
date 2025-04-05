export const useFetchCoinPrice = (coin: string) => {
  const fetchCoinPrice = async () => {
    try {
      const { data, error } = await useFetch(
        `/api/crypto-price?symbol=${coin}`
      );

      if (error.value) {
        throw error.value;
      }

      return data.value;
    } catch (error) {
      console.error("Error fetching coin price:", error);
      throw error;
    }
  };

  return {
    fetchCoinPrice,
  };
};
