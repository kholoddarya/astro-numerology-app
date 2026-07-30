<template>
  <div class="min-h-screen bg-night-950 py-16 px-4">
    <div class="max-w-[1440px] mx-auto">
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-800/50 border border-brass-500/20 backdrop-blur-sm mb-6"
        >
          <span
            class="font-mono text-xs text-brass-400 tracking-widest uppercase"
            >Частые вопросы</span
          >
        </div>
        <h1
          class="font-display text-4xl md:text-5xl font-bold text-starlight mb-4"
        >
          FAQ
        </h1>
        <p class="text-starlight/60 font-body text-lg">
          Ответы на популярные вопросы о сервисе
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-night-900/60 backdrop-blur-sm rounded-2xl border border-night-700/50 overflow-hidden"
        >
          <button
            @click="toggleItem(index)"
            class="w-full px-6 text-left flex justify-between items-center hover:bg-night-800/40 transition-colors"
            style="min-height: 64px; padding-top: 20px; padding-bottom: 20px"
          >
            <span
              class="self-start font-display font-semibold text-starlight pr-4 flex-1 text-left"
              style="text-align: start"
            >
              {{ item.question }}
            </span>
            <svg
              class="w-5 h-5 text-brass-400 flex-shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
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
          <div v-show="openIndex === index" class="px-6 pb-5 animate-fade-in">
            <p
              class="text-starlight/70 font-body text-sm leading-relaxed"
              v-html="item.answer"
            ></p>
          </div>
        </div>
      </div>

      <!-- Блок обратной связи -->
      <div
        class="mt-12 bg-night-900/60 backdrop-blur-sm rounded-2xl p-8 border border-brass-500/20 text-center"
      >
        <h3 class="font-display text-xl font-bold text-starlight mb-3">
          Остались вопросы?
        </h3>
        <p class="text-starlight/60 font-body text-sm mb-4">
          Напишите нам через форму обратной связи, и мы ответим в течение
          нескольких рабочих дней.
        </p>
        <button
          class="px-6 py-3 bg-brass-500 hover:bg-brass-400 text-night-950 font-semibold rounded-xl transition-colors"
        >
          Написать в поддержку
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null);

function toggleItem(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}

const faqItems = [
  {
    question: "Что такое натальная карта?",
    answer:
      "Натальная карта (или карта рождения) — это схема расположения планет Солнечной системы в знаках Зодиака и домах гороскопа на точный момент и место рождения человека. В классической западной астрологии она используется как символическая модель для размышлений о личности, склонностях и жизненных темах человека.",
  },
  {
    question: "Насколько точны ваши расчёты?",
    answer:
      "Астрономическая часть расчётов (положения планет) выполняется с высокой точностью на основе библиотеки astronomy-engine, которая использует стандартные астрономические алгоритмы. Однако интерпретации носят общий характер и предназначены для самопознания, а не для точного предсказания событий.",
  },
  {
    question: "Что такое число жизненного пути в нумерологии?",
    answer:
      "Число жизненного пути — это базовое понятие пифагорейской нумерологии. Оно вычисляется путём последовательного сложения цифр полной даты рождения до получения однозначного числа (или мастер-чисел 11, 22, 33). Считается, что это число отражает основные темы и задачи жизни человека.",
  },
  {
    question: "Можно ли доверять гороскопам?",
    answer:
      "Гороскопы и астрологические материалы нашего сервиса носят развлекательно-познавательный характер. Они не являются научным инструментом и не должны использоваться как основание для принятия важных решений — медицинских, финансовых, юридических или личных. Воспринимайте их как повод для рефлексии и самоанализа.",
  },
  {
    question: "Зачем нужно время рождения?",
    answer:
      "Точное время рождения необходимо для расчёта Асцендента (восходящего знака) и системы домов гороскопа. Без времени рождения можно определить только положение планет в знаках, но нельзя построить полную натальную карту. Если время неизвестно, используется полдень (12:00) как условное значение.",
  },
  {
    question: "Безопасно ли вводить дату рождения?",
    answer:
      "Да. Дата, время и место рождения обрабатываются в соответствии с Федеральным законом №152-ФЗ «О персональных данных». Мы не передаём эти данные третьим лицам и используем их исключительно для формирования вашего персонального отчёта. Подробнее — в Политике конфиденциальности.",
  },
  {
    question: "Что входит в платный отчёт?",
    answer:
      "Платный PDF-отчёт включает подробные трактовки положений всех планет в знаках, анализ Асцендента, нумерологический портрет с разбором числа жизненного пути, раздел о кармических задачах и прогнозе на ближайший период. Бесплатная версия содержит только базовую информацию.",
  },
  {
    question: "Можно ли вернуть деньги за отчёт?",
    answer:
      "Поскольку цифровой контент предоставляется мгновенно после оплаты и не подлежит возврату в соответствии с законодательством РФ, возврат возможен только в случае технической ошибки (например, если отчёт не был сформирован). В таких случаях обратитесь в поддержку.",
  },
  {
    question: "Вы предсказываете будущее?",
    answer:
      "Нет. Наш сервис не занимается предсказанием будущего. Мы предоставляем символические модели и интерпретации, которые могут послужить инструментом для самопознания и размышлений о жизненных приоритетах. Все решения вы принимаете самостоятельно.",
  },
  {
    question: "Как часто обновляются ежедневные гороскопы?",
    answer:
      "Ежедневные гороскопы обновляются раз в сутки. Тексты генерируются алгоритмически на основе астрологических шаблонов с учётом текущей даты, что обеспечивает уникальность содержания каждый день.",
  },
];

useHead({
  title: "FAQ — частые вопросы об Astra",
  meta: [
    {
      name: "description",
      content:
        "Ответы на популярные вопросы о сервисе Astra: натальные карты, нумерология, точность расчётов, безопасность данных.",
    },
  ],
});
</script>

<style scoped>
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
</style>
