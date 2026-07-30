// server/api/calculate.post.ts
import { MakeTime, EclipticLongitude, Body } from "astronomy-engine";
import NodeGeocoder from "node-geocoder";
import { usePrisma } from "../utils/prisma";

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  httpAdapter: "https",
});

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

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

function getZodiacDetails(longitude: number) {
  const normalizedLong = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalizedLong / 30) % 12;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    absoluteDegree: normalizedLong,
  };
}

// Математически точный расчет Асцендента по широте, долготе и времени
function calculateAscendant(
  julianDay: number,
  latitude: number,
  longitude: number,
): number {
  const T = (julianDay - 2451545.0) / 36525.0;

  // Гринвичское среднее звездное время (GMST) в градусах
  let gmst =
    280.46061837 +
    360.98564736629 * (julianDay - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;
  gmst = ((gmst % 360) + 360) % 360;

  // Местное звездное время (LST) в градусах
  let lst = gmst + longitude;
  lst = ((lst % 360) + 360) % 360;

  // Наклон эклиптики (eps)
  const eps = 23.439291 - 0.0130042 * T;

  const lstRad = (lst * Math.PI) / 180;
  const epsRad = (eps * Math.PI) / 180;
  const latRad = (latitude * Math.PI) / 180;

  // Формула Асцендента
  const num = Math.cos(lstRad);
  const den = -(
    Math.sin(lstRad) * Math.cos(epsRad) +
    Math.tan(latRad) * Math.sin(epsRad)
  );

  let asc = (Math.atan2(num, den) * 180) / Math.PI;
  asc = ((asc % 360) + 360) % 360;

  return asc;
}

// Расчет Юлианского дня (Julian Day) для астрономических формул
function getJulianDay(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  const jd_frac = (hour - 12) / 24 + minute / 1440;
  return jd + jd_frac;
}

// Функция геокодирования через OpenStreetMap с улучшенной обработкой ошибок
async function geocodeLocation(
  locationName: string,
): Promise<{ latitude: number; longitude: number }> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`;
    console.log(`[GeoCoding] Запрос координат для: "${locationName}"`);

    const response = await fetch(url, {
      headers: {
        // Nominatim требует валидный User-Agent, желательно с email или ссылкой на проект
        "User-Agent": "AstraApp/1.0 (astrology-app@example.com)",
        "Accept": "application/json",
      },
    });

    console.log(response);

    if (!response.ok) {
      console.error(
        `[GeoCoding] HTTP ошибка! Статус: ${response.status}, Текст: ${response.statusText}`,
      );
      throw new Error(`GeoAPI HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      console.log(`[GeoCoding] Успешно найдено: ${data[0].display_name}`);
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }

    console.warn(
      `[GeoCoding] Город "${locationName}" не найден. Используются координаты Москвы.`,
    );
    return { latitude: 55.7558, longitude: 37.6173 };
  } catch (error) {
    console.error("[GeoCoding] Исключение при геокодировании:", error);
    // Критически важно: при любой ошибке возвращаем fallback (Москва), чтобы расчет не сломался
    return { latitude: 55.7558, longitude: 37.6173 };
  }
}

// --- ОСНОВНОЙ ОБРАБОТЧИК ---

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const rawDate = body.birthDate ? String(body.birthDate).trim() : "";
  const rawTime = body.birthTime ? String(body.birthTime).trim() : "12:00";

  let latitude = body.latitude ? parseFloat(body.latitude) : null;
  let longitude = body.longitude ? parseFloat(body.longitude) : null;
  const locationName =
    body.locationName || body.birthPlace
      ? String(body.locationName || body.birthPlace).trim()
      : "Москва";

  if (latitude === null || longitude === null) {
    try {
      console.log(`[GeoCoding] Поиск координат для: "${locationName}"`);

      const result = await geocoder.geocode(locationName);

      if (result && result[0]) {
        latitude = result[0].latitude;
        longitude = result[0].longitude;
      } else {
        latitude = 55.7558;
        longitude = 37.6173;
      }
    } catch (error) {
      // Fallback на Москву
      latitude = 55.7558;
      longitude = 37.6173;
    }
  }

  if (!rawDate || !/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Неверный формат даты. Используйте ГГГГ-ММ-ДД",
    });
  }

  // 2. Создание даты и времени
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
  const julianDay = getJulianDay(year, month, day, hour || 12, minute || 0);

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

  // 4. Расчет планет
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

  // 5. Расчет Солнца
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

  // 6. РАСЧЕТ АСЦЕНДЕНТА И ДОМОВ
  const ascendantDegree =
    Math.round(calculateAscendant(julianDay, latitude, longitude) * 10) / 10;

  // Генерация куспидов домов (Система Целых Знаков / Whole Sign)
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const cuspDegree = (ascendantDegree + i * 30) % 360;
    houses.push({
      houseNumber: i + 1,
      cuspDegree: Math.round(cuspDegree * 10) / 10,
      sign: ZODIAC_SIGNS[Math.floor(cuspDegree / 30) % 12],
    });
  }

  // Определение дома для каждой планеты
  const planetsWithHouses = planets.map((planet) => {
    let planetHouse = 1;
    for (let i = 0; i < 12; i++) {
      const currentCusp = houses[i].cuspDegree;
      const nextCusp = houses[(i + 1) % 12].cuspDegree;

      // Проверка попадания в диапазон дома (с учетом перехода через 360°)
      if (currentCusp < nextCusp) {
        if (planet.degree >= currentCusp && planet.degree < nextCusp) {
          planetHouse = i + 1;
          break;
        }
      } else {
        // Переход через 0° (например, 350° - 20°)
        if (planet.degree >= currentCusp || planet.degree < nextCusp) {
          planetHouse = i + 1;
          break;
        }
      }
    }
    return { ...planet, house: planetHouse };
  });

  // 7. Сохранение в БД (СТРОГО по полям вашей схемы Prisma)
  const db = usePrisma();

  const reportData = {
    lifePathNumber,
    ascendantDegree,
    houses,
    planets: planetsWithHouses,
  };

  const newReport = await db.chartReport.create({
    data: {
      birthDate: rawDate,
      birthTime: rawTime,
      latitude,
      longitude,
      locationName, // Сохраняем название города для PDF
      calculatedData: JSON.stringify(reportData),
      isPremiumUnlocked: false,
    },
  });

  // 8. Возврат данных клиенту
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
      planets: planetsWithHouses,
    },
  };
});
