<template>
  <section class="bg-slate-50 py-20 lg:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Why Crasoft</p>
        <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Old TMS vs. Crasoft.
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          If your TMS still feels like a 2010 spreadsheet with a login, you're losing margin every week.
        </p>
      </div>

      <div class="mt-14 grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl bg-white border border-slate-200 p-6 lg:p-8">
          <div class="flex items-center gap-2 pb-4 border-b border-slate-200">
            <div class="h-9 w-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
              <UIcon name="i-lucide-archive" />
            </div>
            <h3 class="text-lg font-bold text-slate-700">Legacy TMS</h3>
          </div>
          <ul class="mt-5 space-y-3.5">
            <li v-for="row in rows" :key="row.legacy" class="flex items-start gap-3 text-slate-500">
              <UIcon name="i-lucide-x" class="shrink-0 mt-0.5 text-rose-400" />
              <span>{{ row.legacy }}</span>
            </li>
          </ul>
        </div>

        <div class="relative rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 p-6 lg:p-8 text-white shadow-2xl shadow-blue-500/20">
          <div class="absolute inset-0 -z-10 bg-grid opacity-20 rounded-2xl" />
          <div class="flex items-center gap-2 pb-4 border-b border-white/20">
            <div class="h-9 w-9 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <UIcon name="i-lucide-sparkles" />
            </div>
            <h3 class="text-lg font-bold">Crasoft</h3>
          </div>
          <ul class="mt-5 space-y-3.5">
            <li v-for="row in rows" :key="row.crasoft" class="flex items-start gap-3">
              <UIcon name="i-lucide-check-circle-2" class="shrink-0 mt-0.5 text-cyan-300" />
              <span class="text-blue-50">{{ row.crasoft }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  { legacy: 'Manual data entry from rate cons', crasoft: 'AI parses every document' },
  { legacy: 'Dispatcher calls every driver hourly', crasoft: 'Automated check-ins, exceptions only' },
  { legacy: 'Reports are static and weekly', crasoft: 'Live metrics: deadhead, RPM, on-time' },
  { legacy: 'Integrations cost extra and take months', crasoft: 'API-first, integrations in days' },
  { legacy: 'One-size-fits-all UI', crasoft: 'Multi-tenant, customizable per company' },
  { legacy: 'Mobile app is an afterthought', crasoft: 'Driver-first design' },
]
</script>
