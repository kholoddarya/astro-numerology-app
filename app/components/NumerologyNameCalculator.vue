<template>
  <div
    class="w-full mx-auto p-6 sm:p-8 bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 text-slate-100"
  >
    <h2
      class="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-200 via-violet-300 to-indigo-200 bg-clip-text text-transparent"
    >
      Калькулятор числа имени
    </h2>

    <form @submit.prevent="calculate" class="space-y-5">
      <div>
        <label
          class="block text-sm font-medium text-starlight/80 mb-1.5 font-body"
        >
          Ваше полное имя (ФИО)
        </label>
        <input
          v-model="fullName"
          type="text"
          placeholder="Например: Анна Михайловна Иванова"
          class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="isCalculating"
        class="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:via-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span
          v-if="isCalculating"
          class="flex items-center justify-center gap-2"
        >
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Считаем вибрации...
        </span>
        <span v-else>Рассчитать число имени</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  calculateNameNumber,
  NAME_NUMBER_INTERPRETATIONS,
} from "~/constants/numerology";

const emit = defineEmits<{
  (e: "result-ready", result: { number: number; interpretation: any }): void;
}>();

const fullName = ref("");
const isCalculating = ref(false);

function calculate() {
  if (!fullName.value.trim()) return;

  isCalculating.value = true;

  setTimeout(() => {
    const number = calculateNameNumber(fullName.value);
    const interpretation = NAME_NUMBER_INTERPRETATIONS[number] || null;

    // Отправляем результат на родительскую страницу
    emit("result-ready", { number, interpretation });
    isCalculating.value = false;
  }, 600);
}
</script>
