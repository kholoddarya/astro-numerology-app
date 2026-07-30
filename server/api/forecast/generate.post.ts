// server/api/forecast/generate.post.ts
import PDFDocument from "pdfkit";
import path from "path";
import {
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay,
  PERSONAL_YEAR_INTERPRETATIONS,
  PERSONAL_MONTH_INTERPRETATIONS,
  PERSONAL_DAY_INTERPRETATIONS,
} from "~/constants/numerology";

const COLORS = {
  parchment: "#FBF8F0",
  parchmentDark: "#F7F3E8",
  night: "#080B1A",
  nightSoft: "#172142",
  brass: "#C9A227",
  brassDark: "#A6821A",
  clay: "#B7565C",
  border: "#EDE6D3",
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { birthDate: birthDateStr } = body;

  if (!birthDateStr) {
    throw createError({
      statusCode: 400,
      statusMessage: "Дата рождения обязательна",
    });
  }

  const birthDate = new Date(birthDateStr);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Расчёт чисел
  const pYear = calculatePersonalYear(birthDate, currentYear);
  const pMonth = calculatePersonalMonth(birthDate, currentYear, currentMonth);
  const pDay = calculatePersonalDay(
    birthDate,
    currentYear,
    currentMonth,
    currentDay,
  );

  // Инициализация PDF
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 50, right: 50 },
    info: {
      Title: "Персональный нумерологический прогноз",
      Author: "Astra App",
    },
  });

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="numerology-forecast.pdf"`,
  );

  // Регистрация шрифтов
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

  // Фон и рамка
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.parchment);
  doc
    .lineWidth(2)
    .strokeColor(COLORS.brass)
    .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
    .stroke();
  doc
    .lineWidth(0.5)
    .strokeColor(COLORS.brassDark)
    .rect(36, 36, doc.page.width - 72, doc.page.height - 72)
    .stroke();

  // Заголовок
  doc
    .font("Roboto-Bold")
    .fontSize(20)
    .fill(COLORS.night)
    .text("ПЕРСОНАЛЬНЫЙ НУМЕРОЛОГИЧЕСКИЙ ПРОГНОЗ", { align: "center" });
  doc.moveDown(0.3);
  doc
    .font("Roboto-Regular")
    .fontSize(10)
    .fill(COLORS.brassDark)
    .text(
      `Дата рождения: ${birthDate.toLocaleDateString("ru-RU")} | Дата расчёта: ${today.toLocaleDateString("ru-RU")}`,
      { align: "center" },
    );
  doc.moveDown(0.8);
  doc
    .moveTo(60, doc.y)
    .lineTo(doc.page.width - 60, doc.y)
    .strokeColor(COLORS.brass)
    .stroke();
  doc.moveDown(0.8);

  // Функция для отрисовки блока периода (без эмодзи, компактные отступы)
  const drawPeriodBlock = (title: string, number: number, text: string) => {
    doc
      .font("Roboto-Bold")
      .fontSize(13)
      .fill(COLORS.night)
      .text(title, { align: "center" });
    doc.moveDown(0.1);

    // Крупное число
    doc
      .font("Roboto-Bold")
      .fontSize(30)
      .fill(COLORS.brass)
      .text(String(number), { align: "center" });
    doc.moveDown(0.2);

    // Текст трактовки
    doc
      .font("Roboto-Regular")
      .fontSize(10)
      .fill(COLORS.nightSoft)
      .text(text, { align: "justify", lineGap: 2.5 });
    doc.moveDown(0.6);
  };

  // Отрисовка блоков
  drawPeriodBlock(
    "ПЕРСОНАЛЬНЫЙ ГОД",
    pYear,
    PERSONAL_YEAR_INTERPRETATIONS[pYear] || "",
  );
  drawPeriodBlock(
    "ПЕРСОНАЛЬНЫЙ МЕСЯЦ",
    pMonth,
    PERSONAL_MONTH_INTERPRETATIONS[pMonth] || "",
  );
  drawPeriodBlock(
    "ПЕРСОНАЛЬНЫЙ ДЕНЬ",
    pDay,
    PERSONAL_DAY_INTERPRETATIONS[pDay] || "",
  );

  // Разделитель перед дисклеймером
  doc
    .moveTo(60, doc.y)
    .lineTo(doc.page.width - 60, doc.y)
    .strokeColor(COLORS.border)
    .stroke();
  doc.moveDown(0.5);

  // Дисклеймер и Футер (рисуем абсолютно внизу страницы, чтобы не создавать вторую страницу)
  const disclaimerY = doc.page.height - 90;

  doc
    .font("Roboto-Bold")
    .fontSize(8)
    .fill(COLORS.clay)
    .text("ВАЖНО", 50, disclaimerY, {
      align: "center",
      width: doc.page.width - 100,
    });
  doc.moveDown(0.2);

  doc
    .font("Roboto-Regular")
    .fontSize(7)
    .fill(COLORS.nightSoft)
    .text(
      "Данный отчёт носит развлекательно-познавательный характер и не является медицинской, психологической или финансовой рекомендацией. " +
        "Нумерология — инструмент самопознания, а не точная наука. Все решения вы принимаете самостоятельно.",
      50,
      disclaimerY + 12,
      { align: "center", width: doc.page.width - 100, lineGap: 1.5 },
    );

  // Копирайт в самом низу
  doc
    .fontSize(8)
    .fill(COLORS.brassDark)
    .text(
      `© ${today.getFullYear()} Astra Numerology & Astrology App`,
      50,
      doc.page.height - 45,
      { align: "center", width: doc.page.width - 100 },
    );

  doc.end();
  return doc;
});
