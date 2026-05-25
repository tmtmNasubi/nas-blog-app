---
title: Ramune UI のトークン設計
description: Ramune UI で採用している CSS 変数ベースのトークン階層と、light/dark の切り替え戦略について。
date: 2026-03-12
tags:
  - Design System
  - CSS
---

# Ramune UI のトークン設計

色・スペーシング・モーション・シャドウを `--ram-*` 接頭辞の CSS 変数で管理している。テーマ切り替えはルート要素のクラスを `ram-light` / `ram-dark` に切り替えるだけで成立するように設計した。
