# NFR Clarification Questions - md-preview-app

以下の質問に、各 [Answer]: に選択肢の文字を記入してください。
選択肢に当てはまらない場合は X を選び、[Answer]: の後ろに補足を追記してください。

## Question 1
プレビュー更新タイミングはどれを優先しますか？

A) 入力中リアルタイム更新（デバウンスあり）
B) プレビューボタン押下時のみ更新
C) タブ切替時に更新
X) Other (please describe after [Answer]: tag below)

[Answer]: C


## Question 2
最大入力サイズの目安はどれですか？

A) 50KB 程度
B) 200KB 程度
C) 1MB 程度
X) Other (please describe after [Answer]: tag below)

[Answer]: x aidlc-docsで作成される程度のサイズ

## Question 3
アクセシビリティ要件はどこまで必須ですか？

A) 最低限（キーボード操作 + ラベル + コントラスト配慮）
B) 強め（A + フォーカス管理 + 適切なARIA）
C) 今回は最小限（基本操作のみ）
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
セキュリティヘッダー等の制御が難しい GitHub Pages 前提で、アプリ側対策の優先度はどれですか？

A) HTMLエスケープ徹底 + 入力長制限 + 安全なDOM更新を必須
B) A + 追加で簡易サニタイズルールを拡張
C) 最小限（HTMLエスケープ中心）
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 5
PBT適用対象の優先範囲はどれにしますか？

A) 文字列変換ロジック（エスケープ/整形）中心
B) A + タブ状態遷移ロジック
C) A + B + 入力制約ロジック
X) Other (please describe after [Answer]: tag below)

[Answer]: B
