# Code Summary - md-preview-app

## Generated Application Files
- `index.html`
  - 入力/プレビュータブUI
  - `data-testid` 付き主要要素
- `styles.css`
  - レイアウト、アクセシブルなフォーカス表示、可読性重視の配色
- `src/app.js`
  - タブ状態制御
  - プレビュー更新（タブ切替時）
  - 入力サイズ制限（200KB）
- `src/markdown.js`
  - HTMLエスケープ
  - 限定Markdown変換（見出し/段落/強調/インラインコード/コードブロック）
- `src/state.js`
  - タブ状態遷移
  - 状態シリアライズ/デシリアライズ

## Generated Test Files
- `tests/markdown.test.js`
  - 例示テスト（エスケープ、見出し、強調、コードブロック）
- `tests/state.test.js`
  - 例示テスト（遷移、シリアライズ）
- `tests/markdown.property.test.js`
  - PBT（エスケープ不変条件、scriptタグ注入防止）
- `tests/state.property.test.js`
  - PBT（状態 round-trip、遷移結果の有効性）

## Tooling
- `package.json`
  - devDependencies: `vitest`, `fast-check`
- `vitest.config.js`
  - Node環境で `tests/**/*.test.js` を実行

## Execution Result
- `npm test`: **passed**
  - Test Files: 4 passed
  - Tests: 12 passed

## Security / PBT Notes
- SECURITY-05: 入力長制限とHTMLエスケープを実装
- SECURITY-09: 秘密情報・認証情報を保持しない構成
- PBT-09: `fast-check` を導入
- PBT-02/03/08/10: round-trip / invariants / seed固定 / 例示テスト併用を反映
