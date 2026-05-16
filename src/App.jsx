import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Coins,
  Heart,
  LineChart,
  Moon,
  Sparkles,
  Stars,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SITE_CONFIG } from "./config";

const BASE_LINKS = {
  loveEntry: "https://urana1tsuku.base.shop/items/144546773",
  reunion: "https://urana1tsuku.base.shop/items/144554585",
  support: "https://urana1tsuku.base.shop/items/144578572",
  money: "https://urana1tsuku.base.shop/items/144576646",
  work: "https://urana1tsuku.base.shop/items/144578308",
};

const genreData = {
  love: {
    id: "love",
    name: "恋愛の流れ診断",
    shortName: "恋愛の流れ",
    icon: Heart,
    symbol: "月 / 女教皇 / カップ / 夜の余白",
    description: "彼の沈黙、距離感、復縁、執着。今の恋で強くなっている感情の流れを静かに整理します。",
    startLabel: "恋愛の流れを診断する",
    questions: [
      {
        text: "今の恋について、近いものを選んでください",
        options: [
          { label: "彼の言動に心が揺れやすい", scores: { A: 3, B: 1 } },
          { label: "焦って連絡したくなる", scores: { B: 3, D: 1 } },
          { label: "関係性を見直したい", scores: { C: 3, A: 1 } },
          { label: "少し動かしたい流れがある", scores: { D: 3, C: 1 } },
          { label: "復縁や再会を考えている", scores: { C: 2, B: 2 } },
          { label: "相手の本音が分からない", scores: { A: 2, B: 2 } },
        ],
      },
      {
        text: "今いちばん知りたいこと",
        options: [
          { label: "今の恋の流れ", scores: { A: 2, C: 1 } },
          { label: "彼の本音の見え方", scores: { A: 2, B: 1 } },
          { label: "LINEを送るべきか待つべきか", scores: { B: 3 } },
          { label: "復縁や関係修復の可能性", scores: { C: 3 } },
          { label: "次にどう動けばいいか", scores: { D: 3 } },
          { label: "不安が強くなる理由", scores: { A: 3 } },
        ],
      },
      {
        text: "最近の感覚に近いもの",
        options: [
          { label: "夜になると考えすぎてしまう", scores: { A: 3 } },
          { label: "動きたいけれど怖い", scores: { B: 2, D: 1 } },
          { label: "同じ不安を繰り返している", scores: { C: 3 } },
          { label: "小さなきっかけがあれば進めそう", scores: { D: 3 } },
          { label: "待つ時間が苦しい", scores: { B: 3 } },
          { label: "自分ばかり頑張っている気がする", scores: { C: 2, A: 1 } },
        ],
      },
    ],
    resultLabels: {
      flow: "今の恋の流れ",
      view: "彼の本音の見え方",
      reason: "不安が強くなる理由",
      avoid: "今やらない方がいいこと",
      action: "あなたに必要な次の一手",
    },
    results: {
      A: {
        name: "感情整理タイプ",
        summary: "彼の言動に心が揺れやすく、今はまず自分の感情を整える時期。",
        flow: "今の恋は、相手の反応そのものよりも、そこに重なるあなたの不安が大きくなりやすい流れです。返信速度、言葉の温度、SNSの小さな動きが、夜になるほど強い意味を持って見えているかもしれません。",
        view: "彼の本音は、今すぐひとつの答えに決めつけない方がよさそうです。沈黙や淡い反応の中には、冷めた気持ちだけでなく、余裕のなさや言葉にできない迷いが混ざることがあります。",
        reason: "月のカードが示すように、見えない部分が多いほど想像は濃くなります。あなたは愛されていない証拠を探しているのではなく、安心できる材料を探している状態です。",
        avoid: "不安のまま追いLINEを送ること、SNSで答え合わせをすること、彼の反応で自分の価値を決めることは今夜は避けてください。",
        action: "まず「事実」と「想像」を分けましょう。返信が来ていないという事実と、冷めたかもしれないという想像を別々に書くだけで、心は少し戻ります。",
      },
      B: {
        name: "待つ力タイプ",
        summary: "焦って動くより、今は相手の反応を決めつけずに待つことが大切な時期。",
        flow: "今の恋は、急いで動かすよりも、静かに余白を置くことで流れが整いやすい時期です。あなたが何かを送らないと終わる、という感覚は本物でも、今夜の衝動が最善とは限りません。",
        view: "相手はあなたを拒絶しているというより、自分のペースや現実の都合を優先している可能性があります。反応の遅さだけで愛情の有無を測らない方が、関係を読み違えにくくなります。",
        reason: "待つ時間が苦しいのは、沈黙の中で自分の存在が薄くなるように感じるからです。けれど、待つことは何もしないことではなく、自分の心を整える選択でもあります。",
        avoid: "深夜の長文、返信催促、試すような一言、相手の罪悪感を刺激する言葉は避けましょう。",
        action: "送る前に一晩置いてください。明日の自分が読んでも同じ温度で送れる言葉だけを残すことが、今の次の一手です。",
      },
      C: {
        name: "関係見直しタイプ",
        summary: "今の距離感や関係性を冷静に見直すことで、次の一手が見えてくる時期。",
        flow: "今の恋は、戻すか進めるかの前に、関係の形を見直す流れに入っています。好きという気持ちだけではなく、安心できる関係か、自分ばかり削っていないかを見る時期です。",
        view: "彼の本音を見る時は、言葉よりも行動の継続性を見てください。優しい瞬間があるかだけでなく、あなたを不安にした後に向き合う姿勢があるかが大切です。",
        reason: "不安が強くなるのは、心のどこかで曖昧さや温度差に気づいているからかもしれません。月読の視点では、その違和感は責める材料ではなく、関係を整えるための合図です。",
        avoid: "過去の優しさだけを根拠に戻ること、自分だけが我慢すればいいと考えること、同じ傷をなかったことにすることは避けてください。",
        action: "この恋で安心できること、苦しくなることを左右に分けて書いてください。戻るかどうかより、戻った後の自分が穏やかかを見ます。",
      },
      D: {
        name: "一歩前進タイプ",
        summary: "小さな行動や言葉選びによって、流れが少しずつ動きやすい時期。",
        flow: "今の恋は、大きく踏み込むよりも、小さくやさしい一手で流れが動きやすい時期です。すべてを確認するより、軽く温度を戻す言葉が合います。",
        view: "相手や関係の流れには、完全に閉じていない余白がありそうです。ただし、期待だけで進めるのではなく、相手が受け取りやすい軽さを大切にしてください。",
        reason: "不安が強くなるのは、動けそうな気配があるからこそ結果を急ぎたくなるためです。戦車のように走る前に、節制のように温度を整えることが流れを守ります。",
        avoid: "一度の連絡で全部を解決しようとすること、重い確認、過去の話を一気に掘り返すことは避けてください。",
        action: "短く、責めず、返事を強要しない一文を用意しましょう。動くなら、相手を試す言葉ではなく、自分の近況や穏やかな気持ちを軽く渡すことです。",
      },
    },
    cta: {
      title: "個別鑑定で、今の恋をもう一段深く見る",
      body: "診断では、今の恋の流れを大きく見ることができます。ただ、彼の本音、今の距離感、LINEを送るべきか待つべきか、復縁や関係修復の流れは、あなたの状況によって変わります。もっと深く知りたい方は、個別鑑定で今の恋に必要な次の一手を整理できます。",
      lineLabel: "LINEで恋の悩みを相談する",
      products: [
        {
          label: "彼の本音と次の一手を鑑定する",
          note: "3,980円｜まず今の恋の流れを整理したい方へ",
          href: BASE_LINKS.loveEntry,
        },
        {
          label: "復縁と関係修復を深く鑑定する",
          note: "9,800円｜彼の本音・すれ違い・今後の流れを深く整理",
          href: BASE_LINKS.reunion,
        },
      ],
      premium: {
        text: "一度の鑑定だけでは不安が残る方へ。彼との関係を7日間かけて整えたい場合は、LINE文の方向性や次の一手まで一緒に整理する7日間サポートもご用意しています。",
        label: "7日間サポートで整える",
        note: "50,000円｜LINE文と次の一手まで一緒に整理",
        href: BASE_LINKS.support,
      },
    },
  },
  work: {
    id: "work",
    name: "仕事運の流れ診断",
    shortName: "仕事運の流れ",
    icon: BriefcaseBusiness,
    symbol: "星 / 運命の輪 / 官星 / 転機",
    description: "続けるか、変えるか、整えるか。今の仕事運と、あなたに合う働き方の流れを読みます。",
    startLabel: "仕事運の流れを診断する",
    questions: [
      {
        text: "今の仕事について、近いものを選んでください",
        options: [
          { label: "続けるべきか迷っている", scores: { A: 3, C: 1 } },
          { label: "転職を考えている", scores: { B: 3, D: 1 } },
          { label: "評価されにくいと感じる", scores: { A: 2, C: 2 } },
          { label: "人間関係で疲れている", scores: { A: 3 } },
          { label: "副業や独立が気になる", scores: { D: 3, B: 1 } },
          { label: "自分に合う仕事が分からない", scores: { C: 3 } },
        ],
      },
      {
        text: "今いちばん知りたいこと",
        options: [
          { label: "今の仕事を続けるべきか", scores: { A: 2, C: 1 } },
          { label: "転職のタイミング", scores: { B: 3 } },
          { label: "適職や向いている働き方", scores: { C: 3 } },
          { label: "評価や収入の流れ", scores: { C: 2, B: 1 } },
          { label: "今後の転機", scores: { B: 3 } },
          { label: "今取るべき行動", scores: { D: 3 } },
        ],
      },
      {
        text: "最近の感覚に近いもの",
        options: [
          { label: "頑張っているのに報われない", scores: { A: 3 } },
          { label: "停滞している感じがする", scores: { A: 2, B: 1 } },
          { label: "動きたいけど怖い", scores: { B: 2, D: 1 } },
          { label: "環境を変えたい", scores: { B: 3 } },
          { label: "やる気が戻らない", scores: { A: 2, C: 1 } },
          { label: "新しいことを始めたい", scores: { D: 3 } },
        ],
      },
      {
        text: "仕事で一番苦しくなりやすい場面は？",
        options: [
          { label: "人に気を遣いすぎる", scores: { A: 2, C: 1 } },
          { label: "評価されないと感じる", scores: { A: 2, C: 2 } },
          { label: "将来が見えなくなる", scores: { B: 2, A: 1 } },
          { label: "自分の強みが分からない", scores: { C: 3 } },
          { label: "失敗が怖くて動けない", scores: { D: 2, A: 1 } },
          { label: "周りと比べて焦る", scores: { B: 1, C: 2 } },
        ],
      },
      {
        text: "今後の働き方で気になっているものは？",
        options: [
          { label: "今の職場で安定したい", scores: { A: 2, C: 1 } },
          { label: "転職したい", scores: { B: 3 } },
          { label: "副業を始めたい", scores: { D: 3, B: 1 } },
          { label: "独立やフリーランスに興味がある", scores: { D: 3 } },
          { label: "好きなことを仕事にしたい", scores: { C: 1, D: 2 } },
          { label: "まだ分からない", scores: { C: 2, A: 1 } },
        ],
      },
      {
        text: "今のあなたに一番必要だと感じるものは？",
        options: [
          { label: "自信", scores: { C: 2, D: 1 } },
          { label: "タイミング", scores: { B: 3 } },
          { label: "方向性", scores: { C: 3 } },
          { label: "評価", scores: { A: 1, C: 2 } },
          { label: "収入", scores: { D: 2, B: 1 } },
          { label: "環境の変化", scores: { B: 2, D: 1 } },
        ],
      },
    ],
    resultLabels: {
      flow: "今の仕事運の流れ",
      view: "悩みが強くなる原因",
      reason: "整えるべきポイント",
      avoid: "今やらない方がいいこと",
      action: "仕事で必要な次の一手",
    },
    results: {
      A: {
        name: "停滞整理タイプ",
        summary: "今は無理に動くより、現状の違和感を整理する時期。",
        flow: "今の仕事運は、勢いよく外へ動くより、内側の違和感を言語化する流れです。停滞に見えても、実は何を続け、何を変えるかを見極めるための静かな時間かもしれません。月読の視点では、動けない時期は失敗ではなく、次に進む前の棚卸しの夜です。",
        view: "停滞しているように感じる理由は、頑張り方と評価される場所が少しずれていることにありそうです。努力が足りないのではなく、力を使う方向や環境との相性を見直す必要があります。人に気を遣いすぎるほど、自分が本当は何に疲れているのかも見えにくくなります。",
        reason: "整えるべきポイントは、今の仕事で消耗している部分と、まだ残したい部分を分けることです。全部が嫌なのか、一部の人間関係が苦しいのか、評価制度が合わないのかで次の一手は変わります。",
        avoid: "疲れ切った勢いで退職や転職を決めること、今の自分を責めて無理に走ること、周りと比べて価値を下げることは避けてください。",
        action: "まず、今の仕事で消耗していること、まだ残したいこと、変えたいことを三つに分けて書き出してください。その上で、一週間以内に変えられる小さな環境調整を一つだけ選びましょう。",
      },
      B: {
        name: "転機接近タイプ",
        summary: "近いうちに仕事の流れが変わりやすい時期。",
        flow: "今の仕事運には、運命の輪のように流れが切り替わる気配があります。異動、転職、副業、役割変更など、外側の環境が少しずつ動きやすい時期です。すぐに結果を決めるより、情報、出会い、可能性を静かに集めるほど転機を読みやすくなります。",
        view: "悩みが強くなる原因は、今の場所にあなたの成長速度が合わなくなっていることかもしれません。環境を変えたい感覚は逃げではなく、次の器を探す合図の場合があります。ただし、怒りや焦りだけで動くと、次の場所でも同じ不安を持ち込みやすくなります。",
        reason: "動く前に整えるべきことは、条件、タイミング、譲れない価値観です。収入だけ、雰囲気だけ、憧れだけで選ぶのではなく、働き方・人間関係・評価・生活リズムを合わせて見てください。",
        avoid: "焦りだけで求人に飛びつくこと、条件を見ずに勢いで決めること、今の職場への怒りを次の選択理由にすることは避けましょう。",
        action: "今日は転職サイトを見るだけで終わらせず、譲れない条件を三つ書いてください。転機は準備した人のもとで現実になりやすくなります。",
      },
      C: {
        name: "適職再確認タイプ",
        summary: "自分に合う働き方や強みを見直す時期。",
        flow: "今の仕事運は、外側の肩書きより、あなたの星が自然に力を出せる場所を見直す流れです。向いていないのではなく、向いている部分をまだ使い切れていない可能性があります。適職は突然見つかるというより、過去に何度も出ていた強みを拾い直すことで輪郭が出ます。",
        view: "悩みが強くなる原因は、自分の強みを当たり前だと思いすぎていることです。人を整える力、細部に気づく力、言葉にする力など、あなたにとって普通のことが仕事の価値になる場合があります。合わない環境にいると、その強みが欠点のように扱われて疲れやすくなります。",
        reason: "整えるべきポイントは、苦手の克服より、自然にできることを仕事の中心へ寄せることです。安定と意味の両方がある働き方で力を出しやすく、誰かの役に立つ実感や納得感が必要です。",
        avoid: "苦手を克服することだけに時間を使うこと、周りと比べて自分の価値を下げること、合わない場所で自分を責め続けることは避けてください。",
        action: "過去に褒められたこと、頼まれやすいこと、疲れにくい作業を書き出しましょう。適職はその中に静かに隠れています。",
      },
      D: {
        name: "挑戦準備タイプ",
        summary: "副業・転職・新しい挑戦に向けて準備を始める時期。",
        flow: "今の仕事運は、新しい挑戦へ向けて小さく火を灯す流れです。副業、転職、独立、学び直しなど、今までの枠を少し越えるテーマが出やすくなっています。いきなり大きく変えるより、試す、学ぶ、整えることで流れが安定します。",
        view: "悩みが強くなる原因は、行動したい気持ちがあるのに、まだ現実の手順が見えていないことです。怖さは才能がないサインではなく、未知の場所へ向かう前の自然な緊張です。",
        reason: "整えるべきポイントは、挑戦を夢で終わらせず、小さな実験に落とすことです。副業なら何を誰に届けるのか、転職なら何を条件にするのか、独立なら何を準備するのかを具体化してください。",
        avoid: "準備ゼロで大きな決断をすること、学びだけで満足して実験しないこと、完璧になるまで動かないことは避けましょう。",
        action: "今週できる小さな挑戦を一つ決めてください。情報収集、ポートフォリオ作成、相談、応募の下書きなど、月の一歩で十分です。",
      },
    },
    cta: {
      title: "今の仕事運を、もう少し深く整理したい方へ",
      body: "診断では、今の仕事の流れを大きく見ることができます。ただ、今の仕事を続けるべきか、転職や副業のタイミング、あなたに合う働き方、評価や収入につながる流れは、具体的な状況によって変わります。「自分の場合はどう動けばいいのか」まで知りたい方は、仕事運鑑定で今の流れと次の一手を深く整理できます。",
      lineLabel: "LINEで仕事の悩みを相談する",
      products: [
        {
          label: "仕事運と転機を深く鑑定する",
          note: "9,800円｜仕事運・適職・転機の流れを文章でお届け",
          href: BASE_LINKS.work,
        },
      ],
    },
  },
  money: {
    id: "money",
    name: "金運の流れ診断",
    shortName: "金運の流れ",
    icon: Coins,
    symbol: "金星 / 財星 / 巡り / 豊かさ",
    description: "お金が残らない不安、収入の流れ、受け取る力。今の金運を静かに整える診断です。",
    startLabel: "金運の流れを診断する",
    questions: [
      {
        text: "今のお金の悩みに近いものを選んでください",
        options: [
          { label: "お金がなかなか残らない", scores: { A: 3 } },
          { label: "収入が不安定", scores: { B: 2, D: 1 } },
          { label: "将来のお金が不安", scores: { A: 2, C: 1 } },
          { label: "使いすぎてしまう", scores: { A: 3 } },
          { label: "副業や収入アップが気になる", scores: { B: 3, D: 1 } },
          { label: "金運を整えたい", scores: { C: 2, D: 1 } },
        ],
      },
      {
        text: "今いちばん知りたいこと",
        options: [
          { label: "今の金運の状態", scores: { A: 2, C: 1 } },
          { label: "お金が出ていく原因", scores: { A: 3 } },
          { label: "収入につながる流れ", scores: { B: 3 } },
          { label: "金運上昇のタイミング", scores: { D: 3 } },
          { label: "仕事とお金のつながり", scores: { C: 2, B: 1 } },
          { label: "今取るべき行動", scores: { D: 2, B: 1 } },
        ],
      },
      {
        text: "最近の感覚に近いもの",
        options: [
          { label: "頑張ってもお金が残らない", scores: { A: 3 } },
          { label: "不安でお金を使ってしまう", scores: { A: 2, C: 1 } },
          { label: "収入を増やしたい", scores: { B: 3 } },
          { label: "豊かさを受け取りたい", scores: { C: 3 } },
          { label: "お金の流れを変えたい", scores: { D: 3 } },
          { label: "今後の金運が気になる", scores: { D: 2, C: 1 } },
        ],
      },
      {
        text: "お金に対して一番強い感情は？",
        options: [
          { label: "不安", scores: { A: 3 } },
          { label: "焦り", scores: { B: 1, D: 2 } },
          { label: "罪悪感", scores: { C: 3 } },
          { label: "もっと増やしたい", scores: { B: 3 } },
          { label: "守りたい", scores: { A: 2, C: 1 } },
          { label: "自由になりたい", scores: { D: 2, B: 1 } },
        ],
      },
      {
        text: "今、お金が出ていきやすいものは？",
        options: [
          { label: "なんとなくの買い物", scores: { A: 3 } },
          { label: "美容や服", scores: { C: 1, A: 2 } },
          { label: "食費や外食", scores: { A: 2 } },
          { label: "推し活や趣味", scores: { C: 2, A: 1 } },
          { label: "人付き合い", scores: { C: 2, A: 1 } },
          { label: "固定費や生活費", scores: { A: 2, D: 1 } },
        ],
      },
      {
        text: "これから増やしたいものは？",
        options: [
          { label: "毎月の収入", scores: { B: 3 } },
          { label: "貯金", scores: { A: 2, C: 1 } },
          { label: "副業収入", scores: { B: 2, D: 1 } },
          { label: "仕事の報酬", scores: { C: 2, B: 1 } },
          { label: "心の余裕", scores: { C: 3 } },
          { label: "お金に振り回されない感覚", scores: { A: 1, D: 2 } },
        ],
      },
    ],
    resultLabels: {
      flow: "今の金運の流れ",
      view: "悩みが強くなる原因",
      reason: "整えるべきポイント",
      avoid: "今やめた方がいいお金の使い方",
      action: "金運を整える次の一手",
    },
    results: {
      A: {
        name: "お金の巡り停滞タイプ",
        summary: "今はお金の流れが滞りやすく、使い方の見直しが必要な時期。",
        flow: "今の金運は、入る力よりも出ていく流れを整えることが先になりやすい時期です。お金がないというより、何に流れているかが見えにくくなっているかもしれません。月読の金運では、巡りは責めるものではなく、見える場所へ戻すものとして扱います。",
        view: "お金が残りにくい理由は、不安を埋めるための支出や、疲れを紛らわせる使い方にありそうです。買う瞬間は少し楽になっても、その後に不安が戻る支出は金運を濁らせます。",
        reason: "整えるべきポイントは、固定費、なんとなくの買い物、感情で動く支出を分けることです。財星は、派手な一発よりも整った器にお金が残ることを教えます。",
        avoid: "不安な夜の衝動買い、見栄のための支出、使途が分からないままのサブスク継続は見直してください。",
        action: "今日使ったお金を責めずに書き出しましょう。削るためではなく、お金の流れを見える場所へ戻すためです。",
      },
      B: {
        name: "収入準備タイプ",
        summary: "収入につながる行動の準備を始める時期。",
        flow: "今の金運は、すぐ増えるというより、収入につながる種をまく流れです。副業、学び、発信、スキルの棚卸しが未来のお金の入口になります。増やしたい気持ちは自然ですが、焦りではなく準備として扱うほど流れが安定します。",
        view: "悩みが強くなる原因は、受け取る道がまだ一本に限られていることです。今の収入源だけで安心を作ろうとすると、不安が大きくなりやすいかもしれません。",
        reason: "整えるべきポイントは、仕事や副業とのつながりです。あなたの経験や言葉、得意なことが収入につながる可能性があります。ただし、金運は準備のない期待ではなく、現実的な小さな行動で動きます。",
        avoid: "一気に稼げる話に飛びつくこと、投資や副業で確実な利益を期待すること、焦りだけで高額な契約をすることは避けましょう。",
        action: "収入に変えられそうな経験を三つ書き出してください。今週はそのうち一つについて、調べる、相談する、下書きするところまでで十分です。",
      },
      C: {
        name: "豊かさ受け取りタイプ",
        summary: "自分の価値や働き方を整えることで金運が動きやすい時期。",
        flow: "今の金運は、自分の価値を低く見積もらないことがテーマです。受け取ることに罪悪感があると、収入や豊かさの入口を自分で狭めてしまうことがあります。金運は、稼ぐ力だけでなく受け取る許可にも影響されます。",
        view: "豊かさを受け取りにくくしている原因は、遠慮しすぎることや、安く引き受けすぎることにあるかもしれません。優しさと自己犠牲を混ぜないことが大切です。",
        reason: "整えるべきポイントは、自分の価値と働き方のつながりです。丁寧さ、聞く力、整える力、続ける力は金運の器になります。自分では普通だと思っている力ほど、お金に変わる可能性があります。",
        avoid: "自分の価値を下げる値引き、頼まれたら断れない支出、必要以上に相手へ合わせるお金の使い方は避けましょう。",
        action: "自分が受け取っていいものを一つ決めてください。報酬、休息、感謝、サポート。豊かさはお金だけでなく、受け取る許可から動きます。",
      },
      D: {
        name: "金運転機タイプ",
        summary: "お金の流れが変わる前触れが出やすい時期。",
        flow: "今の金運は、これまでのお金の流れを変える前触れが出やすい時期です。収入、仕事、支出の優先順位が少しずつ入れ替わるかもしれません。転機は大きな臨時収入だけでなく、使い方や働き方の変化として現れることがあります。",
        view: "悩みが強くなる原因は、古い使い方や働き方を続けていることにありそうです。以前は合っていた方法が、今のあなたには少し窮屈になっています。",
        reason: "整えるべきポイントは、チャンスを受け取る準備です。新しい役割、副業、学び直し、発信など、お金の入口を増やす準備が運を動かします。",
        avoid: "流れが変わる時期に、怖さだけで何も見ないこと。逆に、保証のない話へ勢いで飛び込むことも避けてください。",
        action: "今月のお金の流れを一つだけ変えてください。固定費の見直し、収入の種まき、不要な支出を止めること。小さな変更が転機の合図になります。",
      },
    },
    cta: {
      title: "今のお金の流れを、もう少し深く整理したい方へ",
      body: "診断では、今の金運の流れを大きく見ることができます。ただ、お金が残りにくい理由、収入につながる流れ、仕事や副業との関係、金運が動きやすいタイミングは、具体的な状況によって変わります。「自分の場合、何を整えればいいのか」まで知りたい方は、金運鑑定で今のお金の巡りと次の一手を深く整理できます。",
      lineLabel: "LINEでお金の悩みを相談する",
      products: [
        {
          label: "お金の巡りと金運を深く鑑定する",
          note: "9,800円｜金運・収入の流れ・豊かさの転機を文章でお届け",
          href: BASE_LINKS.money,
        },
      ],
    },
  },
};

function getInitialPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

function getScoreResult(genre, answers) {
  const scores = { A: 0, B: 0, C: 0, D: 0 };
  genre.questions.forEach((question, index) => {
    const selected = question.options[answers[index]];
    if (!selected) return;
    Object.entries(selected.scores).forEach(([key, value]) => {
      scores[key] += value;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
}

function Shell({ children, navigate }) {
  return (
    <div className="site-shell">
      <div className="night-sky" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="site-header">
        <button className="brand" onClick={() => navigate("/")} type="button">
          <Moon size={18} />
          <span>月読</span>
          <small>tsukuyomi</small>
        </button>
      </header>
      {children}
    </div>
  );
}

function Home({ startGenre }) {
  return (
    <main>
      <section className="flow-hero">
        <div className="flow-moon-visual" aria-hidden="true">
          <div className="full-moon" />
          <div className="glass-arc arc-one" />
          <div className="glass-arc arc-two" />
          <div className="floating-card card-moon">月</div>
          <div className="floating-card card-tarot">XVIII</div>
        </div>
        <div className="hero-copy flow-copy">
          <p className="eyebrow">月読 ─ tsukuyomi ─</p>
          <h1 className="hero-title">月読の流れ診断</h1>
          <p className="lead">夜になると、考え込んでしまう人へ。</p>
          <p>
            恋愛、仕事、お金。今のあなたが抱えている悩みの流れを、
            月読が静かに読み解きます。
          </p>
          <p>まずは、今いちばん気になるテーマを選んでください。</p>
        </div>
      </section>

      <section className="genre-grid" aria-label="診断ジャンル">
        {Object.values(genreData).map((genre) => (
          <GenreCard key={genre.id} genre={genre} onStart={() => startGenre(genre.id)} />
        ))}
      </section>

      <section className="world-section flow-world">
        <p className="eyebrow">quiet reading</p>
        <h2>当てるより、流れを整理するために。</h2>
        <p>
          月読の流れ診断は、タロットと四柱推命の象徴を借りて、
          今の感情や状況をやさしく言葉にする無料診断です。
          未来を断定するものではなく、次の一手を見つけるための静かな入口です。
        </p>
      </section>
    </main>
  );
}

function GenreCard({ genre, onStart }) {
  const Icon = genre.icon;
  return (
    <article className={`genre-card genre-card-${genre.id}`}>
      <div className="genre-orbit" aria-hidden="true">
        <Moon size={26} />
        <Stars size={18} />
      </div>
      <div className="genre-icon">
        <Icon size={24} />
      </div>
      <p className="eyebrow">{genre.symbol}</p>
      <h2>{genre.shortName}</h2>
      <p>{genre.description}</p>
      <button className="primary-button wide" onClick={onStart} type="button">
        {genre.startLabel}
        <ArrowRight size={18} />
      </button>
    </article>
  );
}

function QuizPage({ genre, answers, setAnswers, onBack, onResult }) {
  const [index, setIndex] = useState(0);
  const question = genre.questions[index];
  const answeredCount = answers.filter((answer) => answer !== undefined).length;
  const canFinish = answeredCount === genre.questions.length;
  const progress = ((index + 1) / genre.questions.length) * 100;

  const choose = (optionIndex) => {
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
    if (index < genre.questions.length - 1) {
      window.setTimeout(() => setIndex(index + 1), 140);
    }
  };

  return (
    <main className="quiz-page">
      <section className="glass-panel quiz-panel flow-quiz">
        <div className="quiz-top">
          <button className="ghost-button" onClick={index === 0 ? onBack : () => setIndex(index - 1)} type="button">
            <ArrowLeft size={16} />
            戻る
          </button>
          <span>{index + 1} / {genre.questions.length}</span>
        </div>
        <div className="progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>
        <p className="question-label">{genre.name}</p>
        <h1>{question.text}</h1>
        <div className="answer-grid flow-answer-grid">
          {question.options.map((option, optionIndex) => (
            <button
              className={answers[index] === optionIndex ? "answer active" : "answer"}
              key={option.label}
              onClick={() => choose(optionIndex)}
              type="button"
            >
              <span>{option.label}</span>
              {answers[index] === optionIndex && <Check size={16} />}
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

function ResultPage({ genre, result, onRestart }) {
  const labels = genre.resultLabels;
  return (
    <main className="result-page flow-result-page">
      <section className="result-hero glass-panel flow-result-hero">
        <ResultVisual genre={genre} />
        <div>
          <p className="eyebrow">{genre.name}</p>
          <h1 className="result-title">{result.name}</h1>
          <p className="symbol">{genre.symbol}</p>
          <p className="lead">{result.summary}</p>
        </div>
      </section>

      <section className="reading-grid flow-reading-grid">
        <Reading title={labels.flow} body={result.flow} />
        <Reading title={labels.view} body={result.view} />
        <Reading title={labels.reason} body={result.reason} />
        <Reading title={labels.avoid} body={result.avoid} />
        <Reading title={labels.action} body={result.action} />
      </section>

      <section className="moon-message">
        <p className="eyebrow">tsukuyomi message</p>
        <h2>月読メッセージ</h2>
        <p>
          今の流れは、あなたを怖がらせるためのものではありません。
          立ち止まる夜にも、整える意味があります。今日見えた次の一手を、
          できる範囲で静かに持ち帰ってください。
        </p>
      </section>

      <CommonLineCta genre={genre} />
      <DiagnosticCta genre={genre} />

      <section className="notice-panel glass-panel">
        <p>
          この診断は、タロットと四柱推命の象徴をもとに、今の感情や状況を整理するためのものです。
          恋愛、収入、転職、投資、法律、医療などの結果を保証したり、専門的判断に代わるものではありません。
          この診断・鑑定は、未来や結果を100%保証するものではありません。
          今の状況を整理し、次の一手を考えるためのものです。
        </p>
      </section>

      <button className="ghost-button restart" onClick={onRestart} type="button">
        もう一度診断する
      </button>
    </main>
  );
}

function ResultVisual({ genre }) {
  const Icon = genre.icon;
  return (
    <div className={`type-visual type-visual-large flow-type-visual flow-type-${genre.id}`}>
      <div className="orb" />
      <div className="moon-ring" />
      <div className="flow-symbol">
        <Icon size={42} />
      </div>
      <div className="tarot-frame" />
      <div className="constellation">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="type-number">月</div>
    </div>
  );
}

function DiagnosticCta({ genre }) {
  const { cta } = genre;
  return (
    <section className="cta-panel glass-panel flow-cta-panel">
      <p className="eyebrow">private reading</p>
      <h2>{cta.title}</h2>
      <p>{cta.body}</p>
      <div className="cta-role cta-role-base">鑑定購入</div>

      <div className="base-button-stack">
        {cta.products.map((product) => (
          <article className="base-offer" key={product.href}>
            <a className="primary-button base-button" href={product.href}>
              {product.label}
              <LineChart size={18} />
            </a>
            <p>{product.note}</p>
          </article>
        ))}
      </div>

      {cta.premium && (
        <div className="premium-support">
          <p>{cta.premium.text}</p>
          <article className="base-offer premium-offer">
            <a className="primary-button base-button" href={cta.premium.href}>
              {cta.premium.label}
              <Sparkles size={18} />
            </a>
            <p>{cta.premium.note}</p>
          </article>
        </div>
      )}
    </section>
  );
}

function CommonLineCta({ genre }) {
  return (
    <section className="line-panel glass-panel flow-line-panel">
      <p className="eyebrow">quiet room</p>
      <h2>診断だけでは見えない部分があります</h2>
      <p>
        今の流れをもう少し深く整理したい方へ。
        あなたの状況、悩みの背景、今取るべき次の一手は、
        生年月日や具体的な状況によって変わります。
      </p>
      <p>
        LINEでは、今の悩みに合わせて必要な鑑定や相談先をご案内しています。
        高額な個別相談が必要かどうかも、まずは静かに整理できます。
      </p>
      <div className="cta-role cta-role-line">LINE相談</div>
      <a className="primary-button line-button" href={SITE_CONFIG.LINE_URL}>
        {genre.cta.lineLabel}
        <ArrowRight size={18} />
      </a>
    </section>
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
  const [path, setPath] = useState(getInitialPath);
  const [selectedGenreId, setSelectedGenreId] = useState("love");
  const [answers, setAnswers] = useState([]);
  const genre = genreData[selectedGenreId] || genreData.love;

  const resultKey = useMemo(() => getScoreResult(genre, answers), [genre, answers]);
  const result = genre.results[resultKey];

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navigate = (nextPath, options = {}) => {
    if (window.location.pathname !== nextPath) {
      if (options.replace) {
        window.history.replaceState({}, "", nextPath);
      } else {
        window.history.pushState({}, "", nextPath);
      }
    }
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startGenre = (genreId) => {
    setSelectedGenreId(genreId);
    setAnswers(Array(genreData[genreId].questions.length).fill(undefined));
    navigate(`/diagnosis/${genreId}`);
  };

  const restart = () => {
    setAnswers([]);
    navigate("/");
  };

  const showResult = () => {
    const key = getScoreResult(genre, answers);
    localStorage.setItem("tsukuyomiFlowGenre", selectedGenreId);
    localStorage.setItem("tsukuyomiFlowResult", key);
    navigate("/result");
  };

  return (
    <Shell navigate={navigate}>
      {path === "/" && <Home startGenre={startGenre} />}
      {path.startsWith("/diagnosis") && (
        <QuizPage
          genre={genre}
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => navigate("/")}
          onResult={showResult}
        />
      )}
      {path === "/result" && <ResultPage genre={genre} result={result} onRestart={restart} />}
    </Shell>
  );
}
