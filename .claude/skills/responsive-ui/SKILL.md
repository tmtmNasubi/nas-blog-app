---
name: responsive-ui
description: レスポンシブ／モバイルファーストUIを実装するとき、または「横スクロールが出る」「タイル/パネルが画面より広い」「特定のブレークポイントで崩れる」など overflow・改行・グリッド/フレックス起因のレイアウト不具合を直すときに使う。CSS Grid / Flex の min-width 落とし穴、inline 要素の改行制御、モバイルファーストの書き方、ブレークポイント設計を扱う。
---

# Responsive UI Skill

モバイルファーストで破綻しないレスポンシブUIを書くための実戦ノウハウ。
**症状を `overflow-x: hidden` で隠さず、必ず根本原因（押し広げている要素）を直す**ことが原則。

---

## 0. デバッグの第一歩：何が押し広げているのかを特定する

横スクロールやパネル超過を見たら、即「`overflow-x: hidden` で隠す」のは禁じ手。**根本原因の要素を特定**する。

### 手順
1. ブラウザ DevTools で `<html>` から DOM を上から下に追い、 **`scrollWidth > clientWidth` になっている最初の要素**を見つける
2. その要素の子から、**`offsetWidth` が親より大きい子**を探す（その子が押し広げている犯人）
3. 犯人が確定したら、以下のいずれかで直す：
   - `min-width: 0` を入れる（Grid/Flex item の場合）
   - `overflow-wrap: anywhere` で改行可能にする
   - `display: block; width: 100%` で親幅に縛る（inline 要素の場合）
   - 中身をそもそも短くする / モバイルでは隠す

### コンソールで原因を絞り込むスニペット
```js
// scrollWidth が viewport を超えている要素を全部出す
[...document.querySelectorAll('*')]
  .filter(el => el.scrollWidth > document.documentElement.clientWidth)
  .forEach(el => console.log(el.scrollWidth, el))
```

---

## 1. CSS Grid / Flex の `min-width: 0` 問題（最頻出）

### なぜ起きるか
Grid item / Flex item のデフォルトは `min-width: auto` ＝ **`min-content`**（＝改行できない最小幅、長い英数字列の幅など）。中に長い URL や英単語、半角連続文字があると、その min-content がそのままトラックを押し広げ、`grid-template-columns: 1fr` だろうと **親より広くなる**。

### 直し方（必ずセットで）
```css
.parent {
  display: grid;
  grid-template-columns: minmax(0, 1fr);  /* 1fr ではなく minmax(0, 1fr) */
  min-width: 0;
}

.parent > * {
  min-width: 0;
  overflow-wrap: anywhere;
}
```

- `1fr` のみ → 子の min-content で押し広げられる
- `minmax(0, 1fr)` → 最小値 0 を許容し、トラックが親に縛られる
- 子要素にも `min-width: 0` ＋ `overflow-wrap: anywhere`

### 同じ理屈で Flex でも必要
```css
.row {
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}
.row > * {
  min-width: 0;
  max-width: 100%;
}
```

### 階層を貫通させる
ネストした Grid/Flex では、**親のどこかに `min-width: auto` の経路があれば最深部の押し広げが root まで波及**する。`.preview__inner > .preview__section > .preview__card > .ram-glass__content > .preview__type-list > .preview__type-row > <RamType>` のように深いと、**全階層に `min-width: 0` を入れる**必要がある。

---

## 2. inline 要素の落とし穴：`<span>` には `min-width` が効かない

### 症状
`<span class="ram-type">` のようなコンポーネントを Grid/Flex item にすると、**inline 要素のため `min-width: 0` が無効**。中の長文テキスト（例: bodyL の「Ramune UI は CSS と Vue で動く長文用の本文です。」）の **intrinsic content 幅**で grid track をそのまま押し広げる。

### 直し方
inline 要素を grid item として block 化する：
```css
.parent > * {
  display: block;          /* inline → block */
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
}
```

または、コンポーネント側で root を `<div>` / `<p>` に変えられるようにし、`as` props で切り替える。

### 余談：`<RamGlass>` のような surface コンポーネント
中身の min-content が外側パネルを膨らませる典型。**コンポーネント自身に `width: 100%; min-width: 0`、内側の `__content` にも `min-width: 0`** を仕込んでおくと、利用側で詰まらない。

---

## 3. 改行制御：`overflow-wrap` vs `word-break`

| プロパティ | 効く対象 | 用途 |
|---|---|---|
| `overflow-wrap: anywhere` | 単語の途中で改行（最後の手段） | 通常文章の長単語・URL対策。**まずこれで足りるか検証** |
| `word-break: normal` | 通常 | デフォルト。日本語は文字単位で改行可、英単語は維持 |
| `word-break: break-all` | どこでも改行（CJK 含む全文字） | コードや URL 専用。**通常文章には使わない**（英単語が変な位置で切れる） |
| `word-break: keep-all` | CJK でも単語境界優先 | 英文混在の本文向け（限定的） |

### 判断基準
- 日本語＋英語の本文 → `overflow-wrap: anywhere` のみ
- インラインコード `<code>` の URL → `overflow-wrap: anywhere` で大体足りる。それでも切れない場合のみ `word-break: break-all`
- mono フォントで延々続く ID `DATABASE_URL=postgres://...` → `overflow-wrap: anywhere` で足りる

### 注意
過剰に `word-break: break-all` を入れると、和文・英文の見栄えが悪化する。**まず `overflow-wrap: anywhere` を試し、それで改行されない場合のみ `break-all` を検討**。

---

## 4. モバイルファーストの書き方

### 原則
- **`@media (min-width: ...)` のみを使う**（`max-width` は使わない）
- 既定値 = モバイル用、上書き = デスクトップ用
- `max-width` クエリが既存にあれば、内容を反転して `min-width` に書き換える

### ブレークポイント（Tailwind 標準準拠）
| 名前 | 値 | 対象 |
|---|---|---|
| sm | 640px | 大型スマホ縦 |
| md | 768px | タブレット縦 |
| lg | 1024px | タブレット横／小型ノート |
| xl | 1280px | デスクトップ |
| 2xl | 1536px | ワイドモニター |

ほとんどの案件は **md (768) と lg (1024) の二段階**で十分。

### 書き換えパターン
```css
/* ❌ デスクトップファースト */
.foo { padding: 24px; }
@media (max-width: 720px) {
  .foo { padding: 12px; }
}

/* ✅ モバイルファースト */
.foo { padding: 12px; }
@media (min-width: 768px) {
  .foo { padding: 24px; }
}
```

### CSS変数のブレークポイントトークン
`@media` 条件式に CSS カスタムプロパティは直接使えないが、**設計トークンとして残しておく**と JS 連携や container query への移行時に楽：
```css
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
}
```

---

## 5. タップ領域の確保

主要操作要素（ボタン、リンク、ハンバーガー等）は **最低 44 × 44px**（WCAG 2.5.5 / Apple HIG 推奨）。

```css
.button-md {
  height: 44px;
  padding: 11px 20px;
}

.icon-button {
  width: 44px;
  height: 44px;
}
```

ハンバーガーボタンや Close (×) ボタンは見落としがち。アイコンサイズ（18-20px）と外側のヒット領域（44px）を別物として設計する。

---

## 6. ナビゲーションのレスポンシブ化

### モバイルではドロワー、デスクトップでは横並び
```css
/* モバイル既定 */
.nav__links { display: none; }
.nav__toggle { display: inline-flex; width: 44px; height: 44px; }

@media (min-width: 768px) {
  .nav__links { display: flex; }
  .nav__toggle { display: none; }
}
```

### ドロワー本体は body 直下に Teleport
```vue
<ClientOnly>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="drawer-overlay-wrap">
        <div class="drawer-overlay" @click="isOpen = false" />
        <div class="drawer" role="dialog" aria-modal="true">...</div>
      </div>
    </Transition>
  </Teleport>
</ClientOnly>
```

ポイント：
- 親が `overflow: hidden` でもドロワーが切れないよう **body 直下に Teleport**
- SSG / prerender 中は `document.body` が無いので **`<ClientOnly>` で囲む**（必須）
- 開閉中は `document.body.style.overflow = 'hidden'` で背景スクロール抑止
- ESC で閉じる、オーバーレイクリックで閉じる、`aria-expanded` / `aria-modal` 設定

### slot の中身もモバイルで間引く
TopNav の slot に複数ボタンを入れている場合、モバイルでは `display: none` にしてドロワー側に集約。**slot に置くものを増やすと簡単に画面幅を超える**点に注意。

---

## 7. アンチパターン集

| アンチパターン | 何が悪いか | 正しい対処 |
|---|---|---|
| `body { overflow-x: hidden }` で済ませる | 症状を隠すだけ。原因が残ったままで他ページにも波及 | 押し広げている要素を特定し min-width:0 / overflow-wrap で直す |
| `width: 100vw` をコンテナに使う | スクロールバー幅を無視してオーバーフロー | `width: 100%` を使う |
| `grid-template-columns: 1fr` のまま放置 | min-content で押し広げられる | `minmax(0, 1fr)` に変える |
| ピクセル固定の `padding: 24px` | モバイルで窮屈 | `var(--ram-space-*)` などトークン化＋mediaクエリ |
| デスクトップで設計 → 後でモバイル対応 | `max-width` クエリだらけになり読みにくい | 最初からモバイルファーストで書く |
| `@vueuse/nuxt` を modules 未登録のまま `useEventListener` を使う | クライアントで `Can't find variable: useEventListener` | modules 登録するか、ネイティブ `addEventListener` を使う |
| 過剰な `word-break: break-all` | 和文・英文の見栄えが崩れる | まず `overflow-wrap: anywhere` を試す |
| `Teleport to="body"` を裸で書く | SSG prerender で hydration error / 500 エラー | `<ClientOnly>` で囲む |

---

## 8. 検証チェックリスト

### 実機サイズ
DevTools の Device Toolbar で順に確認：
- [ ] iPhone SE (375 × 667) — 最狭ケース
- [ ] iPhone 14 (390 × 844)
- [ ] iPad mini (768 × 1024) — md 直近
- [ ] iPad Pro (1024 × 1366) — lg 直近
- [ ] Desktop (1440 × 900)

### 機能チェック
- [ ] **横スクロールが出ない**（コンソールで `document.documentElement.scrollWidth === innerWidth`）
- [ ] ハンバーガー → ドロワー → リンクタップ → 閉じる の動線
- [ ] ESC でドロワーが閉じる、`aria-expanded` が切り替わる
- [ ] テキストの長文・URL がはみ出さず改行される
- [ ] タップ領域が 44px 以上
- [ ] light / dark 双方で破綻しない
- [ ] `prefers-reduced-motion` でアニメ抑制

### 静的検査・ビルド
- [ ] `pnpm lint`
- [ ] `pnpm generate`（prerender エラー無し）
- [ ] Cloudflare デプロイ後の実機（SSG vs SSR の差で出るバグあり）

---

## 9. クイックリファレンス：「困ったらこれを入れる」

### Grid/Flex でレイアウトが画面外に出た
```css
.parent { min-width: 0; }
.parent > * { min-width: 0; max-width: 100%; }

/* Grid なら */
.parent { grid-template-columns: minmax(0, 1fr); }
```

### 長文・URLが改行されない
```css
.target { overflow-wrap: anywhere; }
/* それでも切れないインラインコードのみ */
code { word-break: break-all; }
```

### inline 要素 (span) を grid/flex item として置きたい
```css
.parent > * {
  display: block;
  width: 100%;
  min-width: 0;
}
```

### モバイル時だけ要素を隠す
```css
.desktop-only { display: none; }
@media (min-width: 768px) {
  .desktop-only { display: flex; }
}
```

### Surface（カード/パネル）コンポーネントの設計
```css
.surface {
  width: 100%;
  min-width: 0;
}
.surface__content {
  min-width: 0;
}
```
