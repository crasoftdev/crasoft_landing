<template>
  <div class="bg-slate-900/80 ring-1 ring-slate-700/60 rounded-2xl shadow-2xl p-5">
    <div class="flex items-center justify-between pb-3 border-b border-slate-700/60">
      <div class="text-sm font-semibold text-white">Load #4821 · Auto check-ins</div>
      <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
        Active
      </span>
    </div>

    <ol class="mt-4 space-y-4 relative before:absolute before:left-3 before:top-1 before:bottom-1 before:w-px before:bg-slate-700/60">
      <li v-for="(e, i) in events" :key="i" class="relative pl-9">
        <div :class="[
          'absolute left-0 top-0.5 h-6 w-6 rounded-full flex items-center justify-center',
          e.tone === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40' :
          e.tone === 'green' ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40' :
          'bg-slate-700/40 text-slate-300 ring-1 ring-slate-600/40',
        ]">
          <UIcon :name="e.icon" class="text-xs" />
        </div>
        <div class="text-xs">
          <div class="text-white font-medium">{{ e.title }}</div>
          <div class="text-slate-400 mt-0.5">{{ e.time }} · {{ e.detail }}</div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
const events = [
  { icon: 'i-lucide-message-circle', tone: 'cyan', title: 'SMS sent to driver', time: '08:00', detail: '"Status update?"' },
  { icon: 'i-lucide-mic', tone: 'cyan', title: 'Reply parsed', time: '08:02', detail: '"Loaded, leaving now"' },
  { icon: 'i-lucide-route', tone: 'cyan', title: 'ETA recalculated', time: '08:02', detail: 'Atlanta · ETA 14:35' },
  { icon: 'i-lucide-mail', tone: 'green', title: 'Broker notified', time: '08:03', detail: 'ABC Logistics — auto email' },
  { icon: 'i-lucide-check', tone: 'green', title: 'Logged to load timeline', time: '08:03', detail: 'No dispatcher action needed' },
]
</script>
