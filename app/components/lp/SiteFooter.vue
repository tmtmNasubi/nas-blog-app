<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="lp-footer">
    <RamGlass>
      <div class="lp-footer__inner">
        <RamType variant="uiS" :color="'var(--ram-muted)'">
          © {{ year }} - Copyright nas | All Rights Reserved.
        </RamType>
        <nav class="lp-footer__links">
          <a href="https://github.com/tmtmNasubi" class="lp-footer__link">
            GitHub
          </a>
          <NuxtLink to="/blog" class="lp-footer__link">Articles</NuxtLink>
          <NuxtLink to="/about" class="lp-footer__link">About</NuxtLink>
        </nav>
      </div>
    </RamGlass>
  </footer>
</template>

<style scoped>
.lp-footer {
  padding: var(--ram-space-4);
}

.lp-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--ram-space-3);
  padding: var(--ram-space-4) var(--ram-space-5);
}

.lp-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ram-space-4);
}

@media (min-width: 768px) {
  .lp-footer__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.lp-footer__link {
  font-family: var(--ram-font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--ram-muted);
  text-decoration: none;
  transition: color var(--ram-motion-fast);
}

.lp-footer__link:hover {
  color: var(--ram-text);
}
</style>
