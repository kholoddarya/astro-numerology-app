<template>
  <div class="min-h-screen bg-night-950">
    <!-- Герой секция -->
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
              >Нумерология</span
            >
          </div>

          <h1
            class="text-4xl md:text-5xl font-display font-bold text-starlight leading-tight"
          >
            Сила <span class="text-brass-400">имени</span> и чисел
          </h1>

          <p
            class="text-starlight/60 font-body text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Узнайте, какую вибрацию и энергию несёт ваше имя, и получите
            мгновенную расшифровку.
          </p>
        </div>
      </div>
    </section>

    <!-- ВЕРХНЯЯ ЧАСТЬ: Калькулятор (слева) + Результат (справа) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <!-- Левая колонка: Форма -->
        <NumerologyNameCalculator @result-ready="handleResult" />

        <!-- Правая колонка: Карточка результата -->
        <div v-if="result" class="animate-fade-in">
          <div
            class="h-full bg-night-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-brass-500/20 p-6 sm:p-8 text-starlight"
          >
            <div class="text-center mb-6">
              <p
                class="font-mono text-xs text-brass-400 uppercase tracking-widest mb-2"
              >
                Ваше число имени
              </p>
              <div class="text-6xl font-display font-bold text-starlight mb-3">
                {{ result.number }}
              </div>
              <h3 class="font-display text-xl font-bold text-starlight">
                {{ result.interpretation.title }}
              </h3>
            </div>

            <p
              class="text-starlight/80 font-body text-sm leading-relaxed text-center px-2 mb-6"
            >
              {{ result.interpretation.text }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="bg-night-800/60 rounded-xl p-4 border border-brass-500/20"
              >
                <p
                  class="text-brass-400 font-body text-[10px] font-bold uppercase tracking-wider mb-1.5"
                >
                  Сильные стороны
                </p>
                <p class="text-starlight/70 font-body text-xs leading-relaxed">
                  {{ result.interpretation.strengths }}
                </p>
              </div>
              <div
                class="bg-night-800/60 rounded-xl p-4 border border-clay-500/20"
              >
                <p
                  class="text-clay-400 font-body text-[10px] font-bold uppercase tracking-wider mb-1.5"
                >
                  Зоны роста
                </p>
                <p class="text-starlight/70 font-body text-xs leading-relaxed">
                  {{ result.interpretation.challenges }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Заглушка, пока результат не рассчитан -->
        <div
          v-else
          class="hidden lg:flex items-center justify-center h-full min-h-[400px] bg-night-900/40 border border-night-700/50 rounded-3xl"
        >
          <p class="text-starlight/40 font-body text-center px-8">
            Введите ваше имя в форму слева,<br />чтобы увидеть расшифровку здесь
          </p>
        </div>
      </div>
    </section>

    <!-- НИЖНЯЯ ЧАСТЬ: Сетка всех чисел -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2
          class="font-display text-3xl md:text-4xl font-bold text-starlight mb-4"
        >
          Все числа имени
        </h2>
        <p class="text-starlight/60 font-body text-lg">
          Подробные характеристики каждого числа
        </p>
      </div>

      <!-- 1. Всегда видимые карточки (первые 4) -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="item in visibleNumbers"
          :key="item.number"
          class="group bg-night-900/60 backdrop-blur-sm rounded-2xl p-6 border border-night-700/50 hover:border-brass-500/30 transition-all duration-300 cursor-pointer"
          @click="openModal(item.number)"
        >
          <div class="text-center mb-4">
            <div
              class="text-5xl font-display font-bold text-brass-400 mb-2 group-hover:scale-110 transition-transform"
            >
              {{ item.number }}
            </div>
            <h3 class="font-display text-lg font-bold text-starlight">
              {{ item.interpretation.title.split(": ")[1] }}
            </h3>
          </div>

          <p
            class="text-starlight/70 font-body text-sm leading-relaxed mb-4 line-clamp-3"
          >
            {{ item.interpretation.text }}
          </p>

          <div class="space-y-2 pt-4 border-t border-night-700/50">
            <div>
              <p
                class="text-brass-400 font-body text-xs font-semibold mb-1 uppercase"
              >
                Сильные стороны
              </p>
              <p class="text-starlight/60 font-body text-xs">
                {{ item.interpretation.strengths }}
              </p>
            </div>
            <div>
              <p
                class="text-clay-400 font-body text-xs font-semibold mb-1 uppercase"
              >
                Зоны роста
              </p>
              <p class="text-starlight/60 font-body text-xs">
                {{ item.interpretation.challenges }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Скрываемый блок с остальными карточками -->
      <div
        class="smooth-expand-container"
        :class="{ 'is-expanded': isExpanded }"
      >
        <div class="smooth-expand-wrapper">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6"
          >
            <div
              v-for="item in hiddenNumbers"
              :key="item.number"
              class="group bg-night-900/60 backdrop-blur-sm rounded-2xl p-6 border border-night-700/50 hover:border-brass-500/30 transition-all duration-300 cursor-pointer"
              @click="openModal(item.number)"
            >
              <div class="text-center mb-4">
                <div
                  class="text-5xl font-display font-bold text-brass-400 mb-2 group-hover:scale-110 transition-transform"
                >
                  {{ item.number }}
                </div>
                <h3 class="font-display text-lg font-bold text-starlight">
                  {{ item.interpretation.title.split(": ")[1] }}
                </h3>
              </div>

              <p
                class="text-starlight/70 font-body text-sm leading-relaxed mb-4 line-clamp-3"
              >
                {{ item.interpretation.text }}
              </p>

              <div class="space-y-2 pt-4 border-t border-night-700/50">
                <div>
                  <p
                    class="text-brass-400 font-body text-xs font-semibold mb-1 uppercase"
                  >
                    Сильные стороны
                  </p>
                  <p class="text-starlight/60 font-body text-xs">
                    {{ item.interpretation.strengths }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-clay-400 font-body text-xs font-semibold mb-1 uppercase"
                  >
                    Зоны роста
                  </p>
                  <p class="text-starlight/60 font-body text-xs">
                    {{ item.interpretation.challenges }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Кнопка переключения -->
      <div class="flex justify-center mt-10">
        <button
          @click="isExpanded = !isExpanded"
          class="group flex items-center py-3.5 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:via-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span>{{ isExpanded ? "Свернуть" : "Показать все числа" }}</span>
          <svg
            class="w-4 h-4 text-starlight transition-transform duration-300 group-hover:text-brass-300 ml-2"
            :class="{ 'rotate-180': isExpanded }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- ПЛАТНЫЙ ПЕРСОНАЛЬНЫЙ ПРОГНОЗ (Теперь отдельный компонент) -->
    <section class="bg-night-900/40 border-y border-night-700/50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
          <h2
            class="font-display text-3xl md:text-4xl font-bold text-starlight mb-4"
          >
            Расширенный прогноз
          </h2>
          <p class="text-starlight/60 font-body text-lg">
            Получите детальный PDF-отчёт с разбором вашего персонального года,
            месяца и дня
          </p>
        </div>

        <!-- Новый компонент -->
        <PersonalForecastPdf />
      </div>
    </section>

    <!-- CTA блок -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        class="bg-gradient-to-br from-night-800/60 to-night-900/60 rounded-3xl p-8 md:p-12 border border-night-700/50 backdrop-blur-sm text-center"
      >
        <h2 class="font-display text-3xl font-bold text-starlight mb-4">
          Хотите узнать больше?
        </h2>
        <p class="text-starlight/60 font-body text-lg mb-6 max-w-2xl mx-auto">
          Получите полный нумерологический отчёт с разбором числа жизненного
          пути, кармических задач и прогнозом
        </p>
        <NuxtLink
          to="/chart"
          class="inline-block px-8 py-4 bg-brass-500 hover:bg-brass-400 text-night-950 font-body font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-brass-500/20"
        >
          Рассчитать натальную карту
        </NuxtLink>
      </div>
    </section>

    <!-- Модальное окно -->
    <div
      v-if="selectedNumber"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-sm animate-fade-in"
      @click.self="closeModal"
    >
      <div
        class="relative w-full max-w-2xl bg-night-900/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-brass-500/30 shadow-2xl animate-scale-in"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 p-2 rounded-full bg-night-800/50 text-starlight/50 hover:text-starlight hover:bg-night-700/50 transition-colors"
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

        <div class="text-center mb-6">
          <p
            class="font-mono text-xs text-brass-400 uppercase tracking-widest mb-2"
          >
            Нумерологический архетип
          </p>
          <h2
            class="font-display text-4xl md:text-5xl font-bold text-starlight mb-2"
          >
            Число <span class="text-brass-400">{{ selectedNumber }}</span>
          </h2>
          <h3 class="font-display text-xl text-starlight/80">
            {{ selectedInterpretation?.title.split(": ")[1] }}
          </h3>
        </div>

        <div class="space-y-6">
          <p
            class="text-starlight/80 font-body text-base leading-relaxed text-center max-w-lg mx-auto"
          >
            {{ selectedInterpretation?.text }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="bg-night-800/50 rounded-2xl p-5 border border-brass-500/20"
            >
              <h4
                class="font-display text-sm font-bold text-brass-400 uppercase tracking-wider mb-3 flex items-center gap-2"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-brass-400"></span>
                Сильные стороны
              </h4>
              <p class="text-starlight/70 font-body text-sm leading-relaxed">
                {{ selectedInterpretation?.strengths }}
              </p>
            </div>
            <div
              class="bg-night-800/50 rounded-2xl p-5 border border-clay-500/20"
            >
              <h4
                class="font-display text-sm font-bold text-clay-400 uppercase tracking-wider mb-3 flex items-center gap-2"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-clay-400"></span> Зоны
                роста
              </h4>
              <p class="text-starlight/70 font-body text-sm leading-relaxed">
                {{ selectedInterpretation?.challenges }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { NAME_NUMBER_INTERPRETATIONS } from "~/constants/numerology";
import NumerologyNameCalculator from "~/components/NumerologyNameCalculator.vue";
import PersonalForecastPdf from "~/components/PersonalForecastPdf.vue";

// Состояние для результата расчёта имени
const result = ref<{ number: number; interpretation: any } | null>(null);

function handleResult(res: { number: number; interpretation: any }) {
  result.value = res;
  if (window.innerWidth < 1024) {
    setTimeout(() => {
      result.value?.number &&
        document
          .getElementById("result-card")
          ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// Преобразуем объект в массив для удобного разделения на "видимые" и "скрытые"
const allNumbersArray = computed(() => {
  return Object.entries(NAME_NUMBER_INTERPRETATIONS).map(
    ([number, interpretation]) => ({
      number: Number(number),
      interpretation,
    }),
  );
});

// Первые 4 карточки всегда видны
const visibleNumbers = computed(() => allNumbersArray.value.slice(0, 4));
// Остальные карточки скрыты по умолчанию
const hiddenNumbers = computed(() => allNumbersArray.value.slice(4));

// Состояние раскрытия списка
const isExpanded = ref(false);

// Состояние модального окна
const selectedNumber = ref<number | null>(null);
const selectedInterpretation = ref<any>(null);

function openModal(number: number) {
  selectedNumber.value = number;
  selectedInterpretation.value = NAME_NUMBER_INTERPRETATIONS[number];
}

function closeModal() {
  selectedNumber.value = null;
  selectedInterpretation.value = null;
}

useHead({
  title: "Нумерология имени — бесплатный калькулятор и прогноз",
  meta: [
    {
      name: "description",
      content:
        "Узнайте число вашего имени и его значение. Бесплатный калькулятор нумерологии и персональный прогноз.",
    },
  ],
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.smooth-expand-container {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.smooth-expand-container.is-expanded {
  grid-template-rows: 1fr;
}

.smooth-expand-wrapper {
  overflow: hidden;
}
</style>
