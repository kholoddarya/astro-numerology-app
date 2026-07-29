import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  // Опционально: можно настроить scrollBehavior или hashMode
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
};
