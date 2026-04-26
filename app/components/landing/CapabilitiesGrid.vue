<template>
  <section id="product" class="bg-slate-50 py-20 lg:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">The Platform</p>
        <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          One TMS. Every workflow.
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          From load creation to driver settlement — Crasoft replaces 6+ tools your dispatchers juggle today.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="card in cards"
          :key="card.title"
          class="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400/60 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
        >
          <div class="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <UIcon :name="card.icon" class="text-xl" />
          </div>
          <h3 class="mt-5 text-lg font-bold text-slate-900">{{ card.title }}</h3>
          <p class="mt-2 text-sm text-slate-600 leading-relaxed">{{ card.body }}</p>
          <div class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 group-hover:gap-2.5 transition-all">
            Learn more
            <UIcon name="i-lucide-arrow-right" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    icon: 'i-lucide-truck',
    title: 'Load Management',
    body: 'Create, dispatch, and track loads with stops, commodities, and financials in one view.',
  },
  {
    icon: 'i-lucide-users',
    title: 'Driver & Fleet',
    body: 'Manage drivers, trucks, trailers, HOS, and documents. Real-time location via ELD.',
  },
  {
    icon: 'i-lucide-building-2',
    title: 'Customers & Carriers',
    body: 'MC/DOT verification, insurance tracking, broker scorecards — automated.',
  },
  {
    icon: 'i-lucide-bar-chart-3',
    title: 'Analytics & Settlements',
    body: 'Deadhead %, revenue per mile, on-time rate, driver pay — calculated live.',
  },
]
</script>
