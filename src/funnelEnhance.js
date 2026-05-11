import { SITE_CONFIG } from "./config.js";

const types = [
  ["1", "月影依存タイプ", "月 / 水 / 既読の光", "愛されている感覚が途切れると、不安がすぐ夜に広がります。", "返信や態度を何度も確かめ、安心の証拠を探し続けやすい人です。", "あなたの不安は弱さではなく、深く愛せる感受性です。"],
  ["2", "黒月執着タイプ", "黒い月 / 鎖 / 悪魔", "離れた方が楽だと分かっていても、心が強く結び直してしまいます。", "相手の影や過去の言葉を追い、苦しさまで恋の一部にしがちです。", "執着を責めず、まず握りしめている理由を静かに見てください。"],
  ["3", "霧夜沈黙タイプ", "霧 / 半月 / 隠者", "本音を出す前に相手の空気を読みすぎて、言葉が内側に沈みます。", "苦しいほど沈黙し、相手に察してほしい気持ちが強くなります。", "言えなかった言葉は消えません。小さく書き出す夜から戻れます。"],
  ["4", "審判再縁タイプ", "審判 / 鐘 / 金の輪", "終わった恋にも意味を探し、再会の可能性を完全には閉じません。", "復縁や偶然の再会を待ち、過去の場面を何度も読み返します。", "再会を願う心と、今の自分を守る心を同時に持っていいのです。"],
  ["5", "風財自由タイプ", "風 / 羽 / 軽やかな月", "愛していても、自由な呼吸を失うと急に苦しくなります。", "近づきたい気持ちと離れたい気持ちが交互に出やすい人です。", "距離は冷たさではなく、あなたが愛を続けるための余白です。"],
  ["6", "星孤比肩タイプ", "孤独な星 / 銀の月 / 夜空", "頼りたいのに頼れず、恋の中でも一人で立とうとしすぎます。", "弱さを隠し、平気なふりをして夜に一人で崩れやすくなります。", "一人で強くあることだけが、あなたの美しさではありません。"],
  ["7", "火星戦車タイプ", "火星 / 戦車 / 炎", "好きになると速度が上がり、待つ時間が痛みに変わりやすいタイプです。", "白黒を急ぎ、相手の反応で一気に燃えたり冷めたりします。", "勢いは才能です。進む前に一呼吸だけ月を見上げてください。"],
  ["8", "死神リセットタイプ", "死神 / 白い月 / 再生", "限界まで我慢したあと、突然すべてを終わらせたくなります。", "傷つく前に関係を切り、後から静かに痛みが戻ることがあります。", "終わりは罰ではなく、あなたを戻すための扉にもなります。"],
  ["9", "傷官硝子タイプ", "硝子 / 青い月 / 水滴", "言葉の温度に敏感で、何気ない一言が深く刺さります。", "相手の小さな違和感を何日も反芻し、自分を責めやすい人です。", "割れやすさは、光を細かく映せる繊細さでもあります。"],
  ["10", "女帝献身タイプ", "女帝 / 花 / 包む月", "好きな人を支えるほど、自分の輪郭が薄くなりやすいタイプです。", "相手の疲れや不安を背負い、尽くすことで愛を保とうとします。", "与える愛と、受け取る愛の両方をあなたに許してください。"],
  ["11", "教皇正財タイプ", "教皇 / 金の鍵 / 誠実な月", "曖昧な関係が苦手で、安心できる形を強く求めます。", "約束や言葉の有無に心が揺れ、関係の定義を確認したくなります。", "誠実さを求めることは重さではなく、あなたの愛の基準です。"],
  ["12", "白花養愛タイプ", "白花 / カップ / 淡い月", "愛を育てたい気持ちが強く、壊さないように自分を抑えます。", "相手を守るために我慢し、寂しさを飲み込みやすい人です。", "優しさを向ける相手の中に、あなた自身も入れてください。"],
  ["13", "星灯希望タイプ", "星 / 灯火 / 希望の青", "苦しい恋の中でも、どこかに希望の灯りを見つけ続けます。", "小さな優しさを大きな意味として抱き、待つ力が強くなります。", "希望はあなたを生かします。けれど今夜の現実も同じだけ見て。"],
  ["14", "月輪再会タイプ", "月輪 / 運命の輪 / 金の光", "出会いと別れを運命の流れとして感じやすいタイプです。", "同じ相手や似た恋を繰り返し、縁の意味を探し続けます。", "繰り返しは戻るためではなく、選び直すために現れることがあります。"],
  ["15", "女教皇直感タイプ", "女教皇 / 青いヴェール / 水面", "相手の言葉より、沈黙や気配から真実を感じ取ります。", "違和感にすぐ気づく分、確証がないまま不安が育ちやすい人です。", "直感は大切です。けれど答えを急がず、水面が静まるのを待って。"],
  ["16", "運命輪転タイプ", "運命の輪 / 火と水 / 回る月", "恋の始まりや終わりが急に訪れ、流れに揺さぶられます。", "状況の変化に巻き込まれ、気持ちの置き場所を見失いやすい人です。", "変化の中でも、あなたの中心だけは静かに戻すことができます。"]
];

const byId = (id) => types.find((type) => type[0] === String(id)) || types[0];
const selectedId = () => localStorage.getItem("tsukuyomiTypeId") || "1";
const paid = () => localStorage.getItem("paymentCompleted") === "true";
const setTypeFromPage = () => {
  const number = document.querySelector(".type-number");
  const id = number?.textContent?.match(/\d+/)?.[0];
  if (id) localStorage.setItem("tsukuyomiTypeId", id);
  return id || selectedId();
};

const shell = (content) => `
  <div class="funnel-fallback">
    <div class="site-shell">
      <div class="night-sky" aria-hidden="true"><span class="moon-orb"></span><span class="mist mist-one"></span><span class="mist mist-two"></span></div>
      <header class="site-header"><a class="brand" href="/"><span>月読</span><small>tsukuyomi</small></a><a class="header-link" href="/">診断へ戻る</a></header>
      <main>${content}</main>
    </div>
  </div>
`;

const page = (inner) => `<section class="funnel-route"><div class="container">${inner}</div></section>`;

const letterPage = () => page(`
  <div class="glass-panel">
    <div class="letter-logo" aria-label="月読 tsukuyomi"><span>月読</span><small>tsukuyomi</small></div>
    <p class="eyebrow">night letter</p>
    <h1>夜の手紙を受け取る</h1>
    <h2 class="letter-subtitle">長い夜に、<br>そっと届く手紙。</h2>
    <p>夜になると、
少しだけ苦しくなる人へ。

彼の沈黙。
既読スルー。
執着。
復縁。
忘れられない恋。

四柱推命とタロットで、
長い夜のための言葉を届けています。

静かな夜に、
そっと届く手紙を受け取りませんか。</p>
    <button class="primary-button letter-cta" data-show-kit-letter type="button">夜の手紙を受け取る</button>
    <div data-kit-letter-area></div>
  </div>
`);

const miniCoursePage = () => page(`
  <div class="glass-panel">
    <p class="eyebrow">mini course</p>
    <h1>診断結果をもっと深く読む夜</h1>
    <p>あなたの恋愛命式は、
まだ表面しか見えていません。</p>
    <p style="margin-top:22px;">診断結果は、
あなたの恋の入口です。

本当に苦しくなる理由は、
もう少し深いところにあります。

既読がつくだけで苦しくなる夜。
彼の沈黙を何度も考える時間。
離れたいのに離れられない感情。

その流れを、
四柱推命とタロットで、
もう少し深く読み解きます。</p>
    <ul class="funnel-list">
      <li>恋愛命式タイプ深掘り</li><li>執着が強くなる理由</li><li>彼の沈黙の読み方</li><li>今やめた方がいい行動</li><li>心を戻す小さなワーク</li><li>月読メッセージ</li>
    </ul>
    <div class="funnel-price">100円</div>
    <a class="primary-button" href="/checkout">100円で深く読む</a>
  </div>
`);

const checkoutPage = () => page(`
  <div class="glass-panel">
    <p class="eyebrow">checkout</p>
    <h1>診断結果をもっと深く読む夜</h1>
    <p>この先は、
あなたの診断タイプに合わせた
小さな講座です。

決済後、
あなた専用ページへ進めます。</p>
    <div class="funnel-price">100円</div>
    <button class="primary-button" data-funnel-pay>決済して講座へ進む</button>
  </div>
`);

const coursePage = (id) => {
  const type = byId(id);
  return page(`
    <div class="result-hero">
      <div class="type-visual type-visual-${type[0]}"><span class="visual-moon"></span><span class="visual-symbol"></span><span class="visual-line"></span><span class="visual-spark spark-one"></span><span class="visual-spark spark-two"></span></div>
      <p class="eyebrow">mini course</p>
      <p class="type-number">type ${type[0]}</p>
      <h1 class="type-title">${type[1]}</h1>
      <p class="symbol">${type[2]}</p>
    </div>
    <div class="funnel-course-grid">
      <article class="reading-card"><h3>恋愛で苦しくなる理由</h3><p>${type[3]}</p></article>
      <article class="reading-card"><h3>出やすいパターン</h3><p>${type[4]}</p></article>
      <article class="reading-card"><h3>やめた方がいい行動</h3><p>不安を消すためだけに、連絡、確認、SNSの見返しを重ねること。答えを急ぐほど、心は相手の反応に縛られやすくなります。</p></article>
      <article class="reading-card"><h3>心を戻すワーク</h3><p>今夜浮かんだ感情を三つに分けて書いてください。「事実」「想像」「本当は欲しかった言葉」。月の光の下で、心を現実へ戻していきます。</p></article>
      <article class="reading-card"><h3>月読メッセージ</h3><p>${type[5]}</p></article>
      <article class="cta-panel"><p class="eyebrow">night letter</p><h2>夜の手紙を受け取る</h2><p>この講座で見えた感情を、一度で終わらせなくていい。<br>長い夜に、静かに届く言葉を受け取りませんか。</p><a class="primary-button" href="/letter">夜の手紙を受け取る</a></article>
      <article class="cta-panel line-panel"><p class="eyebrow">private line</p><h2>静かに話せる場所へ</h2><p>誰にも言えない恋を、ひとりで抱えなくていい。<br>今の彼の気持ち、関係の流れ、あなたの命式から見える恋愛傾向を、静かに整理します。</p><a class="secondary-button" href="${SITE_CONFIG.LINE_URL}">静かに話せる場所へ</a></article>
    </div>
  `);
};

const renderFallbackRoute = () => {
  const root = document.getElementById("root");
  if (!root) return;
  const path = window.location.pathname;
  if (path === "/letter" && document.body.innerText.includes("夜の手紙を受け取る")) return;
  if (path === "/mini-course" && document.body.innerText.includes("100円で深く読む")) return;
  if (path === "/checkout" && document.body.innerText.includes("決済して講座へ進む")) return;
  const courseMatch = path.match(/^\/course\/(\d+)/);
  if (courseMatch && document.body.innerText.includes("心を戻すワーク")) return;

  if (path === "/letter") root.innerHTML = shell(letterPage());
  if (path === "/mini-course") root.innerHTML = shell(miniCoursePage());
  if (path === "/checkout") root.innerHTML = shell(checkoutPage());
  if (courseMatch) {
    if (!paid()) {
      history.replaceState(null, "", "/checkout");
      root.innerHTML = shell(checkoutPage());
    } else {
      root.innerHTML = shell(coursePage(courseMatch[1]));
    }
  }

  root.querySelector("[data-show-kit-letter]")?.addEventListener("click", () => {
    const area = root.querySelector("[data-kit-letter-area]");
    if (!area) return;
    if (!area.querySelector("[data-kit-letter]")) {
      area.innerHTML = `<div class="kit-form-shell" data-kit-letter aria-label="夜の手紙登録フォーム"></div>`;
    }
    loadKitLetterForm(root);
    area.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  root.querySelector("[data-funnel-pay]")?.addEventListener("click", () => {
    localStorage.setItem("paymentCompleted", "true");
    window.location.href = `/course/${selectedId()}`;
  });
};

const loadKitLetterForm = (root) => {
  const container = root.querySelector("[data-kit-letter]");
  if (!container || container.querySelector("script")) return;
  const script = document.createElement("script");
  script.async = true;
  script.dataset.uid = "c22d2585e3";
  script.src = "https://tsukuyomi-night.kit.com/c22d2585e3/index.js";
  container.appendChild(script);
};

const enhanceResult = () => {
  if (window.location.pathname !== "/result") return;
  if (document.body.innerText.includes("夜の手紙を受け取る")) return;
  const linePanel = document.querySelector(".line-panel");
  if (!linePanel) return;
  const id = setTypeFromPage();
  const oldCta = document.querySelector(".cta-panel:not(.line-panel)");
  if (oldCta) {
    oldCta.querySelector("h2") && (oldCta.querySelector("h2").textContent = "診断結果をもっと深く読む夜");
    oldCta.querySelector("a")?.setAttribute("href", "/mini-course");
    oldCta.querySelector("a")?.addEventListener("click", () => localStorage.setItem("tsukuyomiTypeId", id));
  }
  const letter = document.createElement("article");
  letter.className = "cta-panel";
  letter.innerHTML = `<p class="eyebrow">night letter</p><h2>夜の手紙を受け取る</h2><p>夜になると、少しだけ苦しくなる人へ。<br>長い夜のための言葉を、静かに届けます。</p><a class="secondary-button" href="/letter">夜の手紙を受け取る</a>`;
  linePanel.parentElement?.insertBefore(letter, oldCta || linePanel);
  document.querySelector(".night-links")?.setAttribute("hidden", "");
};

window.addEventListener("load", () => {
  window.setTimeout(() => {
    renderFallbackRoute();
    enhanceResult();
  }, 120);
});
