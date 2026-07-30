<template>
  <footer class="bg-night-900 border-t border-night-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex gap-8">
        <!-- О проекте -->
        <div class="flex gap-2 items-center">
          <h4 class="font-display font-semibold self-center text-brass-400">
            Astra - это
          </h4>

          <p
            class="text-starlight/60 font-body text-sm leading-relaxed max-w-md"
          >
            Профессиональный сервис для расчёта натальных карт и
            нумерологических портретов. Откройте новые грани своей личности с
            помощью древних знаний.
          </p>
        </div>

        <!-- Информация -->
        <div class="flex gap-3">
          <h4 class="font-display font-semibold text-brass-400 mr-4">
            Информация
          </h4>
          <ul class="flex gap-3">
            <li class="ml-2">
              <NuxtLink
                to="/about"
                class="text-starlight/60 hover:text-brass-400 font-body text-sm transition-colors"
              >
                О проекте
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-starlight/60 hover:text-brass-400 font-body text-sm transition-colors"
              >
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/privacy"
                class="text-starlight/60 hover:text-brass-400 font-body text-sm transition-colors"
              >
                Политика конфиденциальности
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/terms"
                class="text-starlight/60 hover:text-brass-400 font-body text-sm transition-colors"
              >
                Условия использования
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Нижняя линия -->
      <div
        class="border-t border-night-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-starlight/40 font-body text-xs">
          © {{ new Date().getFullYear() }} Astra Numerology & Astrology App. Все
          права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>
