# mdPreview

コピペした Markdown を、入力画面とプレビュー画面を分けて確認するシンプルな静的アプリです。

## Features

- 入力/プレビューをタブで分離
- プレビュー更新はタブ切替時のみ
- HTML エスケープによる安全表示
- 入力上限 200KB
- 最低限アクセシビリティ（ラベル、キーボードタブ移動、コントラスト配慮）

## Local Run

静的ファイルなので、`index.html` をブラウザで開くだけで動作します。

## Test

```bash
npm install
npm test
```

## GitHub Pages

Project Pages 前提で、ルート配下の静的ファイルをそのまま公開できます。

