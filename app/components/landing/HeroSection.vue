<template>
  <section class="relative overflow-hidden bg-radial-hero pt-28 lg:pt-32 pb-20 lg:pb-28">
    <div
      class="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      aria-hidden="true" />
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-slate-950" aria-hidden="true" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div class="lg:col-span-6 fade-up">
          <p class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full rounded-full bg-cyan-400 pulse-dot" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            AI-Native TMS · Built for 2026
          </p>

          <h1 class="mt-5 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            Get your fleet to
            <span class="text-gradient">the next level.</span>
          </h1>

          <p class="mt-6 text-lg lg:text-xl text-slate-300 max-w-xl">
            Crasoft is the truck management system where AI handles the busywork — dispatch,
            document parsing, driver check-ins, ETA updates — and your team focuses on growth.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <UButton color="primary" size="xl" icon="i-lucide-calendar-check" to="#contact">
              Book a Demo
            </UButton>
            <UButton color="neutral" variant="outline" size="xl" icon="i-lucide-play"
              class="group text-white border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-100 hover:shadow-[0_14px_36px_-18px_rgba(34,211,238,0.8)] focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Watch 2-min Tour
            </UButton>
          </div>

          <p class="mt-6 text-sm text-slate-400 flex items-center gap-2">
            <UIcon name="i-lucide-shield-check" class="text-emerald-400" />
            Trusted by carriers running 5–500 trucks · No credit card required
          </p>
        </div>

        <div class="lg:col-span-6 relative">
          <LandingMocksDashboardMock />
        </div>
      </div>
    </div>
  </section>
</template>
