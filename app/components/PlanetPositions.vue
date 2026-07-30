<template>
  <div
    v-if="planets.length"
    class="bg-night-900/60 backdrop-blur-sm rounded-2xl border border-night-700/50 overflow-hidden animate-fade-in-up"
  >
    <!-- Заголовок -->
    <div
      class="px-5 py-4 bg-night-800/40 border-b border-night-700/50 flex justify-between items-center"
    >
      <h2
        class="font-display text-2xl text-center text-brass-400 font-semibold"
      >
        Планеты в знаках
      </h2>
      <span
        class="font-mono text-xs text-starlight/60 bg-night-900/80 px-3 py-1.5 rounded-full border border-night-600/50"
      >
        ASC: ~{{ Math.round(ascendantDegree) }}°
      </span>
    </div>

    <!-- Список планет со скроллом -->
    <div class="max-h-[320px] overflow-y-auto custom-scrollbar p-3 space-y-2">
      <div
        v-for="(planet, index) in planets"
        :key="planet.name"
        class="group flex items-center justify-between p-3.5 bg-night-800/30 hover:bg-night-800/60 rounded-xl border border-night-700/30 hover:border-brass-500/30 transition-all duration-200 animate-item-fade-in"
        :style="{ animationDelay: `${150 + index * 60}ms` }"
      >
        <div class="flex items-center gap-3.5">
          <div
            class="w-10 h-10 rounded-lg bg-night-950/80 border border-brass-500/20 flex items-center justify-center text-brass-400 font-bold text-lg group-hover:border-brass-400/40 group-hover:scale-110 transition"
          >
            {{ getPlanetGlyph(planet.name) }}
          </div>
          <div>
            <p class="text-sm font-semibold text-starlight">
              {{ planet.label || planet.name }}
            </p>
            <p class="text-xs text-starlight/50">
              {{ planet.sign }}
            </p>
          </div>
        </div>

        <div class="text-right">
          <span class="font-mono text-sm text-brass-400 font-semibold">
            {{ planet.degree }}°
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface PlanetData {
  name: string;
  label: string;
  sign: string;
  degree: number;
}

const props = defineProps<{
  planets: PlanetData[];
  ascendantDegree: number;
}>();

// Символы планет
const glyphs: Record<string, string> = {
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

function getPlanetGlyph(name?: string) {
  if (!name) return "★";
  return glyphs[name] || "★";
}
</script>

<style scoped>
/* 1. Анимация появления всего блока (всплытие) */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 2. Анимация появления элементов списка (сдвиг слева + прозрачность) */
@keyframes itemFadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-item-fade-in {
  animation: itemFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0; /* Скрыто до начала анимации */
}

/* 3. Кастомный скроллбар */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.4);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(201, 162, 39, 0.3);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(201, 162, 39, 0.5);
}
</style>
