<template>
  <div class="relative">
    <!-- Floating AI Assistant chip -->
    <div
      class="absolute -top-5 -right-3 sm:-right-6 z-20 max-w-[280px] bg-slate-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-3.5 shadow-2xl glow-cyan fade-up-d3"
    >
      <div class="flex items-start gap-2.5">
        <div class="shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
          <UIcon name="i-lucide-sparkles" class="text-white text-base" />
        </div>
        <div class="text-xs leading-snug">
          <div class="text-cyan-300 font-semibold mb-0.5">AI Assistant</div>
          <p class="text-slate-200">
            Load <span class="font-mono text-white">#4821</span> — driver is 22 min late. Notify the broker?
          </p>
        </div>
      </div>
    </div>

    <!-- Dashboard card -->
    <div class="relative rounded-2xl ring-1 ring-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden fade-up-d2">
      <!-- Top bar -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-slate-700/60 bg-slate-900/60">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span class="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-300">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full rounded-full bg-cyan-400 pulse-dot" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span class="font-mono">Live · 12 trucks rolling</span>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white text-sm font-semibold">Active Loads</h3>
          <div class="text-xs text-slate-400 font-mono">Today · 4 active</div>
        </div>

        <!-- Loads table -->
        <div class="space-y-2">
          <div
            v-for="row in rows"
            :key="row.id"
            class="grid grid-cols-12 items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/70 transition border border-slate-700/40"
          >
            <div class="col-span-3 text-xs">
              <div class="text-white font-mono">{{ row.id }}</div>
              <div class="text-slate-400">MC {{ row.mc }}</div>
            </div>
            <div class="col-span-6 flex items-center gap-2 text-xs text-slate-200 truncate">
              <span class="truncate">{{ row.from }}</span>
              <UIcon name="i-lucide-arrow-right" class="shrink-0 text-slate-500" />
              <span class="truncate">{{ row.to }}</span>
            </div>
            <div class="col-span-3 flex justify-end">
              <span :class="[
                'text-[10px] px-2 py-0.5 rounded-full font-semibold',
                row.statusColor,
              ]">
                {{ row.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Stat row -->
        <div class="mt-5 grid grid-cols-3 gap-3">
          <div v-for="s in stats" :key="s.label" class="rounded-lg bg-slate-800/40 border border-slate-700/40 p-3">
            <div class="text-xs text-slate-400">{{ s.label }}</div>
            <div class="text-white font-bold text-base mt-1">{{ s.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative glow -->
    <div class="absolute -inset-6 -z-10 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-cyan-500/20 blur-3xl opacity-70" />
  </div>
</template>

<script setup lang="ts">
const rows = [
  { id: '#4821', mc: '845321', from: 'Dallas, TX', to: 'Atlanta, GA', status: 'In transit', statusColor: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' },
  { id: '#4822', mc: '772119', from: 'Chicago, IL', to: 'Newark, NJ', status: 'At pickup', statusColor: 'bg-blue-500/15 text-blue-300 border border-blue-500/30' },
  { id: '#4823', mc: '901288', from: 'Phoenix, AZ', to: 'Denver, CO', status: 'Delayed', statusColor: 'bg-amber-500/15 text-amber-300 border border-amber-500/30' },
  { id: '#4824', mc: '633010', from: 'Memphis, TN', to: 'Miami, FL', status: 'Delivered', statusColor: 'bg-slate-500/15 text-slate-300 border border-slate-500/30' },
]
const stats = [
  { label: 'On-time rate', value: '96.4%' },
  { label: 'Avg deadhead', value: '8.1%' },
  { label: 'RPM (week)', value: '$2.71' },
]
</script>
