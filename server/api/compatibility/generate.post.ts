// server/api/compatibility/generate.post.ts
import PDFDocument from "pdfkit";
import NodeGeocoder from "node-geocoder";
import { MakeTime, EclipticLongitude, Body } from "astronomy-engine";
import path from "path";

const COLORS = {
  parchment: "#FBF8F0",
  parchmentDark: "#F7F3E8",
  night: "#080B1A",
  nightSoft: "#172142",
  brass: "#C9A227",
  brassDark: "#A6821A",
  clay: "#B7565C",
  claySoft: "#C97B80",
  border: "#EDE6D3",
};

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

const ELEMENTS: Record<string, string> = {
  "Овен": "Огонь",
  "Лев": "Огонь",
  "Стрелец": "Огонь",
  "Телец": "Земля",
  "Дева": "Земля",
  "Козерог": "Земля",
  "Близнецы": "Воздух",
  "Весы": "Воздух",
  "Водолей": "Воздух",
  "Рак": "Вода",
  "Скорпион": "Вода",
  "Рыбы": "Вода",
};

// Инициализация геокодера
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  httpAdapter: "https",
});

// Функция геокодирования
async function geocodeLocation(
  locationName: string,
): Promise<{ latitude: number; longitude: number }> {
  try {
    const result = await geocoder.geocode(locationName);
    if (result && result[0]) {
      return {
        latitude: result[0].latitude,
        longitude: result[0].longitude,
      };
    }
    return { latitude: 55.7558, longitude: 37.6173 };
  } catch (error) {
    console.error("[GeoCoding] Error:", error);
    return { latitude: 55.7558, longitude: 37.6173 };
  }
}

// Расчет планет
function calculatePlanets(dateObj: Date) {
  const time = MakeTime(dateObj);

  const bodies = [
    { id: Body.Moon, key: "Moon", label: "Луна" },
    { id: Body.Mercury, key: "Mercury", label: "Меркурий" },
    { id: Body.Venus, key: "Venus", label: "Венера" },
    { id: Body.Mars, key: "Mars", label: "Марс" },
    { id: Body.Jupiter, key: "Jupiter", label: "Юпитер" },
    { id: Body.Saturn, key: "Saturn", label: "Сатурн" },
  ];

  const planets = bodies.map((item) => {
    const long = EclipticLongitude(item.id, time);
    const normalizedLong = ((long % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLong / 30) % 12;
    return {
      name: item.key,
      label: item.label,
      sign: ZODIAC_SIGNS[signIndex],
      degree: Math.round(normalizedLong * 10) / 10,
    };
  });

  // Солнце
  let sunLong = 0;
  try {
    sunLong = EclipticLongitude(Body.Sun, time);
  } catch (e) {
    const earthLong = EclipticLongitude(Body.Earth, time);
    sunLong = (earthLong + 180) % 360;
  }
  const sunNormalized = ((sunLong % 360) + 360) % 360;
  const sunSignIndex = Math.floor(sunNormalized / 30) % 12;
  planets.unshift({
    name: "Sun",
    label: "Солнце",
    sign: ZODIAC_SIGNS[sunSignIndex],
    degree: Math.round(sunNormalized * 10) / 10,
  });

  return planets;
}

// Расчет аспекта между двумя планетами
function calculateAspect(
  degree1: number,
  degree2: number,
): { type: string; orb: number } {
  let diff = Math.abs(degree1 - degree2);
  if (diff > 180) diff = 360 - diff;

  const aspects = [
    { type: "Соединение", angle: 0, orb: 8 },
    { type: "Секстиль", angle: 60, orb: 6 },
    { type: "Квадрат", angle: 90, orb: 7 },
    { type: "Трин", angle: 120, orb: 8 },
    { type: "Оппозиция", angle: 180, orb: 8 },
  ];

  for (const aspect of aspects) {
    const orb = Math.abs(diff - aspect.angle);
    if (orb <= aspect.orb) {
      return { type: aspect.type, orb: Math.round(orb * 10) / 10 };
    }
  }

  return { type: "Нет аспекта", orb: 0 };
}

// Интерпретации аспектов
const ASPECT_INTERPRETATIONS: Record<string, Record<string, string>> = {
  "Соединение": {
    "Sun-Sun":
      "Ваши жизненные цели и эго тесно переплетены. Вы понимаете друг друга на глубоком уровне, но можете конкурировать за внимание.",
    "Sun-Moon":
      "Глубокая эмоциональная связь. Партнер чувствует ваши потребности интуитивно, создавая ощущение домашнего уюта.",
    "Sun-Venus":
      "Сильное романтическое притяжение. Вы вдохновляете друг друга и наслаждаетесь совместным творчеством.",
    "Sun-Mars":
      "Динамичная энергия в паре. Вы мотивируете друг друга к действию, но возможны конфликты из-за лидерства.",
    "Moon-Moon":
      "Эмоциональное родство. Вы понимаете чувства друг друга без слов, создавая безопасное пространство.",
    "Moon-Venus":
      "Нежность и забота в отношениях. Вы естественно выражаете любовь и создаете гармонию.",
    "Moon-Mars":
      "Страстная эмоциональная связь. Возможны резкие перепады настроения, но и глубокая интенсивность чувств.",
    "Venus-Venus":
      "Эстетическое и романтическое согласие. Вы разделяете ценности красоты и удовольствия.",
    "Venus-Mars":
      "Сексуальное и романтическое притяжение. Сильная физическая химия и страсть.",
    "Mars-Mars":
      "Энергичное партнерство. Вы вместе достигаете целей, но можете соперничать.",
  },
  "Секстиль": {
    "Sun-Sun":
      "Гармоничное взаимодействие жизненных целей. Вы поддерживаете амбиции друг друга.",
    "Sun-Moon":
      "Баланс между активностью и эмоциональностью. Партнер дополняет ваш характер.",
    "Sun-Venus":
      "Легкость в выражении чувств. Вы естественно дарите друг другу радость.",
    "Sun-Mars":
      "Конструктивная энергия. Вы вместе решаете задачи без лишних конфликтов.",
    "Moon-Moon":
      "Эмоциональная совместимость. Вы комфортно чувствуете себя в присутствии друг друга.",
    "Moon-Venus":
      "Нежная забота. Вы интуитивно понимаете, как порадовать партнера.",
    "Moon-Mars":
      "Страсть с балансом. Интенсивные чувства без разрушительных конфликтов.",
    "Venus-Venus":
      "Романтическая гармония. Вы разделяете эстетические предпочтения.",
    "Venus-Mars":
      "Сбалансированная страсть. Физическое притяжение с эмоциональной глубиной.",
    "Mars-Mars":
      "Сотрудничество в действиях. Вы эффективно работаете вместе над общими целями.",
  },
  "Квадрат": {
    "Sun-Sun":
      "Конфликт эго и жизненных целей. Вам нужно учиться уважать различия.",
    "Sun-Moon":
      "Напряжение между активностью и эмоциями. Партнер может казаться непонятным.",
    "Sun-Venus":
      "Различия в выражении любви. Нужно находить компромисс в романтике.",
    "Sun-Mars": "Борьба за лидерство. Возможны конфликты из-за контроля.",
    "Moon-Moon": "Эмоциональные трения. Вы по-разному реагируете на ситуации.",
    "Moon-Venus":
      "Различия в потребностях нежности. Нужно учиться понимать язык любви партнера.",
    "Moon-Mars": "Эмоциональные вспышки. Страсть может переходить в конфликты.",
    "Venus-Venus":
      "Различия в ценностях красоты и любви. Нужно находить общий вкус.",
    "Venus-Mars":
      "Напряжение между нежностью и страстью. Баланс между романтикой и физикой.",
    "Mars-Mars":
      "Конфликты в действиях. Вы можете мешать друг другу достигать целей.",
  },
  "Трин": {
    "Sun-Sun":
      "Естественная гармония жизненных путей. Вы легко поддерживаете друг друга.",
    "Sun-Moon":
      "Глубокое понимание. Партнер интуитивно чувствует ваши потребности.",
    "Sun-Venus":
      "Романтическая легкость. Вы естественно выражаете любовь и признательность.",
    "Sun-Mars":
      "Конструктивная энергия. Вы вместе достигаете целей без трений.",
    "Moon-Moon":
      "Эмоциональное родство. Вы чувствуете себя как дома друг с другом.",
    "Moon-Venus": "Нежная забота. Вы создаете гармонию и уют в отношениях.",
    "Moon-Mars":
      "Страсть с глубиной. Интенсивные чувства с эмоциональной связью.",
    "Venus-Venus":
      "Эстетическое согласие. Вы разделяете любовь к красоте и искусству.",
    "Venus-Mars":
      "Идеальный баланс нежности и страсти. Гармоничная физическая и эмоциональная связь.",
    "Mars-Mars": "Эффективное партнерство. Вы вместе достигаете больших высот.",
  },
  "Оппозиция": {
    "Sun-Sun":
      "Противоположности притягиваются. Вы дополняете друг друга, но нужны компромиссы.",
    "Sun-Moon":
      "Баланс активности и эмоций. Партнер показывает вам другую сторону жизни.",
    "Sun-Venus":
      "Различия в любви, которые обогащают. Вы учитесь новому через партнера.",
    "Sun-Mars":
      "Динамичное напряжение. Конфликты ведут к росту, если управлять ими мудро.",
    "Moon-Moon":
      "Эмоциональные противоположности. Вы чувствуете то, что партнер не выражает.",
    "Moon-Venus":
      "Различия в нежности. Нужно учиться говорить на языке любви друг друга.",
    "Moon-Mars":
      "Интенсивные эмоциональные волны. Страсть и глубина через преодоление трений.",
    "Venus-Venus":
      "Разные подходы к любви. Вы расширяете представления друг друга о романтике.",
    "Venus-Mars":
      "Магнетическое притяжение противоположностей. Сильная химия через различия.",
    "Mars-Mars":
      "Конструктивное соперничество. Вы мотивируете друг друга через вызовы.",
  },
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { person1, person2 } = body;

  if (
    !person1?.birthDate ||
    !person1?.birthPlace ||
    !person2?.birthDate ||
    !person2?.birthPlace
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Заполните обязательные поля для обоих партнеров",
    });
  }

  // Геокодирование мест
  const coords1 = await geocodeLocation(person1.birthPlace);
  const coords2 = await geocodeLocation(person2.birthPlace);

  // Создание дат
  const [year1, month1, day1] = person1.birthDate.split("-").map(Number);
  const [hour1, minute1] = (person1.birthTime || "12:00")
    .split(":")
    .map(Number);
  const date1 = new Date(
    Date.UTC(year1, month1 - 1, day1, hour1 || 12, minute1 || 0, 0),
  );

  const [year2, month2, day2] = person2.birthDate.split("-").map(Number);
  const [hour2, minute2] = (person2.birthTime || "12:00")
    .split(":")
    .map(Number);
  const date2 = new Date(
    Date.UTC(year2, month2 - 1, day2, hour2 || 12, minute2 || 0, 0),
  );

  // Расчет планет
  const planets1 = calculatePlanets(date1);
  const planets2 = calculatePlanets(date2);

  // Расчет аспектов между личными планетами
  const personalPlanets = ["Sun", "Moon", "Venus", "Mars"];
  const aspects = [];

  for (const planet1 of personalPlanets) {
    for (const planet2 of personalPlanets) {
      const p1 = planets1.find((p) => p.name === planet1);
      const p2 = planets2.find((p) => p.name === planet2);

      if (p1 && p2) {
        const aspect = calculateAspect(p1.degree, p2.degree);
        if (aspect.type !== "Нет аспекта") {
          aspects.push({
            planet1: p1.label,
            planet2: p2.label,
            aspect: aspect.type,
            orb: aspect.orb,
            key: `${planet1}-${planet2}`,
          });
        }
      }
    }
  }

  // Генерация PDF
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 45, right: 45 },
    info: {
      Title: `Совместимость: ${person1.name} и ${person2.name}`,
      Author: "Astra App",
    },
    bufferPages: true,
  });

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="compatibility-report.pdf"`,
  );

  const fontPath = path.join(process.cwd(), "server/fonts");
  try {
    doc.registerFont(
      "Roboto-Regular",
      path.join(fontPath, "Roboto-Regular.ttf"),
    );
    doc.registerFont("Roboto-Bold", path.join(fontPath, "Roboto-Bold.ttf"));
    doc.font("Roboto-Regular");
  } catch (e) {
    console.warn("Шрифты не найдены, используется стандартный");
  }

  const drawBackground = () => {
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.parchment);
    doc
      .lineWidth(2)
      .strokeColor(COLORS.brass)
      .rect(25, 25, doc.page.width - 50, doc.page.height - 50)
      .stroke();
    doc
      .lineWidth(0.5)
      .strokeColor(COLORS.brassDark)
      .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
      .stroke();
  };

  drawBackground();
  doc.y = 80;

  doc.on("pageAdded", () => {
    drawBackground();
    doc.y = 60;
  });

  // Заголовок
  doc
    .font("Roboto-Bold")
    .fontSize(20)
    .fill(COLORS.night)
    .text("АСТРОЛОГИЧЕСКАЯ СОВМЕСТИМОСТЬ", { align: "center" });
  doc.moveDown(0.3);
  doc
    .font("Roboto-Regular")
    .fontSize(11)
    .fill(COLORS.brassDark)
    .text(`${person1.name.toUpperCase()} & ${person2.name.toUpperCase()}`, {
      align: "center",
    });
  doc.moveDown(0.2);
  doc
    .fontSize(9)
    .fill(COLORS.nightSoft)
    .text(`Дата расчёта: ${new Date().toLocaleDateString("ru-RU")}`, {
      align: "center",
    });
  doc.moveDown(0.8);

  doc
    .moveTo(55, doc.y)
    .lineTo(doc.page.width - 55, doc.y)
    .strokeColor(COLORS.brass)
    .stroke();
  doc.moveDown(0.8);

  // Данные партнеров
  doc
    .font("Roboto-Bold")
    .fontSize(12)
    .fill(COLORS.night)
    .text("ДАННЫЕ ПАРТНЕРОВ");
  doc.moveDown(0.3);

  doc.font("Roboto-Regular").fontSize(9).fill(COLORS.nightSoft);
  doc.text(`${person1.name} | ${person1.birthDate} | ${person1.birthPlace}`, {
    align: "center",
  });
  doc.text(`${person2.name} | ${person2.birthDate} | ${person2.birthPlace}`, {
    align: "center",
  });
  doc.moveDown(0.8);

  // Сравнение стихий
  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("СРАВНЕНИЕ СТИХИЙ");
  doc.moveDown(0.3);

  const sun1 = planets1.find((p) => p.name === "Sun");
  const sun2 = planets2.find((p) => p.name === "Sun");
  const moon1 = planets1.find((p) => p.name === "Moon");
  const moon2 = planets2.find((p) => p.name === "Moon");

  if (sun1 && sun2) {
    const elem1 = ELEMENTS[sun1.sign];
    const elem2 = ELEMENTS[sun2.sign];
    doc.font("Roboto-Regular").fontSize(9).fill(COLORS.nightSoft);
    doc.text(`Солнце ${person1.name}: ${sun1.sign} (${elem1})`);
    doc.text(`Солнце ${person2.name}: ${sun2.sign} (${elem2})`);
    doc.moveDown(0.2);

    const compatibility = {
      "Огонь-Огонь":
        "Две огненные натуры создают мощную энергию и страсть. Вы вдохновляете друг друга, но можете соперничать.",
      "Огонь-Воздух":
        "Отличная совместимость! Воздух раздувает пламя Огня. Вы вместе создаете идеи и воплощаете их.",
      "Огонь-Земля":
        "Противоположности, которые могут дополнять друг друга. Огонь дает энергию, Земля — стабильность.",
      "Огонь-Вода":
        "Сложное сочетание. Вода может тушить Огонь, но при балансе создает пар и трансформацию.",
      "Воздух-Воздух":
        "Интеллектуальная гармония. Вы обмениваетесь идеями и поддерживаете свободу друг друга.",
      "Воздух-Земля":
        "Практичное партнерство. Воздух приносит идеи, Земля их реализует.",
      "Воздух-Вода":
        "Эмоциональная глубина с интеллектом. Вы понимаете друг друга на разных уровнях.",
      "Земля-Земля":
        "Надежный фундамент. Вы строите стабильные и долгосрочные отношения.",
      "Земля-Вода":
        "Плодотворное сочетание. Вода питает Землю, создавая рост и изобилие.",
      "Вода-Вода":
        "Глубокая эмоциональная связь. Вы чувствуете друг друга интуитивно.",
    };

    const key = `${elem1}-${elem2}`;
    const reverseKey = `${elem2}-${elem1}`;
    const interpretation =
      compatibility[key] ||
      compatibility[reverseKey] ||
      "Уникальное сочетание стихий.";

    doc.moveDown(0.2);
    doc
      .font("Roboto-Regular")
      .fontSize(8.5)
      .fill(COLORS.nightSoft)
      .text(interpretation, { align: "justify", lineGap: 2 });
  }

  doc.moveDown(0.8);

  // Аспекты личных планет
  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("СИНАСТРИЯ ЛИЧНЫХ ПЛАНЕТ");
  doc.moveDown(0.3);

  if (aspects.length > 0) {
    aspects.forEach((aspect, index) => {
      const interpretation =
        ASPECT_INTERPRETATIONS[aspect.aspect]?.[aspect.key] ||
        `Аспект ${aspect.aspect} между ${aspect.planet1} и ${aspect.planet2} создает ${aspect.aspect === "Трин" || aspect.aspect === "Секстиль" ? "гармоничную" : "напряженную"} динамику в ваших отношениях.`;

      doc
        .font("Roboto-Bold")
        .fontSize(9)
        .fill(COLORS.clay)
        .text(
          `${aspect.planet1} ${person1.name} ${aspect.aspect} ${aspect.planet2} ${person2.name} (орб: ${aspect.orb}°)`,
        );
      doc.moveDown(0.1);
      doc
        .font("Roboto-Regular")
        .fontSize(8.5)
        .fill(COLORS.nightSoft)
        .text(interpretation, { align: "justify", lineGap: 2 });

      if (index < aspects.length - 1) {
        doc.moveDown(0.2);
        doc
          .moveTo(55, doc.y)
          .lineTo(doc.page.width - 55, doc.y)
          .strokeColor(COLORS.border)
          .stroke();
        doc.moveDown(0.3);
      }
    });
  } else {
    doc
      .font("Roboto-Regular")
      .fontSize(9)
      .fill(COLORS.nightSoft)
      .text("Значимых аспектов между личными планетами не обнаружено.");
  }

  doc.moveDown(0.8);

  // Кармические задачи
  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("КАРМИЧЕСКИЕ ЗАДАЧИ ПАРЫ");
  doc.moveDown(0.3);

  const saturn1 = planets1.find((p) => p.name === "Saturn");
  const saturn2 = planets2.find((p) => p.name === "Saturn");

  doc
    .font("Roboto-Regular")
    .fontSize(9)
    .fill(COLORS.nightSoft)
    .text("Ваша встреча не случайна. Вместе вы пришли пройти важные уроки:", {
      align: "justify",
      lineGap: 2,
    });
  doc.moveDown(0.2);

  doc
    .font("Roboto-Regular")
    .fontSize(8.5)
    .fill(COLORS.nightSoft)
    .text(
      "• Научиться балансу между независимостью и близостью\n" +
        "• Принять различия друг друга как дар, а не препятствие\n" +
        "• Создать пространство, где оба могут расти и развиваться\n" +
        "• Пройти через конфликты с мудростью и уважением",
      { align: "justify", lineGap: 2 },
    );

  doc.moveDown(0.8);

  // Прогноз
  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("ПРОГНОЗ РАЗВИТИЯ ОТНОШЕНИЙ");
  doc.moveDown(0.3);

  doc
    .font("Roboto-Regular")
    .fontSize(9)
    .fill(COLORS.nightSoft)
    .text(
      "Ближайшие 6-12 месяцев благоприятны для углубления связи. Период требует терпения и внимания к потребностям партнера. " +
        "Избегайте импульсивных решений в кризисные моменты. Ваша сила — в способности слушать и понимать друг друга.",
      { align: "justify", lineGap: 2 },
    );

  doc.moveDown(1);

  // Дисклеймер
  const disclaimerY = doc.y;
  doc
    .rect(45, disclaimerY, doc.page.width - 90, 45)
    .fill(COLORS.parchmentDark)
    .strokeColor(COLORS.brass)
    .stroke();
  doc
    .font("Roboto-Bold")
    .fontSize(7.5)
    .fill(COLORS.clay)
    .text("ВАЖНО", 52, disclaimerY + 7);
  doc
    .font("Roboto-Regular")
    .fontSize(6.5)
    .fill(COLORS.nightSoft)
    .text(
      "Данный отчёт носит развлекательно-познавательный характер и не является медицинской, психологической или финансовой рекомендацией. " +
        "Астрология — инструмент самопознания, а не точная наука. Все решения вы принимаете самостоятельно.",
      52,
      disclaimerY + 17,
      { width: doc.page.width - 104, lineGap: 1.5 },
    );

  doc
    .fontSize(7.5)
    .fill(COLORS.brassDark)
    .text(
      `© ${new Date().getFullYear()} Astra Numerology & Astrology App`,
      45,
      doc.page.height - 40,
      { align: "center", width: doc.page.width - 90 },
    );

  doc.end();
  return doc;
});
