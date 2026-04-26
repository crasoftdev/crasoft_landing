<template>
  <div class="grid grid-cols-2 gap-4 p-5 bg-slate-900/80 ring-1 ring-slate-700/60 rounded-2xl shadow-2xl">
    <!-- PDF preview -->
    <div class="bg-white rounded-lg p-3 text-[10px] text-slate-700 leading-tight font-mono">
      <div class="font-bold text-slate-900 mb-1">RATE CONFIRMATION</div>
      <div class="text-slate-500 mb-2">Broker · ABC Logistics</div>
      <div class="space-y-0.5">
        <div>Load #: 4821-DAL</div>
        <div>Pickup: 10/15 — Dallas, TX</div>
        <div>Delivery: 10/17 — Atlanta, GA</div>
        <div>Weight: 42,500 lbs</div>
        <div>Rate: $2,850.00</div>
        <div class="mt-1 text-slate-400">Driver must check in at...</div>
      </div>
      <div class="mt-2 h-1 bg-slate-200 rounded" />
      <div class="mt-1 h-1 w-3/4 bg-slate-200 rounded" />
      <div class="mt-1 h-1 w-1/2 bg-slate-200 rounded" />
    </div>

    <!-- Extracted JSON -->
    <div class="rounded-lg bg-slate-950/70 ring-1 ring-slate-700/40 p-3 text-[10px] font-mono">
      <div class="flex items-center gap-1.5 text-cyan-300 mb-2">
        <UIcon name="i-lucide-sparkles" />
        <span>Parsed in 1.4s</span>
      </div>
      <div class="space-y-1">
        <div v-for="f in fields" :key="f.label" class="flex items-start gap-1.5">
          <UIcon name="i-lucide-check" class="text-emerald-400 mt-px" />
          <div>
            <span class="text-slate-400">{{ f.label }}:</span>
            <span class="text-white ml-1">{{ f.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const fields = [
  { label: 'broker', value: 'ABC Logistics' },
  { label: 'load_id', value: '4821-DAL' },
  { label: 'pickup', value: 'Dallas, TX · 10/15' },
  { label: 'delivery', value: 'Atlanta, GA · 10/17' },
  { label: 'weight_lbs', value: '42500' },
  { label: 'rate_usd', value: '2850.00' },
]
</script>
