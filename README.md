# nas-blog-app

Nuxt 4 と Nuxt Content で作っている、ポートフォリオ兼ブログサイトです。トップページでは制作物と記事を表示し、Markdown コンテンツは `content/` 配下で Git 管理します。静的生成した成果物は Cloudflare Workers Static Assets で配信する構成です。

## 技術スタック

- Nuxt 4
- Vue 3
- TypeScript
- Nuxt Content v3
- Tailwind CSS v4
- Vitest
- Oxlint / Oxfmt / ESLint
- Cloudflare Workers + Wrangler

## セットアップ

依存関係は `pnpm` でインストールします。

```bash
pnpm install
```

開発サーバを起動します。

```bash
pnpm dev
```

既定では `http://localhost:3000` で確認できます。

## よく使うコマンド

```bash
pnpm dev            # 開発サーバを起動
pnpm build          # 本番ビルド
pnpm generate       # 静的サイトを生成
pnpm preview        # 生成/ビルド後の表示確認
pnpm lint           # Oxlint と ESLint を実行
pnpm lint:fix       # Lint の自動修正
pnpm fmt            # Oxfmt と ESLint fix で整形
pnpm test           # 全 Vitest プロジェクトを実行
pnpm test:unit      # unit テストだけ実行
pnpm test:nuxt      # Nuxt テストだけ実行
pnpm test:e2e       # e2e テストだけ実行
pnpm test:coverage  # V8 カバレッジ付きで実行
pnpm cf:dev         # Wrangler のローカル開発
pnpm deploy         # Cloudflare Workers へデプロイ
```

## ディレクトリ構成

```text
.
├── app/
│   ├── app.vue
│   ├── assets/css/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   └── pages/
├── content/
│   ├── about.md
│   ├── blog/
│   └── works/
├── docs/
├── public/
├── test/
│   ├── e2e/
│   └── unit/
├── content.config.ts
├── nuxt.config.ts
├── vitest.config.ts
└── wrangler.jsonc
```

## コンテンツの追加

記事は `content/blog/*.md`、制作物は `content/works/*.md` に追加します。`app/pages/[...slug].vue` が Nuxt Content からページを取得し、Markdown を描画します。

Frontmatter では以下の項目を扱えます。

```md
---
title: "記事タイトル"
description: "記事の概要"
date: 2026-05-26
tags:
  - Nuxt
  - UI
draft: false
image: "/images/example.png"
repo: "https://github.com/example/repo"
demo: "https://example.com"
order: 1
---
```

`title` は必須です。`description`、`date`、`tags`、`image`、`repo`、`demo`、`order` は必要に応じて指定します。

## ルーティング

- `/`: トップページ
- `/blog`: 記事一覧
- `/blog/<slug>`: ブログ記事
- `/works/<slug>`: 制作物ページ
- `/about`: プロフィールページ
- `/preview`: プレビュー用ページ

Markdown ファイルのパスがそのまま URL に対応します。例として `content/blog/hello.md` は `/blog/hello` になります。

## 静的生成とデプロイ

`nuxt.config.ts` では `content/` 配下の Markdown / MDC ファイルを走査し、対応するルートを Nitro の prerender 対象に追加しています。コンテンツやルーティングを変更した場合は、静的生成まで確認してください。

```bash
pnpm generate
```

Cloudflare Workers へデプロイする場合は、生成された `.output/public` を `wrangler.jsonc` の Static Assets 設定で配信します。

```bash
pnpm deploy
```

## テスト

テストは Vitest のプロジェクト分割で実行します。

- 純粋なロジック: `test/unit/*.test.ts`
- Nuxt コンポーネントや composable: `test/nuxt/*.test.ts`
- 画面やルーティングをまたぐ確認: `test/e2e/*.test.ts`

開発中は対象のコマンドだけを実行し、仕上げに `pnpm test` または `pnpm test:coverage` で全体を確認します。
