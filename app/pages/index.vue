<script setup lang="ts">
const features = [
  {
    icon: "◇",
    title: "Design Systems",
    description:
      "コンポーネントとデザイントークンを起点にした、楽しい UI を作っています。",
  },
  {
    icon: "✎",
    title: "Web Craft",
    description:
      "Nuxt / Vue を中心に、パフォーマンスとアクセシビリティに配慮した実装を追求しています。",
  },
];

const { data: works } = await useAsyncData("lp-works", () =>
  queryCollection("content")
    .where("path", "LIKE", "/works/%")
    .order("order", "ASC")
    .all(),
);

const { data: articles } = await useAsyncData("lp-articles", () =>
  queryCollection("content")
    .where("path", "LIKE", "/blog/%")
    .order("date", "DESC")
    .limit(5)
    .all(),
);

useSeoMeta({
  title: "nas — Designer / Engineer",
  description:
    "Liquid Glass の研究と Ramune UI を中心に、Web の表現を探っているデザイナー兼エンジニア nas のポートフォリオサイト。",
  ogTitle: "nas — Designer / Engineer",
  ogDescription:
    "Liquid Glass の研究と Ramune UI を中心に、Web の表現を探っているデザイナー兼エンジニア nas のポートフォリオサイト。",
  ogType: "website",
  ogLocale: "ja_JP",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <main id="top" class="lp">
    <LpHeroSection />

    <section id="features" class="lp__section">
      <RamMixedHeading eyebrow="WHAT I DO" title="やっていること" size="L" />
      <div class="lp__grid lp__grid--3">
        <LpFeatureCard
          v-for="f in features"
          :key="f.title"
          :icon="f.icon"
          :title="f.title"
          :description="f.description"
        />
      </div>
    </section>

    <section id="works" class="lp__section">
      <RamMixedHeading eyebrow="WORKS" title="つくったもの" size="L" />
      <div v-if="works?.length" class="lp__grid lp__grid--3">
        <LpWorkCard
          v-for="w in works"
          :key="w.path"
          :title="w.title"
          :description="w.description"
          :tags="w.tags"
          :image="w.image"
          :demo="w.demo"
          :repo="w.repo"
          :path="w.path"
        />
      </div>
      <RamGlass v-else class="lp__empty">
        <RamType variant="bodyM" :color="'var(--ram-muted)'">
          まだ何もありません。準備中です。
        </RamType>
      </RamGlass>
    </section>

    <LpArtcleSection :articles="[...articles]" />

    <section id="about" class="lp__section">
      <RamMixedHeading eyebrow="ABOUT" title="運営者" size="L" />
      <LpAboutSection />
    </section>
  </main>
</template>

<style scoped>
.lp {
  display: grid;
  gap: var(--ram-space-7);
  padding: var(--ram-space-4);
  margin-inline: auto;
}

.lp__nav {
  position: sticky;
  top: var(--ram-space-3);
  z-index: 10;
}

.lp__section {
  display: grid;
  gap: var(--ram-space-6);
  scroll-margin-top: var(--ram-space-10);
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
  .lp {
    gap: var(--ram-space-10);
    padding: var(--ram-space-6);
  }
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

.lp__empty {
  padding: var(--ram-space-6);
  text-align: center;
}
</style>
