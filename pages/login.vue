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
      description: "login was successful",
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
  <UCard v-if="!user" class="bg-slate-700 mt-6">
    <template #header>Sign-in</template>
    <form @submit.prevent="handleLogin">
      <UFormGroup class="mb-4" label="Email" name="email" :required="true"
        help="After signing in you will be redirected to the main page">
        <UInput type="email" placeholder="Type in your email" class="bg-black mb-2" required="true" v-model="email" />
        <UInput type="password" placeholder="Type in your password" class="bg-black" required="true"
          v-model="password" />
      </UFormGroup>
      <UButton type="submit" variant="solid">Login</UButton>
    </form>
    <div class="mt-4 pt-4 border-t border-gray-600">
      <p class="text-sm text-gray-400 mb-2">If you want to try out the application click here!</p>
      <UButton @click="handleTestLogin" variant="solid" color="gray">
        Login as Test User
      </UButton>
    </div>
  </UCard>
  <UCard v-else>
    <template #header>
      You have been signed in! Go to the main page
      <button @click="navigateTo('/')">Go to Main Page</button>
    </template>
  </UCard>
</template>
