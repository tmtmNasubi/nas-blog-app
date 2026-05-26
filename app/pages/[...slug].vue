<script setup lang="ts">
import ArtcleSection from "~/components/lp/ArtcleSection.vue";

const route = useRoute();

const { data: page } = await useAsyncData("page-" + route.path, () => {
  return queryCollection("content").path(route.path).first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const isBlogArticle = computed(() => route.path.startsWith("/blog/"));

const formattedDate = computed(() => {
  if (!page.value?.date) return "";
  const date =
    typeof page.value.date === "string"
      ? new Date(page.value.date)
      : page.value.date;
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const { data: articles } = await useAsyncData("lp-articles", () =>
  queryCollection("content")
    .where("path", "LIKE", "/blog/%")
    .order("date", "DESC")
    .limit(3)
    .all(),
);

useSeoMeta({
  title: () => page.value?.title ?? "nas.love",
  description: () => page.value?.description,
  ogTitle: () => page.value?.title ?? "nas.love",
  ogDescription: () => page.value?.description,
  ogType: "article",
  ogLocale: "ja_JP",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <main
    v-if="page"
    :class="['content-page', { 'content-page--blog': isBlogArticle }]"
  >
    <header class="content-page__header">
      <RamBreadcrumbs
        v-if="route.path.includes('blog')"
        :items="[
          { label: 'ホーム', to: '/' },
          { label: 'ブログ', to: '/blog' },
          page.title,
        ]"
      />

      <div class="content-page__title-block">
        <RamType
          v-if="formattedDate"
          variant="label"
          :color="'var(--ram-primary)'"
        >
          {{ formattedDate }}
        </RamType>
        <RamType variant="displayL" as="h1">
          {{ page.title }}
        </RamType>
        <RamType
          v-if="page.description"
          variant="bodyL"
          :color="'var(--ram-muted)'"
          class="content-page__description"
        >
          {{ page.description }}
        </RamType>
      </div>

      <div v-if="page.tags?.length" class="content-page__tags">
        <RamBadge
          v-for="tag in page.tags"
          :key="tag"
          tone="accent"
          variant="soft"
        >
          {{ tag }}
        </RamBadge>
      </div>
    </header>

    <article class="content-page__article">
      <ContentRenderer :value="page" />
    </article>

    <ArtcleSection :articles="[...articles]" />
  </main>
</template>

<style scoped>
.content-page {
  display: grid;
  gap: var(--ram-space-7);
  padding: var(--ram-space-4);
  margin-inline: auto;
}

.content-page--blog {
  display: grid;
  gap: var(--ram-space-6);
}

.content-page__header {
  display: grid;
  gap: var(--ram-space-5);
}

.content-page__title-block {
  display: grid;
  gap: var(--ram-space-2);
}

.content-page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-2);
}

.content-page__article {
  padding: var(--ram-space-5);
}

.content-page__article :deep(h1) {
  display: none;
}

.content-page__article :deep(h2),
.content-page__article :deep(h3),
.content-page__article :deep(h4) {
  color: var(--ram-text);
  line-height: 1.55;
  letter-spacing: 0;
  scroll-margin-top: var(--ram-space-8);
}

.content-page__article :deep(h2) {
  margin-top: var(--ram-space-8);
  margin-bottom: var(--ram-space-3);
  padding-top: var(--ram-space-5);
  border-top: 1px solid var(--ram-border);
  font-size: 24px;
}

.content-page__article :deep(h3) {
  margin-top: var(--ram-space-6);
  margin-bottom: var(--ram-space-2);
  font-size: 20px;
}

.content-page__article :deep(p),
.content-page__article :deep(li) {
  color: var(--ram-text-soft);
  font-family: var(--ram-font-body);
  font-size: 16px;
  line-height: 1.92;
  letter-spacing: 0;
}

.content-page__article :deep(p) {
  margin: 0 0 var(--ram-space-5);
}

.content-page__article :deep(ul),
.content-page__article :deep(ol) {
  display: grid;
  gap: var(--ram-space-2);
  margin: 0 0 var(--ram-space-5);
  padding-left: 1.4em;
}

.content-page__article :deep(a) {
  color: var(--ram-sky);
  text-decoration-color: color-mix(in oklch, var(--ram-sky) 45%, transparent);
  text-underline-offset: 4px;
}

.content-page__article :deep(blockquote) {
  margin: var(--ram-space-6) 0;
  padding: var(--ram-space-4);
  border-left: 4px solid var(--ram-primary);
  border-radius: var(--ram-radius-sm);
  background: var(--ram-primary-soft);
}

.content-page__article :deep(code) {
  border-radius: var(--ram-radius-xs);
  background: var(--ram-code-bg);
  padding: 0.12em 0.35em;
  font-family: var(--ram-font-mono);
  font-size: 0.9em;
}

.content-page__article :deep(pre) {
  overflow-x: auto;
  margin: var(--ram-space-6) 0;
  border: 1px solid var(--ram-border);
  border-radius: var(--ram-radius-md);
  background: var(--ram-code-bg);
  padding: var(--ram-space-4);
}

.content-page__article :deep(pre code) {
  padding: 0;
  background: transparent;
}

@media (min-width: 768px) {
  .content-page {
    padding: var(--ram-space-7) var(--ram-space-6) var(--ram-space-11);
  }

  .content-page--blog {
    gap: var(--ram-space-8);
  }

  .content-page__article {
    padding: var(--ram-space-7);
  }

  .content-page__article :deep(h2) {
    font-size: 28px;
  }

  .content-page__article :deep(p),
  .content-page__article :deep(li) {
    font-size: 17px;
  }
}
</style>
