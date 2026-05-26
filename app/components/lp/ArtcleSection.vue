<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";
const props = defineProps<{
  articles: ContentCollectionItem[] | undefined;
}>();
</script>

<template>
  <section id="articles" class="lp__section">
    <RamMixedHeading eyebrow="ARTICLES" title="最新の記事" size="M" />
    <div v-if="props.articles?.length" class="lp__grid lp__grid--2 lp__grid--3">
      <LpArticleCard
        v-for="a in props.articles"
        :key="a.path"
        :title="a.title"
        :description="a.description"
        :date="a.date"
        :tags="a.tags"
        :path="a.path"
      />
    </div>
    <RamGlass v-else class="lp__empty">
      <RamType variant="bodyM" :color="'var(--ram-muted)'">
        記事は近日公開予定です。
      </RamType>
    </RamGlass>
    <div class="lp__cta-row">
      <RamButton as="link" to="/blog" variant="ghost" size="md">
        すべての記事 →
      </RamButton>
    </div>
  </section>
</template>

<style scoped>
.lp__empty {
  padding: var(--ram-space-6);
  text-align: center;
}

.lp__section {
  display: grid;
  gap: var(--ram-space-6);
  scroll-margin-top: var(--ram-space-10);
}

.lp__cta-row {
  display: flex;
  justify-content: flex-end;
}

.lp__grid {
  display: grid;
  gap: var(--ram-space-4);
}

.lp__grid--2 {
  grid-template-columns: 1fr;
}

.lp__grid--3 {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .lp__grid--2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .lp__grid--3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1120px) {
  .lp__grid--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
