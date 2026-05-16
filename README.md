# 月読 ─ tsukuyomi ─

月読の流れ診断サイトです。

SNSプロフィールから直接鑑定へ誘導する前に、恋愛・仕事運・金運の流れを無料診断で整理し、診断結果から LINE 追加、BASE 鑑定、高額個別相談へ自然に案内する Vite + React アプリです。

## 診断ジャンル

- 恋愛の流れ診断
- 仕事運の流れ診断
- 金運の流れ診断

各結果ページでは診断タイプ、今の流れ、停滞や不安の理由、やめた方がいいこと、次の一手を表示します。BASE 商品リンクより前に LINE 追加導線を置き、購入前に離脱したユーザーも LINE へ戻れる構成にしています。

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## Vercel

このプロジェクトは Vite アプリです。

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` にも同じ設定を入れています。

## URL設定

LINE導線は `src/config.js` で変更できます。BASE 商品リンクは `src/App.jsx` の `BASE_LINKS` にまとめています。

```js
export const SITE_CONFIG = {
  NOTE_URL: "https://example.com/long-night-reading",
  LINE_URL: "https://lin.ee/tzVCsKH",
};
```
