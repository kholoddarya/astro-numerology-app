<template>
  <div
    class="mx-auto p-6 sm:p-8 bg-night-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-brass-500/20 text-starlight"
  >
    <div class="text-center mb-6">
      <div
        class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brass-500/10 border border-brass-500/30 mb-4"
      >
        <svg
          class="w-7 h-7 text-brass-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-display font-bold text-starlight mb-2">
        Персональный прогноз <span class="text-brass-400">PDF</span>
      </h2>
      <p class="text-starlight/60 font-body text-sm max-w-md mx-auto">
        Узнайте энергию текущего года, месяца и дня на основе вашей даты
        рождения. Подробный разбор с практическими рекомендациями.
      </p>
    </div>

    <form @submit.prevent="handleGenerate" class="space-y-5">
      <div>
        <label
          class="block text-sm font-medium text-starlight/80 mb-1.5 font-body"
        >
          Ваша дата рождения
        </label>
        <input
          v-model="birthDate"
          type="date"
          required
          class="w-full px-4 py-2.5 bg-night-800/80 border border-brass-500/30 rounded-xl text-starlight focus:outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-500/30 transition-all duration-200 [color-scheme:dark]"
        />
      </div>

      <button
        type="submit"
        :disabled="isGenerating || !birthDate"
        class="w-full py-3.5 px-6 bg-gradient-to-r from-brass-600 via-brass-500 to-brass-600 hover:from-brass-500 hover:via-brass-400 hover:to-brass-500 text-night-950 font-body font-bold rounded-xl transition-all duration-200 shadow-lg shadow-brass-500/20 hover:shadow-brass-400/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        <span
          v-if="isGenerating"
          class="flex items-center justify-center gap-2"
        >
          <svg
            class="animate-spin h-5 w-5 text-night-950"
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
          Формируем отчёт...
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Получить PDF за 190 ₽
        </span>
      </button>
    </form>

    <p class="text-center text-starlight/40 text-xs font-mono mt-4">
      Мгновенная отправка • Безопасная оплата (54-ФЗ)
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const birthDate = ref("1999-02-12");
const isGenerating = ref(false);

async function handleGenerate() {
  if (!birthDate.value) return;

  isGenerating.value = true;

  try {
    // Вызов API для генерации PDF
    const response = await $fetch(`/api/forecast/generate`, {
      method: "POST",
      body: { birthDate: birthDate.value },
      responseType: "blob",
    });

    // Создаем ссылку для скачивания
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `numerology-forecast-${birthDate.value}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Здесь можно добавить редирект на страницу успешной оплаты или показать уведомление
  } catch (error) {
    console.error("Ошибка генерации:", error);
    alert("Произошла ошибка при создании отчёта. Попробуйте позже.");
  } finally {
    isGenerating.value = false;
  }
}
</script>
