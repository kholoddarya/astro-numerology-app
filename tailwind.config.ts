import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        // Ночное небо — основной фон приложения
        night: {
          950: "#080B1A",
          900: "#0E1428",
          800: "#172142",
          700: "#232E58",
        },
        // Античное золото — сигнатурный акцент (гравировка астролябии)
        brass: {
          400: "#E0C266",
          500: "#C9A227",
          600: "#A6821A",
        },
        // Пергамент — только внутри карточек расчётов, не глобальный фон
        parchment: {
          100: "#FBF8F0",
          200: "#F7F3E8",
          300: "#EDE6D3",
        },
        // Приглушённая роза — второй акцент для второстепенных выделений
        clay: {
          400: "#C97B80",
          500: "#B7565C",
        },
        starlight: "#EDEAE0",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at 50% 30%, rgba(201,162,39,0.14), transparent 60%)",
      },
    },
  },
};
