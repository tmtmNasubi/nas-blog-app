<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  tags?: string[];
  image?: string;
  demo?: string;
  repo?: string;
  path?: string;
}>();
</script>

<template>
  <RamGlass hover class="lp-work">
    <div v-if="image" class="lp-work__media">
      <img :src="image" :alt="title" >
    </div>
    <div class="lp-work__body">
      <RamType variant="headingM" as="h3">{{ title }}</RamType>
      <RamType
        v-if="description"
        variant="bodyM"
        :color="'var(--ram-muted)'"
      >
        {{ description }}
      </RamType>
      <div v-if="tags?.length" class="lp-work__tags">
        <RamBadge v-for="t in tags" :key="t" tone="secondary" variant="soft">
          {{ t }}
        </RamBadge>
      </div>
      <div class="lp-work__actions">
        <RamButton v-if="demo" as="link" :to="demo" variant="ghost" size="sm">
          Demo →
        </RamButton>
        <RamButton
          v-if="repo"
          as="link"
          :to="repo"
          variant="ghost"
          size="sm"
        >
          Repo →
        </RamButton>
        <RamButton
          v-if="path && !demo"
          as="link"
          :to="path"
          variant="ghost"
          size="sm"
        >
          詳細 →
        </RamButton>
      </div>
    </div>
  </RamGlass>
</template>

<style scoped>
.lp-work {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.lp-work__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--ram-glass-inner);
}

.lp-work__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lp-work__body {
  display: grid;
  gap: var(--ram-space-3);
  padding: var(--ram-space-5);
  flex: 1;
  align-content: start;
}

.lp-work__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.lp-work__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-2);
  margin-top: auto;
  padding-top: var(--ram-space-2);
}
</style>
