<template>
  <section id="integrations" class="bg-white py-20 lg:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Connected</p>
        <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Plays well with your existing stack.
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          ELDs, load boards, accounting, mapping, communication — Crasoft connects to the tools you already pay for.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="cat in categories"
          :key="cat.title"
          class="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:bg-white hover:shadow-lg transition"
        >
          <div class="flex items-center gap-2.5 pb-4 border-b border-slate-200">
            <div class="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <UIcon :name="cat.icon" class="text-lg" />
            </div>
            <h3 class="font-bold text-slate-900">{{ cat.title }}</h3>
          </div>
          <ul class="mt-4 space-y-2.5">
            <li
              v-for="tool in cat.tools"
              :key="tool"
              class="flex items-center gap-2 text-sm text-slate-700"
            >
              <UIcon name="i-lucide-check-circle-2" class="text-emerald-500" />
              {{ tool }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p class="text-slate-600">
          Don't see your tool? We have an open API and webhooks.
        </p>
        <UButton color="primary" variant="outline" trailing-icon="i-lucide-arrow-right">
          View Integration Docs
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  { title: 'ELD & Telematics', icon: 'i-lucide-radio-tower', tools: ['EVO ELD', 'Samsara', 'Motive', 'Geotab'] },
  { title: 'Load Boards', icon: 'i-lucide-warehouse', tools: ['DAT', 'Truckstop', 'Sylectus', 'Direct Freight'] },
  { title: 'Accounting & Pay', icon: 'i-lucide-receipt', tools: ['QuickBooks', 'Bill.com', 'Comdata', 'RTS'] },
  { title: 'Maps & Routing', icon: 'i-lucide-map', tools: ['HERE Maps', 'Google Maps', 'PC*MILER', 'Trimble Maps'] },
]
</script>
