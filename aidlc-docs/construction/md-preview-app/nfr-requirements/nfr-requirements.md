# NFR Requirements - md-preview-app

## Scope
GitHub Project Pages で配信する、入力画面とプレビュー画面を分離した Markdown プレビューアプリ。

## Confirmed NFR Inputs
- Q1: C（タブ切替時に更新）
- Q2: B（入力上限 200KB）
- Q3: A（最低限アクセシビリティ必須）
- Q4: C（アプリ側対策は HTMLエスケープ中心）
- Q5: B（PBTは文字列変換 + タブ状態遷移）

## Performance Requirements
1. プレビュー更新はタブ切替時に実行する。
2. 入力サイズは 200KB を上限とし、超過時は明示メッセージを表示する。
3. 通常利用（200KB以下）でタブ切替後のプレビュー表示遅延は体感上小さいことを目標とする。

## Scalability Requirements
1. 対象は単一ユーザーのブラウザ内処理であり、サーバー水平拡張は対象外。
2. データ永続化・バックエンド連携は行わない。

## Availability Requirements
1. 静的配信（GitHub Pages）前提で、アプリはオフライン永続機能なし。
2. 例外発生時はページクラッシュを避け、入力画面へ復帰できること。

## Security Requirements
1. Markdown入力内の HTML はエスケープして描画し、スクリプト実行を防止する。
2. `innerHTML` へ未加工ユーザー入力を直接代入しない。
3. 入力文字列長を検証し、過大入力を拒否する。
4. 外部API呼び出し、機密情報取り扱い、認証機能を持たない。

## Usability and Accessibility Requirements
1. 入力画面とプレビュー画面をタブで分離し、視認性を優先する。
2. キーボードのみで主要操作（入力・タブ移動・プレビュー確認）が可能であること。
3. フォーム要素にラベルを付与し、テキスト可読性のための十分なコントラストを確保する。

## Maintainability Requirements
1. 依存を最小化し、シンプルな構成で維持可能とする。
2. 主要ロジック（エスケープ/状態遷移）は関数分離してテストしやすくする。

## Reliability Requirements
1. 不正入力やサイズ超過時はユーザーに理由を表示し、安全に処理を中断する。
2. タブ状態遷移は定義済み状態のみ許可する。

## Security Baseline Compliance Summary (NFR Stage)
- SECURITY-01: N/A（データストアなし）
- SECURITY-02: N/A（LB/API Gateway/CDN制御対象外）
- SECURITY-03: N/A（集中ログ基盤なし）
- SECURITY-04: N/A（HTTPレスポンスヘッダーはPages側管理）
- SECURITY-05: Compliant（入力長制限 + HTMLエスケープ方針）
- SECURITY-06: N/A（IAM管理なし）
- SECURITY-07: N/A（ネットワーク設定なし）
- SECURITY-08: N/A（認証/認可なし）
- SECURITY-09: Compliant（機密・既定資格情報を持たない静的構成）
- SECURITY-10: To be validated in Build and Test
- SECURITY-11: Compliant（防御面を単純化し分離）
- SECURITY-12: N/A（認証機能なし）
- SECURITY-13: N/A（外部署名検証要件の対象外）
- SECURITY-14: N/A（監視基盤なし）

## PBT Compliance Summary (NFR Stage)
- PBT-09: Compliant（JavaScript向けに fast-check を選定）
- PBT-01/02/03/04/05/06/07/08/10: To be validated in Code Generation/Build and Test
