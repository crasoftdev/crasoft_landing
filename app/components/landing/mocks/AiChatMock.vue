<template>
  <div class="bg-slate-900/80 ring-1 ring-slate-700/60 rounded-2xl shadow-2xl p-5">
    <div class="flex items-center gap-2 pb-3 border-b border-slate-700/60">
      <div class="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
        <UIcon name="i-lucide-sparkles" class="text-white text-sm" />
      </div>
      <div class="text-sm">
        <div class="text-white font-semibold">Crasoft AI</div>
        <div class="text-xs text-cyan-300">Connected to your tenant</div>
      </div>
    </div>

    <div class="mt-4 space-y-3 text-xs">
      <div class="flex justify-end">
        <div class="max-w-[85%] bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-br-sm">
          What loads are at risk today?
        </div>
      </div>
      <div class="flex">
        <div class="max-w-[88%] bg-slate-800/70 ring-1 ring-slate-700/40 text-slate-200 px-3 py-2 rounded-2xl rounded-bl-sm">
          3 loads need attention:
          <div class="mt-2 space-y-1 font-mono text-[11px]">
            <div>• <span class="text-amber-300">#4823</span> — driver 22 min late, ETA Phoenix→Denver</div>
            <div>• <span class="text-rose-300">#4819</span> — POD missing, delivered 4h ago</div>
            <div>• <span class="text-amber-300">#4811</span> — detention starting in 30m</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <div class="max-w-[85%] bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-br-sm">
          Find me a backhaul out of Dallas under 400 miles
        </div>
      </div>
      <div class="flex">
        <div class="max-w-[88%] bg-slate-800/70 ring-1 ring-slate-700/40 text-slate-200 px-3 py-2 rounded-2xl rounded-bl-sm">
          <div class="flex items-center gap-1.5 text-cyan-300 mb-1">
            <UIcon name="i-lucide-loader" class="animate-spin" />
            <span>Searching DAT + Truckstop…</span>
          </div>
          Found 12 matches. Best: Houston→Memphis, $2.94/mi, pickup tomorrow.
        </div>
      </div>
    </div>
  </div>
</template>
