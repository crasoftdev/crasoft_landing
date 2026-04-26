<template>
  <footer id="company" class="bg-slate-950 text-slate-300 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4">
          <div class="flex items-center gap-2.5">
            <img
              src="/logo/web-app-manifest-192x192.png"
              alt="Crasoft logo"
              width="36"
              height="36"
              class="h-9 w-9 rounded-md"
            >
            <span class="text-white text-lg font-bold tracking-tight">Crasoft</span>
          </div>
          <p class="mt-4 text-sm leading-relaxed max-w-sm">
            Crasoft INC — the AI-native truck management system for modern fleets.
            AI handles dispatch, documents, and check-calls so your team focuses on growth.
          </p>
          <div class="mt-5 space-y-2 text-sm">
            <a href="tel:+16185770000" class="flex items-center gap-2 hover:text-white transition">
              <UIcon name="i-lucide-phone" class="text-cyan-400" /> +1 (618) 577-0000
            </a>
            <a href="mailto:development@crasoftinc.com" class="flex items-center gap-2 hover:text-white transition">
              <UIcon name="i-lucide-mail" class="text-cyan-400" /> development@crasoftinc.com
            </a>
          </div>
        </div>

        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="col in columns" :key="col.title">
            <h4 class="text-white font-semibold text-sm">{{ col.title }}</h4>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li v-for="link in col.links" :key="link">
                <a href="#" class="hover:text-white transition">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© {{ year }} Crasoft INC. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <a href="#" aria-label="X (Twitter)" class="hover:text-white transition"><UIcon name="i-lucide-twitter" class="text-base" /></a>
          <a href="#" aria-label="LinkedIn" class="hover:text-white transition"><UIcon name="i-lucide-linkedin" class="text-base" /></a>
          <a href="#" aria-label="GitHub" class="hover:text-white transition"><UIcon name="i-lucide-github" class="text-base" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const columns = [
  { title: 'Product', links: ['Features', 'AI & Automation', 'Integrations', 'Mobile App'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Blog'] },
  { title: 'Resources', links: ['Documentation', 'API Reference', 'Changelog', 'Status'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
]
</script>
