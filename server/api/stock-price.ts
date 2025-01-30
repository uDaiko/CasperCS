export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const ticker = query.ticker as string;

  const response = await $fetch(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`,
    {
      params: {
        apiKey: process.env.STOCKAPI_KEY,
      },
    }
  );
  console.log("server response");
  console.log(response);

  return response;
});
