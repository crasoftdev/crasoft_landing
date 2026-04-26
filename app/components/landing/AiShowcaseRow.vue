<template>
  <div :class="[
    'grid lg:grid-cols-2 gap-10 lg:gap-16 items-center',
    reverse ? 'lg:[&>*:first-child]:order-2' : '',
  ]">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">{{ eyebrow }}</p>
      <h3 class="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">{{ title }}</h3>
      <p class="mt-4 text-base lg:text-lg text-slate-300 leading-relaxed">{{ body }}</p>
      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="t in tags"
          :key="t"
          class="text-xs font-medium font-mono px-2.5 py-1 rounded-full bg-slate-800/60 text-cyan-300 border border-cyan-500/20"
        >
          {{ t }}
        </span>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  body: string
  tags: string[]
  reverse?: boolean
}>()
</script>
