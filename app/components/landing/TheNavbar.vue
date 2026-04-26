<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="h-16 flex items-center justify-between gap-6" aria-label="Primary">
        <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0" aria-label="Crasoft home">
          <img
            src="/logo/web-app-manifest-192x192.png"
            alt="Crasoft logo"
            width="32"
            height="32"
            class="h-8 w-8 rounded-md"
          >
          <span :class="['text-lg font-bold tracking-tight', scrolled ? 'text-slate-900' : 'text-white']">
            Crasoft
          </span>
        </NuxtLink>

        <ul class="hidden lg:flex items-center gap-8 text-sm font-medium">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              :class="['transition-colors', scrolled ? 'text-slate-700 hover:text-blue-700' : 'text-slate-200 hover:text-white']"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <UButton
            :color="scrolled ? 'neutral' : 'neutral'"
            variant="ghost"
            size="md"
            class="hidden sm:inline-flex"
            :class="scrolled ? '' : 'text-white hover:bg-white/10'"
          >
            Sign in
          </UButton>
          <UButton color="primary" variant="solid" size="md" to="#contact" icon="i-lucide-calendar">
            Book a Demo
          </UButton>
          <UButton
            class="lg:hidden"
            :color="scrolled ? 'neutral' : 'neutral'"
            variant="ghost"
            :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
            :class="scrolled ? '' : 'text-white hover:bg-white/10'"
            aria-label="Toggle menu"
            @click="open = !open"
          />
        </div>
      </nav>

      <Transition name="slide">
        <div v-if="open" class="lg:hidden pb-4">
          <ul class="flex flex-col gap-1 bg-white rounded-xl shadow-lg p-2 border border-slate-200">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-medium"
                @click="open = false"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const open = ref(false)

const links = [
  { label: 'Product', href: '#product' },
  { label: 'AI', href: '#ai' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Mobile', href: '#mobile' },
  { label: 'Company', href: '#company' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
