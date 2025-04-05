export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.CRYPTOAPI_KEY;
  const query = getQuery(event);
  const symbol = query.symbol as string;

  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch crypto data",
    });
  }
});
