<template>
  <section id="contact"
    class="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-700 py-20 lg:py-28">
    <div class="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
    <div class="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-cyan-400/20 blur-3xl"
      aria-hidden="true" />

    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
        Ready to run your fleet on autopilot?
      </h2>
      <p class="mt-4 text-lg text-blue-100">
        See Crasoft on a 30-minute call. We'll import a sample load, run it through the AI,
        and show you exactly where it fits in your operation.
      </p>

      <form class="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" @submit.prevent="onSubmit">
        <UInput v-model="email" type="email" required size="xl" placeholder="you@company.com" icon="i-lucide-mail"
          class="flex-1"
          :ui="{ base: 'bg-white text-slate-900 placeholder:text-slate-400 ring-0 border-0 shadow-lg' }" />
        <UButton type="submit" size="xl" color="neutral" variant="solid" icon="i-lucide-calendar-check"
          class="bg-white !text-blue-700 hover:!bg-blue-50 font-semibold">
          Book a Demo
        </UButton>
      </form>

      <p class="mt-4 text-sm text-blue-100/80">
        No credit card · No long calls · Live demo with a real engineer
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-blue-100">
        <a href="tel:+16185770000" class="flex items-center gap-2 hover:text-white transition">
          <UIcon name="i-lucide-phone" /> +1 (618) 577-0000
        </a>
        <a href="mailto:development@crasoftinc.com" class="flex items-center gap-2 hover:text-white transition">
          <UIcon name="i-lucide-mail" /> development@crasoftinc.com
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const toast = useToast()

const onSubmit = () => {
  if (!email.value) return
  toast.add({
    title: 'Thanks — we\'ll be in touch shortly.',
    // description: `We'll reach out to ${email.value} to schedule your 30-minute demo.`,
    icon: 'i-lucide-check-circle',
    color: 'success',
  })
  email.value = ''
}
</script>
