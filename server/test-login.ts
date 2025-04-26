import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);
    const config = useRuntimeConfig();

    const { error } = await supabase.auth.signInWithPassword({
      email: config.TEST_USER_EMAIL,
      password: config.TEST_USER_PASSWORD,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Test login error:", error);
    return {
      success: false,
      error: "Failed to authenticate test user",
    };
  }
});
