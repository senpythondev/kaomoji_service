// Approved, well-established emoji allowlist (the gate for data/emoji.ts).
//
// POLICY: only long-standing, widely-supported emoji (broadly Unicode Emoji
// <= ~9.0 / pre-2017) that render across iOS, Android, Windows, and Mac. NO
// brand-new emoji, flags, skin-tone modifiers, or complex ZWJ sequences.
// scripts/check-emoji.mjs fails the build if data/emoji.ts uses an emoji not
// listed here, so adding one is a deliberate, reviewed step.
//
// Generated snapshot of the current dataset; edit deliberately when adding emoji.
export const APPROVED_EMOJI = new Set(["😀","😄","😁","😆","😅","😂","🤣","😊","🙂","😉","😍","😘","😜","😎","😢","😭","😡","😠","😱","😴","🤔","😳","🙄","😏","❤️","🧡","💛","💚","💙","💜","🖤","💕","💖","💗","💓","💘","💝","💞","💔","💟","🎉","🎊","🎂","🎁","🎈","🎄","🎃","🎆","✨","🌟","⭐","🏆","🥇","🎀","👑","🎓","💐","🍾","🐱","🐶","🐰","🐻","🐼","🐨","🦁","🐯","🐸","🐵","🐧","🐦","🐤","🦊","🐮","🐷","🐭","🐹","🐴","🐝","🐢","🐟","🦋","🐙","🍎","🍓","🍌","🍉","🍇","🍊","🍑","🍒","🍰","🍩","🍪","🍫","🍬","🍦","🍿","🍕","🍔","🍟","🍜","🍣","🍙","🍵","☕","🍺","☀️","⛅","☁️","🌧️","⛈️","🌩️","❄️","☃️","⛄","🌈","🌙","🌞","🌊","💧","🔥","⚡","👍","👎","👌","✌️","🤞","👏","🙏","🙌","👋","🤝","💪","👊","✊","👀","👉","☝️","🖐️","🤙","🌸","🌹","🌻","🌷","🌼","🌺","🌿","🍀","🍁","🍂","🌳","🌲","🌵","🌴","🌱","🐚","🌎","🍄"]);
