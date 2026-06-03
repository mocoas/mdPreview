# NFR Requirements Plan - md-preview-app

## Goal
GitHub Pages 上で動作する簡易 Markdown プレビューアプリに対し、非機能要件と技術選定を確定する。

## Steps
- [x] Step 1: 既存要件と実行計画を確認し、NFR観点を抽出する
- [x] Step 2: NFRカテゴリ（性能・可用性・セキュリティ・保守性・ユーザビリティ）を対象に評価方針を整理する
- [x] Step 3: NFR確認質問を作成し、ユーザー回答を収集する
- [x] Step 4: 回答の曖昧性を分析し、必要なら追質問を作成する
- [x] Step 5: nfr-requirements.md を作成する
- [x] Step 6: tech-stack-decisions.md を作成する
- [x] Step 7: ルール適合性（Security/PBT）を確認して完了メッセージを提示する

## Context
- Project type: Greenfield static web app
- Hosting: GitHub Project Pages
- Security baseline: Enabled
- Property-based testing: Enabled (Full)
- UI approach: 入力画面とプレビュー画面を分離表示（タブ/切替）

## Questions File
- aidlc-docs/construction/plans/md-preview-app-nfr-questions.md

## Clarification Status
- Question 2 の回答は数値上限として曖昧なため、追質問を作成
- Follow-up file: aidlc-docs/construction/plans/md-preview-app-nfr-clarification-questions.md
