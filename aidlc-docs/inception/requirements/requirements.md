# Requirements

## Intent Analysis Summary
- **User request**: GitHub Pages で公開する、テキスト貼り付け型の簡易 Markdown プレビューアプリを作成する。
- **Request type**: New Project
- **Scope estimate**: Single Component
- **Complexity estimate**: Simple

## Confirmed Decisions
- **GitHub Pages hosting mode**: Project Pages（`https://<user>.github.io/<repo>/`）
- **Rendering approach**: 依存最小の最小実装（対応機能を限定）
- **HTML handling in Markdown**: HTML を無効化/エスケープ（安全優先）
- **Security extension**: Enabled
- **Property-based testing extension**: Enabled (Full)

## Functional Requirements
1. 単一ページの Web アプリとして動作すること。
2. ユーザーが Markdown テキストを入力できること（コピー＆ペースト前提）。
3. 入力内容をプレビュー表示できること。
4. 入力領域とプレビュー領域は視認性を優先して分離できること（例: タブ切り替え、セクション切り替え）。
5. 入力画面からプレビュー画面への遷移はページ内の軽量な表示切り替えで実現できること（フルリロード不要）。
6. Markdown の最低限の記法をサポートすること。
7. 認証を必要としないこと。
8. ローカルファイル読み込み機能やサーバー連携機能を持たないこと。
9. GitHub Pages（Project Pages）配信で動作する相対パス構成であること。

## Non-Functional Requirements
1. **Security**
- HTML をエスケープし、スクリプト実行を防ぐこと。
- 外部 API や機密情報を扱わないこと。
- 静的サイトとして実装し、サーバーサイド処理を持たないこと。

2. **Performance**
- 通常的な Markdown 入力量で、入力からプレビュー更新までの遅延が体感上小さいこと。

3. **Maintainability**
- 構成は最小ファイル数とし、処理フローを追いやすいこと。
- 依存パッケージを最小化し、運用負荷を低くすること。

4. **Usability**
- 入力とプレビューの同時表示に限定せず、可読性の高い表示モード（入力専用/プレビュー専用）を提供できること。

5. **Compatibility**
- モダンブラウザで動作すること。
- GitHub Pages の静的配信要件に適合すること。

## User Scenario
1. ユーザーがページを開く。
2. 入力欄に Markdown テキストを貼り付ける。
3. タブや表示切り替えでプレビュー表示へ移動する。
4. プレビュー画面で変換結果を確認する。
5. 必要に応じて入力画面へ戻り、編集後に再プレビューする。

## Constraints and Exclusions
- 対象は簡易プレビュー用途のみ。
- ユーザー管理、永続保存、バックエンド、機密データ処理は対象外。
- 高度な Markdown 拡張（数式、Mermaid、シンタックスハイライトなど）は今回の必須対象外。

## Security Baseline Compliance Summary (Requirements Stage)
- **SECURITY-01**: N/A（データストアなし）
- **SECURITY-02**: N/A（ネットワーク中継コンポーネントなし）
- **SECURITY-03**: N/A（アプリログ基盤なしの静的ページ）
- **SECURITY-04**: N/A（HTTPヘッダー制御主体は GitHub Pages 側）
- **SECURITY-05**: Compliant（入力を HTML 無効化/エスケープ方針で処理）
- **SECURITY-06**: N/A（IAM ポリシー管理なし）
- **SECURITY-07**: N/A（ネットワーク設定なし）
- **SECURITY-08**: N/A（認証・認可機構なし）
- **SECURITY-09**: Compliant（デフォルト認証や機密設定を持たない静的構成）
- **SECURITY-10**: To be validated in Code Generation/Build and Test
- **SECURITY-11**: Compliant（攻撃面を最小化するシンプル設計）
- **SECURITY-12**: N/A（認証機構なし）
- **SECURITY-13**: N/A（外部配布物検証やデータ整合管理の対象なし）
- **SECURITY-14**: N/A（運用監視対象コンポーネントなし）

## Property-Based Testing Compliance Summary (Requirements Stage)
- **PBT-01 to PBT-08**: N/A（設計/実装前）
- **PBT-09**: To be validated in NFR Requirements / Code Generation
- **PBT-10**: To be validated in Code Generation

## Key Requirements Summary
- 最小構成・静的配信・貼り付けプレビューが主目的。
- 入力とプレビューは視認性優先で分離表示（タブ/切り替え）を許容する。
- セキュリティ上は HTML 無効化/エスケープを必須とする。
- GitHub Project Pages を前提に相対パス対応で実装する。
