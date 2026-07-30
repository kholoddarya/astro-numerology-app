// server/api/astro/current.get.ts
import { getDailyAstroData } from "../../astro/currentPositions";

export default defineEventHandler(() => {
  return getDailyAstroData();
});
