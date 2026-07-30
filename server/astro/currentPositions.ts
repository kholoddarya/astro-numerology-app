// server/astro/currentPositions.ts
import { MakeTime, EclipticLongitude, Body, Search } from "astronomy-engine";

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

const MOON_SIGN_DESCRIPTIONS: Record<string, string> = {
  "Овен": "Время для активных действий и новых начинаний. Энергия бьёт ключом!",
  "Телец": "Благоприятный период для финансовых вопросов и материальных дел.",
  "Близнецы": "Отличное время для общения, обучения и коротких поездок.",
  "Рак": "Сосредоточьтесь на семье, доме и эмоциональном комфорте.",
  "Лев": "Время творчества, самовыражения и романтических приключений.",
  "Дева": "День для наведения порядка в делах и внимания к деталям.",
  "Весы": "Гармония и баланс в отношениях. Время дипломатии.",
  "Скорпион": "Глубокие трансформации, инсайты и интенсивные эмоции.",
  "Стрелец": "Расширение горизонтов, путешествия и философские размышления.",
  "Козерог": "Дисциплина, работа над долгосрочными целями и амбиции.",
  "Водолей": "Нестандартные решения, инновации и свобода мышления.",
  "Рыбы": "Интуиция на высоте, время для духовных практик и творчества.",
};

// Периоды ретроградного Меркурия на 2026 год
const MERCURY_RETROGRADE_2026 = [
  { start: new Date("2026-03-15"), end: new Date("2026-04-07") },
  { start: new Date("2026-07-18"), end: new Date("2026-08-11") },
  { start: new Date("2026-11-09"), end: new Date("2026-12-02") },
];

export function getCurrentMoonSign(): string {
  const now = new Date();
  const time = MakeTime(now);

  // Получаем долготу Луны
  const moonLongitude = EclipticLongitude(Body.Moon, time);

  // Определяем знак (каждый знак = 30 градусов)
  const signIndex = Math.floor(moonLongitude / 30) % 12;

  return ZODIAC_SIGNS[signIndex];
}

export function getMoonSignDescription(sign: string): string {
  return MOON_SIGN_DESCRIPTIONS[sign] || "";
}

export function getMercuryStatus(): { status: string; isRetrograde: boolean } {
  const today = new Date();

  const isRetrograde = MERCURY_RETROGRADE_2026.some(
    (period) => today >= period.start && today <= period.end,
  );

  if (isRetrograde) {
    return {
      status:
        "Ретроградный! Будьте внимательны в общении, документах и договорах. Не начинайте важных дел.",
      isRetrograde: true,
    };
  }

  return {
    status:
      "Прямое движение. Отличное время для переговоров, подписания договоров и новых начинаний.",
    isRetrograde: false,
  };
}

export function getFavorableDays(): string {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = воскресенье, 1 = понедельник и т.д.

  // Благоприятные дни недели (например, четверг и воскресенье)
  const favorableDaysList = [
    { day: 0, name: "воскресенье" },
    { day: 4, name: "четверг" },
  ];

  const isTodayFavorable = favorableDaysList.some((d) => d.day === dayOfWeek);

  // Находим следующий благоприятный день
  let nextFavorable = "";
  for (let i = 1; i <= 7; i++) {
    const nextDay = (dayOfWeek + i) % 7;
    const found = favorableDaysList.find((d) => d.day === nextDay);
    if (found) {
      nextFavorable = found.name;
      break;
    }
  }

  if (isTodayFavorable) {
    return `Сегодня — благоприятный день! Также удача ${nextFavorable}.`;
  }

  return `Сегодня и ${nextFavorable} — удачные дни для важных решений.`;
}

export function getDailyAstroData() {
  const moonSign = getCurrentMoonSign();
  const mercury = getMercuryStatus();

  return {
    moonSign,
    moonSignDescription: getMoonSignDescription(moonSign),
    mercuryStatus: mercury.status,
    isMercuryRetrograde: mercury.isRetrograde,
    favorableDays: getFavorableDays(),
    date: new Date().toLocaleDateString("ru-RU"),
  };
}
