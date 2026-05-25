<script setup lang="ts">
const { mode, toggle } = useRamTheme();

const navLinks = [
  { value: "home", label: "Home", href: "#top" },
  { value: "works", label: "Works", href: "#works" },
  { value: "articles", label: "Articles", href: "#articles" },
  { value: "about", label: "About", href: "#about" },
];

const active = ref("home");
const onClickNavigation = (l: string) => {
  if (l === "#top") active.value = "home";
  else active.value = l;
};
</script>

<template>
  <div
    class="grid relative isolate px-(--ram-space-2) py-(--ram-space-6) min-h-screen"
  >
    <RamBlobBg />
    <div class="relative z-1">
      <RamTopNav
        brand="nas.love"
        :links="navLinks"
        :active="active"
        class="lp__nav"
        @nav="onClickNavigation"
      >
        <RamButton variant="ghost" size="md" @click="toggle">
          {{ mode === "light" ? "🌙 Dark" : "☀️ Light" }}
        </RamButton>
      </RamTopNav>
      <slot />
      <LpSiteFooter />
    </div>
  </div>
</template>
