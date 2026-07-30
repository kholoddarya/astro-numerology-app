<template>
  <div
    class="mx-auto p-6 sm:p-8 bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/20 text-slate-100"
  >
    <h2
      class="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-200 via-violet-300 to-indigo-200 bg-clip-text text-transparent"
    >
      Расчёт совместимости (Синастрия)
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- БЛОК 1: Ваши данные -->
      <div class="space-y-4">
        <h3
          class="text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-purple-500/20 pb-2"
        >
          Ваши данные
        </h3>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1.5"
            >Имя</label
          >
          <input
            v-model="person1.name"
            type="text"
            placeholder="Ваше имя"
            class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5"
              >Дата рождения</label
            >
            <input
              v-model="person1.birthDate"
              type="date"
              class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5"
              >Время рождения <span class="text-slate-400 text-xs"></span
            ></label>
            <input
              v-model="person1.birthTime"
              type="time"
              class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1.5"
            >Место рождения
            <span class="text-purple-400 text-xs">*</span></label
          >
          <input
            v-model="person1.birthPlace"
            type="text"
            placeholder="Например: Москва"
            class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
            required
          />
        </div>
      </div>

      <!-- Разделитель -->
      <div class="flex items-center gap-4">
        <div class="h-px bg-purple-500/20 flex-1"></div>
        <span class="text-purple-400 text-xl">❤️</span>
        <div class="h-px bg-purple-500/20 flex-1"></div>
      </div>

      <!-- БЛОК 2: Данные партнёра -->
      <div class="space-y-4">
        <h3
          class="text-sm font-semibold text-purple-300 uppercase tracking-wider border-b border-purple-500/20 pb-2"
        >
          Данные партнёра
        </h3>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1.5"
            >Имя партнёра</label
          >
          <input
            v-model="person2.name"
            type="text"
            placeholder="Имя партнёра"
            class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5"
              >Дата рождения</label
            >
            <input
              v-model="person2.birthDate"
              type="date"
              class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1.5"
              >Время рождения
            </label>
            <input
              v-model="person2.birthTime"
              type="time"
              class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200 [color-scheme:dark]"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1.5"
            >Место рождения
            <span class="text-purple-400 text-xs">*</span></label
          >
          <input
            v-model="person2.birthPlace"
            type="text"
            placeholder="Например: Санкт-Петербург"
            class="w-full px-4 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
            required
          />
        </div>
      </div>

      <!-- Кнопка отправки -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-3.5 px-6 bg-gradient-to-r from-brass-600 via-brass-500 to-brass-600 hover:from-brass-500 hover:via-brass-400 hover:to-brass-500 text-night-950 font-body font-bold rounded-xl transition-all duration-200 shadow-lg shadow-brass-500/20 hover:shadow-brass-400/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        <span v-if="isLoading" class="flex items-center justify-center gap-2">
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
          Анализируем синастрию...
        </span>
        <span v-else class="flex items-center justify-center gap-2">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Получить PDF-отчёт за 290 ₽
        </span>
      </button>

      <p v-if="errorMessage" class="text-sm text-red-400 text-center mt-2">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const isLoading = ref(false);
const errorMessage = ref("");

const person1 = reactive({
  name: "Дарья",
  birthDate: "1999-02-12",
  birthTime: "10:00",
  birthPlace: "Белгород, Россия",
});

const person2 = reactive({
  name: "Данила",
  birthDate: "1998-05-14",
  birthTime: "12:00",
  birthPlace: "Донецк, Россия",
});

async function handleSubmit() {
  if (
    !person1.birthDate ||
    !person1.birthPlace ||
    !person2.birthDate ||
    !person2.birthPlace
  ) {
    errorMessage.value =
      "Пожалуйста, заполните обязательные поля (дата и место рождения для обоих)";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await $fetch("/api/compatibility/generate", {
      method: "POST",
      body: { person1, person2 },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `compatibility-report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Ошибка генерации:", error);
    errorMessage.value =
      "Произошла ошибка при создании отчёта. Попробуйте позже.";
  } finally {
    isLoading.value = false;
  }
}
</script>
