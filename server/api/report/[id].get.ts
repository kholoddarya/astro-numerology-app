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
  SATURN_LESSONS,
  JUPITER_OPPORTUNITIES,
  PLANET_ABBREVIATIONS,
} from "../../astro/interpretations";

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
  const numerology = NUMEROLOGY_INTERPRETATIONS[data.lifePathNumber];

  if (numerology) {
    forecast += `Ваше число жизненного пути (${data.lifePathNumber}) указывает на то, что главный урок этого периода связан с ${data.lifePathNumber <= 3 ? "творческим самовыражением и развитием коммуникации" : data.lifePathNumber <= 6 ? "ответственностью, заботой о близких и созданием гармонии" : data.lifePathNumber <= 9 ? "глубоким самопознанием и духовным ростом" : "высшим служением и духовным лидерством"}. `;
  }

  if (saturn) {
    forecast += `Сатурн в знаке ${saturn.sign} указывает, что в ближайшие годы вам потребуется особая дисциплина в сфере ${SATURN_LESSONS[saturn.sign] || "личностного роста"}. Это время для закладки прочного фундамента. `;
  }

  if (jupiter) {
    forecast += `Юпитер в знаке ${jupiter.sign} открывает возможности для роста — ${JUPITER_OPPORTUNITIES[jupiter.sign] || "расширения горизонтов"}. `;
  }

  if (sun && moon) {
    forecast += `Ваше Солнце в ${sun.sign} и Луна в ${moon.sign} создают динамичное сочетание. `;
    if (["Овен", "Лев", "Стрелец"].includes(sun.sign))
      forecast += "Избегайте импульсивных решений. ";
    else if (["Телец", "Дева", "Козерог"].includes(sun.sign))
      forecast += "Не позволяйте осторожности парализовать действия. ";
    else forecast += "Доверяйте интуиции, но проверяйте решения логикой. ";
  }

  return (
    forecast +
    "Главная задача — найти баланс между личными амбициями и служением высшим целям."
  );
}

function drawNatalWheel(doc: any, data: any) {
  const centerX = doc.page.width / 2;
  const centerY = 360;
  const outerRadius = 140;
  const zodiacRadius = 115;
  const houseRadius = 85;
  const innerRadius = 40;

  doc
    .lineWidth(1.5)
    .strokeColor(COLORS.brass)
    .circle(centerX, centerY, outerRadius)
    .stroke();
  doc
    .lineWidth(0.5)
    .strokeColor(COLORS.brassDark)
    .circle(centerX, centerY, zodiacRadius)
    .stroke();
  doc
    .lineWidth(0.5)
    .strokeColor(COLORS.border)
    .circle(centerX, centerY, houseRadius)
    .stroke();
  doc
    .lineWidth(1)
    .strokeColor(COLORS.brass)
    .circle(centerX, centerY, innerRadius)
    .stroke();

  const zodiacSigns = [
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

  // Рисуем знаки зодиака (текстом, без эмодзи)
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x1 = centerX + (zodiacRadius + 5) * Math.cos(angle);
    const y1 = centerY + (zodiacRadius + 5) * Math.sin(angle);
    const x2 = centerX + (outerRadius - 5) * Math.cos(angle);
    const y2 = centerY + (outerRadius - 5) * Math.sin(angle);
    doc
      .lineWidth(0.5)
      .strokeColor(COLORS.brassDark)
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();

    const glyphX =
      centerX +
      (zodiacRadius - 18) * Math.cos(angle + (30 * Math.PI) / 180 / 2);
    const glyphY =
      centerY +
      (zodiacRadius - 18) * Math.sin(angle + (30 * Math.PI) / 180 / 2);
    const savedY = doc.y;
    doc
      .font("Roboto-Regular")
      .fontSize(7)
      .fill(COLORS.claySoft)
      .text(zodiacSigns[i].substring(0, 3), glyphX - 8, glyphY - 4, {
        width: 16,
        align: "center",
      });
    doc.y = savedY;
  }

  // Рисуем дома
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x1 = centerX + innerRadius * Math.cos(angle);
    const y1 = centerY + innerRadius * Math.sin(angle);
    const x2 = centerX + houseRadius * Math.cos(angle);
    const y2 = centerY + houseRadius * Math.sin(angle);
    doc
      .lineWidth(0.5)
      .strokeColor(COLORS.border)
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();

    const numX =
      centerX +
      ((houseRadius + innerRadius) / 2) *
        Math.cos(angle + (30 * Math.PI) / 180 / 2);
    const numY =
      centerY +
      ((houseRadius + innerRadius) / 2) *
        Math.sin(angle + (30 * Math.PI) / 180 / 2);
    const savedY = doc.y;
    doc
      .font("Roboto-Bold")
      .fontSize(7)
      .fill(COLORS.nightSoft)
      .text(String(i + 1), numX - 3.5, numY - 3.5, {
        width: 7,
        align: "center",
      });
    doc.y = savedY;
  }

  // Рисуем планеты с сокращениями
  const planetRadius = (zodiacRadius + houseRadius) / 2;
  data.planets.forEach((planet: any) => {
    const angle = (planet.degree - 90) * (Math.PI / 180);
    const x = centerX + planetRadius * Math.cos(angle);
    const y = centerY + planetRadius * Math.sin(angle);

    const innerX = centerX + innerRadius * Math.cos(angle);
    const innerY = centerY + innerRadius * Math.sin(angle);
    doc
      .lineWidth(0.5)
      .strokeColor(COLORS.claySoft)
      .moveTo(innerX, innerY)
      .lineTo(x, y)
      .stroke();

    // Увеличили круг до 13, чтобы влезло 3 буквы
    doc
      .lineWidth(1)
      .strokeColor(COLORS.brass)
      .circle(x, y, 13)
      .fillAndStroke(COLORS.parchmentDark, COLORS.brass);

    const abbrev = PLANET_ABBREVIATIONS[planet.name] || "???";
    const savedY = doc.y;
    doc
      .font("Roboto-Bold")
      .fontSize(7.5)
      .fill(COLORS.night)
      .text(abbrev, x - 9, y - 4, { width: 18, align: "center" });
    doc.y = savedY;
  });
  doc.moveDown(1);
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

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 45, right: 45 },
    info: {
      Title: `Натальная карта: ${report.locationName}`,
      Author: "Astra App",
    },
    bufferPages: true,
  });

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="astra-report-${id}.pdf"`,
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
    const c = 12;
    doc.lineWidth(1.5).strokeColor(COLORS.brass);
    doc
      .moveTo(25, 25 + c)
      .lineTo(25, 25)
      .lineTo(25 + c, 25);
    doc
      .moveTo(doc.page.width - 25 - c, 25)
      .lineTo(doc.page.width - 25, 25)
      .lineTo(doc.page.width - 25, 25 + c);
    doc
      .moveTo(25, doc.page.height - 25 - c)
      .lineTo(25, doc.page.height - 25)
      .lineTo(25 + c, doc.page.height - 25);
    doc
      .moveTo(doc.page.width - 25 - c, doc.page.height - 25)
      .lineTo(doc.page.width - 25, doc.page.height - 25)
      .lineTo(doc.page.width - 25, doc.page.height - 25 - c);
    doc.stroke();
  };

  drawBackground();
  doc.y = 130; // Центрирование первой страницы

  doc.on("pageAdded", () => {
    drawBackground();
    doc.y = 60; // Сброс отступа для второй страницы
  });

  // ==========================================
  // СТРАНИЦА 1: Заголовок + Натальная карта
  // ==========================================
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

  drawNatalWheel(doc, data);

  doc.addPage(); // Переход на страницу 2

  // ==========================================
  // СТРАНИЦА 2: Текстовый отчёт (без эмодзи)
  // ==========================================
  const numerology = NUMEROLOGY_INTERPRETATIONS[data.lifePathNumber] || {
    title: `Число Жизненного Пути: ${data.lifePathNumber}`,
    text: "Ваше число жизненного пути указывает на уникальный потенциал самореализации.",
  };

  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("НУМЕРОЛОГИЧЕСКИЙ ПОРТРЕТ");
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

  doc
    .font("Roboto-Bold")
    .fontSize(13)
    .fill(COLORS.night)
    .text("АСТРОЛОГИЧЕСКИЙ ПОРТРЕТ");
  doc.moveDown(0.2);

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
  const ascSign = ascSigns[Math.floor(data.ascendantDegree / 30)] || "Овен";

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
    .text(ASCENDANT_INTERPRETATIONS[ascSign] || "", {
      align: "justify",
      lineGap: 2,
    });
  doc.moveDown(0.6);

  doc
    .font("Roboto-Bold")
    .fontSize(11)
    .fill(COLORS.night)
    .text("Положения планет и их значение:");
  doc.moveDown(0.4);

  data.planets.forEach((planet, index) => {
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

    if (index < data.planets.length - 1) {
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

  doc
    .font("Roboto-Bold")
    .fontSize(11)
    .fill(COLORS.night)
    .text("КАРМИЧЕСКИЕ ЗАДАЧИ И ПРОГНОЗ");
  doc.moveDown(0.2);
  doc
    .font("Roboto-Regular")
    .fontSize(8.5)
    .fill(COLORS.nightSoft)
    .text(generateForecast(data), { align: "justify", lineGap: 2.5 });
  doc.moveDown(1);

  // Дисклеймер и Футер
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
        "Астрология и нумерология — инструменты самопознания, а не точные науки. Все решения вы принимаете самостоятельно.",
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
