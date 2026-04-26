<template>
  <section id="faq" class="bg-white py-20 lg:py-28">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">FAQ</p>
        <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          Everything carriers and brokers ask before booking a demo.
        </p>
      </div>

      <UAccordion
        :items="items"
        class="mt-12"
        :ui="{ item: 'border border-slate-200 rounded-xl mb-3 px-2', trigger: 'py-4 text-left font-semibold text-slate-900', content: 'text-slate-600 pb-4 px-2' }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'What is an AI-native TMS?',
    icon: 'i-lucide-sparkles',
    content: 'An AI-native TMS uses large language models and machine vision as core building blocks — not bolt-ons. In Crasoft, AI agents parse rate confirmations, BOLs, and PODs in seconds, send check-in messages to drivers, recalculate ETAs, and notify brokers automatically. A traditional TMS makes a dispatcher do all of that by hand.',
  },
  {
    label: 'How does Crasoft handle multi-tenant data isolation?',
    icon: 'i-lucide-shield',
    content: 'Every carrier runs in its own isolated tenant. Database queries are scoped per tenant at the connection layer, and AI tool calls run through a tenant-safe query layer — agents can never see another carrier\'s loads, drivers, or documents. Full audit logs are available.',
  },
  {
    label: 'Which ELDs and load boards does Crasoft integrate with?',
    icon: 'i-lucide-plug',
    content: 'Crasoft integrates with EVO ELD, Samsara, Motive, and Geotab for telematics; DAT, Truckstop, Sylectus, and Direct Freight for load boards; QuickBooks, Bill.com, Comdata, and RTS for accounting and pay; and HERE Maps, Google Maps, PC*MILER, and Trimble Maps for routing. We also expose an open REST API and webhooks for custom integrations.',
  },
  {
    label: 'How accurate is the document parsing?',
    icon: 'i-lucide-file-check',
    content: 'On standard rate confirmations, BOLs, and PODs, Crasoft typically extracts shipper, consignee, stops, weights, rates, and reference numbers with over 99% field accuracy on legible documents. Low-quality scans and handwritten POD signatures are flagged for human review rather than guessed.',
  },
  {
    label: 'Is Crasoft right for a small fleet?',
    icon: 'i-lucide-truck',
    content: 'Yes. Crasoft is designed for carriers running 5–500 trucks. Small fleets benefit the most from automation because every dispatcher saves roughly 4 hours per day on check-ins, document entry, and ETA updates — that\'s often equivalent to one extra hire.',
  },
  {
    label: 'How long does onboarding take?',
    icon: 'i-lucide-rocket',
    content: 'Most carriers are live within 5–10 business days. We import your historical loads, drivers, customers, and carriers, connect your ELD and load boards, and walk your team through a guided setup. A real engineer is on the demo and the rollout — not a sales rep reading a script.',
  },
  {
    label: 'How is Crasoft priced?',
    icon: 'i-lucide-dollar-sign',
    content: 'Crasoft is sold per-truck per-month with no setup fees and no integration fees. Exact pricing depends on fleet size and which AI agents you turn on (document parsing, check-calls, AI dispatcher). Book a 30-minute call and we\'ll quote you transparently before you commit to anything.',
  },
]
</script>
