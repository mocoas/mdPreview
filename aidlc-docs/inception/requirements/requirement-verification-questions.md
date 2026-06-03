# Requirement Verification Questions

以下の質問に、各 [Answer]: に選択肢の文字を記入してください。
選択肢に当てはまらない場合は X を選び、[Answer]: の後ろに補足を追記してください。

## Question 1
GitHub Pages の公開形態はどれを想定しますか？

A) User/Organization Pages（https://<user>.github.io/）
B) Project Pages（https://<user>.github.io/<repo>/）
C) まだ未定（まずはローカル/相対パスで動けばよい）
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 2
Markdown レンダリング方針はどれがよいですか？

A) 軽量優先（CDN経由の marked + 最小構成）
B) 機能優先（markdown-it + 拡張しやすい構成）
C) 依存最小（自前最小実装、対応機能は限定）
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 3
HTML混在Markdownの扱いはどうしますか？（安全性に関係）

A) HTMLは無効化/エスケープ（安全優先）
B) HTMLを許可するがサニタイズする
C) HTMLをそのまま許可する（非推奨）
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
Security Baseline 拡張ルールをこのプロジェクトで有効化しますか？

A) Yes — SECURITY ルールをブロッキング制約としてすべて適用する
B) No — SECURITY ルールをスキップする
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
Property-Based Testing 拡張ルールをこのプロジェクトで有効化しますか？

A) Yes — PBT ルールをブロッキング制約として適用する
B) Partial — 純関数とシリアライズ往復に限定して適用する
C) No — PBT ルールをスキップする
X) Other (please describe after [Answer]: tag below)

[Answer]: A
