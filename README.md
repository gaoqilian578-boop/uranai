# 月読 ─ tsukuyomi ─

恋愛の占い診断をするリポジトリです。

Instagram・Threads・TikTok・Lemon8から流入する、恋愛命式16タイプ診断サイトです。

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## URL設定

深読み導線とLINE導線は `src/config.js` で変更できます。

```js
export const SITE_CONFIG = {
  NOTE_URL: "https://example.com/long-night-reading",
  LINE_URL: "https://example.com/line",
};
```
