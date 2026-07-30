<template>
  <div class="min-h-screen bg-night-950">
    <!-- Герой секция (строго как на странице нумерологии) -->
    <section
      class="relative bg-night-900 border-b border-night-700/50 overflow-hidden"
    >
      <div class="absolute inset-0">
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-brass-500/5 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 right-1/4 w-96 h-96 bg-clay-500/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
      >
        <div class="text-center space-y-4">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-800/50 border border-brass-500/20 backdrop-blur-sm"
          >
            <span
              class="w-2 h-2 rounded-full bg-brass-400 animate-pulse"
            ></span>
            <span
              class="font-mono text-xs text-brass-400 tracking-widest uppercase"
              >Синастрия</span
            >
          </div>

          <h1
            class="text-4xl md:text-5xl font-display font-bold text-starlight leading-tight"
          >
            Астрология <span class="text-brass-400">совместимости</span>
          </h1>

          <p
            class="text-starlight/60 font-body text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Узнайте, как ваши натальные карты взаимодействуют друг с другом.
            Точки притяжения, зоны роста и кармические задачи вашей пары.
          </p>
        </div>
      </div>
    </section>

    <!-- Основной контент -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Левая колонка: Форма (строго по вашему дизайну) -->
        <div class="lg:col-span-5 lg:sticky lg:top-24">
          <CompatibilityForm />
        </div>

        <!-- Правая колонка: Информация о том, что внутри отчёта -->
        <div class="lg:col-span-7 space-y-6">
          <div
            class="bg-night-900/60 backdrop-blur-sm rounded-3xl p-8 border border-night-700/50"
          >
            <h2 class="text-2xl font-display font-bold text-starlight mb-6">
              Что входит в <span class="text-brass-400">PDF-отчёт</span>?
            </h2>

            <div class="space-y-6">
              <div class="flex gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
                >
                  1
                </div>
                <div>
                  <h3 class="font-semibold text-starlight mb-1">
                    Сравнение стихий и темпераментов
                  </h3>
                  <p class="text-starlight/60 text-sm leading-relaxed">
                    Анализ того, насколько ваши базовые энергии (Огонь, Земля,
                    Воздух, Вода) дополняют или конфликтуют друг с другом.
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
                >
                  2
                </div>
                <div>
                  <h3 class="font-semibold text-starlight mb-1">
                    Синастрия личных планет
                  </h3>
                  <p class="text-starlight/60 text-sm leading-relaxed">
                    Детальный разбор аспектов между Солнцем, Луной, Венерой и
                    Марсом. Как вы общаетесь, любите и решаете конфликты.
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
                >
                  3
                </div>
                <div>
                  <h3 class="font-semibold text-starlight mb-1">
                    Кармические задачи пары
                  </h3>
                  <p class="text-starlight/60 text-sm leading-relaxed">
                    Анализ узлов Луны и Сатурна: для чего вы встретились и какие
                    уроки должны пройти вместе.
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
                >
                  4
                </div>
                <div>
                  <h3 class="font-semibold text-starlight mb-1">
                    Прогноз развития отношений
                  </h3>
                  <p class="text-starlight/60 text-sm leading-relaxed">
                    Краткий взгляд на ближайшие 6-12 месяцев: благоприятные
                    периоды для совместных решений и зоны, требующие терпения.
                  </p>
                </div>
              </div>
            </div>

            <div
              class="mt-8 p-4 bg-brass-500/10 border border-brass-500/20 rounded-xl"
            >
              <p class="text-brass-300 text-sm text-center font-medium">
                💡 Для точного расчёта домов и Асцендента в синастрии крайне
                желательно указать время рождения обоих партнёров.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CompatibilityForm from "~/components/CompatibilityForm.vue";

useHead({
  title: "Совместимость по натальной карте (Синастрия) — PDF отчёт",
  meta: [
    {
      name: "description",
      content:
        "Узнайте астрологическую совместимость с партнёром. Подробный PDF-отчёт о синастрии, кармических задачах и прогнозе отношений.",
    },
  ],
});
</script>
