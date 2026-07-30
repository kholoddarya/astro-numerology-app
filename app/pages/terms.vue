<template>
  <div class="min-h-screen bg-night-950 py-16 px-4">
    <div class="max-w-[1440px] mx-auto">
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-night-800/50 border border-brass-500/20 backdrop-blur-sm mb-6"
        >
          <span
            class="font-mono text-xs text-brass-400 tracking-widest uppercase"
            >Правовая информация</span
          >
        </div>
        <h1
          class="font-display text-4xl md:text-5xl font-bold text-starlight mb-4"
        >
          Условия использования
        </h1>
        <p class="text-starlight/60 font-body text-sm">
          Последнее обновление: {{ lastUpdated }}
        </p>
      </div>

      <div
        class="bg-night-900/60 backdrop-blur-sm rounded-2xl p-8 border border-night-700/50 space-y-8"
      >
        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            1. Принятие условий
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Используя сервис Astra (далее — Сервис), вы подтверждаете, что
            ознакомлены с настоящими Условиями использования (далее — Условия) и
            соглашаетесь с ними. Если вы не согласны с какими-либо положениями,
            пожалуйста, воздержитесь от использования Сервиса.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            2. Характер Сервиса
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            <strong class="text-starlight">Важно:</strong> Сервис Astra носит
            исключительно развлекательно-познавательный характер. Материалы
            Сервиса:
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>Не являются медицинскими рекомендациями или диагнозами</li>
            <li>
              Не являются психологическими или психотерапевтическими
              консультациями
            </li>
            <li>
              Не являются финансовыми, инвестиционными или юридическими советами
            </li>
            <li>
              Не предназначены для предсказания конкретных событий будущего
            </li>
            <li>Не заменяют обращение к квалифицированным специалистам</li>
          </ul>
          <p
            class="text-starlight/70 font-body text-sm leading-relaxed mt-3 italic"
          >
            Все решения, принимаемые вами на основе материалов Сервиса, вы
            несёте самостоятельно и на свой страх и риск.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            3. Возрастные ограничения
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Сервис предназначен для лиц старше 16 лет. Использование Сервиса
            лицами младше указанного возраста допускается только с согласия
            родителей или законных представителей.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            4. Интеллектуальная собственность
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Все материалы Сервиса, включая тексты, изображения, дизайн,
            программный код и алгоритмы расчётов, являются объектами
            интеллектуальной собственности и охраняются законодательством РФ.
            Копирование, распространение и использование материалов без
            письменного разрешения правообладателя запрещено.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            5. Платные услуги
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            Сервис предоставляет как бесплатные, так и платные функции. Оплата
            платных услуг осуществляется через сторонние платёжные агрегаторы
            (ЮKassa, CloudPayments) в соответствии с их условиями.
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>Цены указаны в рублях РФ и включают НДС (если применимо)</li>
            <li>
              Доступ к платному контенту предоставляется мгновенно после оплаты
            </li>
            <li>
              Возврат средств возможен только в случае технической ошибки на
              стороне Сервиса
            </li>
            <li>
              Подписочные услуги можно отменить в любой момент через личный
              кабинет
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            6. Ограничение ответственности
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Сервис предоставляется «как есть» (as is). Администрация Сервиса не
            несёт ответственности за любые прямые или косвенные убытки,
            возникшие в результате использования или невозможности использования
            Сервиса, включая, но не ограничиваясь: упущенную выгоду, потерю
            данных, моральный вред или иные последствия.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            7. Запрещённое использование
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            Пользователю запрещается:
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>
              Использовать Сервис для принятия медицинских решений или
              постановки диагнозов
            </li>
            <li>
              Распространять материалы Сервиса с целью причинения вреда третьим
              лицам
            </li>
            <li>
              Пытаться получить несанкционированный доступ к серверам или данным
              Сервиса
            </li>
            <li>
              Использовать автоматические средства для массового сбора данных
              (скрейпинг)
            </li>
            <li>
              Публиковать материалы Сервиса под своим именем без указания
              источника
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            8. Изменение Условий
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Администрация Сервиса оставляет за собой право изменять настоящие
            Условия в любое время. Новая редакция вступает в силу с момента её
            публикации на сайте. Продолжение использования Сервиса после
            внесения изменений означает согласие Пользователя с новой редакцией.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            9. Применимое право
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Настоящие Условия регулируются законодательством Российской
            Федерации. Все споры, возникающие в связи с использованием Сервиса,
            подлежат разрешению в соответствии с действующим законодательством
            РФ.
          </p>
        </section>

        <!-- Дисклеймер -->
        <div
          class="mt-8 p-6 bg-night-950/60 rounded-xl border border-clay-500/30"
        >
          <h3 class="font-display font-bold text-clay-400 mb-2">
            ⚠ Важное уведомление
          </h3>
          <p class="text-starlight/70 font-body text-sm leading-relaxed">
            Материалы сервиса Astra предназначены исключительно для
            развлекательных и познавательных целей. Астрология и нумерология не
            являются точными науками и не имеют научного подтверждения. Не
            используйте информацию с сайта для принятия важных жизненных решений
            — медицинских, финансовых, юридических или личных. При возникновении
            серьёзных вопросов обращайтесь к квалифицированным специалистам
            соответствующего профиля.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lastUpdated = computed(() => {
  return new Date().toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

useHead({
  title: "Условия использования — Astra",
  meta: [
    {
      name: "description",
      content:
        "Условия использования сервиса Astra. Правовая информация, ограничения ответственности, правила использования.",
    },
  ],
});
</script>
