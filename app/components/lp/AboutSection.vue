<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string;
    role?: string;
    bio?: string;
  }>(),
  {
    name: "nas",
    role: "Frontend Engineer",
    bio: "",
  },
);
</script>

<template>
  <RamGlass class="lp-about">
    <div class="lp-about__inner">
      <div class="lp-about__head">
        <RamAvatar :name="name" :size="72" />
        <div class="lp-about__head-text">
          <RamType variant="headingL" as="h3">{{ name }}</RamType>
          <RamType variant="bodyS" :color="'var(--ram-muted)'">
            {{ role }}
          </RamType>
        </div>
      </div>
      <RamType variant="bodyM">{{ bio }}</RamType>
      <div class="lp-about__links">
        <RamButton
          as="link"
          to="https://github.com/tmtmNasubi"
          variant="secondary"
          size="md"
        >
          GitHub
        </RamButton>
        <RamButton as="link" to="/about" variant="ghost" size="md">
          詳しく見る
        </RamButton>
      </div>
    </div>
  </RamGlass>
</template>

<style scoped>
.lp-about__inner {
  display: grid;
  gap: var(--ram-space-4);
  padding: var(--ram-space-6);
}

.lp-about__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--ram-space-3);
}

@media (min-width: var(--ram-bp-md)) {
  .lp-about__head {
    flex-direction: row;
    align-items: center;
    gap: var(--ram-space-4);
  }
}

.lp-about__head-text {
  display: grid;
  gap: 4px;
}

.lp-about__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-2);
}
</style>
