// ===== 教員用設定：数値・文章はここを書き換えるだけで調整できます =====
const CONFIG = {
  mission: "欧米の評価を70以上に上げて条約改正の条件を満たしつつ、清との全面戦争を回避せよ！（士族の怒りも100未満に保つこと）",
  maxTurns: 8,
  start: { west: 15, qing: 10, shiz: 30 },   // ゲージ初期値(0〜100)
  goalWest: 70,                              // 勝利に必要な欧米評価
  loseAt: 100,                               // 清・士族がこの値に達するとゲームオーバー
  perTurn: { qing: -2, shiz: 5 },            // 毎ターン自動で起こる変化（士族の不満は放置すると溜まる）
  repeatDecay: 0.6,                          // 同じカードを繰り返すと効果が弱まる倍率
  predictThreshold: { big: 12, small: 3 },   // 予想の判定基準（変化量）
  gauges: {
    west: "欧米からの近代化評価", qing: "清の怒り", shiz: "国内士族の怒り"
  },
  // effect: west=欧米評価, qing=清の怒り, shiz=士族の怒り, border=国境の実線化(0〜100)
  cards: [
    { id: "treaty", icon: "📜", name: "対等な条約を提案", year: "1871 日清修好条規", hawk: false,
      desc: "清に対し、国際法にならった対等な条約を結ぼうと申し入れる。",
      effect: { west: 10, qing: 4, shiz: 3, border: 10 },
      fact: "日清修好条規は、近代的な対等条約。ただし清は「日本は格下の朝貢国になるはず」と見ていた面もあり、認識にズレが残った。" },
    { id: "ogasawara", icon: "🏝️", name: "国際法で領有を通告", year: "1876 小笠原諸島", hawk: false,
      desc: "欧米各国に対し、国際法の手続きで小笠原諸島の領有を通告する。",
      effect: { west: 14, qing: 1, shiz: 2, border: 12 },
      fact: "欧米が認める「国際法のルール」に従うと評価が高まる。争いも少なく、国境画定の成功例となった。" },
    { id: "ryukyu1", icon: "👑", name: "琉球藩を置く", year: "1872 琉球藩設置", hawk: false,
      desc: "琉球国王を琉球藩王とし、日本の内側に組み込む準備を進める。",
      effect: { west: 5, qing: 12, shiz: -3, border: 15 },
      fact: "琉球は清にも朝貢していた（両属）。日本がこれを一方的に変えたことで、清との摩擦が強まった。" },
    { id: "taiwan", icon: "🚢", name: "出兵して領有を宣言", year: "1874 台湾出兵", hawk: true,
      desc: "琉球漂流民殺害事件を理由に台湾へ出兵し、琉球の日本帰属を主張する。",
      effect: { west: -6, qing: 24, shiz: -18, border: 12 },
      fact: "士族の不満はそらせるが、清は強く抗議。欧米もやり方に疑問を持った。" },
    { id: "ganghwa", icon: "⚓", name: "軍艦で威嚇", year: "1875 江華島事件", hawk: true,
      desc: "軍艦を朝鮮の沿岸へ送り、開国と条約の締結を迫る。",
      effect: { west: 2, qing: 16, shiz: -12, border: 10 },
      fact: "士族は喜ぶが、朝鮮の宗主国である清は反発。日朝修好条規で朝鮮を「自主の国」と書いたのは、清の影響を外す狙いがあった。" },
    { id: "ryukyu2", icon: "🔥", name: "琉球を沖縄県にする", year: "1879 琉球処分", hawk: true,
      desc: "軍と警察を送り、琉球王国を廃して沖縄県を置く。",
      effect: { west: 8, qing: 28, shiz: -8, border: 25 },
      fact: "国境線ははっきりするが、清は「琉球は朝貢国」と抗議。日清の対立は長く尾を引いた。" }
  ],
  warCause: {
    hawkLimit: 3,
    text: "軍事的な手段（出兵・威嚇・処分）を重ねすぎ、朝貢という「ふんわりした秩序」を力で壊したため、清の怒りが限界を超えた。",
    otherText: "カードの組み合わせや回数に偏りがあり、清の怒りが蓄積した。毎ターンの怒りの増減も見直そう。"
  },
  texts: {
    win: "🎉 ミッション成功！ 国際法で近代的な国境線を示しつつ、戦争を避けた。",
    lose_qing: "💥 戦争勃発！ 清の怒りが限界に達した。",
    lose_shiz: "🔥 士族が反乱！ 国内の不満が爆発した。",
    lose_time: "⌛ 時間切れ。欧米の評価が条約改正の条件に届かなかった。",
    a1: "士族は「強い外交」を歓迎して不満が下がるが、清は日本が朝貢体制を力で壊そうとしていると受け止め、怒りが大きく上がった。国内向けの人気と国際関係は同時に満たせないことがある。",
    a2: "欧米は国際法に基づく明確な国境のある国だけを「文明国」と見なした。国境が曖昧だと条約改正（不平等条約の解消）を求めても認められないので、清・朝鮮との摩擦を覚悟してでも線を引く必要があった。",
    pairs: ["相手が選んだカードで、清の怒りと士族の怒りはどちらが大きく動いた？","「欧米の評価」と「清の怒り」を両方満たす順番を探して、見つけた順番を説明し合おう。","清から見ると、日本の行動は『国境画定』ではなく何に見えたと思う？"]
  }
};

// ===== ここから下はゲーム処理 =====
const E = id => document.getElementById(id);
const clamp = v => Math.max(0, Math.min(100, v));
const LV = [["up2", "大きく上がる"], ["up1", "少し上がる"], ["flat", "ほぼ変わらない"], ["down", "下がる"]];
let S, sel, pred;

function level(d) {
  const t = CONFIG.predictThreshold;
  return d >= t.big ? "up2" : d >= t.small ? "up1" : d > -t.small ? "flat" : "down";
}
function newGame() {
  S = { turn: 1, ...CONFIG.start, border: 0, used: {}, hawk: 0, hit: 0, tot: 0, over: false };
  sel = null; E("log").innerHTML = ""; E("result").hidden = true; E("endPanel").hidden = true; E("predict").hidden = true;
  E("game").hidden = false; E("intro").hidden = true;
  render();
}
function render() {
  E("turnInfo").textContent = `ターン ${Math.min(S.turn, CONFIG.maxTurns)} / ${CONFIG.maxTurns}　外交眼（予想的中）${S.hit}/${S.tot}`;
  E("gauges").innerHTML = ["west", "qing", "shiz"].map(k =>
    `<div class="g"><label>${CONFIG.gauges[k]}</label><div class="bar"><div class="fill ${k}" style="width:${S[k]}%"></div>${k === "west" ? `<i class="goal" style="left:${CONFIG.goalWest}%"></i>` : ""}</div><b>${Math.round(S[k])}</b></div>`).join("");
  E("cards").innerHTML = CONFIG.cards.map(c =>
    `<button class="card ${sel === c.id ? "sel" : ""}" data-id="${c.id}" ${S.over ? "disabled" : ""}><b>${c.icon} ${c.name}</b><small>${c.year}</small></button>`).join("");
  // 地図：国境の実線化と清の怒りを反映
  const f = E("fence"), b = S.border;
  f.style.strokeDasharray = b > 70 ? "none" : `${1 + b / 8} ${12 - b / 9}`;
  f.style.strokeWidth = 3 + b / 20;
  f.style.stroke = `hsl(${200 - S.qing * 1.6},90%,${70 - S.qing / 4}%)`;
  E("china").style.fill = `hsl(${160 - S.qing * 1.3},${35 + S.qing / 2}%,${27 - S.qing / 12}%)`;
  E("mapCap").textContent = b > 70 ? "国境線は、はっきりしてきた" : b > 30 ? "境界が少しずつ線になっていく" : "朝貢体制：境界はふんわり";
}
function choose(id) {
  sel = id; pred = {}; const c = CONFIG.cards.find(x => x.id === id);
  E("pTitle").textContent = `${c.icon} ${c.name}（${c.year}）`; E("pDesc").textContent = c.desc;
  document.querySelectorAll(".opts").forEach(o => o.innerHTML = LV.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join(""));
  E("runBtn").disabled = true; E("predict").hidden = false; E("result").hidden = true; render();
}
function run() {
  const c = CONFIG.cards.find(x => x.id === sel), n = S.used[sel] || 0, m = Math.pow(CONFIG.repeatDecay, n);
  const e = {}; for (const k in c.effect) e[k] = c.effect[k] * (k === "shiz" && c.effect[k] < 0 ? 1 : m);
  S.used[sel] = n + 1; if (c.hawk) S.hawk++;
  const hits = ["qing", "west"].map(k => pred[k] === level(e[k]));
  S.tot += 2; S.hit += hits.filter(Boolean).length;
  S.west = clamp(S.west + e.west); S.qing = clamp(S.qing + e.qing); S.shiz = clamp(S.shiz + e.shiz); S.border = clamp(S.border + e.border);
  const f = E("fence"); f.classList.remove("shake"); void f.getBBox(); if (c.hawk) { f.classList.add("shake"); E("china").classList.remove("flash"); void E("china").getBBox(); E("china").classList.add("flash"); }
  const sg = x => (x > 0 ? "+" : "") + Math.round(x);
  const lbl = (k) => LV.find(l => l[0] === pred[k])[1];
  E("result").innerHTML = `<h3>結果</h3><p>清の怒り ${sg(e.qing)} ／ 欧米評価 ${sg(e.west)} ／ 士族の怒り ${sg(e.shiz)}${n ? "（繰り返しで効果が弱まった）" : ""}</p>
   <p>予想：清「${lbl("qing")}」<span class="${hits[0] ? "ok" : "bad"}">${hits[0] ? "的中" : "はずれ"}</span>　欧米「${lbl("west")}」<span class="${hits[1] ? "ok" : "bad"}">${hits[1] ? "的中" : "はずれ"}</span></p><p>📖 ${c.fact}</p>`;
  E("result").hidden = false; E("predict").hidden = true;
  E("log").insertAdjacentHTML("beforeend", `<li>${c.year}：${c.name}</li>`);
  // ターン終了処理
  S.qing = clamp(S.qing + CONFIG.perTurn.qing); S.shiz = clamp(S.shiz + CONFIG.perTurn.shiz);
  S.turn++; sel = null; check(); render();
}
function check() {
  const T = CONFIG.texts; let r = null;
  if (S.qing >= CONFIG.loseAt) r = "lose_qing"; else if (S.shiz >= CONFIG.loseAt) r = "lose_shiz";
  else if (S.west >= CONFIG.goalWest) r = "win"; else if (S.turn > CONFIG.maxTurns) r = "lose_time";
  if (!r) return; S.over = true;
  const p = E("endPanel"); p.hidden = false; p.className = "panel " + (r === "win" ? "win" : "lose");
  let h = `<h2>${T[r]}</h2><p>予想的中：${S.hit}/${S.tot}</p>`;
  if (r === "lose_qing") h += `<h3>原因を考えよう</h3><p>軍事的カードを使った回数：${S.hawk}回。あなたの推理は？</p><div class="opts" id="why">
    <button data-w="1">条約をたくさん結んだから</button><button data-w="2">武力で朝貢の秩序を壊しすぎたから</button><button data-w="3">欧米の評価が高すぎたから</button></div><p id="whyR"></p>`;
  h += `<div class="btnrow"><button class="primary" id="again">もう一度挑戦</button></div>`;
  p.innerHTML = h; p.scrollIntoView({ behavior: "smooth" });
}
document.addEventListener("click", e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.id === "startBtn" || t.id === "again") newGame();
  else if (t.classList.contains("card")) choose(t.dataset.id);
  else if (t.dataset.v) { const k = t.parentNode.dataset.key; pred[k] = t.dataset.v; t.parentNode.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === t)); E("runBtn").disabled = !(pred.qing && pred.west); }
  else if (t.id === "runBtn") run();
  else if (t.id === "cancelBtn") { sel = null; E("predict").hidden = true; render(); }
  else if (t.dataset.w) { const W = CONFIG.warCause; E("whyR").textContent = (t.dataset.w === "2" ? "✅ 正解に近い！ " : "🤔 もう一度ログを見よう。 ") + (S.hawk >= W.hawkLimit ? W.text : W.otherText); }
});
E("missionText").textContent = CONFIG.mission;
E("a1").textContent = "💡 考え方の例：" + CONFIG.texts.a1;
E("a2").textContent = "💡 考え方の例：" + CONFIG.texts.a2;
E("pairs").innerHTML = CONFIG.texts.pairs.map(p => `<li>${p}</li>`).join("");
