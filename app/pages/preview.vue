<script setup lang="ts">
const { mode, toggle } = useRamTheme();

const tabSeg = ref("all");
const tabUnderline = ref("design");

const sideNavActive = ref("articles");
const sideNavSections = [
  {
    title: "Library",
    items: [
      { id: "home", label: "ホーム", icon: "🏠" },
      { id: "articles", label: "記事", icon: "📝", badge: "12", badgeTone: "primary" as const },
      { id: "drafts", label: "下書き", icon: "📄", badge: "3", badgeTone: "sun" as const },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "profile", label: "プロフィール", icon: "👤" },
      { id: "integrations", label: "GitHub連携", icon: "🔗" },
      { id: "tokens", label: "APIキー", icon: "🔑" },
    ],
  },
];

const topNavActive = ref("articles");
const topNavLinks = [
  { value: "home", label: "ホーム" },
  { value: "articles", label: "記事" },
  { value: "design", label: "Design" },
];

const breadcrumbs = [
  { label: "ホーム", to: "/" },
  { label: "Components", to: "/preview" },
  { label: "Preview" },
];

const users = [
  { name: "Aki Nakamura", status: "online" as const },
  { name: "Mei Sato", status: "away" as const },
  { name: "Riku Tanaka", status: "busy" as const },
  { name: "Yui Kobayashi", status: "offline" as const },
  { name: "Sora Watanabe" },
  { name: "Haru Suzuki" },
];

const buttonVariants = [
  { variant: "primary" as const, label: "保存する" },
  { variant: "secondary" as const, label: "下書き保存" },
  { variant: "ghost" as const, label: "キャンセル" },
  { variant: "danger" as const, label: "削除" },
];

const badgeTones = ["primary", "secondary", "accent", "sun", "sky", "coral", "neutral"] as const;

const typeVariants = [
  { variant: "displayL" as const, sample: "ガラスの向こう側" },
  { variant: "displayM" as const, sample: "セクション主題" },
  { variant: "headingL" as const, sample: "記事タイトル" },
  { variant: "headingM" as const, sample: "カード見出し" },
  { variant: "bodyL" as const, sample: "Ramune UI は CSS と Vue で動く長文用の本文です。" },
  { variant: "bodyM" as const, sample: "説明文に使う標準サイズです。" },
  { variant: "bodyS" as const, sample: "補足やメタ情報のための小さめテキスト。" },
  { variant: "label" as const, sample: "SECTION LABEL" },
  { variant: "mono" as const, sample: "DATABASE_URL=postgres://..." },
];
</script>

<template>
  <div class="preview">
    <RamBlobBg />

    <div class="preview__inner">
      <RamTopNav
        brand="Ramune UI"
        :links="topNavLinks"
        :active="topNavActive"
        @nav="topNavActive = $event"
      >
        <RamButton variant="ghost" size="sm" @click="toggle">
          {{ mode === "light" ? "🌙 Dark" : "☀️ Light" }}
        </RamButton>
        <RamButton variant="primary" size="sm">新規作成</RamButton>
      </RamTopNav>

      <header class="preview__header">
        <RamMixedHeading
          eyebrow="COMPONENTS"
          title="Ramune UI プレビュー"
          subtitle="Component Gallery"
          size="XL"
        />
        <RamBreadcrumbs :items="breadcrumbs" />
      </header>

      <!-- Typography -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="01 / TYPOGRAPHY"
          title="タイポグラフィ"
          subtitle="Type Scale"
          size="M"
        />
        <RamGlass :inset="28" class="preview__card">
          <div class="preview__type-list">
            <div v-for="t in typeVariants" :key="t.variant" class="preview__type-row">
              <RamType variant="mono" :color="'var(--ram-subtle)'">{{ t.variant }}</RamType>
              <RamType :variant="t.variant">{{ t.sample }}</RamType>
            </div>
          </div>
        </RamGlass>
      </section>

      <!-- Mixed Heading -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="02 / HEADING"
          title="混植見出し"
          subtitle="Mixed Heading"
          size="M"
        />
        <div class="preview__grid">
          <RamGlass :inset="24">
            <RamMixedHeading
              eyebrow="SETTINGS"
              title="GitHub連携"
              subtitle="GitHub Integration"
              size="L"
            />
          </RamGlass>
          <RamGlass :inset="24">
            <RamMixedHeading
              eyebrow="DESIGN SYSTEM"
              title="Ramune UIの設計原則"
              subtitle="Design Principles"
              size="M"
            />
          </RamGlass>
        </div>
      </section>

      <!-- Buttons -->
      <section class="preview__section">
        <RamMixedHeading eyebrow="03 / BUTTON" title="ボタン" subtitle="Button" size="M" />
        <RamGlass :inset="28">
          <div class="preview__row">
            <RamButton v-for="b in buttonVariants" :key="b.variant" :variant="b.variant">
              {{ b.label }}
            </RamButton>
            <RamButton variant="icon" icon="✨" aria-label="魔法" />
          </div>
          <div class="preview__row preview__row--mt">
            <RamButton size="sm">小</RamButton>
            <RamButton size="md">中</RamButton>
            <RamButton size="lg">大</RamButton>
            <RamButton variant="primary" icon="💾">保存</RamButton>
            <RamButton variant="secondary" disabled>無効状態</RamButton>
          </div>
        </RamGlass>
      </section>

      <!-- Badge -->
      <section class="preview__section">
        <RamMixedHeading eyebrow="04 / BADGE" title="バッジ" subtitle="Status Badge" size="M" />
        <RamGlass :inset="28">
          <div class="preview__row">
            <RamBadge v-for="t in badgeTones" :key="`soft-${t}`" :tone="t" variant="soft">
              {{ t }}
            </RamBadge>
          </div>
          <div class="preview__row preview__row--mt">
            <RamBadge v-for="t in badgeTones" :key="`solid-${t}`" :tone="t" variant="solid">
              {{ t }}
            </RamBadge>
          </div>
          <div class="preview__row preview__row--mt">
            <RamBadge v-for="t in badgeTones" :key="`outline-${t}`" :tone="t" variant="outline">
              {{ t }}
            </RamBadge>
          </div>
          <div class="preview__row preview__row--mt">
            <RamBadge tone="accent" variant="dot">完了</RamBadge>
            <RamBadge tone="sun" variant="dot">確認中</RamBadge>
            <RamBadge tone="sky" variant="dot">処理中</RamBadge>
            <RamBadge tone="coral" variant="dot">失敗</RamBadge>
            <RamBadge tone="neutral" variant="dot">下書き</RamBadge>
          </div>
        </RamGlass>
      </section>

      <!-- Avatar -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="05 / AVATAR"
          title="アバター"
          subtitle="Avatar / Avatar Group"
          size="M"
        />
        <div class="preview__grid">
          <RamGlass :inset="24">
            <RamType variant="label" :color="'var(--ram-muted)'">SIZES</RamType>
            <div class="preview__row preview__row--mt preview__row--align">
              <RamAvatar name="Aki" :size="28" />
              <RamAvatar name="Mei" :size="36" />
              <RamAvatar name="Riku" :size="48" />
              <RamAvatar name="Yui" :size="64" />
            </div>
            <RamType variant="label" :color="'var(--ram-muted)'" class="preview__mt">
              STATUS
            </RamType>
            <div class="preview__row preview__row--mt preview__row--align">
              <RamAvatar name="On" status="online" :size="40" />
              <RamAvatar name="Aw" status="away" :size="40" />
              <RamAvatar name="Bu" status="busy" :size="40" />
              <RamAvatar name="Of" status="offline" :size="40" />
            </div>
          </RamGlass>
          <RamGlass :inset="24">
            <RamType variant="label" :color="'var(--ram-muted)'">GROUP</RamType>
            <div class="preview__row preview__row--mt preview__row--align">
              <RamAvatarGroup :users="users" :max="4" :size="40" />
            </div>
            <RamType variant="bodyS" :color="'var(--ram-muted)'" class="preview__mt">
              チームメンバー {{ users.length }} 人
            </RamType>
          </RamGlass>
        </div>
      </section>

      <!-- Tabs -->
      <section class="preview__section">
        <RamMixedHeading eyebrow="06 / TABS" title="タブ" subtitle="Tabs" size="M" />
        <RamGlass :inset="28">
          <RamType variant="label" :color="'var(--ram-muted)'">SEGMENTED</RamType>
          <div class="preview__row preview__row--mt">
            <RamTabs
              v-model="tabSeg"
              :tabs="[
                { value: 'all', label: 'すべて' },
                { value: 'design', label: 'Design' },
                { value: 'engineering', label: '技術' },
              ]"
            />
          </div>
          <RamType variant="label" :color="'var(--ram-muted)'" class="preview__mt">
            UNDERLINE
          </RamType>
          <div class="preview__row preview__row--mt">
            <RamTabs
              v-model="tabUnderline"
              variant="underline"
              tone="secondary"
              :tabs="[
                { value: 'design', label: 'Design' },
                { value: 'code', label: 'Code' },
                { value: 'preview', label: 'Preview' },
              ]"
            />
          </div>
        </RamGlass>
      </section>

      <!-- Side Nav -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="07 / SIDE NAV"
          title="サイドナビ"
          subtitle="Side Navigation"
          size="M"
        />
        <div class="preview__sidenav-grid">
          <RamSideNav
            :sections="sideNavSections"
            :active="sideNavActive"
            @nav="sideNavActive = $event"
          />
          <RamGlass :inset="24">
            <RamType variant="label" :color="'var(--ram-muted)'">SELECTED</RamType>
            <RamType variant="headingM" class="preview__mt">{{ sideNavActive }}</RamType>
            <RamType variant="bodyM" :color="'var(--ram-muted)'">
              サイドナビの選択値が更新されています。
            </RamType>
          </RamGlass>
        </div>
      </section>

      <!-- Surfaces: Glass / Prism -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="08 / SURFACE"
          title="サーフェス"
          subtitle="Glass / Prism"
          size="M"
        />
        <div class="preview__grid">
          <RamGlass :inset="24" hover>
            <RamType variant="label" :color="'var(--ram-primary)'">GLASS</RamType>
            <RamType variant="headingM" class="preview__mt">標準のガラス面</RamType>
            <RamType variant="bodyM" :color="'var(--ram-muted)'">
              背景blobの色を透過して拾う標準のサーフェスです。
            </RamType>
          </RamGlass>
          <RamGlass :inset="24" strong hover>
            <RamType variant="label" :color="'var(--ram-secondary)'">GLASS STRONG</RamType>
            <RamType variant="headingM" class="preview__mt">読みやすいガラス面</RamType>
            <RamType variant="bodyM" :color="'var(--ram-muted)'">
              長文やフォームに使う、コントラストを強めた面。
            </RamType>
          </RamGlass>
          <RamPrism color="var(--ram-sky)" :padding="24">
            <RamType variant="label" :color="'var(--ram-sky)'">PRISM / SKY</RamType>
            <RamType variant="headingM" class="preview__mt">プリズム表面</RamType>
            <RamType variant="bodyM" :color="'var(--ram-muted)'">
              虹色のシーンを纏った装飾的なサーフェス。
            </RamType>
          </RamPrism>
          <RamPrism color="var(--ram-accent)" :padding="24">
            <RamType variant="label" :color="'var(--ram-accent)'">PRISM / ACCENT</RamType>
            <RamType variant="headingM" class="preview__mt">アクセントカラー版</RamType>
            <RamType variant="bodyM" :color="'var(--ram-muted)'">
              色をpropで切り替えできます。
            </RamType>
          </RamPrism>
        </div>
      </section>

      <!-- Inline Code -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="09 / INLINE CODE"
          title="インラインコード"
          subtitle="Inline Code"
          size="M"
        />
        <RamGlass :inset="28">
          <RamType variant="bodyM">
            環境変数 <RamInlineCode>DATABASE_URL</RamInlineCode> を設定し、
            <RamInlineCode>pnpm dev</RamInlineCode> で開発サーバを起動してください。 詳細は
            <RamInlineCode>https://ramune-ui.dev/docs</RamInlineCode> を参照。
          </RamType>
        </RamGlass>
      </section>

      <!-- Breadcrumbs -->
      <section class="preview__section">
        <RamMixedHeading
          eyebrow="10 / BREADCRUMBS"
          title="パンくずリスト"
          subtitle="Breadcrumbs"
          size="M"
        />
        <RamGlass :inset="20">
          <RamBreadcrumbs :items="breadcrumbs" />
        </RamGlass>
      </section>
    </div>
  </div>
</template>

<style scoped>
.preview {
  position: relative;
  min-height: 100vh;
  isolation: isolate;
  overflow-x: hidden;
}

.preview__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: var(--ram-space-4) var(--ram-space-4) var(--ram-space-10);
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-7);
  min-width: 0;
}

.preview__header {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-3);
  margin-top: var(--ram-space-3);
  min-width: 0;
}

.preview__section {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-4);
  min-width: 0;
}

.preview__card {
  width: 100%;
  min-width: 0;
}

.preview__type-list {
  display: flex;
  flex-direction: column;
  gap: var(--ram-space-3);
  min-width: 0;
}

.preview__type-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--ram-border);
  min-width: 0;
}

.preview__type-row > * {
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: normal;
}

.preview__type-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.preview__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preview__row--mt {
  margin-top: 14px;
}

.preview__row--align {
  align-items: center;
}

.preview__mt {
  margin-top: 12px;
}

.preview__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.preview__sidenav-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .preview__inner {
    padding: var(--ram-space-6) var(--ram-space-6) var(--ram-space-12);
    gap: var(--ram-space-10);
  }

  .preview__header {
    gap: 16px;
    margin-top: 24px;
  }

  .preview__section {
    gap: 20px;
  }

  .preview__type-list {
    gap: 18px;
  }

  .preview__type-row {
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 16px;
    align-items: baseline;
  }

  .preview__grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .preview__sidenav-grid {
    grid-template-columns: 280px 1fr;
    gap: 20px;
  }
}
</style>
