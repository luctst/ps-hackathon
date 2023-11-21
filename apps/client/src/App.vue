<script setup lang="ts">
import trpc from './trpc';
import { onMounted, ref } from 'vue';

const data = ref<unknown>();

onMounted(async () => {
  data.value = await trpc.userList.query();
});
</script>

<template>
  <h1>{{ data }}</h1>
</template>

<style scoped>
</style>
