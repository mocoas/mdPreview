# Code Generation Plan - md-preview-app

## Unit Context
- Unit name: md-preview-app
- Project type: Greenfield static web app
- Hosting: GitHub Project Pages
- Dependencies on other units: None
- Stories/Requirements coverage:
  - Markdown入力の貼り付け
  - 入力画面とプレビュー画面のタブ切替
  - プレビュー更新はタブ切替時
  - HTMLエスケープで安全表示
  - 入力上限 200KB
  - 最低限アクセシビリティ（キーボード操作、ラベル、コントラスト）

## Code Location
- Application code root: /workspaces/mdPreview
- Documentation summary root: /workspaces/mdPreview/aidlc-docs/construction/md-preview-app/code/

## Execution Steps
- [x] Step 1: プロジェクト最小構成を作成する（`index.html`, `styles.css`, `src/app.js`, `src/markdown.js`, `src/state.js`）
- [x] Step 2: 入力/プレビュー分離タブUIを実装する（キーボード操作対応、`data-testid`付与）
- [x] Step 3: Markdown最小変換ロジックを実装する（見出し/段落/強調/コードブロックの限定対応）
- [x] Step 4: セキュリティ対策を実装する（HTMLエスケープ、未加工 `innerHTML` 禁止、入力長200KB制限）
- [x] Step 5: タブ切替時プレビュー更新ロジックを実装する（入力中リアルタイム更新は行わない）
- [x] Step 6: アクセシビリティ最低ラインを実装する（label関連付け、フォーカス可能タブ、コントラスト配慮）
- [x] Step 7: 文字列変換ロジックのユニットテストを作成する（Vitest）
- [x] Step 8: タブ状態遷移ロジックのユニットテストを作成する（Vitest）
- [x] Step 9: PBTを実装する（fast-check: エスケープ/整形の性質 + タブ状態遷移の性質）
- [x] Step 10: テスト実行設定ファイルを追加する（`package.json`, `vitest.config.js`）
- [x] Step 11: GitHub Pages向け運用最小ドキュメントを作成する（`README.md` 追記または更新）
- [x] Step 12: 生成コード要約を作成する（`aidlc-docs/construction/md-preview-app/code/code-summary.md`）

## Expected Artifacts
- Application code:
  - `index.html`
  - `styles.css`
  - `src/app.js`
  - `src/markdown.js`
  - `src/state.js`
  - `tests/markdown.test.js`
  - `tests/state.test.js`
  - `tests/markdown.property.test.js`
  - `tests/state.property.test.js`
  - `package.json`
  - `vitest.config.js`
- Documentation:
  - `aidlc-docs/construction/md-preview-app/code/code-summary.md`

## Quality and Compliance Checklist
- [x] SECURITY-05: 入力長制限と安全なDOM更新を実装
- [x] SECURITY-09: 機密情報・既定資格情報なしを維持
- [x] PBT-09: fast-check利用を構成に反映
- [x] PBT-02/03/08/10: round-trip/不変条件/再現性/例示テスト併用をテストで確認

## Notes
- 本計画が Code Generation の単一の実行基準。
- 計画承認後に Step 1 から順に実行し、都度チェックボックスを更新する。
