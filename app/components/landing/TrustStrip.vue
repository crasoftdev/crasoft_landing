<template>
  <section class="bg-white border-y border-slate-200 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Built for modern fleets
      </p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <span
          v-for="(name, i) in names"
          :key="name"
          class="text-slate-400 font-semibold text-sm sm:text-base flex items-center gap-3 grayscale hover:grayscale-0 hover:text-slate-600 transition"
        >
          <UIcon :name="icons[i]" class="text-lg" />
          {{ name }}
        </span>
      </div>
      <p class="mt-5 text-center text-xs text-slate-400">
        Compatible with major shipper portals, ELDs, and load boards.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const names = ['DAT Load Board', 'Truckstop', 'Samsara', 'Motive', 'QuickBooks', 'HERE Maps']
const icons = [
  'i-lucide-database',
  'i-lucide-warehouse',
  'i-lucide-radio-tower',
  'i-lucide-activity',
  'i-lucide-receipt',
  'i-lucide-map',
]
</script>
