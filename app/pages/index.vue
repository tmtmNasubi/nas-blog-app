<script setup lang="ts">
const { toggle } = useRamTheme();
const tab = ref("all");
</script>

<template>
  <main class="home">
    <RamTopNav
      brand="nas / journal"
      :links="['Home', 'Articles']"
      active="Home"
    >
      <RamButton variant="ghost" size="sm" @click="toggle">テーマ</RamButton>
    </RamTopNav>

    <section class="home__hero">
      <RamMixedHeading
        eyebrow="DESIGN"
        title="ガラスの向こう側"
        subtitle="Liquid Glass Study"
        size="XL"
      />
      <div class="home__actions">
        <RamButton as="link" to="/blog-index" size="lg">記事を読む</RamButton>
        <RamButton as="link" to="/about" variant="secondary" size="lg"
          >About</RamButton
        >
      </div>
    </section>

    <RamTabs
      v-model="tab"
      :tabs="[
        { value: 'all', label: 'すべて' },
        {
          value: 'design',
          label: 'Design',
        },
      ]"
    />
  </main>
</template>

<style scoped>
.home {
  display: grid;
  gap: var(--ram-space-8);
  padding: var(--ram-space-6);
}

.home__hero {
  display: grid;
  gap: var(--ram-space-6);
  padding-block: var(--ram-space-8) var(--ram-space-4);
}

.home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-3);
}
</style>
