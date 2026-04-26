<template>
  <div class="relative mx-auto w-72 h-[36rem] rounded-[3rem] bg-slate-900 ring-[10px] ring-slate-900 shadow-2xl overflow-hidden">
    <!-- Notch -->
    <div class="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-slate-950 z-10" />

    <!-- Screen -->
    <div class="h-full w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-5 pt-10 flex flex-col text-white">
      <div class="flex items-center justify-between text-[10px] font-mono opacity-80">
        <span>9:41</span>
        <span class="flex items-center gap-1">
          <UIcon name="i-lucide-signal" />
          <UIcon name="i-lucide-wifi" />
          <UIcon name="i-lucide-battery-full" />
        </span>
      </div>

      <div class="mt-5 text-xs font-semibold opacity-80 uppercase tracking-wider">Next Stop</div>
      <div class="mt-1 text-2xl font-bold">Walmart DC #6094</div>
      <div class="text-sm opacity-80">3300 Madison Pike, Atlanta, GA</div>

      <div class="mt-5 grid grid-cols-2 gap-3">
        <div class="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div class="text-[10px] uppercase opacity-70">ETA</div>
          <div class="text-lg font-bold">14:35</div>
        </div>
        <div class="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <div class="text-[10px] uppercase opacity-70">Miles</div>
          <div class="text-lg font-bold">122</div>
        </div>
      </div>

      <div class="mt-4 bg-white/10 rounded-xl p-3 backdrop-blur-sm text-xs space-y-1.5">
        <div class="flex items-center gap-2"><UIcon name="i-lucide-clock" /> Appt 15:00 — 17:00</div>
        <div class="flex items-center gap-2"><UIcon name="i-lucide-package" /> 18 pallets · 28,400 lbs</div>
        <div class="flex items-center gap-2"><UIcon name="i-lucide-file-text" /> POD required</div>
      </div>

      <div class="mt-auto space-y-2.5">
        <button class="w-full bg-white text-blue-700 font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2">
          <UIcon name="i-lucide-map-pin" />
          Arrived
        </button>
        <button class="w-full bg-white/10 text-white font-medium py-2.5 rounded-xl backdrop-blur-sm border border-white/20 text-sm flex items-center justify-center gap-2">
          <UIcon name="i-lucide-message-square" />
          Message Dispatch
        </button>
      </div>
    </div>
  </div>
</template>
