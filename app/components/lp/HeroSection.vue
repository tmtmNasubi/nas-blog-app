<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  }>(),
  {
    eyebrow: "PORTFOLIO",
    title: "ガラスの向こう側で、つくる",
    subtitle: "Design Systems · Web Craft · Liquid Glass Study",
  },
);
</script>

<template>
  <section class="lp-hero">
    <div class="lp-hero__inner">
      <RamBadge tone="primary" variant="soft">v0.1 · 2026</RamBadge>
      <RamMixedHeading :eyebrow="eyebrow" :title="title" :subtitle="subtitle" size="XL" as="h1" />
      <div class="lp-hero__actions">
        <RamButton as="link" to="#works" size="lg">Works を見る</RamButton>
        <RamButton as="link" to="#about" variant="secondary" size="lg"> About </RamButton>
        <RamButton as="link" to="#articles" variant="ghost" size="lg"> Articles </RamButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lp-hero {
  position: relative;
  isolation: isolate;
  /* min-height: 70svh; */
  display: flex;
  align-items: center;
  border-radius: var(--ram-radius-lg);
  overflow: hidden;
  padding: var(--ram-space-8) var(--ram-space-4);
}

.lp-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--ram-space-4);
  max-width: 760px;
}

.lp-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-2);
  margin-top: var(--ram-space-3);
}

@media (min-width: var(--ram-bp-md)) {
  .lp-hero {
    min-height: 80svh;
    padding: var(--ram-space-10) var(--ram-space-6);
  }
  .lp-hero__inner {
    gap: var(--ram-space-5);
  }
  .lp-hero__actions {
    gap: var(--ram-space-3);
  }
}
</style>
