export const useFetchStockPrice = (stock: string) => {
  const url = `https://api.polygon.io/v2/aggs/ticker/${stock}/prev?appiKey=${process.env.STOCKAPI_KEY}`;
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const fetchStockPrice = async () => {
    const { data, error } = await useAsyncData("stockData", () => $fetch(url));

    if (error.value) {
      console.log("could not fetch");

      return { error: error.value };
    }
    console.log("this is the return in comp");

    return { data: data.value };
  };
  return {
    fetchStockPrice,
  };
};
