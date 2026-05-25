<script setup lang="ts">
const { data: articles } = await useAsyncData("blog-articles", () =>
  queryCollection("content")
    .where("path", "LIKE", "/blog/%")
    .order("date", "DESC")
    .all(),
);

const formatDate = (value?: string | Date) => {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

useSeoMeta({
  title: "Blog | nas.love",
  description:
    "Ramune UI、Liquid Glass、Nuxt を中心に、Web の表現と設計について書いた記事一覧です。",
  ogTitle: "Blog | nas.love",
  ogDescription:
    "Ramune UI、Liquid Glass、Nuxt を中心に、Web の表現と設計について書いた記事一覧です。",
  ogType: "website",
  ogLocale: "ja_JP",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <main class="blog-page">
    <header class="blog-page__hero">
      <RamBreadcrumbs :items="[{ label: 'ホーム', to: '/' }, 'ブログ']" />
      <RamMixedHeading
        eyebrow="BLOG"
        title="読みもの"
        subtitle="やったことやアイデアを残すテックブログです"
        size="XL"
        as="h1"
      />
    </header>

    <section class="blog-page__body" aria-label="記事一覧">
      <div v-if="articles?.length" class="blog-page__list">
        <NuxtLink
          v-for="article in articles"
          :key="article.path"
          :to="article.path"
          class="blog-card"
        >
          <RamGlass hover strong class="blog-card__glass">
            <article class="blog-card__content">
              <div class="blog-card__meta">
                <RamType
                  v-if="article.date"
                  variant="label"
                  :color="'var(--ram-primary)'"
                >
                  {{ formatDate(article.date) }}
                </RamType>
                <span class="blog-card__line" aria-hidden="true" />
              </div>

              <div class="blog-card__text">
                <RamType variant="headingL" as="h2">
                  {{ article.title }}
                </RamType>
                <RamType
                  v-if="article.description"
                  variant="bodyM"
                  :color="'var(--ram-muted)'"
                >
                  {{ article.description }}
                </RamType>
              </div>

              <div v-if="article.tags?.length" class="blog-card__tags">
                <RamBadge
                  v-for="tag in article.tags"
                  :key="tag"
                  tone="accent"
                  variant="soft"
                >
                  {{ tag }}
                </RamBadge>
              </div>
            </article>
          </RamGlass>
        </NuxtLink>
      </div>

      <RamGlass v-else strong class="blog-page__empty">
        <RamType variant="bodyM" :color="'var(--ram-muted)'">
          記事は近日公開予定です。
        </RamType>
      </RamGlass>
    </section>
  </main>
</template>

<style scoped>
.blog-page {
  display: grid;
  gap: var(--ram-space-7);
  padding: var(--ram-space-4);
  margin-inline: auto;
}

.blog-page__hero {
  display: grid;
  gap: var(--ram-space-5);
  padding-top: var(--ram-space-3);
}

.blog-page__body,
.blog-page__list {
  display: grid;
  gap: var(--ram-space-4);
}

.blog-card {
  display: block;
  color: inherit;
  text-decoration: none;
}

.blog-card__glass {
  height: 100%;
}

.blog-card__content {
  display: grid;
  gap: var(--ram-space-4);
  padding: var(--ram-space-5);
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: var(--ram-space-3);
  min-width: 0;
}

.blog-card__line {
  flex: 1;
  height: 1px;
  min-width: 32px;
  background: linear-gradient(90deg, var(--ram-primary), transparent);
  opacity: 0.45;
}

.blog-card__text {
  display: grid;
  gap: var(--ram-space-2);
}

.blog-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-2);
}

.blog-page__empty {
  padding: var(--ram-space-6);
  text-align: center;
}

@media (min-width: 768px) {
  .blog-page {
    gap: var(--ram-space-9);
    padding: var(--ram-space-7) var(--ram-space-6) var(--ram-space-11);
  }

  .blog-page__hero {
    max-width: 720px;
  }

  .blog-card__content {
    grid-template-columns: 168px minmax(0, 1fr);
    gap: var(--ram-space-5);
    padding: var(--ram-space-6);
  }

  .blog-card__meta {
    align-content: start;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 6px;
  }

  .blog-card__line {
    width: 64px;
    flex: initial;
  }

  .blog-card__tags {
    grid-column: 2;
  }
}
</style>
