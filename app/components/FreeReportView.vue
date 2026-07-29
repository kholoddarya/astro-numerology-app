<template>
  <div v-if="report" class="w-full max-w-2xl mx-auto space-y-6">
    <!-- 1. Основная карточка с бесплатным отчётом (тёмная версия) -->
    <div
      class="bg-night-900/80 backdrop-blur-xl text-starlight rounded-2xl p-6 md:p-8 shadow-2xl border border-brass-500/20 relative overflow-hidden"
    >
      <!-- Декоративные уголки -->
      <div class="absolute top-2 left-2 text-brass-400/30 font-mono text-xs">
        ┌
      </div>
      <div
        class="absolute top-2 right-2 text-brass-400/30 font-mono text-xs"
      ></div>
      <div class="absolute bottom-2 left-2 text-brass-400/30 font-mono text-xs">
        └
      </div>
      <div
        class="absolute bottom-2 right-2 text-brass-400/30 font-mono text-xs"
      >
        ┘
      </div>

      <!-- Мета-данные -->
      <div
        class="flex justify-between items-center border-b border-night-700/50 pb-4 mb-6 font-mono text-xs text-brass-400/60"
      >
        <span>КАРТА: {{ report.userName || "ГОСТЬ" }}</span>
        <span>ЧИСЛО СУДЬБЫ: [ {{ report.lifePathNumber }} ]</span>
      </div>

      <!-- Главный заголовок и трактовка -->
      <div class="space-y-3">
        <h3
          class="text-2xl md:text-3xl font-display font-bold text-starlight leading-tight"
        >
          {{ report.freeData.title }}
        </h3>
        <p class="font-body text-starlight/70 leading-relaxed text-base">
          {{ report.freeData.summary }}
        </p>
      </div>

      <!-- Дополнительные тезисы -->
      <div
        class="mt-6 pt-6 border-t border-night-700/50 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div class="p-3 bg-night-950/60 rounded-lg border border-night-700/50">
          <span class="block font-mono text-xs text-brass-400 uppercase"
            >Сильная сторона</span
          >
          <span class="font-body text-sm font-semibold text-starlight"
            >Интуиция и стратегический анализ</span
          >
        </div>
        <div class="p-3 bg-night-950/60 rounded-lg border border-night-700/50">
          <span class="block font-mono text-xs text-clay-400 uppercase"
            >Точка роста</span
          >
          <span class="font-body text-sm font-semibold text-starlight"
            >Преодоление сомнений в действиях</span
          >
        </div>
      </div>
    </div>

    <!-- 2. Блок Paywall -->
    <div
      class="relative bg-night-800/60 backdrop-blur-sm border border-brass-500/30 rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl"
    >
      <!-- Размытый премиум-контент -->
      <div
        class="filter blur-[4px] select-none opacity-25 space-y-3 pointer-events-none"
        aria-hidden="true"
      >
        <h4 class="font-display text-xl text-starlight">
          Полный кармический разбор и финансовые ключи
        </h4>
        <p class="font-mono text-xs text-starlight">
          В периоде 2026-2027 годов Юпитер проходит через ваш 10-й дом
          призвания. Это создаёт уникальный коридор для роста доходов через...
        </p>
        <p class="font-mono text-xs text-starlight">
          Совместимость с ключевыми знаками: наилучший союз для бизнеса с Числом
          3, в личной жизни — с Числом 9...
        </p>
      </div>

      <!-- Paywall оверлей -->
      <div
        class="absolute inset-0 bg-night-950/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center space-y-4"
      >
        <div
          class="w-12 h-12 rounded-full bg-brass-500/10 border border-brass-400/50 flex items-center justify-center text-brass-400"
        >
          <span class="font-mono text-lg">🔒</span>
        </div>

        <div class="space-y-1">
          <h4 class="font-display text-xl md:text-2xl font-bold text-starlight">
            Откройте полный отчёт
          </h4>
          <p class="font-body text-sm text-starlight/60 max-w-md">
            Детальный разбор всех 12 домов, карьерный прогноз, финансовые циклы
            и персональная совместимость
          </p>
        </div>

        <!-- Кнопка -->
        <button
          @click="handleUnlock"
          :disabled="isProcessing"
          class="px-8 py-3.5 bg-brass-500 hover:bg-brass-400 disabled:bg-brass-600 disabled:cursor-not-allowed text-night-950 font-body font-bold rounded-xl transition duration-200 shadow-lg shadow-brass-500/20 transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span v-if="isProcessing">
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
          </span>
          <span v-else>Разблокировать за 390 ₽</span>
        </button>

        <span
          class="font-mono text-[10px] text-starlight/40 uppercase tracking-widest"
        >
          Мгновенный доступ • Безопасная оплата (54-ФЗ)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserReportStore } from "~/stores/userReport";

const store = useUserReportStore();
const report = computed(() => store.report);
const isProcessing = ref(false);

async function handleUnlock() {
  if (!report.value?.reportId) return;

  isProcessing.value = true;

  try {
    // 1. Эмуляция запроса к платёжному шлюзу и обновление статуса в БД
    // В реальности здесь был бы вызов вашего API для создания сессии ЮKassa
    await $fetch(`/api/report/${report.value.reportId}/unlock`, {
      method: "POST",
    });

    // 2. Обновляем локальный стейт
    store.report!.isPremiumUnlocked = true;

    // 3. Инициируем скачивание PDF
    // Создаем невидимую ссылку и кликаем по ней
    const pdfUrl = `/api/report/${report.value.reportId}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `astra-otchet-${report.value.reportId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Ошибка при разблокировке:", error);
    alert("Произошла ошибка при обработке платежа");
  } finally {
    isProcessing.value = false;
  }
}
</script>
