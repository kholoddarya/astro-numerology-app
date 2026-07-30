<template>
  <div class="min-h-screen bg-night-950">
    <!-- Герой секция -->
    <section
      class="relative bg-night-900 border-b border-night-700/50 overflow-hidden"
    >
      <!-- Фоновые эффекты -->
      <div class="absolute inset-0">
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-brass-500/5 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 right-1/4 w-96 h-96 bg-clay-500/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div class="text-center space-y-6">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-800/50 border border-brass-500/20 backdrop-blur-sm"
          >
            <span
              class="w-2 h-2 rounded-full bg-brass-400 animate-pulse"
            ></span>
            <span
              class="font-mono text-xs text-brass-400 tracking-widest uppercase"
            >
              Астрология и Нумерология
            </span>
          </div>

          <h1
            class="text-4xl md:text-6xl font-display font-bold text-starlight leading-tight"
          >
            Ваш персональный
            <span class="text-brass-400">астрологический</span> гид
          </h1>

          <p
            class="text-starlight/60 font-body text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Ежедневные гороскопы, натальные карты и нумерологические расчёты.
            Откройте новые грани своей личности с помощью древних знаний.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <NuxtLink
              to="/chart"
              class="px-8 py-4 bg-brass-500 hover:bg-brass-400 text-night-950 font-body font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-brass-500/20"
            >
              Рассчитать натальную карту
            </NuxtLink>
            <NuxtLink
              to="/numerology"
              class="px-8 py-4 bg-night-800 hover:bg-night-700 text-starlight font-body font-semibold rounded-xl border border-night-600 transition-all duration-200"
            >
              Нумерологический расчёт
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Актуальные астрологические события -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl font-bold text-starlight mb-4">
          Астрологические события
        </h2>
        <p class="text-starlight/60 font-body text-lg">
          Что происходит на звёздном небе сейчас
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-night-800/40 rounded-2xl p-6 border border-night-700/50">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-lg bg-brass-500/20 flex items-center justify-center"
            >
              <span class="text-brass-400 text-xl">🌑</span>
            </div>
            <h3 class="font-display font-bold text-starlight">
              Луна в {{ currentMoonSign }}
            </h3>
          </div>
          <p class="text-starlight/60 font-body text-sm">
            Луна переходит в знак {{ currentMoonSign }}.
            {{ moonSignDescription[currentMoonSign] }}
          </p>
        </div>

        <div class="bg-night-800/40 rounded-2xl p-6 border border-night-700/50">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-lg bg-clay-500/20 flex items-center justify-center"
            >
              <span class="text-clay-400 text-xl"></span>
            </div>
            <h3 class="font-display font-bold text-starlight">Меркурий</h3>
          </div>
          <p class="text-starlight/60 font-body text-sm">
            {{ mercuryStatus }}
          </p>
        </div>

        <div class="bg-night-800/40 rounded-2xl p-6 border border-night-700/50">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center"
            >
              <span class="text-purple-400 text-xl">♃</span>
            </div>
            <h3 class="font-display font-bold text-starlight">
              Благоприятные дни
            </h3>
          </div>
          <p class="text-starlight/60 font-body text-sm">
            {{ favorableDays }}
          </p>
        </div>
      </div>
    </section>

    <!-- Гороскопы на сегодня -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2
          class="font-display text-3xl md:text-4xl font-bold text-starlight mb-4"
        >
          Гороскоп на сегодня
        </h2>
        <p class="text-starlight/60 font-body text-lg">
          {{ currentDate }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="(sign, index) in zodiacSigns"
          :key="sign.id"
          class="relative h-80 cursor-pointer"
          :class="{ 'animate-pulse-glow': index === 0 && !hasInteracted }"
          @click="toggleSign(sign.id)"
        >
          <!-- ЛИЦЕВАЯ СТОРОНА -->
          <div
            class="absolute inset-0 transition-opacity duration-300"
            :class="
              cardStates[sign.id]
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100 pointer-events-auto'
            "
          >
            <div
              class="h-full bg-night-900/60 backdrop-blur-sm rounded-2xl p-6 border border-night-700/50 hover:border-brass-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div
                class="w-16 h-16 mx-auto mb-4 rounded-full bg-night-800/80 border border-brass-500/20 flex items-center justify-center text-3xl hover:border-brass-400/40 hover:scale-110 transition-all"
              >
                {{ sign.icon }}
              </div>
              <h3 class="font-display text-xl font-bold text-starlight mb-2">
                {{ sign.name }}
              </h3>
              <p class="text-starlight/50 font-body text-xs font-mono mb-4">
                {{ sign.dates }}
              </p>
              <p class="text-starlight/40 text-xs font-body mt-2">
                Нажмите, чтобы узнать гороскоп
              </p>
            </div>
          </div>

          <!-- ОБРАТНАЯ СТОРОНА -->
          <div
            class="absolute inset-0 transition-opacity duration-300"
            :class="
              cardStates[sign.id]
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            "
          >
            <div
              class="h-full bg-night-800/80 backdrop-blur-sm rounded-2xl p-6 border border-brass-500/30 flex flex-col relative"
            >
              <!-- Крестик закрытия -->
              <button
                @click.stop="toggleSign(sign.id)"
                class="absolute top-3 right-3 p-1.5 rounded-full bg-night-700/50 text-starlight/70 hover:text-starlight hover:bg-night-600 transition-colors z-10"
                aria-label="Закрыть гороскоп"
              >
                <svg
                  class="w-4 h-4"
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

              <div
                class="flex-1 flex flex-col justify-center items-center text-center"
              >
                <h3 class="font-display text-lg font-bold text-brass-400 mb-3">
                  {{ sign.name }}
                </h3>
                <p
                  class="text-starlight/80 font-body text-sm leading-relaxed mb-4"
                >
                  {{ sign.horoscope }}
                </p>

                <!-- Индикатор удачи -->
                <div
                  class="flex items-center justify-center gap-2 pt-3 border-t border-night-700/50 w-full"
                >
                  <span class="text-xs text-starlight/50">Удача дня:</span>
                  <div class="flex gap-1">
                    <div
                      v-for="i in sign.luckLevel"
                      :key="i"
                      class="w-2 h-2 rounded-full bg-brass-400"
                    ></div>
                    <div
                      v-for="i in 5 - sign.luckLevel"
                      :key="i"
                      class="w-2 h-2 rounded-full bg-night-700"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Быстрые разделы -->
    <section class="bg-night-900/40 border-y border-night-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Натальная карта -->
          <NuxtLink to="/chart" class="group">
            <div
              class="bg-night-800/40 rounded-2xl p-8 border border-night-700/50 hover:border-brass-500/30 transition-all duration-300 h-full"
            >
              <div
                class="w-14 h-14 rounded-xl bg-gradient-to-br from-brass-400 to-brass-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-7 h-7 text-night-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" stroke-width="2" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 2a10 10 0 0 1 10 10"
                  />
                </svg>
              </div>
              <h3 class="font-display text-xl font-bold text-starlight mb-3">
                Натальная карта
              </h3>
              <p class="text-starlight/60 font-body text-sm leading-relaxed">
                Полный астрологический портрет с положениями планет, домов и
                аспектов
              </p>
            </div>
          </NuxtLink>

          <!-- Нумерология -->
          <NuxtLink to="/numerology" class="group">
            <div
              class="bg-night-800/40 rounded-2xl p-8 border border-night-700/50 hover:border-brass-500/30 transition-all duration-300 h-full"
            >
              <div
                class="w-14 h-14 rounded-xl bg-gradient-to-br from-clay-400 to-clay-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-7 h-7 text-night-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h10M7 12h10M7 17h10M3 7h.01M3 12h.01M3 17h.01M17 7h.01M17 12h.01M17 17h.01"
                  />
                </svg>
              </div>
              <h3 class="font-display text-xl font-bold text-starlight mb-3">
                Нумерология
              </h3>
              <p class="text-starlight/60 font-body text-sm leading-relaxed">
                Расчёт числа жизненного пути и персонального нумерологического
                портрета
              </p>
            </div>
          </NuxtLink>

          <!-- Совместимость -->
          <NuxtLink to="/compatibility" class="group">
            <div
              class="bg-night-800/40 rounded-2xl p-8 border border-night-700/50 hover:border-brass-500/30 transition-all duration-300 h-full"
            >
              <div
                class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-7 h-7 text-night-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 class="font-display text-xl font-bold text-starlight mb-3">
                Совместимость
              </h3>
              <p class="text-starlight/60 font-body text-sm leading-relaxed">
                Анализ совместимости с партнёром по астрологии и нумерологии
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- О проекте -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        class="bg-gradient-to-br from-night-800/60 to-night-900/60 rounded-3xl border border-night-700/50 backdrop-blur-sm"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="p-8">
            <h2 class="font-display text-3xl font-bold text-starlight mb-6">
              Почему <span class="text-brass-400">Astra</span>?
            </h2>
            <div class="space-y-4">
              <div class="flex gap-4">
                <div
                  class="w-6 h-6 rounded-full bg-brass-500/20 flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-4 h-4 text-brass-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-semibold text-starlight mb-1">
                    Точные расчёты
                  </h4>
                  <p class="text-starlight/60 font-body text-sm">
                    Используем профессиональные астрологические алгоритмы
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div
                  class="w-6 h-6 rounded-full bg-brass-500/20 flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-4 h-4 text-brass-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-semibold text-starlight mb-1">
                    Профессиональные трактовки
                  </h4>
                  <p class="text-starlight/60 font-body text-sm">
                    Подробные описания от опытных астрологов
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div
                  class="w-6 h-6 rounded-full bg-brass-500/20 flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <svg
                    class="w-4 h-4 text-brass-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-semibold text-starlight mb-1">
                    PDF-отчёты
                  </h4>
                  <p class="text-starlight/60 font-body text-sm">
                    Скачивайте и сохраняйте свои расчёты
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src="../assets/img/images.jpg" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { generateDailyHoroscope } from "~/constants/horoscope";

const { data: astroData } = await useFetch("/api/astro/current");

// Текущая дата
const currentDate = computed(() => {
  return new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Астрологические данные с сервера
const currentMoonSign = computed(() => astroData.value?.moonSign || "Овен");
const moonSignDescription = computed(() => ({
  [currentMoonSign.value]: astroData.value?.moonSignDescription || "",
}));
const mercuryStatus = computed(() => astroData.value?.mercuryStatus || "");
const favorableDays = computed(() => astroData.value?.favorableDays || "");

// Базовые данные знаков
const baseZodiacSigns = [
  { id: "aries", name: "Овен", icon: "♈", dates: "21 марта — 19 апреля" },
  { id: "taurus", name: "Телец", icon: "♉", dates: "20 апреля — 20 мая" },
  { id: "gemini", name: "Близнецы", icon: "♊", dates: "21 мая — 20 июня" },
  { id: "cancer", name: "Рак", icon: "♋", dates: "21 июня — 22 июля" },
  { id: "leo", name: "Лев", icon: "♌", dates: "23 июля — 22 августа" },
  { id: "virgo", name: "Дева", icon: "♍", dates: "23 августа — 22 сентября" },
  { id: "libra", name: "Весы", icon: "♎", dates: "23 сентября — 22 октября" },
  {
    id: "scorpio",
    name: "Скорпион",
    icon: "♏",
    dates: "23 октября — 21 ноября",
  },
  {
    id: "sagittarius",
    name: "Стрелец",
    icon: "♐",
    dates: "22 ноября — 21 декабря",
  },
  {
    id: "capricorn",
    name: "Козерог",
    icon: "♑",
    dates: "22 декабря — 19 января",
  },
  {
    id: "aquarius",
    name: "Водолей",
    icon: "♒",
    dates: "20 января — 18 февраля",
  },
  { id: "pisces", name: "Рыбы", icon: "♓", dates: "19 февраля — 20 марта" },
];

// Реактивный массив с сгенерированными гороскопами
const zodiacSigns = ref(
  baseZodiacSigns.map((sign) => {
    const today = new Date();
    return {
      ...sign,
      horoscope: generateDailyHoroscope(sign.id, today),
      luckLevel: Math.floor(Math.random() * 3) + 3,
    };
  }),
);

// Объект для хранения состояния каждой карточки
const cardStates = ref<Record<string, boolean>>({});

// Инициализация состояний
baseZodiacSigns.forEach((sign) => {
  cardStates.value[sign.id] = false;
});

// Флаг: было ли взаимодействие с карточками в текущей сессии
const hasInteracted = ref(false);

// Ключ для sessionStorage
const STORAGE_KEY = "astra_horoscope_interacted";

// При монтировании читаем флаг из sessionStorage (только на клиенте)
onMounted(() => {
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    console.log(stored);
    if (stored === "true") {
      hasInteracted.value = true;
    }
  }
});

// Переключение состояния карточки
function toggleSign(signId: string) {
  // Запоминаем факт взаимодействия в sessionStorage
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, "true");
  }
  hasInteracted.value = true;

  // Закрываем все остальные карточки
  Object.keys(cardStates.value).forEach((id) => {
    if (id !== signId) {
      cardStates.value[id] = false;
    }
  });

  // Переключаем текущую
  cardStates.value[signId] = !cardStates.value[signId];
}

// SEO
useHead({
  title: "Astra — Ежедневные гороскопы, натальные карты и нумерология",
  meta: [
    {
      name: "description",
      content:
        "Точные ежедневные гороскопы для всех знаков зодиака. Расчёт натальной карты и нумерологического портрета. Профессиональная астрология онлайн.",
    },
  ],
});
</script>
<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    border-radius: 1rem;
    box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.4);
    border-color: rgba(201, 162, 39, 0.3);
  }
  50% {
    border-radius: 1rem;

    box-shadow: 0 0 20px 5px rgba(201, 162, 39, 0.6);
    border-color: rgba(201, 162, 39, 0.8);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 2.5s ease-in-out infinite;
}

/* Останавливаем пульсацию при наведении */
.animate-pulse-glow:hover {
  animation-play-state: paused;
}
</style>
