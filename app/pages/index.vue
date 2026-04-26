<template>
  <div class="bg-white text-slate-900">
    <LandingTheNavbar />
    <main>
      <LandingHeroSection />
      <LandingTrustStrip />
      <LandingCapabilitiesGrid />
      <LandingAiShowcase />
      <LandingIntegrationsGrid />
      <LandingMobileAppSection />
      <LandingComparisonTable />
      <LandingFaqSection />
      <LandingFinalCta />
    </main>
    <LandingTheFooter />
  </div>
</template>

<script setup lang="ts">
const siteUrl = 'https://crasoftinc.com'

useSeoMeta({
  title: 'Crasoft INC — AI-Native Truck Management System (TMS) for Modern Fleets',
  description: 'Crasoft is the AI-native TMS where AI handles dispatch, document parsing, and driver check-ins automatically. Built for carriers running 5–500 trucks. Book a demo.',
  keywords: 'AI TMS, truck management system, AI dispatcher, fleet management software, freight automation, document parsing AI, ELD integration, load board integration, multi-tenant TMS, carrier software',
  author: 'Crasoft INC',
  ogTitle: 'Crasoft INC — AI-Native TMS for Modern Fleets',
  ogDescription: 'AI-native truck management system. Automated dispatch, document parsing, driver check-ins. Built for modern carriers.',
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: 'Crasoft INC',
  ogImage: `${siteUrl}/og-cover.png`,
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Crasoft INC — AI-Native TMS for Modern Fleets',
  twitterDescription: 'AI-native truck management system. Automated dispatch, document parsing, driver check-ins.',
  twitterImage: `${siteUrl}/og-cover.png`,
  themeColor: '#1E40AF',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  formatDetection: 'telephone=no',
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}#organization`,
  name: 'Crasoft INC',
  legalName: 'Crasoft INC',
  url: siteUrl,
  logo: `${siteUrl}/logo/web-app-manifest-512x512.png`,
  description: 'Crasoft INC builds an AI-native Truck Management System (TMS) that automates dispatch, document parsing, and driver check-ins for modern fleets.',
  email: 'development@crasoftinc.com',
  telephone: '+1-618-577-0000',
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: '+1-618-577-0000',
    email: 'development@crasoftinc.com',
    contactType: 'sales',
    areaServed: 'US',
    availableLanguage: ['English'],
  }],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${siteUrl}#software`,
  name: 'Crasoft TMS',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Transportation Management System',
  operatingSystem: 'Web, iOS, Android',
  url: siteUrl,
  description: 'AI-native truck management system. Automates dispatch, document parsing (rate confirmations, BOLs, PODs), driver check-ins, and broker updates for trucking carriers running 5–500 trucks.',
  featureList: [
    'AI document parsing for rate confirmations, BOLs, and PODs',
    'Automated driver check-ins via SMS, voice, and in-app',
    'AI dispatcher with multi-tenant safe tool calling',
    'Live load tracking with ELD integration',
    'Driver mobile app with offline support',
    'Real-time analytics: deadhead %, RPM, on-time rate',
    'Integrations with DAT, Truckstop, Samsara, Motive, QuickBooks',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: 'Free demo, per-truck monthly pricing',
  },
  publisher: { '@id': `${siteUrl}#organization` },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is an AI-native TMS?', acceptedAnswer: { '@type': 'Answer', text: 'An AI-native TMS uses large language models and machine vision as core building blocks rather than bolt-ons. In Crasoft, AI agents parse rate confirmations, BOLs, and PODs in seconds, send check-in messages to drivers, recalculate ETAs, and notify brokers automatically — work that a traditional TMS leaves to dispatchers.' } },
    { '@type': 'Question', name: 'How does Crasoft handle multi-tenant data isolation?', acceptedAnswer: { '@type': 'Answer', text: 'Every carrier runs in its own isolated tenant. Database queries are scoped per tenant at the connection layer, and AI tool calls run through a tenant-safe query layer — agents can never see another carrier\'s loads, drivers, or documents. Full audit logs are available.' } },
    { '@type': 'Question', name: 'Which ELDs and load boards does Crasoft integrate with?', acceptedAnswer: { '@type': 'Answer', text: 'Crasoft integrates with EVO ELD, Samsara, Motive, and Geotab for telematics; DAT, Truckstop, Sylectus, and Direct Freight for load boards; QuickBooks, Bill.com, Comdata, and RTS for accounting; HERE Maps, Google Maps, PC*MILER, and Trimble Maps for routing. An open REST API and webhooks are available for custom integrations.' } },
    { '@type': 'Question', name: 'How accurate is Crasoft\'s document parsing?', acceptedAnswer: { '@type': 'Answer', text: 'On standard rate confirmations, BOLs, and PODs, Crasoft typically extracts shipper, consignee, stops, weights, rates, and reference numbers with over 99% field accuracy on legible documents. Low-quality scans are flagged for human review rather than guessed.' } },
    { '@type': 'Question', name: 'Is Crasoft right for a small fleet?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Crasoft is designed for carriers running 5 to 500 trucks. Small fleets benefit most from automation because every dispatcher saves roughly 4 hours per day on check-ins, document entry, and ETA updates — often equivalent to one extra hire.' } },
    { '@type': 'Question', name: 'How long does Crasoft onboarding take?', acceptedAnswer: { '@type': 'Answer', text: 'Most carriers are live within 5 to 10 business days. Crasoft imports historical loads, drivers, customers, and carriers, connects ELD and load boards, and walks the team through a guided setup with a real engineer.' } },
    { '@type': 'Question', name: 'How is Crasoft priced?', acceptedAnswer: { '@type': 'Answer', text: 'Crasoft is sold per-truck per-month with no setup fees and no integration fees. Exact pricing depends on fleet size and which AI agents are enabled (document parsing, automated check-calls, AI dispatcher). Pricing is quoted transparently on a 30-minute demo call.' } },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: 'Crasoft INC',
  description: 'AI-native truck management system for modern fleets.',
  publisher: { '@id': `${siteUrl}#organization` },
  inLanguage: 'en-US',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }],
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(softwareSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(websiteSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) },
  ],
})
</script>
