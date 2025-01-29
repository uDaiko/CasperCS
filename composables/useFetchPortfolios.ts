export const useFetchPortfolios = () => {
  const fetchStockPortfolios = async () => {
    const supabase = useSupabaseClient();

    const { data: portfolioData, error: portfolioError } = await supabase
      .from("portfolios")
      .select();

    if (portfolioError) {
      console.log("error when fetching portfolios");
      return;
    }
    console.log("the portfolio data");
    console.log(portfolioData);
    return portfolioData;
  };
  return {
    fetchStockPortfolios,
  };
};
