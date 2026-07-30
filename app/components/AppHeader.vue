<template>
  <header
    class="sticky top-0 z-50 bg-night-900/90 backdrop-blur-md border-b border-night-700/50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Логотип -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 rounded-lg bg-gradient-to-br from-brass-400 to-brass-600 flex items-center justify-center transform group-hover:scale-105 transition-transform"
          >
            <span class="text-night-950 font-display font-bold text-xl">A</span>
          </div>
          <div>
            <h1
              class="font-display font-bold text-xl text-starlight tracking-tight"
            >
              Astra
            </h1>
          </div>
        </NuxtLink>

        <!-- Навигация -->
        <nav class="flex md:flex items-center gap-8">
          <NuxtLink
            to="/"
            class="text-starlight/80 hover:text-brass-400 font-body text-sm transition-colors duration-200"
          >
            Главная
          </NuxtLink>
          <NuxtLink
            to="/chart"
            class="text-starlight/80 hover:text-brass-400 font-body text-sm transition-colors duration-200"
          >
            Натальная карта
          </NuxtLink>
          <NuxtLink
            to="/numerology"
            class="text-starlight/80 hover:text-brass-400 font-body text-sm transition-colors duration-200"
          >
            Нумерология
          </NuxtLink>
          <NuxtLink
            to="/astrology"
            class="text-starlight/80 hover:text-brass-400 font-body text-sm transition-colors duration-200"
          >
            Астрология
          </NuxtLink>
          <NuxtLink
            to="/compatibility"
            class="text-starlight/80 hover:text-brass-400 font-body text-sm transition-colors duration-200"
          >
            Совместимость
          </NuxtLink>
        </nav>
        <div />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
