<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
  date?: string | Date;
  tags?: string[];
  path: string;
}>();

const formattedDate = computed(() => {
  if (!props.date) return "";
  const d = typeof props.date === "string" ? new Date(props.date) : props.date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});
</script>

<template>
  <NuxtLink :to="path" class="lp-article">
    <RamGlass hover class="lp-article__glass">
      <div class="lp-article__inner">
        <div v-if="formattedDate" class="lp-article__meta">
          <RamType variant="label" :color="'var(--ram-muted)'">
            {{ formattedDate }}
          </RamType>
        </div>
        <RamType variant="headingS" as="h3">{{ title }}</RamType>
        <RamType
          v-if="description"
          variant="bodyS"
          :color="'var(--ram-muted)'"
        >
          {{ description }}
        </RamType>
        <div v-if="tags?.length" class="lp-article__tags">
          <RamBadge v-for="t in tags" :key="t" tone="accent" variant="soft">
            {{ t }}
          </RamBadge>
        </div>
      </div>
    </RamGlass>
  </NuxtLink>
</template>

<style scoped>
.lp-article {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.lp-article__glass {
  height: 100%;
}

.lp-article__inner {
  display: grid;
  gap: var(--ram-space-2);
  padding: var(--ram-space-4);
}

.lp-article__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--ram-space-2);
}
</style>
