<template>
  <section id="ai" class="relative bg-slate-950 py-20 lg:py-28 overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[60rem] rounded-full bg-blue-700/20 blur-3xl" aria-hidden="true" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">AI that actually works</p>
        <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Most human jobs, automated.
        </h2>
        <p class="mt-4 text-lg text-slate-300">
          Crasoft's AI agents read documents, talk to drivers, update brokers, and flag exceptions — 24/7.
          Your team stops being a call center.
        </p>
      </div>

      <div class="mt-16 space-y-20 lg:space-y-28">
        <LandingAiShowcaseRow
          eyebrow="Document AI"
          title="Document parsing, in seconds."
          body="Drop a Rate Confirmation, BOL, or POD — Crasoft extracts shipper, consignee, stops, rates, weights, and reference numbers automatically. PDFs, scans, photos — all handled."
          :tags="['Rate Cons', 'BOLs', 'PODs', 'Lumper Receipts']"
        >
          <LandingMocksDocumentParseMock />
        </LandingAiShowcaseRow>

        <LandingAiShowcaseRow
          eyebrow="AI Dispatcher"
          title="An assistant that actually dispatches."
          body='Ask "What loads are at risk today?" or "Find me a backhaul out of Dallas under 400 miles" — your AI dispatcher answers using your live data, your tenant, your drivers. Tool-calling on a tenant-safe query layer.'
          :tags="['Tool calling', 'Multi-tenant', 'Read + Act']"
          reverse
        >
          <LandingMocksAiChatMock />
        </LandingAiShowcaseRow>

        <LandingAiShowcaseRow
          eyebrow="Automated Check-Calls"
          :title="`No more &quot;where's my driver?&quot; calls.`"
          body="Crasoft auto-pings drivers, parses replies, updates ETAs, and notifies brokers — all without a dispatcher lifting a finger. Voice, SMS, and in-app."
          :tags="['Auto check-ins', 'Broker updates', 'ETA recalc']"
        >
          <LandingMocksCheckCallTimelineMock />
        </LandingAiShowcaseRow>
      </div>

      <div class="mt-20 lg:mt-28 pt-10 border-t border-slate-800">
        <LandingStatsStrip />
      </div>
    </div>
  </section>
</template>
