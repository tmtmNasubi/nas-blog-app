<script setup lang="ts">
interface Link {
  value: string;
  label: string;
}

const props = defineProps<{
  brand: string;
  links: Array<string | Link>;
  active?: string;
}>();

const emit = defineEmits<{ nav: [string] }>();

const valueOf = (l: string | Link) => (typeof l === "string" ? l : l.value);
const labelOf = (l: string | Link) => (typeof l === "string" ? l : l.label);
const isActive = (l: string | Link) => valueOf(l) === props.active;
</script>

<template>
  <div class="ram-topnav">
    <div class="ram-topnav__backdrop" aria-hidden="true" />
    <div class="ram-topnav__left">
      <div class="ram-topnav__brand">{{ brand }}</div>
      <nav class="ram-topnav__links">
        <button
          v-for="link in links"
          :key="typeof link === 'string' ? link : link.value"
          type="button"
          :class="['ram-topnav__link', { 'ram-topnav__link--active': isActive(link) }]"
          @click="emit('nav', valueOf(link))"
        >
          {{ labelOf(link) }}
        </button>
      </nav>
    </div>
    <div class="ram-topnav__right">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ram-topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  border: 1px solid var(--ram-glass-border);
  border-radius: var(--ram-radius-lg);
  box-shadow: var(--ram-shadow);
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.ram-topnav__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: var(--ram-glass);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
}

.ram-topnav__left,
.ram-topnav__right {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.ram-topnav__left {
  gap: 24px;
}

.ram-topnav__right {
  gap: 10px;
}

.ram-topnav__brand {
  font-family: var(--ram-font-display);
  font-weight: 700;
  font-size: 18px;
  background: linear-gradient(90deg, var(--ram-primary), var(--ram-sun));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.ram-topnav__links {
  display: flex;
  gap: 2px;
}

.ram-topnav__link {
  padding: 7px 14px;
  border: none;
  background: transparent;
  color: var(--ram-muted);
  font-family: var(--ram-font-display);
  font-weight: 600;
  font-size: 13px;
  border-radius: var(--ram-radius-pill);
  cursor: pointer;
  transition: all var(--ram-motion-fast);
}

.ram-topnav__link:hover {
  color: var(--ram-text);
}

.ram-topnav__link--active {
  background: var(--ram-glass-strong);
  color: var(--ram-text);
}
</style>
