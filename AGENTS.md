# Repository Guidelines

**回答は全て日本語で行うこと**

## プロジェクト構成とモジュール配置

このリポジトリは Nuxt 4 の `app/` 構成を採用しています。アプリ本体は `app/` 配下に置き、`app/app.vue` がエントリポイント、`app/pages/` がファイルベースルーティング、`app/components/` が共通 UI コンポーネントです。Markdown コンテンツは `content/` に配置し、`app/pages/[...slug].vue` から Nuxt Content 経由で描画します。テストは `test/` 配下で `unit`、`nuxt`、`e2e` に分けます。静的ファイルは `public/`、補足資料は `docs/` を使ってください。

## ビルド・テスト・開発コマンド

パッケージマネージャは `pnpm` を使います。

- `pnpm dev`: 開発サーバを `http://localhost:3000` で起動
- `pnpm build`: 本番ビルドを作成
- `pnpm generate`: 静的サイトを生成
- `pnpm preview`: 本番ビルドをローカル確認
- `pnpm lint`: `oxlint --type-aware .` と `eslint .` を実行
- `pnpm fmt`: `oxfmt` で整形
- `pnpm test`: 全 Vitest プロジェクトを実行
- `pnpm test:unit` / `pnpm test:nuxt` / `pnpm test:e2e`: 対象別に実行
- `pnpm test:coverage`: V8 カバレッジ付きで実行

## コーディング規約と命名

既存コードに合わせて 2 スペースインデントを維持してください。TypeScript はシングルクオート基調、Vue SFC は `script`、`template`、`style` の順で記述します。コンポーネント名は `Alert.vue` のように PascalCase を使います。コンテンツファイルは URL に対応する名前を付け、例として `content/about.md` のように配置します。

## テスト方針

純粋なロジックは `test/unit/*.test.ts`、Nuxt コンポーネントや composable は `test/nuxt/*.test.ts`、画面やルーティングをまたぐ確認は `test/e2e/*.test.ts` に置きます。ファイル名は `*.test.ts` または `*.spec.ts` を使ってください。開発中は対象プロジェクトだけを実行し、仕上げに `pnpm test` または `pnpm test:coverage` で全体確認します。

## コミットとプルリクエスト

コミットメッセージは `Initial commit` のような短い命令形を基本にしてください。プルリクエストには変更内容、確認に使ったコマンド、関連 Issue を明記します。UI、コンテンツ描画、ルーティングに影響する変更ではスクリーンショットか表示確認結果を添えてください。

## デプロイと設定メモ

このアプリは静的生成が前提なので、ルートやコンテンツ取得に触れた変更では `pnpm generate` の確認を推奨します。`.nuxt/`、`.data/`、ローカル生成物や依存キャッシュはコミットしないでください。
