<script setup>
const portfolioCategories = ["Stocks", "Crypto"];
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <h2>Add a new portfolio</h2>

      <UForm>
        <UFormGroup
          label="Portfolio name"
          name="name"
          class="mb-4"
          :required="true"
        >
          <UInput placeholder="What should the portfolio be called" />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <USelect placeholder="For what asset class is this portfolio?" />
        </UFormGroup>

        <UButton variant="solid" label="Save" type="submit" />
      </UForm>
    </UCard>
  </UModal>
</template>
