// server/api/report/[id]/unlock.post.ts
import { usePrisma } from "../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const db = usePrisma();

  // Эмуляция задержки платёжного шлюза
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const updatedReport = await db.chartReport.update({
    where: { id },
    data: {
      isPremiumUnlocked: true,
      unlockedAt: new Date(),
    },
  });

  return { success: true, unlockedAt: updatedReport.unlockedAt };
});
