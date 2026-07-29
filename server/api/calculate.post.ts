// server/api/calculate.post.ts
import { MakeTime, EclipticLongitude, Body } from "astronomy-engine";
import { usePrisma } from "../utils/prisma";

const ZODIAC_SIGNS = [
  "Овен",
  "Телец",
  "Близнецы",
  "Рак",
  "Лев",
  "Дева",
  "Весы",
  "Скорпион",
  "Стрелец",
  "Козерог",
  "Водолей",
  "Рыбы",
];

function getZodiacDetails(longitude: number) {
  const signIndex = Math.floor(longitude / 30) % 12;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    absoluteDegree: longitude,
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 1. Безопасное извлечение и очистка данных
  const rawDate = body.birthDate ? String(body.birthDate).trim() : "";
  const rawTime = body.birthTime ? String(body.birthTime).trim() : "12:00";
  const name = body.name ? String(body.name).trim() : "Гость";
  const latitude = body.latitude ? parseFloat(body.latitude) : null;
  const longitude = body.longitude ? parseFloat(body.longitude) : null;

  if (!rawDate || !/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Неверный формат даты. Используйте ГГГГ-ММ-ДД",
    });
  }

  // 2. Явное создание UTC даты для избежания проблем парсинга в Node.js
  const [year, month, day] = rawDate.split("-").map(Number);
  const [hour, minute] = rawTime.split(":").map(Number);

  const dateObj = new Date(
    Date.UTC(year, month - 1, day, hour || 12, minute || 0, 0),
  );

  if (isNaN(dateObj.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: `Невозможно распознать дату и время: ${rawDate} ${rawTime}`,
    });
  }

  const time = MakeTime(dateObj);

  // 3. Расчет нумерологии
  const digitsOnly = rawDate.replace(/\D/g, "");
  let sum = digitsOnly
    .split("")
    .reduce((acc: number, val: string) => acc + parseInt(val, 10), 0);
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc: number, val: string) => acc + parseInt(val, 10), 0);
  }
  const lifePathNumber = sum;

  // 4. Расчет планет (кроме Солнца)
  const bodies = [
    { id: Body.Moon, key: "Moon", label: "Луна" },
    { id: Body.Mercury, key: "Mercury", label: "Меркурий" },
    { id: Body.Venus, key: "Venus", label: "Венера" },
    { id: Body.Mars, key: "Mars", label: "Марс" },
    { id: Body.Jupiter, key: "Jupiter", label: "Юпитер" },
    { id: Body.Saturn, key: "Saturn", label: "Сатурн" },
    { id: Body.Uranus, key: "Uranus", label: "Уран" },
    { id: Body.Neptune, key: "Neptune", label: "Нептун" },
    { id: Body.Pluto, key: "Pluto", label: "Плутон" },
  ];

  const planets = bodies.map((item) => {
    const long = EclipticLongitude(item.id, time);
    const zodiacInfo = getZodiacDetails(long);
    return {
      name: item.key,
      label: item.label,
      sign: zodiacInfo.sign,
      degree: Math.round(zodiacInfo.absoluteDegree * 10) / 10,
    };
  });

  // 5. БЕЗОПАСНЫЙ РАСЧЕТ СОЛНЦА
  // Обходной путь для ошибки astronomy-engine:
  // Геоцентрическая долгота Солнца = Гелиоцентрическая долгота Земли + 180°
  let sunLong = 0;
  try {
    sunLong = EclipticLongitude(Body.Sun, time);
  } catch (e) {
    const earthLong = EclipticLongitude(Body.Earth, time);
    sunLong = (earthLong + 180) % 360;
  }

  const sunZodiac = getZodiacDetails(sunLong);
  planets.unshift({
    name: "Sun",
    label: "Солнце",
    sign: sunZodiac.sign,
    degree: Math.round(sunZodiac.absoluteDegree * 10) / 10,
  });

  // Упрощенный расчет ASC (для MVP)
  const ascendantDegree = Math.round(((sunLong + 90) % 360) * 10) / 10;

  // 6. Сохранение в БД
  const db = usePrisma();

  const reportData = {
    lifePathNumber,
    ascendantDegree,
    planets,
  };

  const newReport = await db.chartReport.create({
    data: {
      birthDate: rawDate,
      birthTime: rawTime,
      latitude,
      longitude,
      locationName: name,
      calculatedData: JSON.stringify(reportData),
      isPremiumUnlocked: false,
    },
  });

  // 7. Возврат данных клиенту
  return {
    success: true,
    reportId: newReport.id,
    data: {
      lifePathNumber,
      freeData: {
        title: `Число судьбы: ${lifePathNumber}`,
        summary:
          "Ваш путь связан с глубоким самопознанием и анализом. Полный разбор всех сфер жизни доступен в премиум-отчёте.",
      },
      ascendantDegree,
      planets,
    },
  };
});
