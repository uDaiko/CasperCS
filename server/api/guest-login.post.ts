import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.SUPABASE_URL as string,
    config.public.SUPABASE_ANON_KEY as string
  );

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: config.TEST_USER_EMAIL,
      password: config.TEST_USER_PASSWORD,
    });

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Guest login error:", error);
    throw createError({
      statusCode: 401,
      message: "Guest login failed",
    });
  }
});
