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
          Политика конфиденциальности
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
            1. Общие положения
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Настоящая Политика конфиденциальности (далее — Политика) описывает,
            как сервис Astra (далее — Сервис) собирает, использует и защищает
            персональные данные пользователей (далее — Пользователи).
            Использование Сервиса означает согласие Пользователя с условиями
            настоящей Политики.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            2. Какие данные мы собираем
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            Для формирования персонального отчёта мы запрашиваем следующие
            данные:
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>
              Имя (необязательно, используется только для отображения в отчёте)
            </li>
            <li>Дата рождения (обязательно, необходима для расчётов)</li>
            <li>
              Время рождения (опционально, повышает точность расчёта Асцендента)
            </li>
            <li>Место рождения (опционально, географические координаты)</li>
            <li>Адрес электронной почты (только при регистрации аккаунта)</li>
            <li>Технические данные: IP-адрес, тип браузера, cookie-файлы</li>
          </ul>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            3. Цели обработки данных
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            Мы обрабатываем персональные данные исключительно для следующих
            целей:
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>
              Формирование персонального астрологического и нумерологического
              отчёта
            </li>
            <li>
              Сохранение истории расчётов для зарегистрированных пользователей
            </li>
            <li>
              Обработка платежей и предоставление доступа к платному контенту
            </li>
            <li>Улучшение работы Сервиса и анализ статистики посещений</li>
            <li>
              Отправка информационных рассылок (только с согласия Пользователя)
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            4. Правовое основание обработки
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Обработка персональных данных осуществляется в соответствии с
            Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных».
            Правовым основанием является согласие Пользователя, выражаемое путём
            проставления отметки при заполнении формы расчёта или регистрации.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            5. Хранение и защита данных
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Персональные данные хранятся на серверах, расположенных на
            территории Российской Федерации. Мы применяем организационные и
            технические меры для защиты данных от несанкционированного доступа,
            включая шифрование соединений, ограничение доступа персонала и
            регулярное резервное копирование.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            6. Передача данных третьим лицам
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Мы не продаём и не передаём персональные данные Пользователей
            третьим лицам, за исключением случаев, предусмотренных
            законодательством РФ, а также передачи данных платёжным агрегаторам
            (ЮKassa, CloudPayments) исключительно для обработки транзакций.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            7. Cookie-файлы
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            Сервис использует cookie-файлы для следующих целей:
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>Техническое обеспечение работы сайта (сессии, безопасность)</li>
            <li>Аналитика посещений (Яндекс.Метрика, Google Analytics)</li>
            <li>Показ релевантной рекламы (РСЯ, Google AdSense)</li>
          </ul>
          <p class="text-starlight/70 font-body text-sm leading-relaxed mt-3">
            Пользователь может отключить cookie-файлы в настройках браузера,
            однако это может повлиять на функциональность Сервиса.
          </p>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            8. Права Пользователя
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-3">
            В соответствии с 152-ФЗ Пользователь имеет право:
          </p>
          <ul
            class="list-disc list-inside space-y-2 text-starlight/70 font-body text-sm"
          >
            <li>Получать информацию об обработке своих персональных данных</li>
            <li>Требовать уточнения, блокирования или уничтожения данных</li>
            <li>Отозвать согласие на обработку персональных данных</li>
            <li>
              Обжаловать действия оператора в уполномоченный орган
              (Роскомнадзор)
            </li>
          </ul>
        </section>

        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            9. Изменения Политики
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            Мы оставляем за собой право вносить изменения в настоящую Политику.
            Актуальная версия всегда доступна на этой странице. Дата последнего
            обновления указана в начале документа.
          </p>
        </section>

        <!-- ▼▼▼ НОВЫЙ РАЗДЕЛ: СВЕДЕНИЯ ОБ ОПЕРАТОРЕ (для ЮKassa) ▼▼▼ -->
        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-4">
            10. Информация об операторе
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed mb-4">
            Оператором Сервиса и исполнителем по договорам, заключаемым через
            данный сайт, является:
          </p>
          <dl
            class="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-starlight/80 font-body text-sm"
          >
            <dt class="text-starlight/50">Статус</dt>
            <dd>Самозанятый (плательщик налога на профессиональный доход)</dd>

            <dt class="text-starlight/50">ФИО</dt>
            <dd>Холод Дарья Александрона</dd>

            <dt class="text-starlight/50">ИНН</dt>
            <dd class="font-mono tracking-wider">366411262909</dd>

            <dt class="text-starlight/50">E-mail</dt>
            <dd>
              <a
                href="mailto:hlldddddd@yandex.ru"
                class="text-brass-400 hover:text-brass-300 underline underline-offset-4"
                >hlldddddd@yandex.ru</a
              >
            </dd>
          </dl>
          <p class="text-starlight/60 font-body text-xs mt-4 leading-relaxed">
            Приём платежей осуществляется через платёжный сервис ЮKassa (АО
            «Т-Банк»). По всем вопросам оплаты и возврата средств обращайтесь по
            указанному адресу электронной почты.
          </p>
        </section>
        <section>
          <h2 class="font-display text-xl font-bold text-brass-400 mb-3">
            11. Контакты
          </h2>
          <p class="text-starlight/80 font-body text-sm leading-relaxed">
            По всем вопросам, связанным с обработкой персональных данных,
            обращайтесь через форму обратной связи на сайте или на адрес
            электронной почты, указанный в разделе «Информация об операторе».
          </p>
        </section>
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
  title: "Политика конфиденциальности — Astra",
  meta: [
    {
      name: "description",
      content:
        "Политика конфиденциальности сервиса Astra. Как мы собираем, используем и защищаем ваши персональные данные в соответствии с 152-ФЗ.",
    },
  ],
});
</script>
