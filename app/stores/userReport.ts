// stores/userReport.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export interface PlanetData {
  name: string;
  label: string;
  sign: string;
  degree: number;
}

export interface ReportState {
  reportId: string;
  lifePathNumber: number;
  freeData: { title: string; summary: string };
  ascendantDegree: number;
  planets: PlanetData[];
  isPremiumUnlocked: boolean;
}

export const useUserReportStore = defineStore("userReport", () => {
  const report = ref<ReportState | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchFullReport(formData: {
    birthDate: string;
    birthTime?: string;
    name?: string;
    latitude?: number;
    longitude?: number;
  }) {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await $fetch("/api/calculate", {
        method: "POST",
        body: formData,
      });

      // Явно распаковываем структуру ответа { success: true, reportId: "...", data: { ... } }
      if (res.success && res.data) {
        report.value = {
          reportId: res.reportId,
          lifePathNumber: res.data.lifePathNumber,
          freeData: res.data.freeData,
          ascendantDegree: res.data.ascendantDegree,
          planets: res.data.planets,
          isPremiumUnlocked: false,
        };
        console.log("✅ Данные успешно сохранены в store:", report.value);
      }
    } catch (e: any) {
      console.error("Ошибка при загрузке отчета:", e);
      error.value =
        e.data?.statusMessage || e.message || "Произошла ошибка при расчете";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    report,
    isLoading,
    error,
    fetchFullReport,
  };
});
