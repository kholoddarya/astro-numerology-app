<template>
  <div class="min-h-screen bg-night-950 flex flex-col">
    <AppHeader />

    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
