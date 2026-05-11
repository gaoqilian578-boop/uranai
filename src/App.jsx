import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  Moon,
  Sparkles,
  Stars,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SITE_CONFIG } from "./config";

const answerOptions = [
  { label: "はい", value: 3 },
  { label: "どちらかといえばはい", value: 2 },
  { label: "どちらかといえばいいえ", value: 1 },
  { label: "いいえ", value: 0 },
];

const questions = [
  "既読がついたのに返信がないと、何度もスマホを見てしまう。",
  "好きな人の態度が少し変わるだけで、不安になる。",
  "恋愛では、相手に合わせすぎてしまう。",
  "一度好きになると、なかなか気持ちを切り替えられない。",
  "追わない方がいいと分かっていても、連絡したくなる。",
  "束縛されると、好きでも苦しくなる。",
  "恋愛していても、一人の時間はかなり必要。",
  "好きになると、かなり一直線になりやすい。",
  "限界になると、突然気持ちを切ってしまうことがある。",
  "好きな人の何気ない一言を、何日も引きずる。",
  "相手が疲れていると、自分が支えなきゃと思う。",
  "曖昧な関係より、きちんとした関係を求める。",
  "愛されているか、何度も確認したくなる。",
  "復縁や再会を、どこかで信じてしまう。",
  "「この人とは運命かも」と感じやすい。",
  "相手の空気や違和感にすぐ気づく。",
  "恋愛の始まりや終わりが、急に来ることが多い。",
  "不安になると、SNSや過去のやり取りを見返してしまう。",
  "恋愛で傷ついても、自分が悪かったのかもと考えやすい。",
  "好きな人を忘れようとしても、夜になると思い出してしまう。",
];

const typeData = [
  {
    id: 1,
    name: "月影依存タイプ",
    symbol: "月 / 隠者 / 癸水",
    short: "不安の奥に、深く愛したい願いを持つ月影の人。",
    essence:
      "あなたの恋は、相手との距離が少し揺れるだけで心の水面が波立ちます。依存に見える感情の奥には、愛される確かさを丁寧に感じたい繊細さがあります。",
    habit:
      "返信速度や言葉の温度を読みすぎて、自分の価値まで相手の反応で測りやすい傾向があります。",
    night:
      "既読のまま時間が止まった夜。スマホの光だけが明るく、心だけが過去の会話に戻るとき。",
    match:
      "安心を言葉と行動で渡してくれる人。急かさず、でも曖昧に逃げない恋が合います。",
    message:
      "あなたの不安は弱さではありません。愛を深く受け取る器が、まだ静かな形を探しているだけです。",
    palette: ["#d9f3ff", "#b4c8ff", "#d6b56d"],
  },
  {
    id: 2,
    name: "黒月執着タイプ",
    symbol: "黒月 / 悪魔 / 壬水",
    short: "忘れたい恋ほど、魂の奥に残してしまう人。",
    essence:
      "黒月執着タイプは、終わったはずの恋にも意味を探し続けます。手放せないのは相手そのものだけでなく、その恋で確かに生きていた自分です。",
    habit:
      "相手の沈黙、SNS、過去の言葉をつなぎ合わせて、まだ残っている可能性を探してしまいます。",
    night:
      "忘れると決めたはずなのに、深夜に名前を検索してしまう夜。",
    match:
      "強い感情を否定せず、境界線を穏やかに保てる人。濃さより誠実さが鍵です。",
    message:
      "執着は、愛が壊れた跡に残る影です。影を責めず、少しずつ月明かりへ連れていきましょう。",
    palette: ["#cfeaff", "#6e7da8", "#b79253"],
  },
  {
    id: 3,
    name: "霧夜沈黙タイプ",
    symbol: "霧 / 月 / 辛金",
    short: "言えない気持ちを、静かな沈黙の中で育てる人。",
    essence:
      "本当はたくさん感じているのに、言葉にした瞬間に壊れそうで黙ってしまうタイプです。恋の中で自分を守るために、霧をまといます。",
    habit:
      "平気なふりをしながら、内側では何度も傷ついた場面を反芻しがちです。",
    night:
      "言えばよかった言葉と、言わなくてよかった言葉の間で眠れない夜。",
    match:
      "沈黙を責めず、時間をかけて本音を待てる人。やさしい会話の余白が必要です。",
    message:
      "沈黙の中にも、あなたの愛は確かにあります。話せる速さで、心を渡せば大丈夫です。",
    palette: ["#e5f7ff", "#9ca9bc", "#d3b574"],
  },
  {
    id: 4,
    name: "審判再縁タイプ",
    symbol: "審判 / 再会 / 甲木",
    short: "終わりの中に、もう一度始まる音を聞く人。",
    essence:
      "あなたは別れや距離の中にも、まだ続く物語を感じやすい人です。再会を信じる力は、過去に囚われる弱さではなく、関係の意味を見抜く感性です。",
    habit:
      "区切りがついた関係でも、何かのきっかけで再びつながる未来を考えます。",
    night:
      "偶然の通知、似た香り、思い出の場所で、心が一瞬だけ戻る夜。",
    match:
      "過去を丁寧に扱い、未来を現実的に作れる人。言葉で区切りをつけられる恋が合います。",
    message:
      "再縁は、待つだけではなく整えることで近づきます。あなた自身が新しい月になることから始まります。",
    palette: ["#dff7ff", "#86b5c7", "#d8bd76"],
  },
  {
    id: 5,
    name: "風財自由タイプ",
    symbol: "風 / 正財 / 庚金",
    short: "愛していても、自分の風を失いたくない人。",
    essence:
      "恋をしても、あなたの中には自由に流れる風があります。近づきたいのに縛られると苦しくなる、繊細な独立心を持つタイプです。",
    habit:
      "相手の期待が強くなるほど、無意識に距離を取りたくなることがあります。",
    night:
      "好きなのに返事をする気力がなく、ひとりの静けさへ逃げ込みたい夜。",
    match:
      "信頼でつながり、管理しない人。互いの世界を尊重できる恋が長く続きます。",
    message:
      "距離は愛の薄さではありません。あなたにとって余白は、愛を澄ませるための呼吸です。",
    palette: ["#d8f7ff", "#a8d7df", "#c9ad68"],
  },
  {
    id: 6,
    name: "星孤比肩タイプ",
    symbol: "星 / 比肩 / 乙木",
    short: "ひとりで立つ強さと、愛されたい願いが共存する人。",
    essence:
      "あなたは誰かに寄りかかるより、自分の足で立とうとします。その強さの奥で、ほんとうは静かに選ばれたい願いを抱えています。",
    habit:
      "甘えたい気持ちを隠して、何でもない顔をしてしまうことがあります。",
    night:
      "頼ればよかったのに、強いふりをした自分に少し疲れる夜。",
    match:
      "あなたの自立を尊重しながら、必要なときに手を伸ばせる人。",
    message:
      "強さは孤独の証ではありません。あなたが誰かを選ぶように、あなたも選ばれていいのです。",
    palette: ["#e7fbff", "#8aa1d0", "#d2b36c"],
  },
  {
    id: 7,
    name: "火星戦車タイプ",
    symbol: "火星 / 戦車 / 丙火",
    short: "好きになった瞬間、心が真っ直ぐ走り出す人。",
    essence:
      "恋の始まりに強い熱を持つタイプです。勢いは魅力ですが、相手の速度とずれたとき、焦りや不安になって表れます。",
    habit:
      "気持ちが高まるほど、相手からの反応を急ぎたくなります。",
    night:
      "送った言葉が強すぎたかもしれないと、何度も画面を見返す夜。",
    match:
      "情熱を受け止めつつ、落ち着いたペースを作れる人。",
    message:
      "あなたの熱は美しいものです。急がず灯せば、その火は相手を照らす光になります。",
    palette: ["#f1fbff", "#a5c5e8", "#d3ad62"],
  },
  {
    id: 8,
    name: "死神リセットタイプ",
    symbol: "死神 / 断絶 / 丁火",
    short: "限界を超えると、静かにすべてを終わらせる人。",
    essence:
      "我慢を重ねたあと、ある瞬間に心の扉を閉めるタイプです。冷たいのではなく、傷ついた自分を守るためのリセットです。",
    habit:
      "限界まで言わずに耐え、突然連絡を断つ、気持ちを切るという形で終わらせがちです。",
    night:
      "もう戻れないと分かっているのに、終わらせた自分にも痛みを感じる夜。",
    match:
      "小さな違和感を早めに話せる人。衝突しても関係を壊さず調整できる恋が合います。",
    message:
      "終わらせる力は、再生の力でもあります。次は壊れる前に、あなたの痛みを言葉にしていい。",
    palette: ["#dceeff", "#77849a", "#c19e57"],
  },
  {
    id: 9,
    name: "傷官硝子タイプ",
    symbol: "硝子 / 傷官 / 辛金",
    short: "小さな一言で、心に細いひびが入る人。",
    essence:
      "感受性が鋭く、言葉の裏にある温度まで感じ取ります。傷つきやすさは、世界を細やかに読む才能の裏側です。",
    habit:
      "相手の何気ない一言を、自分への評価として受け取りやすい傾向があります。",
    night:
      "たった一文を何度も読み返し、意味を探して眠れなくなる夜。",
    match:
      "言葉を雑に扱わず、誤解があれば丁寧に解いてくれる人。",
    message:
      "硝子の心は弱いのではなく、光を通すほど透明です。守りながら愛していいのです。",
    palette: ["#f4fdff", "#b9d6de", "#d9bd78"],
  },
  {
    id: 10,
    name: "女帝献身タイプ",
    symbol: "女帝 / 食神 / 己土",
    short: "愛するほど、相手を包み込もうとする人。",
    essence:
      "あなたは恋の中で、相手を癒し、支え、満たそうとします。その豊かさが美点である一方、自分の寂しさを後回しにしやすいタイプです。",
    habit:
      "相手が疲れていると、自分の不安より相手の都合を優先してしまいます。",
    night:
      "大丈夫と言ったあと、本当は自分が抱きしめられたかったと気づく夜。",
    match:
      "受け取るだけでなく、あなたにも惜しみなく返せる人。",
    message:
      "献身は、あなたが満たされているときにもっと美しくなります。自分の器にも水を注いでください。",
    palette: ["#eefaff", "#c2c7b5", "#d8b568"],
  },
  {
    id: 11,
    name: "教皇正財タイプ",
    symbol: "教皇 / 正財 / 戊土",
    short: "曖昧さより、誠実な約束を求める人。",
    essence:
      "恋愛に安心できる形を求めるタイプです。関係性、約束、言葉の責任が整っているほど、あなたの愛は穏やかに深まります。",
    habit:
      "曖昧な態度が続くと、好きでも心の土台が崩れやすくなります。",
    night:
      "私たちは何なのだろうと、答えのない関係に胸が沈む夜。",
    match:
      "誠実に関係を定義し、約束を日常で守れる人。",
    message:
      "形を求めることは重さではありません。あなたの心が安心して咲くための器です。",
    palette: ["#e8f7ff", "#afb9a8", "#d4b46b"],
  },
  {
    id: 12,
    name: "白花養愛タイプ",
    symbol: "白花 / 節制 / 乙木",
    short: "ゆっくり育つ愛に、本当の安心を見つける人。",
    essence:
      "激しい恋より、少しずつ信頼を育てる恋で開花します。相手に合わせるやさしさがあり、穏やかな時間の中で魅力が増すタイプです。",
    habit:
      "相手のペースを大切にしすぎて、自分の望みを小さくしてしまうことがあります。",
    night:
      "言いたいことを飲み込んで、やさしさだけを残してしまった夜。",
    match:
      "急がず、関係を育てることを楽しめる人。穏やかさと対話が鍵です。",
    message:
      "あなたの愛は、焦らなくても届きます。白い花が夜に開くように、静かな速度を信じて。",
    palette: ["#f8ffff", "#cbded3", "#d9bf7c"],
  },
  {
    id: 13,
    name: "星灯希望タイプ",
    symbol: "星 / 希望 / 甲木",
    short: "傷ついても、未来の光をどこかで信じる人。",
    essence:
      "あなたは恋で傷ついても、完全には希望を手放しません。理想を持つ力があり、その光が自分を立て直す道しるべになります。",
    habit:
      "つらい状況でも、いつか変わるかもしれないと可能性を見続けます。",
    night:
      "もう無理かもしれないと思いながら、少しだけ明日を待つ夜。",
    match:
      "理想を笑わず、現実の行動で希望を支えてくれる人。",
    message:
      "希望は執着とは違います。あなたを明るい場所へ連れていく星だけを選んでください。",
    palette: ["#f1fcff", "#9fc4ef", "#d7bb72"],
  },
  {
    id: 14,
    name: "月輪再会タイプ",
    symbol: "月輪 / 運命 / 癸水",
    short: "離れても、めぐり直す縁を感じやすい人。",
    essence:
      "あなたは恋を直線ではなく、満ち欠けのように捉えます。離れる時間にも意味を感じ、再び交わる可能性を静かに抱きます。",
    habit:
      "終わった関係でも、周期や偶然に意味を見つけやすい傾向があります。",
    night:
      "同じ月を見ているかもしれないと、理由もなく胸が鳴る夜。",
    match:
      "縁を大切にしつつ、現在の選択にも責任を持てる人。",
    message:
      "めぐる縁も、戻らない縁も、あなたを深くします。月は欠けても、消えたわけではありません。",
    palette: ["#e8f8ff", "#9daee3", "#d6bb73"],
  },
  {
    id: 15,
    name: "女教皇直感タイプ",
    symbol: "女教皇 / 偏印 / 壬水",
    short: "言葉になる前の違和感を、静かに受け取る人。",
    essence:
      "空気の変化、相手の沈黙、言葉にならない距離を敏感に察知します。直感が強いぶん、不安と予感の境界が揺れやすいタイプです。",
    habit:
      "証拠がなくても、何か違うと感じると心が落ち着かなくなります。",
    night:
      "理由は言えないのに、関係の温度が変わった気がして眠れない夜。",
    match:
      "隠しごとをせず、感じた違和感を対話で確かめさせてくれる人。",
    message:
      "直感はあなたの月明かりです。ただし、不安の霧と混ざったときは、事実の星も一緒に見てください。",
    palette: ["#e4f7ff", "#8fa0c9", "#d8be77"],
  },
  {
    id: 16,
    name: "運命輪転タイプ",
    symbol: "運命の輪 / 変化 / 丙火",
    short: "恋の始まりも終わりも、突然めぐってくる人。",
    essence:
      "あなたの恋は、予想外の出会いや急な展開に動かされやすいタイプです。流れを読む力があり、変化の中で大きく人生が動きます。",
    habit:
      "気持ちや状況が急に変わり、自分でも追いつけないことがあります。",
    night:
      "昨日までの関係が、今日から別のものになったと感じる夜。",
    match:
      "変化を恐れず、でも関係の軸を一緒に作れる人。",
    message:
      "運命はあなたを振り回すためではなく、目覚めさせるために回ります。流れの中で、自分の選択を忘れずに。",
    palette: ["#eaf8ff", "#92bbd7", "#d8af62"],
  },
];

const scoringGroups = [
  [0, 1, 4, 12, 17],
  [3, 9, 13, 19],
  [5, 6, 8, 16],
  [2, 10, 11, 18],
  [7, 14, 15],
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getBirthInfluence(dateValue = "") {
  if (!dateValue) return 0;
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return 0;
  return (date.getFullYear() + date.getMonth() + 1 + date.getDate()) % 16;
}

function calculateType(answers, form) {
  const groupScores = scoringGroups.map((group) =>
    group.reduce((sum, questionIndex) => sum + (answers[questionIndex] ?? 0), 0)
  );
  const weighted =
    groupScores[0] * 2 +
    groupScores[1] * 3 +
    groupScores[2] * 5 +
    groupScores[3] * 7 +
    groupScores[4] * 11 +
    getBirthInfluence(form.birthDate) +
    (form.partnerBirthDate ? getBirthInfluence(form.partnerBirthDate) : 0) +
    (form.birthTime ? 3 : 0);
  return typeData[weighted % typeData.length];
}

function TypeVisual({ type, large = false }) {
  const [a, b, c] = type.palette;
  return (
    <div className={`type-visual ${large ? "type-visual-large" : ""}`}>
      <div className="orb" style={{ "--a": a, "--b": b }} />
      <div className="moon-ring" style={{ borderColor: c }} />
      <div className="tarot-frame" />
      <div className="constellation">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="type-number">{String(type.id).padStart(2, "0")}</div>
    </div>
  );
}

function Shell({ children, step }) {
  return (
    <div className="site-shell">
      <div className="night-sky" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="site-header">
        <button className="brand" onClick={() => step("home")} type="button">
          <Moon size={18} />
          <span>月読</span>
          <small>tsukuyomi</small>
        </button>
      </header>
      {children}
    </div>
  );
}

function Home({ onStart }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-visual" aria-hidden="true">
          <div className="full-moon" />
          <div className="glass-arc arc-one" />
          <div className="glass-arc arc-two" />
          <div className="floating-card card-moon">月</div>
          <div className="floating-card card-tarot">XVIII</div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">恋愛命式16タイプ診断</p>
          <h1>あなたの恋は、<br />どの月に支配されているか。</h1>
          <p className="lead">
            既読がつくだけで苦しくなる夜。忘れたいのに忘れられない恋。
            心が彼に戻ってしまう時間。その感情には、ちゃんと理由があります。
          </p>
          <button className="primary-button" onClick={onStart} type="button">
            診断を始める
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="intro-grid">
        <article>
          <Sparkles size={22} />
          <h2>感情と運命を読む場所</h2>
          <p>
            四柱推命の命式、タロットの象徴、恋愛感情の癖から、あなたの恋愛タイプを16種類に分けて読み解きます。
          </p>
        </article>
        <article>
          <Stars size={22} />
          <h2>当てるためではなく</h2>
          <p>
            なぜ苦しくなるのか。なぜ同じ恋を繰り返すのか。なぜ彼を忘れられないのか。その理由を静かに見つめます。
          </p>
        </article>
        <article>
          <Heart size={22} />
          <h2>眠れない夜に</h2>
          <p>
            恋の不安をひとりで責めないために。月読は、あなたの心がどこで揺れるのかをそっと照らします。
          </p>
        </article>
      </section>

      <section className="world-section">
        <p className="eyebrow">tsukuyomi world</p>
        <h2>月読 ─ tsukuyomi ─</h2>
        <p>
          黒い夜、青白い月光、金の象徴。タロットの静かな絵柄と、命式に眠る感情の癖を重ねて、
          恋の輪郭を読み解く無料診断です。
        </p>
      </section>
    </main>
  );
}

function InputPage({ form, setForm, onNext }) {
  const canProceed = form.birthDate && form.gender;
  return (
    <main className="narrow-page">
      <section className="glass-panel input-panel">
        <p className="eyebrow">first moon</p>
        <h1>診断前に、あなたの月を教えてください。</h1>
        <div className="field-stack">
          <label>
            <span><CalendarDays size={16} /> 生年月日</span>
            <input
              type="date"
              value={form.birthDate}
              onChange={(event) => setForm({ ...form, birthDate: event.target.value })}
            />
          </label>
          <label>
            <span><UserRound size={16} /> 性別</span>
            <select
              value={form.gender}
              onChange={(event) => setForm({ ...form, gender: event.target.value })}
            >
              <option value="">選択してください</option>
              <option value="女性">女性</option>
              <option value="男性">男性</option>
              <option value="その他">その他</option>
              <option value="回答しない">回答しない</option>
            </select>
          </label>
          <label>
            <span><Clock3 size={16} /> 出生時間</span>
            <input
              type="time"
              value={form.birthTime}
              onChange={(event) => setForm({ ...form, birthTime: event.target.value })}
            />
            <small>分からない場合は空欄でも大丈夫です</small>
          </label>
          <label>
            <span><Heart size={16} /> 彼の生年月日</span>
            <input
              type="date"
              value={form.partnerBirthDate}
              onChange={(event) => setForm({ ...form, partnerBirthDate: event.target.value })}
            />
          </label>
        </div>
        <button className="primary-button wide" disabled={!canProceed} onClick={onNext} type="button">
          20問診断へ進む
          <ArrowRight size={18} />
        </button>
      </section>
    </main>
  );
}

function QuizPage({ answers, setAnswers, onBack, onResult }) {
  const [index, setIndex] = useState(0);
  const progress = ((index + 1) / questions.length) * 100;
  const selected = answers[index];
  const canFinish = answers.filter((value) => value !== undefined).length === questions.length;

  const choose = (value) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
    if (index < questions.length - 1) {
      window.setTimeout(() => setIndex(index + 1), 140);
    }
  };

  return (
    <main className="quiz-page">
      <section className="glass-panel quiz-panel">
        <div className="quiz-top">
          <button className="ghost-button" onClick={index === 0 ? onBack : () => setIndex(index - 1)} type="button">
            <ArrowLeft size={16} />
            戻る
          </button>
          <span>{index + 1} / {questions.length}</span>
        </div>
        <div className="progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>
        <p className="question-label">Q{index + 1}</p>
        <h1>{questions[index]}</h1>
        <div className="answer-grid">
          {answerOptions.map((option) => (
            <button
              className={selected === option.value ? "answer active" : "answer"}
              key={option.label}
              onClick={() => choose(option.value)}
              type="button"
            >
              <span>{option.label}</span>
              {selected === option.value && <Check size={16} />}
            </button>
          ))}
        </div>
        <button className="primary-button wide" disabled={!canFinish} onClick={onResult} type="button">
          結果を見る
          <Moon size={18} />
        </button>
      </section>
    </main>
  );
}

function ResultPage({ type, onRestart }) {
  return (
    <main className="result-page">
      <section className="result-hero glass-panel">
        <TypeVisual type={type} large />
        <div>
          <p className="eyebrow">your moon type</p>
          <h1>{type.name}</h1>
          <p className="symbol">{type.symbol}</p>
          <p className="lead">{type.short}</p>
        </div>
      </section>

      <section className="reading-grid">
        <Reading title="このタイプの本質" body={type.essence} />
        <Reading title="恋愛で出やすい癖" body={type.habit} />
        <Reading title="苦しくなりやすい夜" body={type.night} />
        <Reading title="相性が良い恋" body={type.match} />
      </section>

      <section className="moon-message">
        <p className="eyebrow">tsukuyomi message</p>
        <h2>月読メッセージ</h2>
        <p>{type.message}</p>
      </section>

      <section className="type-gallery">
        <h2>16の恋愛命式</h2>
        <div className="type-cards">
          {typeData.map((item) => (
            <article className={item.id === type.id ? "type-card current" : "type-card"} key={item.id}>
              <TypeVisual type={item} />
              <h3>{item.name}</h3>
              <p>{item.symbol}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-panel glass-panel">
        <p className="eyebrow">long night reading</p>
        <h2>診断結果をもっと深く読む夜</h2>
        <p>
          あなたの恋愛命式は、まだ表面だけしか見えていません。執着の理由。彼との距離感。
          恋愛で苦しくなる夜。その流れを、もう少し深く静かに読み解きます。
        </p>
        <a className="primary-button" href={SITE_CONFIG.NOTE_URL}>
          もっと深く読む
          <ArrowRight size={18} />
        </a>
      </section>

      <section className="night-links">
        <a href={SITE_CONFIG.NOTE_URL}>彼の沈黙を読む夜</a>
        <a href={SITE_CONFIG.NOTE_URL}>執着をほどく夜</a>
        <a href={SITE_CONFIG.NOTE_URL}>長い夜に読むもの</a>
      </section>

      <section className="line-panel glass-panel">
        <p className="eyebrow">quiet room</p>
        <h2>静かに話せる場所</h2>
        <p>
          誰にも言えない恋を、ひとりで抱えなくていい。今の彼の気持ち、関係の流れ、
          あなたの命式から見える恋愛傾向を、静かに整理します。
        </p>
        <a className="secondary-button" href={SITE_CONFIG.LINE_URL}>
          静かに話せる場所へ
          <ArrowRight size={18} />
        </a>
      </section>

      <button className="ghost-button restart" onClick={onRestart} type="button">
        もう一度診断する
      </button>
    </main>
  );
}

function Reading({ title, body }) {
  return (
    <article className="reading-card">
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [form, setForm] = useState({
    birthDate: "",
    gender: "",
    birthTime: "",
    partnerBirthDate: "",
  });
  const [answers, setAnswers] = useState(Array(questions.length).fill(undefined));
  const resultType = useMemo(() => calculateType(answers, form), [answers, form]);

  const restart = () => {
    setAnswers(Array(questions.length).fill(undefined));
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const go = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Shell step={go}>
      {page === "home" && <Home onStart={() => go("input")} />}
      {page === "input" && (
        <InputPage form={form} setForm={setForm} onNext={() => go("quiz")} />
      )}
      {page === "quiz" && (
        <QuizPage
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => go("input")}
          onResult={() => go("result")}
        />
      )}
      {page === "result" && <ResultPage type={resultType} onRestart={restart} />}
    </Shell>
  );
}
