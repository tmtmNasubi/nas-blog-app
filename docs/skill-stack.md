# 最終的な技術スタック

## コア構成

- **Nuxt 4**（v3はEOLが2026年7月、新規ならv4一択）
- **Vue 3.x**（標準のVDOMモード、Vapor Modeは見送り）
- **TypeScript**
- **pnpm**

## コンテンツ管理

- **Nuxt Content v3** — Markdown + Git管理、frontmatterはZodスキーマで型付け
- 記事は `content/blog/*.md` に配置
- MDC構文でVueコンポーネントをMarkdown内に埋め込み可能

## UI / スタイリング

- **Tailwind CSS**（`@nuxtjs/tailwindcss`）
- **Nuxt UI**（オプション、LPで複雑なコンポーネントが必要なら）

## SEO・補助モジュール

- **@nuxtjs/seo** — sitemap / robots / OG / schema.org をまとめて
- **@nuxt/image** — 画像最適化
- **Cloudflare Web Analytics** — Cookie不要・無料

## 開発ツール

- **Oxlint** — ESLint代替（50〜100倍速）
- **Oxfmt** — Prettier代替（100%互換・30倍速）
- **Vitest** — 必要に応じて

## ホスティング・配信

- **Cloudflare Workers + Static Assets**（Pagesではなく）
- 独自ドメインを Cloudflare DNS で
- デプロイは **Wrangler CLI**（NuxtHub CLIではなく直接）
- CI/CD は GitHub Actions → `wrangler deploy`

## レンダリング戦略

- 基本は **SSG**（`nuxt generate`）
- 必要が出たら route rules でハイブリッドに移行（記事一覧だけISR等）

## 見送った選択肢（理由付き）

- **Vapor Mode** → SSRハイドレーション未対応・LP/ブログでメリット薄。試すなら別プロジェクト
- **Vite+全体統合** → Nuxt設定との二重化問題が未解決(GitHub issue #912)。中身のRust製ツール（Oxlint/Oxfmt/Rolldown）は個別に恩恵を受ければ十分
- **NuxtHub CLI** → 2026年2月以降の新規デプロイ非対応・公式Cloudflare presetで代替可
- **ヘッドレスCMS（microCMS等）** → 一人運用ならGitで十分
- **Cloudflare Pages** → Workers統合の流れに乗る

## ディレクトリ構成

```
nas-blog-app/
├── app/
│   ├── pages/
│   │   ├── index.vue              # LP
│   │   └── blog/
│   │       ├── index.vue          # 記事一覧
│   │       └── [slug].vue         # 記事詳細
│   ├── components/
│   ├── layouts/
│   └── assets/css/
├── content/
│   └── blog/
│       └── *.md                   # ブログ記事
├── server/
│   └── routes/
│       └── rss.xml.ts             # RSSフィード
├── public/
├── content.config.ts              # コレクション定義(Zodスキーマ)
├── nuxt.config.ts
├── wrangler.jsonc                 # Cloudflare Workers設定
├── .assetsignore
└── package.json
```

## 初期セットアップコマンド

```bash
# プロジェクト作成
pnpm dlx nuxi@latest init my-site
cd my-site

# 必須モジュール
pnpm add @nuxt/content @nuxtjs/seo @nuxt/image
pnpm add -D tailwindcss @tailwindcss/vite

# Lint / Format（Rust製の高速ツール）
pnpm add -D oxlint
# Oxfmtはbeta、最新の入れ方は公式ドキュメントを確認

# Cloudflareデプロイ
pnpm add -D wrangler
```

## 重要な設計判断（あとで揺らがないように）

1. **Workers + Static Assets** を選ぶ — Pagesは保守モード、新機能はWorkers側のみ
2. **Markdown in Git** — Claude Code / Codex で記事も書ける、PRレビューもバージョン管理も自動で乗る
3. **SSGデフォルト + 拡張余地** — 最初は静的、後からフォーム・コメント・認証など足したくなった時にroute rulesで部分的にSSR化
4. **個別ツール採用** — Vite+のような統合バイナリは追わない。Nuxt 4が標準でVite 8/Rolldownを使うようになるので、待っていれば来る部分が多い
