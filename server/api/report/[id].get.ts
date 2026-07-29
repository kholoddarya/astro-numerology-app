// server/api/report/[id].get.ts
import PDFDocument from "pdfkit";
import { usePrisma } from "../../utils/prisma";
import path from "path";
import {
  PERSONAL_PLANETS,
  OUTER_PLANETS_BASE,
  OUTER_PLANETS_SIGNS,
  NUMEROLOGY_INTERPRETATIONS,
  ASCENDANT_INTERPRETATIONS,
} from "../../astro/interpretations";

// Цветовая палитра
const COLORS = {
  parchment: "#FBF8F0",
  parchmentDark: "#F7F3E8",
  night: "#080B1A",
  nightSoft: "#172142",
  brass: "#C9A227",
  brassDark: "#A6821A",
  brassLight: "#E0C266",
  clay: "#B7565C",
  claySoft: "#C97B80",
  border: "#EDE6D3",
};

// Динамическая генерация прогноза на основе данных пользователя
function generateForecast(data: {
  lifePathNumber: number;
  ascendantDegree: number;
  planets: Array<{ name: string; label: string; sign: string; degree: number }>;
}): string {
  const saturn = data.planets.find((p) => p.name === "Saturn");
  const jupiter = data.planets.find((p) => p.name === "Jupiter");
  const sun = data.planets.find((p) => p.name === "Sun");
  const moon = data.planets.find((p) => p.name === "Moon");

  let forecast = "";

  // Общий контекст по числу жизненного пути
  const numerology = NUMEROLOGY_INTERPRETATIONS[data.lifePathNumber];
  if (numerology) {
    forecast += `Ваше число жизненного пути (${data.lifePathNumber}) указывает на то, что главный урок этого периода связан с ${data.lifePathNumber <= 3 ? "творческим самовыражением и развитием коммуникации" : data.lifePathNumber <= 6 ? "ответственностью, заботой о близких и созданием гармонии" : data.lifePathNumber <= 9 ? "глубоким самопознанием и духовным ростом" : "высшим служением и духовным лидерством"}. `;
  }

  // Прогноз по Сатурну (где нужны дисциплина и уроки)
  if (saturn) {
    const saturnLessons: Record<string, string> = {
      "Овен": "проявлять терпение и не действовать импульсивно",
      "Телец": "не цепляться за материальное из страха перемен",
      "Близнецы": "развивать глубину мышления и концентрацию",
      "Рак": "отпускать эмоциональные зависимости и прошлое",
      "Лев": "учиться скромности и любить без ожидания аплодисментов",
      "Дева": "принимать несовершенство мира и себя",
      "Весы": "принимать решения самостоятельно, не завися от мнения других",
      "Скорпион": "отпускать контроль и учиться доверять",
      "Стрелец": "доводить начатое до конца и развивать постоянство",
      "Козерог": "позволять себе радость и спонтанность",
      "Водолей": "развивать эмоциональную близость с конкретными людьми",
      "Рыбы": "выстраивать личные границы и не растворяться в других",
    };
    forecast += `Сатурн в знаке ${saturn.sign} указывает, что в ближайшие годы вам потребуется особая дисциплина в сфере ${saturnLessons[saturn.sign] || "личностного роста"}. Это время для закладки прочного фундамента через терпение и работу над собой. `;
  }

  // Прогноз по Юпитеру (где удача и рост)
  if (jupiter) {
    const jupiterOpportunities: Record<string, string> = {
      "Овен": "инициатива и смелые действия принесут удачу",
      "Телец":
        "рост через материальную стабильность и чувственные удовольствия",
      "Близнецы": "удача в общении, обучении и обмене информацией",
      "Рак": "рост через семью, дом и эмоциональную безопасность",
      "Лев": "удача в творчестве, самовыражении и лидерстве",
      "Дева": "рост через служение, анализ и работу с деталями",
      "Весы": "удача в партнерстве и гармоничном сотрудничестве",
      "Скорпион": "рост через трансформацию и глубокие исследования",
      "Стрелец": "удача в путешествиях, философии и расширении горизонтов",
      "Козерог": "рост через дисциплину и долгосрочные цели",
      "Водолей": "удача в инновациях и сообществе единомышленников",
      "Рыбы": "рост через духовность, творчество и сострадание",
    };
    forecast += `Юпитер в знаке ${jupiter.sign} открывает возможности для роста — ${jupiterOpportunities[jupiter.sign] || "расширения горизонтов"}. Это благоприятный период для развития в этом направлении. `;
  }

  // Рекомендации по Солнцу и Луне
  if (sun && moon) {
    forecast += `Ваше Солнце в ${sun.sign} и Луна в ${moon.sign} создают динамичное сочетание внешней активности и внутренней чувствительности. `;

    if (["Овен", "Лев", "Стрелец"].includes(sun.sign)) {
      forecast +=
        "В периоды ретроградного Меркурия избегайте импульсивных решений и дайте себе время на обдумывание. ";
    } else if (["Телец", "Дева", "Козерог"].includes(sun.sign)) {
      forecast +=
        "Не позволяйте излишней осторожности парализовать ваши действия — иногда риск оправдан. ";
    } else if (["Близнецы", "Весы", "Водолей"].includes(sun.sign)) {
      forecast +=
        "Избегайте распыления энергии на множество проектов — сфокусируйтесь на главном. ";
    } else {
      forecast +=
        "Доверяйте своей интуиции, но проверяйте важные решения логикой. ";
    }
  }

  // Общий совет
  forecast +=
    "Главная задача этого периода — найти баланс между личными амбициями и служением высшим целям, между действием и созерцанием.";

  return forecast;
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id)
    throw createError({
      statusCode: 400,
      statusMessage: "Отсутствует ID отчёта",
    });

  const db = usePrisma();
  const report = await db.chartReport.findUnique({ where: { id } });
  if (!report)
    throw createError({ statusCode: 404, statusMessage: "Отчёт не найден" });

  const data = JSON.parse(report.calculatedData) as {
    lifePathNumber: number;
    ascendantDegree: number;
    planets: Array<{
      name: string;
      label: string;
      sign: string;
      degree: number;
    }>;
  };

  // 1. Инициализация документа
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 45, right: 45 },
    info: {
      Title: `Натальная карта: ${report.locationName}`,
      Author: "Astra App",
      Subject: "Персональный астрологический отчёт",
    },
    bufferPages: true,
  });

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="astra-report-${id}.pdf"`,
  );

  // 2. Регистрация шрифтов
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

  // 3. Функция отрисовки фона и рамки
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

    const cornerSize = 12;
    doc.lineWidth(1.5).strokeColor(COLORS.brass);
    doc
      .moveTo(25, 25 + cornerSize)
      .lineTo(25, 25)
      .lineTo(25 + cornerSize, 25);
    doc
      .moveTo(doc.page.width - 25 - cornerSize, 25)
      .lineTo(doc.page.width - 25, 25)
      .lineTo(doc.page.width - 25, 25 + cornerSize);
    doc
      .moveTo(25, doc.page.height - 25 - cornerSize)
      .lineTo(25, doc.page.height - 25)
      .lineTo(25 + cornerSize, doc.page.height - 25);
    doc
      .moveTo(doc.page.width - 25 - cornerSize, doc.page.height - 25)
      .lineTo(doc.page.width - 25, doc.page.height - 25)
      .lineTo(doc.page.width - 25, doc.page.height - 25 - cornerSize);
    doc.stroke();
  };

  drawBackground();

  doc.on("pageAdded", () => {
    drawBackground();
  });

  // 4. Заголовок
  doc
    .font("Roboto-Bold")
    .fontSize(18)
    .fill(COLORS.night)
    .text("ПЕРСОНАЛЬНЫЙ АСТРОЛОГИЧЕСКИЙ ОТЧЁТ", { align: "center" });
  doc.moveDown(0.2);
  doc
    .font("Roboto-Regular")
    .fontSize(9)
    .fill(COLORS.brassDark)
    .text(
      `Составлен для: ${report.locationName.toUpperCase()} | Дата расчёта: ${new Date().toLocaleDateString("ru-RU")}`,
      { align: "center" },
    );
  doc.moveDown(0.8);

  doc
    .moveTo(55, doc.y)
    .lineTo(doc.page.width - 55, doc.y)
    .strokeColor(COLORS.brass)
    .stroke();
  doc.moveDown(0.8);

  // 5. Нумерологический портрет
  const numerology = NUMEROLOGY_INTERPRETATIONS[data.lifePathNumber] || {
    title: `Число Жизненного Пути: ${data.lifePathNumber}`,
    text: "Ваше число жизненного пути указывает на уникальный потенциал самореализации.",
  };

  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("🔢 НУМЕРОЛОГИЧЕСКИЙ ПОРТРЕТ");
  doc.moveDown(0.2);
  doc
    .font("Roboto-Bold")
    .fontSize(10)
    .fill(COLORS.brassDark)
    .text(numerology.title);
  doc.moveDown(0.15);
  doc
    .font("Roboto-Regular")
    .fontSize(9)
    .fill(COLORS.nightSoft)
    .text(numerology.text, { align: "justify", lineGap: 2.5 });
  doc.moveDown(0.8);

  // 6. Астрологический портрет
  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("🪐 АСТРОЛОГИЧЕСКИЙ ПОРТРЕТ");
  doc.moveDown(0.2);

  const ascSignIndex = Math.floor(data.ascendantDegree / 30);
  const ascSigns = [
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
  const ascSign = ascSigns[ascSignIndex] || "Овен";
  const ascInterpretation = ASCENDANT_INTERPRETATIONS[ascSign] || "";

  doc
    .font("Roboto-Bold")
    .fontSize(10)
    .fill(COLORS.clay)
    .text(
      `Асцендент (ASC): ${ascSign} (~${Math.round(data.ascendantDegree)}°)`,
    );
  doc.moveDown(0.1);
  doc
    .font("Roboto-Regular")
    .fontSize(8.5)
    .fill(COLORS.nightSoft)
    .text(ascInterpretation, { align: "justify", lineGap: 2 });
  doc.moveDown(0.6);

  // 7. Положения планет
  doc
    .font("Roboto-Bold")
    .fontSize(11)
    .fill(COLORS.night)
    .text("Положения планет и их значение:");
  doc.moveDown(0.4);

  const planets = data.planets || [];

  planets.forEach((planet, index) => {
    let interpretationText = "";

    if (PERSONAL_PLANETS[planet.name]?.[planet.sign]) {
      interpretationText = PERSONAL_PLANETS[planet.name][planet.sign];
    } else if (OUTER_PLANETS_SIGNS[planet.name]?.[planet.sign]) {
      const base = OUTER_PLANETS_BASE[planet.name] || "";
      const signText = OUTER_PLANETS_SIGNS[planet.name][planet.sign] || "";
      interpretationText = `${base} ${signText}`;
    } else {
      interpretationText = `Влияние ${planet.label} в знаке ${planet.sign} формирует важные фоновые процессы вашей личности.`;
    }

    doc
      .font("Roboto-Bold")
      .fontSize(9)
      .fill(COLORS.clay)
      .text(`${planet.label} в знаке ${planet.sign} (${planet.degree}°)`);
    doc.moveDown(0.08);
    doc
      .font("Roboto-Regular")
      .fontSize(8.5)
      .fill(COLORS.nightSoft)
      .text(interpretationText, { align: "justify", lineGap: 2 });

    if (index < planets.length - 1) {
      doc.moveDown(0.2);
      doc
        .moveTo(55, doc.y)
        .lineTo(doc.page.width - 55, doc.y)
        .strokeColor(COLORS.border)
        .stroke();
      doc.moveDown(0.3);
    }
  });

  doc.moveDown(0.8);

  // 8. Динамический прогноз
  doc
    .font("Roboto-Bold")
    .fontSize(11)
    .fill(COLORS.night)
    .text("🔮 КАРМИЧЕСКИЕ ЗАДАЧИ И ПРОГНОЗ");
  doc.moveDown(0.2);

  const forecastText = generateForecast(data);
  doc
    .font("Roboto-Regular")
    .fontSize(8.5)
    .fill(COLORS.nightSoft)
    .text(forecastText, { align: "justify", lineGap: 2.5 });

  doc.moveDown(1);

  const disclaimerY = doc.y;
  const disclaimerHeight = 45;
  doc
    .rect(45, disclaimerY, doc.page.width - 90, disclaimerHeight)
    .fill(COLORS.parchmentDark)
    .strokeColor(COLORS.brass)
    .stroke();

  doc
    .font("Roboto-Bold")
    .fontSize(7.5)
    .fill(COLORS.clay)
    .text("⚠ ВАЖНО", 52, disclaimerY + 7);
  doc
    .font("Roboto-Regular")
    .fontSize(6.5)
    .fill(COLORS.nightSoft)
    .text(
      "Данный отчёт носит развлекательно-познавательный характер и не является медицинской, психологической или финансовой рекомендацией. " +
        "Астрология и нумерология — инструменты самопознания, а не точные науки. Все решения вы принимаете самостоятельно.",
      52,
      disclaimerY + 17,
      { width: doc.page.width - 104, lineGap: 1.5 },
    );

  // Футер
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
