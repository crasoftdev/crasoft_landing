<template>
  <section id="mobile" class="bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">For Drivers</p>
          <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            The driver app drivers actually open.
          </h2>
          <p class="mt-4 text-lg text-slate-600">
            Built for the cab — not the office. Drivers see their next stop, sign PODs, scan documents,
            log HOS, and chat with dispatch in one app. Works offline.
          </p>

          <ul class="mt-6 space-y-3">
            <li v-for="f in features" :key="f" class="flex items-start gap-3 text-slate-700">
              <span class="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <UIcon name="i-lucide-check" class="text-sm" />
              </span>
              <span>{{ f }}</span>
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap gap-3">
            <button class="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition">
              <UIcon name="i-lucide-apple" class="text-2xl" />
              <span class="text-left leading-tight">
                <span class="block text-[10px] opacity-70">Download on the</span>
                <span class="block text-base font-semibold">App Store</span>
              </span>
            </button>
            <button class="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition">
              <UIcon name="i-lucide-play" class="text-2xl" />
              <span class="text-left leading-tight">
                <span class="block text-[10px] opacity-70">Get it on</span>
                <span class="block text-base font-semibold">Google Play</span>
              </span>
            </button>
          </div>
        </div>

        <div class="flex justify-center">
          <LandingMocksPhoneMock />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  'Stop-by-stop navigation with live ETAs',
  'One-tap document scan & upload',
  'HOS-aware dispatch suggestions',
  'Push notifications + voice replies',
]
</script>
