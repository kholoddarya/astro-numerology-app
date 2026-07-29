<template>
  <div
    class="mx-auto p-6 sm:p-8 bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 text-slate-100"
  >
    <h2
      class="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-200 via-violet-300 to-indigo-200 bg-clip-text text-transparent"
    >
      Бесплатный расчёт
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1.5">
          Имя
        </label>
        <input
          v-model="name"
          type="text"
          placeholder="Введите ваше имя"
          class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1.5">
          Дата рождения
        </label>
        <input
          v-model="birthDate"
          type="date"
          class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
          required
        />
      </div>

      <!-- Дополнительное поле времени (опционально) -->
      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1.5">
          Время рождения (если известно)
        </label>
        <input
          v-model="birthTime"
          type="time"
          class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
        />
      </div>

      <button
        type="submit"
        :disabled="store.loading"
        class="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:via-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <span
          v-if="store.loading"
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
          Считаем звёзды и цифры...
        </span>
        <span v-else>Получить расшифровку</span>
      </button>

      <p v-if="store.error" class="text-sm text-red-400 text-center mt-2">
        {{ store.error }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserReportStore } from "~/stores/userReport";

const store = useUserReportStore();

const name = ref("Дарья");
const birthDate = ref("1999-02-12");
const birthTime = ref("12:00");

async function handleSubmit() {
  if (!birthDate.value) return;

  await store.fetchFullReport({
    name: name.value,
    birthDate: birthDate.value,
    birthTime: birthTime.value,
  });
}
</script>
