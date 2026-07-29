<template>
  <main
    class="min-h-screen bg-night-950 text-starlight relative overflow-x-hidden"
  >
    <!-- Фоновые градиенты -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-brass-500/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/4 right-0 w-96 h-96 bg-clay-500/5 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Шапка страницы -->
      <header class="pt-16 pb-12 px-4 text-center">
        <div class="max-w-3xl mx-auto space-y-4">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-800/50 border border-brass-500/20 backdrop-blur-sm"
          >
            <span
              class="w-2 h-2 rounded-full bg-brass-400 animate-pulse"
            ></span>
            <span
              class="font-mono text-xs text-brass-400 tracking-widest uppercase"
            >
              Персональная Астролябия & Нумерология
            </span>
          </div>

          <h1
            class="text-4xl md:text-6xl font-display font-bold text-starlight leading-tight"
          >
            Сервис <span class="text-brass-400">самопознания</span> и анализа
            личности
          </h1>

          <p
            class="text-starlight/60 font-body text-lg max-w-xl mx-auto leading-relaxed"
          >
            Рассчитайте число судьбы и натальную карту за пару секунд. Узнайте
            свой потенциал и кармические задачи.
          </p>
        </div>
      </header>

      <!-- Основная сетка -->
      <div class="max-w-[1440px] mx-auto px-4 pb-16 space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- ЛЕВАЯ КОЛОНКА: Форма ввода + Детали -->
          <div class="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <!-- 1. Форма ввода данных -->
            <section>
              <NumerologyForm />
            </section>

            <!-- 2. Плашка с выбранным домом -->
            <div
              v-if="selectedHouse"
              class="bg-night-800/60 backdrop-blur-sm rounded-2xl p-5 border border-brass-500/30 animate-fade-in"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <p
                    class="font-mono text-xs text-brass-400 uppercase tracking-wider mb-1"
                  >
                    Активный дом
                  </p>
                  <h3 class="font-display text-2xl text-starlight font-bold">
                    {{ selectedHouse
                    }}<span class="text-2xl text-brass-400">й</span> дом
                  </h3>
                </div>
                <button
                  @click="selectedHouse = null"
                  class="p-2 rounded-lg hover:bg-night-700/50 text-starlight/50 hover:text-starlight transition"
                  aria-label="Закрыть"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="space-y-2">
                <p class="text-sm text-starlight/70">Планеты в этом доме:</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="housePlanets.length"
                    v-for="planet in housePlanets"
                    :key="planet.name"
                    class="px-3 py-1.5 bg-night-900/80 rounded-lg border border-brass-500/20 text-sm"
                  >
                    <span class="text-brass-400 font-bold">{{
                      getPlanetGlyph(planet.name)
                    }}</span>
                    <span class="text-starlight/80 ml-1.5">{{
                      planet.label || planet.name
                    }}</span>
                  </span>
                  <span v-else class="text-starlight/50 text-sm italic">
                    Нет основных планет
                  </span>
                </div>
              </div>
            </div>

            <!-- 3. Список планет -->
            <PlanetPositions
              :planets="planetsList"
              :ascendant-degree="ascendantDegree"
            />
          </div>

          <!-- ПРАВАЯ КОЛОНКА: Колесо Натальной Карты -->
          <section
            class="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-night-900/80 backdrop-blur-xl rounded-3xl border border-night-700/50 order-1 lg:order-2"
          >
            <div class="flex flex-col items-center justify-center w-full mb-6">
              <h2
                class="font-display text-2xl text-center text-brass-400 font-semibold"
              >
                Натальная карта
              </h2>
              <div
                class="flex items-center gap-2 text-xs font-mono text-starlight/50"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-brass-400"></span>
                <span>Интерактивная</span>
              </div>
            </div>

            <NatalWheel
              :size="700"
              :planets="planetsList"
              :ascendant-degree="ascendantDegree"
              @select-house="onHouseClick"
            />

            <div v-if="planetsList.length" class="mt-6 text-center">
              <p class="text-xs font-mono text-brass-400/70">
                💡 Нажимайте на сектора (1–12) для изучения деталей
              </p>
            </div>
            <div v-else class="mt-6 text-center py-8">
              <p class="text-starlight/40 text-sm">
                Заполните форму слева для расчёта карты
              </p>
            </div>
          </section>
        </div>

        <!-- 4. Результаты расчёта: Бесплатная часть + Paywall -->
        <section v-if="reportData" class="pt-8">
          <FreeReportView />
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useUserReportStore } from "~/stores/userReport";

const store = useUserReportStore();
const selectedHouse = ref<number | null>(null);

// Символы планет
const glyphs: Record<string, string> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
};

function getPlanetGlyph(name?: string) {
  if (!name) return "★";
  return glyphs[name] || "★";
}

const onHouseClick = (houseNumber: number) => {
  selectedHouse.value = houseNumber;
};

// Извлечение данных из store (плоская структура, как мы настроили ранее)
const reportData = computed(() => {
  return store.report;
});

const planetsList = computed(() => {
  return store.report?.planets || [];
});

const ascendantDegree = computed(() => {
  return store.report?.ascendantDegree || 0;
});

// Фильтрация планет для выбранного дома
const housePlanets = computed(() => {
  if (!selectedHouse.value || !planetsList.value.length) return [];

  const ascDeg = ascendantDegree.value;

  return planetsList.value.filter((planet: any) => {
    if (!planet) return false;
    const planetDegree = Number(planet.degree) || 0;

    let relativeDegree = (planetDegree - ascDeg) % 360;
    if (relativeDegree < 0) {
      relativeDegree += 360;
    }

    const planetHouse = Math.floor(relativeDegree / 30) + 1;
    return planetHouse === selectedHouse.value;
  });
});

useHead({
  title: "Расчёт натальной карты и числа судьбы онлайн",
  meta: [
    {
      name: "description",
      content:
        "Бесплатный разбор личности по дате рождения. Узнайте своё число судьбы, аспекты планет и натальную карту.",
    },
  ],
});
</script>

<style scoped>
/* Пустой блок style, чтобы гарантировать отсутствие мусора от прошлых версий */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
