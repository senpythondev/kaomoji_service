/**
 * Per-category editorial + SEO copy for the category landing pages
 * (`/kaomoji/[category]`), the project's main SEO surface.
 *
 * Each `intro` is written uniquely (not boilerplate) and naturally includes
 * the target keyword. `metaTitle` is combined with the site name by the
 * layout's title template; `metaDescription` is the page <meta description>.
 */
import type { CategorySlug } from "./categories";

export interface CategoryContent {
  /** Primary target keyword, e.g. "かわいい顔文字". */
  keyword: string;
  /** <title> (site name is appended by the layout template). */
  metaTitle: string;
  /** <meta name="description">. */
  metaDescription: string;
  /** 2–3 sentence on-page intro, unique per category. */
  intro: string;
  /** Sibling categories for internal linking (3–4). */
  related: CategorySlug[];
}

export const CATEGORY_CONTENT: Record<CategorySlug, CategoryContent> = {
  happy: {
    keyword: "うれしい顔文字",
    metaTitle: "うれしい顔文字一覧｜コピペで使える喜びの顔文字",
    metaDescription:
      "うれしい・楽しい気持ちを表す顔文字を集めました。にこにこ笑顔から万歳まで、喜びを伝えるうれしい顔文字をワンクリックでコピーして、LINEやSNSですぐに使えます。",
    intro:
      "うれしいことがあったとき、その気持ちをそのまま伝えられるうれしい顔文字を集めました。にっこり笑顔から、飛び跳ねて喜ぶものまでそろっているので、シーンに合わせて選べます。気に入った顔文字はタップするだけでコピーできます。",
    related: ["love", "cute", "greeting"],
  },
  cute: {
    keyword: "かわいい顔文字",
    metaTitle: "かわいい顔文字一覧｜コピペで使えるキュートな顔文字",
    metaDescription:
      "ゆるふわで可愛い顔文字を厳選しました。猫やうるうるおめめなど、SNSやメッセージで使えるかわいい顔文字をワンクリックでコピーできる無料の顔文字サイトです。",
    intro:
      "SNSやチャットで使える、ゆるふわで可愛い顔文字を厳選しました。猫のような動物系から、ぽっと照れたお顔まで、見ているだけで癒されるものばかりです。気に入ったかわいい顔文字があれば、タップしてそのままコピーしてください。",
    related: ["love", "happy", "surprised"],
  },
  sad: {
    keyword: "悲しい顔文字",
    metaTitle: "悲しい顔文字一覧｜泣き・落ち込みの顔文字をコピペ",
    metaDescription:
      "悲しい・泣きたい気持ちを表す顔文字を集めました。涙、号泣、しょんぼりなど、切ない気持ちを伝える悲しい顔文字をワンクリックでコピーして使えます。",
    intro:
      "ちょっと落ち込んだときや、泣きたい気持ちのときに寄り添ってくれる悲しい顔文字を集めました。ほろりと涙する控えめなものから、わんわん泣く号泣系までそろっています。気持ちに合う顔文字を選んで、タップでコピーしてください。",
    related: ["apology", "angry", "surprised"],
  },
  angry: {
    keyword: "怒る顔文字",
    metaTitle: "怒る顔文字一覧｜プンプン怒りの顔文字をコピペ",
    metaDescription:
      "怒り・イライラを表す顔文字を集めました。プンプン、ムカムカ、激怒など、怒った気持ちを伝える怒る顔文字をワンクリックでコピーして使えます。",
    intro:
      "ちょっとした不満から本気の怒りまで、感情の強さに合わせて選べる怒る顔文字を集めました。ぷんぷんと可愛く拗ねるものから、思わず力の入る激怒系までそろっています。タップするだけで顔文字をコピーできます。",
    related: ["sad", "surprised", "apology"],
  },
  surprised: {
    keyword: "驚きの顔文字",
    metaTitle: "驚きの顔文字一覧｜びっくり顔文字をコピペ",
    metaDescription:
      "驚き・びっくりを表す顔文字を集めました。ガーン、えっ、唖然など、おどろいた気持ちを伝える驚きの顔文字をワンクリックでコピーして使えます。",
    intro:
      "思わず声が出るほどびっくりしたときにぴったりの、驚きの顔文字を集めました。目を丸くする軽い驚きから、衝撃のあまり固まってしまう唖然系までそろっています。気に入った顔文字はタップでそのままコピーできます。",
    related: ["happy", "sad", "angry"],
  },
  love: {
    keyword: "愛・好きの顔文字",
    metaTitle: "愛・好きの顔文字一覧｜ハート顔文字をコピペ",
    metaDescription:
      "「好き」「大好き」の気持ちを表すハートつき顔文字を集めました。ラブラブ、メロメロ、キスなど、愛情を伝える顔文字をワンクリックでコピーして使えます。",
    intro:
      "大切な人に「好き」の気持ちを伝えたいときに使える、愛・好きの顔文字を集めました。ハートを添えたものや、メロメロにとろけるお顔など、甘い気持ちにぴったりです。お気に入りの顔文字をタップしてコピーしてください。",
    related: ["cute", "happy", "greeting"],
  },
  greeting: {
    keyword: "挨拶・お礼の顔文字",
    metaTitle: "挨拶・お礼の顔文字一覧｜あいさつ顔文字をコピペ",
    metaDescription:
      "こんにちは・ありがとうなど、挨拶やお礼に使える顔文字を集めました。手を振る、お辞儀など、丁寧な気持ちを伝える顔文字をワンクリックでコピーして使えます。",
    intro:
      "毎日のあいさつや、ちょっとしたお礼の場面で使える挨拶・お礼の顔文字を集めました。元気に手を振るものから、ぺこりとお辞儀をする丁寧なものまでそろっています。メッセージの最後に添えるだけで、やわらかい印象になります。",
    related: ["happy", "love", "apology"],
  },
  apology: {
    keyword: "謝る顔文字",
    metaTitle: "謝る顔文字一覧｜ごめんなさいの顔文字をコピペ",
    metaDescription:
      "「ごめんなさい」の気持ちを表す顔文字を集めました。お辞儀、平謝り、土下座など、謝罪の気持ちを伝える謝る顔文字をワンクリックでコピーして使えます。",
    intro:
      "うまく言葉にしづらい「ごめんね」の気持ちを、やわらかく伝えられる謝る顔文字を集めました。ぺこりと頭を下げるものから、深々と平謝りするものまでそろっています。タップするだけで顔文字をコピーできます。",
    related: ["sad", "greeting", "happy"],
  },
  animal: {
    keyword: "動物の絵文字",
    metaTitle: "動物の絵文字・顔文字一覧｜猫・犬などをコピー",
    metaDescription:
      "猫・犬・うさぎなど、動物の絵文字と顔文字を集めました。かわいい動物でメッセージを和ませたいときに、ワンクリックでコピーして使えます。",
    intro:
      "猫や犬、うさぎなど人気の動物を、絵文字と顔文字の両方で集めました。かわいい動物でメッセージをほっこり和ませたいときにぴったりです。気になるものをタップしてそのままコピーできます。",
    related: ["cute", "nature", "food"],
  },
  food: {
    keyword: "食べ物の絵文字",
    metaTitle: "食べ物の絵文字一覧｜果物・スイーツ・ごはんをコピー",
    metaDescription:
      "果物・スイーツ・ごはん・ドリンクなど食べ物の絵文字を集めました。グルメの話題や今日のごはんの報告に、ワンクリックでコピーして使えます。",
    intro:
      "果物やスイーツ、ごはんやドリンクなど、食べ物の絵文字をたっぷり集めました。お店の感想やお腹がすいた気持ち、今日のごはんの報告にぴったりです。タップでそのままコピーできます。",
    related: ["celebration", "animal", "nature"],
  },
  celebration: {
    keyword: "お祝いの絵文字",
    metaTitle: "お祝いの絵文字・顔文字一覧｜おめでとうをコピー",
    metaDescription:
      "誕生日・記念日・合格などをお祝いする絵文字と顔文字を集めました。クラッカーやケーキで「おめでとう」を、ワンクリックでコピーして使えます。",
    intro:
      "誕生日やおめでとうを伝えるお祝いの絵文字と顔文字を集めました。クラッカーやケーキ、万歳する顔文字など、特別な日のメッセージを華やかに彩ります。タップでコピーできます。",
    related: ["happy", "love", "food"],
  },
  nature: {
    keyword: "自然の絵文字",
    metaTitle: "自然の絵文字一覧｜花・植物・季節をコピー",
    metaDescription:
      "桜・バラ・四つ葉・紅葉など、自然や植物の絵文字を集めました。季節のあいさつやおだやかな雰囲気づくりに、ワンクリックでコピーして使えます。",
    intro:
      "桜や花、葉っぱなど自然の絵文字を集めました。季節のあいさつや、やわらかでおだやかな雰囲気を出したいときにぴったりです。タップするだけでコピーできます。",
    related: ["animal", "weather", "cute"],
  },
  weather: {
    keyword: "天気の絵文字",
    metaTitle: "天気の絵文字一覧｜晴れ・雨・雪をコピー",
    metaDescription:
      "晴れ・くもり・雨・雪・虹など、天気の絵文字を集めました。今日の天気や気分、予定の連絡に、ワンクリックでコピーして使えます。",
    intro:
      "晴れ・雨・雪など天気の絵文字を集めました。今日の天気や気分を伝えるのに便利で、予定やお出かけの連絡にもよく使われます。タップでそのままコピーできます。",
    related: ["nature", "happy", "sad"],
  },
};
