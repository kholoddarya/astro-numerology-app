<template>
  <div class="min-h-screen bg-night-950">
    <!-- Герой секция (единый стиль) -->
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
              >Теория и Знания</span
            >
          </div>

          <h1
            class="text-4xl md:text-5xl font-display font-bold text-starlight leading-tight"
          >
            Мир <span class="text-brass-400">Астрологии</span>
          </h1>

          <p
            class="text-starlight/60 font-body text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Древняя система знаний о влиянии небесных тел на жизнь человека.
            Узнайте основы, чтобы лучше понимать себя и свой потенциал.
          </p>
        </div>
      </div>
    </section>

    <!-- Блок 1: Что такое астрология? -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div
        class="bg-night-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-night-700/50"
      >
        <h2
          class="font-display text-2xl md:text-3xl font-bold text-starlight mb-6 text-center"
        >
          Что такое натальная карта?
        </h2>
        <p
          class="text-starlight/70 font-body text-base leading-relaxed mb-4 text-center"
        >
          Натальная карта (или гороскоп рождения) — это своеобразный
          «космический паспорт» человека. Это схема расположения планет
          Солнечной системы в знаках Зодиака и домах гороскопа на точный момент
          и в точном месте вашего появления на свет.
        </p>
        <p
          class="text-starlight/70 font-body text-base leading-relaxed text-center"
        >
          Астрология не предсказывает фатальное будущее. Она описывает
          <span class="text-brass-400 font-semibold"
            >потенциал, таланты, внутренние конфликты</span
          >
          и благоприятные периоды для реализации ваших целей. Это инструмент для
          глубокого самопознания.
        </p>
      </div>
    </section>

    <!-- Блок 2: 12 Знаков Зодиака (Сетка) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2
          class="font-display text-3xl md:text-4xl font-bold text-starlight mb-4"
        >
          12 Знаков Зодиака
        </h2>
        <p class="text-starlight/60 font-body text-lg">
          Базовые архетипы, через которые проявляются планеты
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="sign in zodiacSigns"
          :key="sign.name"
          class="group bg-night-900/60 backdrop-blur-sm rounded-2xl p-6 border border-night-700/50 hover:border-brass-500/40 transition-all duration-300"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-3xl text-brass-400">{{ sign.symbol }}</span>
            <span
              class="text-[10px] font-mono text-starlight/40 uppercase tracking-wider border border-night-600 px-2 py-1 rounded-full"
            >
              {{ sign.element }}
            </span>
          </div>

          <h3 class="font-display text-xl font-bold text-starlight mb-1">
            {{ sign.name }}
          </h3>
          <p class="text-xs text-starlight/50 font-mono mb-4">
            {{ sign.dates }}
          </p>

          <p class="text-starlight/70 font-body text-sm leading-relaxed">
            {{ sign.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Блок 3: Основные элементы карты -->
    <section class="bg-night-900/40 border-y border-night-700/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
          <h2
            class="font-display text-3xl md:text-4xl font-bold text-starlight mb-4"
          >
            Ключевые точки гороскопа
          </h2>
          <p class="text-starlight/60 font-body text-lg">
            Из чего складывается ваш уникальный портрет
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Солнце -->
          <div
            class="flex gap-5 p-6 bg-night-800/40 rounded-2xl border border-night-700/30"
          >
            <div
              class="w-12 h-12 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-2xl"
            >
              ☉
            </div>
            <div>
              <h3 class="font-display text-lg font-bold text-starlight mb-2">
                Солнце (Ядро личности)
              </h3>
              <p class="text-starlight/70 font-body text-sm leading-relaxed">
                Символизирует ваше эго, жизненную силу, сознательные цели и то,
                как вы проявляете себя в мире. Это ваш основной источник энергии
                и вдохновения.
              </p>
            </div>
          </div>

          <!-- Луна -->
          <div
            class="flex gap-5 p-6 bg-night-800/40 rounded-2xl border border-night-700/30"
          >
            <div
              class="w-12 h-12 rounded-xl bg-clay-500/10 border border-clay-500/30 flex items-center justify-center flex-shrink-0 text-2xl"
            >
              ☽
            </div>
            <div>
              <h3 class="font-display text-lg font-bold text-starlight mb-2">
                Луна (Эмоции и подсознание)
              </h3>
              <p class="text-starlight/70 font-body text-sm leading-relaxed">
                Отвечает за ваши чувства, инстинкты, привычки и потребность в
                безопасности. Показывает, как вы заботитесь о себе и чего ждете
                от близких.
              </p>
            </div>
          </div>

          <!-- Асцендент -->
          <div
            class="flex gap-5 p-6 bg-night-800/40 rounded-2xl border border-night-700/30"
          >
            <div
              class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-2xl text-purple-400 font-bold"
            >
              AC
            </div>
            <div>
              <h3 class="font-display text-lg font-bold text-starlight mb-2">
                Асцендент (Восходящий знак)
              </h3>
              <p class="text-starlight/70 font-body text-sm leading-relaxed">
                Ваша «социальная маска» и первое впечатление, которое вы
                производите на людей. Определяет внешность, стиль поведения и
                общий вектор жизни.
              </p>
            </div>
          </div>

          <!-- Дома -->
          <div
            class="flex gap-5 p-6 bg-night-800/40 rounded-2xl border border-night-700/30"
          >
            <div
              class="w-12 h-12 rounded-xl bg-night-700/50 border border-night-600 flex items-center justify-center flex-shrink-0 text-xl font-mono text-starlight"
            >
              1-12
            </div>
            <div>
              <h3 class="font-display text-lg font-bold text-starlight mb-2">
                12 Домов гороскопа
              </h3>
              <p class="text-starlight/70 font-body text-sm leading-relaxed">
                Сферы жизни, в которых разворачиваются события. От личности и
                финансов (1-8 дома) до партнерства, карьеры и духовного развития
                (9-12 дома).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Блок 4: Как это помогает в жизни -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 class="font-display text-3xl font-bold text-starlight mb-8">
        Зачем знать свою натальную карту?
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div class="p-6">
          <div class="text-brass-400 text-2xl mb-3">🔍</div>
          <h4 class="font-display font-bold text-starlight mb-2">
            Самопознание
          </h4>
          <p class="text-starlight/60 text-sm">
            Понимание своих истинных мотивов, скрытых талантов и зон, требующих
            проработки.
          </p>
        </div>
        <div class="p-6">
          <div class="text-brass-400 text-2xl mb-3">🧭</div>
          <h4 class="font-display font-bold text-starlight mb-2">Выбор пути</h4>
          <p class="text-starlight/60 text-sm">
            Определение профессий, в которых вы достигнете максимального успеха
            и удовлетворения.
          </p>
        </div>
        <div class="p-6">
          <div class="text-brass-400 text-2xl mb-3">⏳</div>
          <h4 class="font-display font-bold text-starlight mb-2">
            Прогнозирование
          </h4>
          <p class="text-starlight/60 text-sm">
            Умение использовать благоприятные периоды для стартапов и пережидать
            сложные транзиты.
          </p>
        </div>
      </div>
    </section>

    <!-- Финальный CTA (мягкий, не продающий в лоб) -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div
        class="bg-gradient-to-br from-night-800/60 to-night-900/60 rounded-3xl p-8 md:p-12 border border-night-700/50 backdrop-blur-sm text-center"
      >
        <h2
          class="font-display text-2xl md:text-3xl font-bold text-starlight mb-4"
        >
          Готовы узнать о себе всё?
        </h2>
        <p class="text-starlight/60 font-body text-lg mb-6 max-w-2xl mx-auto">
          Теория — это прекрасно, но ваш личный гороскоп уникален. Рассчитайте
          свою натальную карту бесплатно прямо сейчас.
        </p>
        <NuxtLink
          to="/chart"
          class="inline-block px-8 py-4 bg-brass-500 hover:bg-brass-400 text-night-950 font-body font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-brass-500/20"
        >
          Рассчитать натальную карту
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const zodiacSigns = [
  {
    name: "Овен",
    symbol: "♈",
    dates: "21.03 – 19.04",
    element: "Огонь",
    description:
      "Импульсивный лидер, первопроходец, обладающий огромной жизненной энергией и смелостью.",
  },
  {
    name: "Телец",
    symbol: "♉",
    dates: "20.04 – 20.05",
    element: "Земля",
    description:
      "Надежный, практичный и чувственный. Ценит стабильность, комфорт и красоту.",
  },
  {
    name: "Близнецы",
    symbol: "♊",
    dates: "21.05 – 20.06",
    element: "Воздух",
    description:
      "Любознательный коммуникатор. Быстро мыслит, адаптируется и обожает обмен информацией.",
  },
  {
    name: "Рак",
    symbol: "♋",
    dates: "21.06 – 22.07",
    element: "Вода",
    description:
      "Чуткий и заботливый. Глубоко привязан к семье, обладает сильной интуицией и воображением.",
  },
  {
    name: "Лев",
    symbol: "♌",
    dates: "23.07 – 22.08",
    element: "Огонь",
    description:
      "Яркий, творческий и великодушный. Стремится быть в центре внимания и вдохновлять других.",
  },
  {
    name: "Дева",
    symbol: "♍",
    dates: "23.08 – 22.09",
    element: "Земля",
    description:
      "Аналитичный перфекционист. Внимание к деталям, служение и стремление к порядку.",
  },
  {
    name: "Весы",
    symbol: "♎",
    dates: "23.09 – 22.10",
    element: "Воздух",
    description:
      "Дипломатичный эстет. Стремится к гармонии, партнерству и справедливости во всем.",
  },
  {
    name: "Скорпион",
    symbol: "♏",
    dates: "23.10 – 21.11",
    element: "Вода",
    description:
      "Интенсивный и проницательный. Обладает мощной волей, страстью и способностью к трансформации.",
  },
  {
    name: "Стрелец",
    symbol: "♐",
    dates: "22.11 – 21.12",
    element: "Огонь",
    description:
      "Оптимистичный искатель истины. Любит свободу, путешествия, философию и расширение горизонтов.",
  },
  {
    name: "Козерог",
    symbol: "♑",
    dates: "22.12 – 19.01",
    element: "Земля",
    description:
      "Амбициозный и дисциплинированный. Строит долгосрочные цели и неуклонно идет к ним.",
  },
  {
    name: "Водолей",
    symbol: "♒",
    dates: "20.01 – 18.02",
    element: "Воздух",
    description:
      "Независимый новатор. Ценит дружбу, оригинальность и идеи, направленные на благо человечества.",
  },
  {
    name: "Рыбы",
    symbol: "♓",
    dates: "19.02 – 20.03",
    element: "Вода",
    description:
      "Сострадательный и мечтательный. Обладает глубокой эмпатией, творческим даром и духовностью.",
  },
];

useHead({
  title: "Основы астрологии: знаки зодиака, планеты и дома гороскопа",
  meta: [
    {
      name: "description",
      content:
        "Узнайте основы астрологии: что такое натальная карта, как влияют знаки зодиака, Солнце, Луна и дома гороскопа на вашу личность и судьбу.",
    },
  ],
});
</script>
