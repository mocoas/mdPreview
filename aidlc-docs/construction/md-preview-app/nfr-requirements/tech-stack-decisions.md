# Tech Stack Decisions - md-preview-app

## Decision Summary
- Language: JavaScript (ES Modules)
- Runtime: Browser (GitHub Pages static hosting)
- Markup/CSS: Plain HTML + CSS
- Build step: なし（静的ファイルをそのまま配信）
- Markdown rendering: 依存最小方針に基づく限定機能の自前パーサ/変換

## Testing and Quality
- Unit test runner: Vitest
- Property-based testing framework: fast-check
- PBT target scope:
  - 文字列変換ロジック（エスケープ/整形）
  - タブ状態遷移ロジック

## Security Decisions
- 入力 HTML はエスケープして描画
- ユーザー入力を未加工で DOM HTML 挿入しない
- 入力上限 200KB

## Accessibility Decisions
- 最低限アクセシビリティ要件を採用
  - キーボード操作対応
  - ラベル付与
  - コントラスト配慮

## Rationale
1. GitHub Pages の静的配信に最も適合するのはビルドレス構成。
2. 依存最小方針を満たしつつ、必要な安全性と可読性を確保できる。
3. PBTフル適用の前提として fast-check を採用し、変換系と状態遷移系のバグを早期検出する。

## Deferred Decisions
- 将来的に Markdown 機能拡張が必要になった場合のみ、`markdown-it` 等の導入を再評価する。
