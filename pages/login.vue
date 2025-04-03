<script setup>
const isLoggedIn = ref(false);
const isLoading = ref(false);
const email = ref("");
const password = ref("");
const supabaseClient = useSupabaseClient();
const toast = useToast();
const user = useSupabaseUser();
const config = useRuntimeConfig();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.add({
      title: "Login Unsuccessful",
      description: "email or password missing",
      icon: "i-heroicons-exclamation-circle",
      color: "yellow",
    });
    return;
  }
  isLoading.value = true;
  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    toast.add({
      title: "Login Successful",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  } catch (error) {
    console.error(error);
    toast.add({
      title: "Login Unsuccessful",
      description: "there was an error when logging in. try again",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading = false;
  }
};

const handleTestLogin = async () => {
  isLoading.value = true;
  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: config.public.TEST_USER_EMAIL,
      password: config.public.TEST_USER_PASSWORD,
    });

    if (error) throw error;

    toast.add({
      title: "Guest Login Successful",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
    navigateTo('/');
  } catch (error) {
    console.error(error);
    toast.add({
      title: "guest login Unsuccessful",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

watch(
  user,
  (user) => {
    if (user) {
      navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <UCard v-if="!user" class="bg-slate-950/50 shadow-lg ">
        <template #header>
          <div class="space-y-1">
            <h3 class="text-xl text-white">Sign in</h3>
            <p class="text-sm text-slate-400">
              Enter your credentials below to access your account
            </p>
          </div>
        </template>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <label for="email" class="text-slate-300">Email</label>
            <UInput id="email" type="email" v-model="email" placeholder="name@example.com"
              class="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:ring-slate-600"
              required=" true" />
          </div>
          <div class="space-y-2">
            <label for="password" class="text-slate-300">Password</label>
            <UInput id="password" type="password" v-model="password" placeholder="••••••••"
              class="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:ring-slate-600"
              required="true" />
          </div>
          <UButton type="submit" class="w-full bg-indigo-600 text-white hover:bg-indigo-700">
            Sign in
          </UButton>
        </form>

        <div class="relative px-6 py-3">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-800"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-slate-950/50 px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <div class="flex flex-col gap-4 p-6">
          <UButton @click="handleTestLogin" variant="outline" class="w-full text-white bg-green-600 hover:bg-green-700">
            <UIcon name="i-heroicons-user" class="mr-2 h-4 w-4" />
            A Test User
          </UButton>
        </div>
      </UCard>

      <UCard v-else>
        <template #header>
          You have been signed in! Go to the main page
          <UButton @click="navigateTo('/')">Go to Main Page</UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>
