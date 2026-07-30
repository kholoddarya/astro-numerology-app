<template>
  <div class="min-h-screen bg-night-950 py-16 px-4">
    <div class="max-w-[1440px] mx-auto">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-800/50 border border-brass-500/20 backdrop-blur-sm mb-6"
        >
          <span
            class="font-mono text-xs text-brass-400 tracking-widest uppercase"
            >О проекте</span
          >
        </div>
        <h1
          class="font-display text-4xl md:text-5xl font-bold text-starlight mb-4"
        >
          Что такое <span class="text-brass-400">Astra</span>?
        </h1>
        <p class="text-starlight/60 font-body text-lg max-w-2xl mx-auto">
          Сервис для самопознания через классические системы астрологии и
          нумерологии
        </p>
      </div>

      <!-- Основной контент -->
      <div class="space-y-8">
        <section
          class="bg-night-900/60 backdrop-blur-sm rounded-2xl p-8 border border-night-700/50"
        >
          <h2 class="font-display text-2xl font-bold text-brass-400 mb-4">
            Наша миссия
          </h2>
          <p class="text-starlight/80 font-body leading-relaxed">
            Astra — это современный онлайн-сервис, который помогает людям лучше
            узнать себя через классические системы самопознания: западную
            астрологию и пифагорейскую нумерологию. Мы не обещаем предсказать
            будущее или изменить судьбу — мы предлагаем инструмент для
            рефлексии, который веками использовался людьми для лучшего понимания
            своих сильных сторон, склонностей и жизненных приоритетов.
          </p>
        </section>

        <section
          class="bg-night-900/60 backdrop-blur-sm rounded-2xl p-8 border border-night-700/50"
        >
          <h2 class="font-display text-2xl font-bold text-brass-400 mb-4">
            Как это работает
          </h2>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
              >
                1
              </div>
              <div>
                <h3 class="font-display font-semibold text-starlight mb-1">
                  Ввод данных
                </h3>
                <p class="text-starlight/70 font-body text-sm">
                  Вы указываете дату, время и место рождения. Эти данные нужны
                  для точного расчёта положения планет на момент вашего
                  появления на свет.
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
              >
                2
              </div>
              <div>
                <h3 class="font-display font-semibold text-starlight mb-1">
                  Астрономический расчёт
                </h3>
                <p class="text-starlight/70 font-body text-sm">
                  Наш движок на основе библиотеки astronomy-engine вычисляет
                  точные координаты планет в зодиакальной системе координат.
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-brass-500/10 border border-brass-500/30 flex items-center justify-center flex-shrink-0 text-brass-400 font-bold text-lg"
              >
                3
              </div>
              <div>
                <h3 class="font-display font-semibold text-starlight mb-1">
                  Интерпретация
                </h3>
                <p class="text-starlight/70 font-body text-sm">
                  Полученные данные сопоставляются с классическими трактовками,
                  накопленными за centuries изучения астрологической традиции.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          class="bg-night-900/60 backdrop-blur-sm rounded-2xl p-8 border border-night-700/50"
        >
          <h2 class="font-display text-2xl font-bold text-brass-400 mb-4">
            Наши принципы
          </h2>
          <ul class="space-y-3">
            <li class="flex gap-3">
              <svg
                class="w-5 h-5 text-brass-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-starlight/80 font-body text-sm"
                ><strong class="text-starlight"
                  >Научный подход к данным.</strong
                >
                Мы используем точные астрономические алгоритмы для расчёта
                положений небесных тел.</span
              >
            </li>
            <li class="flex gap-3">
              <svg
                class="w-5 h-5 text-brass-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-starlight/80 font-body text-sm"
                ><strong class="text-starlight"
                  >Развлекательно-познавательный характер.</strong
                >
                Наши материалы не являются медицинскими, психологическими или
                финансовыми рекомендациями.</span
              >
            </li>
            <li class="flex gap-3">
              <svg
                class="w-5 h-5 text-brass-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-starlight/80 font-body text-sm"
                ><strong class="text-starlight">Уважение к данным.</strong> Мы
                соблюдаем 152-ФЗ и не передаём персональные данные третьим
                лицам.</span
              >
            </li>
            <li class="flex gap-3">
              <svg
                class="w-5 h-5 text-brass-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-starlight/80 font-body text-sm"
                ><strong class="text-starlight">Свобода выбора.</strong> Все
                решения в жизни вы принимаете самостоятельно, опираясь на свой
                разум и опыт.</span
              >
            </li>
          </ul>
        </section>

        <section
          class="bg-night-900/60 backdrop-blur-sm rounded-2xl p-8 border border-night-700/50"
        >
          <h2 class="font-display text-2xl font-bold text-brass-400 mb-4">
            Для кого этот сервис
          </h2>
          <p class="text-starlight/80 font-body leading-relaxed mb-4">
            Astra будет интересен людям, которые увлекаются самопознанием,
            психологией личности, историей культуры и символическими системами.
            Наши материалы могут послужить отправной точкой для размышлений о
            своих целях, ценностях и жизненных приоритетах.
          </p>
          <p class="text-starlight/60 font-body text-sm italic">
            Мы не рекомендуем использовать материалы сервиса в качестве
            единственного основания для принятия важных жизненных решений —
            медицинских, финансовых или юридических.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "О проекте Astra — астрология и нумерология онлайн",
  meta: [
    {
      name: "description",
      content:
        "Узнайте больше о сервисе Astra: наша миссия, принципы работы и подход к астрологии и нумерологии.",
    },
  ],
});
</script>
