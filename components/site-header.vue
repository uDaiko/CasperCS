<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const toast = useToast();

const signOut = async () => {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    console.log("Logout successful");
    await navigateTo("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
const itemsAccount = computed(() => [
  [
    {
      label: user.value?.email,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: signOut,
    },
  ],
]);
const settingsMessage = () => {
  toast.add({
    description: "settings page has not been implemented yet",
    icon: "i-heroicons-exclamation-circle",
    color: "red",
  });
};
</script>

<template>
  <header class="bg-gray-800 flex justify-between items-center py-2 px-8">
    <h1 class="text-3xl font-bold text-cool-100 cursor-pointer" @click="navigateTo('/')">
      CasperCS
    </h1>
    <div class="flex items-center space-x-4">
      <UDropdown :items="itemsAccount" :ui="{ item: { disabled: 'cursor-text select-text' } }" v-if="user"><svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-8 fill-white hover:scale-110 hover:fill-gray-800">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 ">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 ms-auto" />
        </template>
      </UDropdown>
      <div v-on:click="settingsMessage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-8 fill-white hover:scale-110 hover:fill-gray-800">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
    </div>
  </header>
</template>
