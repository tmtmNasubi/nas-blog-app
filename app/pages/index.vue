<script setup lang="ts">
const { mode, toggle } = useRamTheme();

const navLinks = [
  { value: "home", label: "Home", href: "#top" },
  { value: "works", label: "Works", href: "#works" },
  { value: "articles", label: "Articles", href: "#articles" },
  { value: "about", label: "About", href: "#about" },
];

const features = [
  {
    icon: "✦",
    title: "Glass",
    description: "半透明・反射・歪みを Web 標準で再現する表現研究。",
  },
  {
    icon: "◇",
    title: "Design Systems",
    description: "コンポーネントとデザイントークンを起点にした、楽しい UI を作っています。",
  },
  {
    icon: "✎",
    title: "Web Craft",
    description: "Nuxt / Vue を中心に、パフォーマンスとアクセシビリティに配慮した実装が好きです。",
  },
];

const { data: works } = await useAsyncData("lp-works", () =>
  queryCollection("content").where("path", "LIKE", "/works/%").order("order", "ASC").all(),
);

const { data: articles } = await useAsyncData("lp-articles", () =>
  queryCollection("content")
    .where("path", "LIKE", "/articles/%")
    .order("date", "DESC")
    .limit(5)
    .all(),
);

const themeIcon = computed(() => (mode.value === "light" ? "☀️" : "🌙"));

const active = ref("home");
const onClickNavigation = (l: string) => {
  if (l === "#top") active.value = "home";
  else active.value = l;
};

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
    <RamTopNav
      brand="nas.love"
      :links="navLinks"
      :active="active"
      class="lp__nav"
      @nav="onClickNavigation"
    >
      <RamButton variant="ghost" size="md" @click="toggle">{{ themeIcon }}</RamButton>
    </RamTopNav>

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

    <section id="articles" class="lp__section">
      <RamMixedHeading eyebrow="ARTICLES" title="最新の記事" size="L" />
      <div v-if="articles?.length" class="lp__grid lp__grid--2">
        <LpArticleCard
          v-for="a in articles"
          :key="a.path"
          :title="a.title"
          :description="a.description"
          :date="a.date"
          :tags="a.tags"
          :path="a.path"
        />
      </div>
      <RamGlass v-else class="lp__empty">
        <RamType variant="bodyM" :color="'var(--ram-muted)'"> 記事は近日公開予定です。 </RamType>
      </RamGlass>
      <div class="lp__cta-row">
        <RamButton as="link" to="/blog-index" variant="ghost" size="md"> すべての記事 → </RamButton>
      </div>
    </section>

    <section id="about" class="lp__section">
      <RamMixedHeading eyebrow="ABOUT" title="運営者" size="L" />
      <LpAboutSection />
    </section>

    <LpSiteFooter />
  </main>
</template>

<style scoped>
.lp {
  display: grid;
  gap: var(--ram-space-7);
  padding: var(--ram-space-4);
  max-width: 1120px;
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

@media (min-width: var(--ram-bp-md)) {
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

@media (min-width: var(--ram-bp-lg)) {
  .lp__grid--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.lp__empty {
  padding: var(--ram-space-6);
  text-align: center;
}

.lp__cta-row {
  display: flex;
  justify-content: flex-end;
}
</style>
