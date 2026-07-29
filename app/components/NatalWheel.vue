<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 500 500"
    class="select-none overflow-visible animate-spin-slow"
    role="img"
    aria-label="Натальная карта!"
  >
    <defs>
      <radialGradient id="wheel-glow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#0f172a" />
      </radialGradient>
    </defs>

    <!-- Внешний фоновый круг -->
    <circle
      :cx="center"
      :cy="center"
      :r="rOuter"
      fill="url(#wheel-glow)"
      stroke="#c084fc"
      stroke-width="1"
      opacity="0.4"
    />

    <!-- 1. Кольцо знаков Зодиака (с учетом поворота по ASC) -->
    <g :transform="`rotate(${ascendantOffset}, ${center}, ${center})`">
      <circle
        :cx="center"
        :cy="center"
        :r="rZodiacRing"
        fill="none"
        stroke="#a855f7"
        stroke-width="0.75"
        opacity="0.3"
      />

      <g v-for="(sign, i) in zodiac" :key="sign?.name">
        <!-- Разделители знаков -->
        <line
          v-bind="getZodiacLine(i)"
          stroke="#a855f7"
          stroke-width="0.75"
          opacity="0.3"
        />
        <!-- Глифы знаков -->
        <text
          v-bind="polar(center, center, rZodiacRing - 18, i * 30 + 15)"
          text-anchor="middle"
          dominant-baseline="middle"
          class="fill-purple-300 font-serif"
          font-size="16"
        >
          {{ sign.glyph }}
        </text>
      </g>
    </g>

    <!-- 2. Линии аспектов в центре (между планетами) -->
    <g class="aspects">
      <line
        v-for="(asp, idx) in aspects"
        :key="idx"
        :x1="asp.p1.x"
        :y1="asp.p1.y"
        :x2="asp.p2.x"
        :y2="asp.p2.y"
        :stroke="asp.color"
        stroke-width="1"
        stroke-dasharray="3 3"
        opacity="0.5"
      />
    </g>

    <!-- 3. Кольцо Домов (интерактивное) -->
    <g v-for="house in houses" :key="house">
      <path
        :d="getHousePath(house)"
        :fill="
          hoveredHouse === house ? 'rgba(168, 85, 247, 0.15)' : 'transparent'
        "
        class="cursor-pointer transition-colors duration-200"
        stroke="#94a3b8"
        stroke-width="0.5"
        stroke-opacity="0.3"
        @mouseenter="hoveredHouse = house"
        @mouseleave="hoveredHouse = null"
        @click="emit('selectHouse', house)"
      />
      <text
        v-bind="
          polar(
            center,
            center,
            (rHouseRing + rInner) / 2,
            (house - 1) * 30 + 15,
          )
        "
        text-anchor="middle"
        dominant-baseline="middle"
        class="fill-slate-400 font-mono"
        font-size="12"
      >
        {{ house }}
      </text>
    </g>

    <!-- 4. Отображение планет на карте -->
    <g
      v-for="planet in processedPlanets"
      :key="planet?.name || Math.random()"
      class="cursor-pointer group"
    >
      <template v-if="planet">
        <!-- Линия-указатель от центра к планете -->
        <line
          :x1="planet.pos.x"
          :y1="planet.pos.y"
          :x2="planet.innerPos.x"
          :y2="planet.innerPos.y"
          stroke="#c084fc"
          stroke-width="1"
          opacity="0.6"
        />
        <!-- Точка планеты -->
        <circle
          :cx="planet.pos.x"
          :cy="planet.pos.y"
          r="12"
          class="fill-slate-900 stroke-purple-400 group-hover:fill-purple-600 transition-colors"
          stroke-width="1.5"
        />
        <!-- Символ планеты -->
        <text
          :x="planet.pos.x"
          :y="planet.pos.y"
          text-anchor="middle"
          dominant-baseline="middle"
          class="fill-purple-200 font-bold group-hover:fill-white"
          font-size="11"
        >
          {{ planet.glyph }}
        </text>
      </template>
    </g>

    <!-- Внутренняя заглушка (Центр) -->
    <circle
      :cx="center"
      :cy="center"
      :r="rInner"
      fill="#0f172a"
      stroke="#a855f7"
      stroke-width="1"
      opacity="0.8"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

export interface PlanetItem {
  name: string;
  label?: string;
  degree: number;
  sign?: string;
}

const props = withDefaults(
  defineProps<{
    planets?: PlanetItem[];
    ascendantDegree?: number;
    size?: number;
  }>(),
  {
    planets: () => [],
    ascendantDegree: 0,
    size: 460,
  },
);

const emit = defineEmits<{
  selectHouse: [house: number];
}>();

const hoveredHouse = ref<number | null>(null);

// Геометрия круга
const center = 250;
const rOuter = 230;
const rZodiacRing = 205;
const rHouseRing = 155;
const rInner = 90;

const zodiac = [
  { glyph: "♈", name: "Aries" },
  { glyph: "♉", name: "Taurus" },
  { glyph: "♊", name: "Gemini" },
  { glyph: "♋", name: "Cancer" },
  { glyph: "♌", name: "Leo" },
  { glyph: "♍", name: "Virgo" },
  { glyph: "♎", name: "Libra" },
  { glyph: "♏", name: "Scorpio" },
  { glyph: "♐", name: "Sagittarius" },
  { glyph: "♑", name: "Capricorn" },
  { glyph: "♒", name: "Aquarius" },
  { glyph: "♓", name: "Pisces" },
];

const planetGlyphs: Record<string, string> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
};

const houses = Array.from({ length: 12 }, (_, i) => i + 1);

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 180) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const ascendantOffset = computed(() => -Number(props.ascendantDegree || 0));

const processedPlanets = computed(() => {
  const safePlanets = props.planets || [];
  const safeAscendant = Number(props.ascendantDegree || 0);

  return safePlanets
    .filter((p) => p && typeof p.degree === "number")
    .map((p) => {
      const pDegree = Number(p.degree) || 0;
      const adjustedDegree = pDegree - safeAscendant;
      const pos = polar(
        center,
        center,
        (rZodiacRing + rHouseRing) / 2,
        adjustedDegree,
      );
      const innerPos = polar(center, center, rInner, adjustedDegree);

      return {
        ...p,
        glyph: (p?.name && planetGlyphs[p?.name]) || p?.name?.[0] || "★",
        pos,
        innerPos,
        adjustedDegree,
      };
    });
});

const aspects = computed(() => {
  const list: Array<{
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    color: string;
  }> = [];
  const planets = processedPlanets.value;

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1Degree = Number(planets[i].degree) || 0;
      const p2Degree = Number(planets[j].degree) || 0;

      const diff = Math.abs(p1Degree - p2Degree) % 360;
      const angle = diff > 180 ? 360 - diff : diff;

      if (Math.abs(angle - 120) < 5 || Math.abs(angle - 60) < 5) {
        list.push({
          p1: planets[i].innerPos,
          p2: planets[j].innerPos,
          color: "#38bdf8",
        });
      } else if (Math.abs(angle - 90) < 5 || Math.abs(angle - 180) < 5) {
        list.push({
          p1: planets[i].innerPos,
          p2: planets[j].innerPos,
          color: "#f43f5e",
        });
      }
    }
  }
  return list;
});

function getZodiacLine(i: number) {
  const p1 = polar(center, center, rZodiacRing - 6, i * 30);
  const p2 = polar(center, center, rZodiacRing + 6, i * 30);
  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
}

function getHousePath(house: number) {
  const a1 = (house - 1) * 30;
  const a2 = house * 30;
  const p1 = polar(center, center, rHouseRing, a1);
  const p2 = polar(center, center, rHouseRing, a2);
  const p3 = polar(center, center, rInner, a2);
  const p4 = polar(center, center, rInner, a1);
  return `M ${p1.x} ${p1.y} A ${rHouseRing} ${rHouseRing} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rInner} ${rInner} 0 0 0 ${p4.x} ${p4.y} Z`;
}
</script>

<style scoped>
/* Медленное вращение всего колеса (120 секунд на полный оборот) */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 120s linear infinite;
  transform-origin: center;
}

/* Пауза при наведении курсора, чтобы можно было спокойно прочитать данные */
.animate-spin-slow:hover {
  animation-play-state: paused;
}
</style>
