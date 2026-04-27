<script setup lang="ts">
defineProps<{
  icon?: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <RamGlass hover class="lp-feature">
    <div class="lp-feature__inner">
      <div v-if="icon" class="lp-feature__icon" aria-hidden="true">{{ icon }}</div>
      <RamType variant="headingM" as="h3">{{ title }}</RamType>
      <RamType variant="bodyM" :color="'var(--ram-muted)'">
        {{ description }}
      </RamType>
    </div>
  </RamGlass>
</template>

<style scoped>
.lp-feature {
  height: 100%;
}

.lp-feature__inner {
  display: grid;
  gap: var(--ram-space-3);
  padding: var(--ram-space-5);
}

.lp-feature__icon {
  font-size: 28px;
  line-height: 1;
}
</style>
