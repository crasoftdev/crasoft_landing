<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
    <div v-for="s in stats" :key="s.label" class="text-center lg:text-left">
      <div class="text-4xl lg:text-5xl font-extrabold text-gradient tracking-tight">{{ s.value }}</div>
      <div class="mt-2 text-sm text-slate-400">{{ s.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '~65%', label: 'Fewer manual updates' },
  { value: '4 hrs', label: 'Saved per dispatcher / day' },
  { value: '99%+', label: 'Document parse accuracy' },
  { value: '24/7', label: 'AI agents on duty' },
]
</script>
