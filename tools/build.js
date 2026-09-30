// 宏謙聯合診所官網產生器：node tools/build.js → docs/
const fs = require("fs"), path = require("path");
const D = require("./data");
const S = D.site;
const OUT = path.join(__dirname, "..", "docs");
const w = (p, s) => { fs.mkdirSync(path.dirname(path.join(OUT, p)), { recursive: true }); fs.writeFileSync(path.join(OUT, p), s); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------- icons ----------
const I = {
  arrow: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  down: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  ext: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  phone: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  pin: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  train: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l1.5-4M15 21l-1.5-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/></svg>',
  park: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M10 17V7h3.2a3 3 0 0 1 0 6H10"/></svg>',
  menu: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  close: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  line: '<svg class="i fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s6-3.5 8.2-6.1C21.9 14.2 22 12.6 22 11c0-4.4-4.5-8-10-8zm-3.8 10.5H6.3a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 1 0v3.5h1.4a.5.5 0 0 1 0 1zm1.9-.5a.5.5 0 0 1-1 0V9a.5.5 0 0 1 1 0zm4.6 0a.5.5 0 0 1-.9.3l-2-2.7V13a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .9-.3l2 2.7V9a.5.5 0 0 1 1 0zm3.1-2.5a.5.5 0 0 1 0 1h-1.4v1h1.4a.5.5 0 0 1 0 1h-1.9a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h1.9a.5.5 0 0 1 0 1h-1.4v1z"/></svg>',
  ig: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" class="dot"/></svg>',
  fb: '<svg class="i fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21z"/></svg>',
  spark: '<svg class="spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5z"/></svg>',
};
const SVC = {
  chronic: '<svg class="svc-ic" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40S8 30.5 8 18.5A8.5 8.5 0 0 1 24 14a8.5 8.5 0 0 1 16 4.5c0 2.3-.7 4.5-1.8 6.5"/><path d="M6 25h8l3-5 5 10 3-5h7"/><circle cx="37" cy="33" r="6"/><path d="M37 30v6M34 33h6"/></svg>',
  weight: '<svg class="svc-ic" viewBox="0 0 48 48" aria-hidden="true"><path d="M11 9h26a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4z"/><path d="M16 15h16v7a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2z"/><path d="M20 18v2M24 17.5v3M28 18v2"/><path d="M14 41v2M34 41v2"/><path d="M17 32h3M28 32h3"/></svg>',
  echo: '<svg class="svc-ic" viewBox="0 0 48 48" aria-hidden="true"><path d="M18 5h12v12a6 6 0 0 1-12 0z"/><path d="M24 23v5"/><path d="M15 33a12 12 0 0 0 18 0"/><path d="M10 39a19 19 0 0 0 28 0"/></svg>',
  cold: '<svg class="svc-ic" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 29.5V9a4 4 0 0 0-8 0v20.5a8 8 0 1 0 8 0z"/><path d="M24 18v17"/><circle cx="24" cy="36" r="2.5" class="dot"/><path d="M35 12h6M35 18h4"/></svg>',
  checkup: '<svg class="svc-ic" viewBox="0 0 48 48" aria-hidden="true"><rect x="10" y="8" width="28" height="34" rx="5"/><path d="M18 8V5h12v3"/><path d="M17 24l5 5 9-10"/><path d="M17 35h14"/></svg>',
};

// ---------- layout ----------
function layout({ base, title, desc, canonical, body, jsonld, page }) {
  return `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add("js")</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${S.url}${canonical}">
<meta name="theme-color" content="#f6efe3">
<meta property="og:type" content="website">
<meta property="og:site_name" content="宏謙聯合診所">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${S.url}${canonical}">
<meta property="og:image" content="${S.url}/assets/img/og.png">
<meta property="og:locale" content="zh_TW">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}favicon.png" type="image/png">
<link rel="apple-touch-icon" href="${base}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap">
<link rel="stylesheet" href="${base}assets/site.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body class="page-${page}">
<a class="skip" href="#main">跳到主要內容</a>
${header(base, page)}
<main id="main">
${body}
</main>
${footer(base)}
<script src="${base}assets/site.js" defer></script>
</body>
</html>
`;
}

function header(base, page) {
  const home = page === "home" ? "" : base;
  const nav = [
    ["門診時間", `${home}#hours`],
    ["聯絡我們", `${home}#contact`],
    ["醫師簡介", `${home}#doctors`],
    ["診療項目", `${home}#services`],
    ["活動紀實", `${base}fattyliver/`, page === "fattyliver"],
    ["健康減重衛教專區", S.slim, false, true],
  ];
  const links = nav.map(([t, h, cur, ext]) => `<a href="${h}"${cur ? ' aria-current="page"' : ""}${ext ? ' class="ext"' : ""}>${t}${ext ? I.ext : ""}</a>`).join("");
  return `<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="brand" href="${base || "./"}" aria-label="宏謙聯合診所 首頁">
      <img src="${base}assets/img/logo-160.png" alt="" width="44" height="44">
      <span class="brand-t"><b>宏謙聯合診所</b><small>Hong Chien Clinic</small></span>
    </a>
    <nav class="nav" aria-label="主選單">${links}</nav>
    <a class="btn btn-line hdr-cta" href="${S.line}" target="_blank" rel="noopener">${I.line}<span>LINE 預約</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" data-menu>${I.menu}<span class="sr">開啟選單</span></button>
  </div>
  <div class="drawer" id="drawer" hidden data-drawer>
    <nav class="drawer-nav" aria-label="行動版選單">${nav.map(([t, h, , ext], i) => `<a href="${h}" style="--i:${i}"><span class="n">0${i + 1}</span>${t}${ext ? I.ext : ""}</a>`).join("")}</nav>
    <div class="drawer-foot">
      <a class="btn btn-line" href="${S.line}" target="_blank" rel="noopener">${I.line}<span>LINE 預約／詢問</span></a>
      <a class="btn btn-ghost" href="tel:${S.tel}">${I.phone}<span>${S.phone}</span></a>
    </div>
  </div>
</header>`;
}

function footer(base) {
  return `<footer class="ftr">
  <div class="wrap ftr-top">
    <p class="ftr-big">親切、活力、專業的<br><em>好厝邊</em>。</p>
    <div class="ftr-cols">
      <div>
        <h3>宏謙聯合診所</h3>
        <p>${S.address}</p>
        <p><a href="tel:${S.tel}">${S.phone}</a></p>
      </div>
      <div>
        <h3>快速連結</h3>
        <p><a href="${base}#hours">門診時間</a></p>
        <p><a href="${base}fattyliver/">活動紀實</a></p>
        <p><a href="${S.slim}">健康減重衛教專區</a></p>
      </div>
      <div>
        <h3>追蹤我們</h3>
        <p><a href="${S.line}" target="_blank" rel="noopener">LINE ${S.lineId}</a></p>
        <p><a href="${S.ig}" target="_blank" rel="noopener">Instagram ${S.igId}</a></p>
        <p><a href="${S.fb}" target="_blank" rel="noopener">Facebook ${S.fbId}</a></p>
      </div>
    </div>
  </div>
  <div class="wrap ftr-bot">
    <span>© 2026 宏謙聯合診所</span>
    <span>家醫科・皮膚科・慢性病・健康減重門診</span>
  </div>
</footer>`;
}

// ---------- schedule ----------
const docBadge = (k, big) => `<span class="doc doc-${D.doctorsKey[k].tone}${big ? " big" : ""}" title="${D.doctorsKey[k].name}"><span aria-hidden="true">${k}</span><span class="sr">${D.doctorsKey[k].name}</span></span>`;
const dermDot = '<span class="derm" title="皮膚科陳律安醫師"><span class="sr">皮膚科陳律安醫師</span></span>';
function cellHTML(c) {
  if (c.rot) return `<span class="rot">輪診</span>`;
  if (c.closed) return `<span class="off">休診</span>`;
  if (c.line) return `<span class="off">休診</span>`;
  const docs = c.d.length === 2
    ? `<span class="pair">${docBadge(c.d[0])}<i class="slash" aria-hidden="true"></i>${docBadge(c.d[1])}</span>`
    : docBadge(c.d[0], true);
  return `${docs}${c.note ? `<span class="note">${c.note}</span>` : ""}${c.derm ? dermDot : ""}`;
}
function schedule() {
  const head = `<div class="sch-corner"></div>` + D.days.map((d, i) => `<div class="sch-day" data-day="${i}"><span>週${d}</span></div>`).join("");
  let rows = "";
  for (const s of D.sessions) {
    rows += `<div class="sch-sess" data-sess="${s.id}"><b>${s.name}</b><span>${s.start}–${s.end}</span></div>`;
    D.grid[s.id].forEach((c, i) => {
      if (c.line && i === 6) return;
      const span = c.line && i === 5 ? " span2" : "";
      const cls = c.closed || c.line ? " is-off" : c.rot ? " is-rot" : "";
      const inner = c.line && i === 5
        ? `<span class="sch-line"><img src="assets/img/line-qr.png" alt="宏謙聯合診所 LINE 官方帳號 QR Code" width="72" height="72" loading="lazy"><span><b>休診</b><br>歡迎 LINE 詢問</span></span>`
        : cellHTML(c);
      rows += `<div class="sch-cell${cls}${span}" data-day="${i}" data-sess="${s.id}">${inner}</div>`;
    });
  }
  // mobile day view
  const tabs = D.days.map((d, i) => `<button type="button" role="tab" class="day-tab" data-tab="${i}" aria-selected="false">週${d}</button>`).join("");
  const panels = D.days.map((d, i) => `<div class="day-panel" role="tabpanel" data-panel="${i}" hidden>${D.sessions.map((s) => {
    const c = D.grid[s.id][i];
    const off = c.closed || c.line;
    return `<div class="dp-row${off ? " is-off" : ""}" data-day="${i}" data-sess="${s.id}"><div class="dp-s"><b>${s.name}</b><span>${s.start}–${s.end}</span></div><div class="dp-d">${off ? '<span class="off">休診</span>' : c.rot ? '<span class="rot">輪診</span>' : c.d.map((k) => `<span class="dp-doc">${docBadge(k)}<span>${D.doctorsKey[k].name}</span></span>`).join('<span class="or" aria-hidden="true">／</span>') + (c.note ? `<span class="note">${c.note}</span>` : "") + (c.derm ? `<span class="dp-doc">${dermDot}<span>皮膚科陳律安醫師</span></span>` : "")}</div></div>`;
  }).join("")}</div>`).join("");
  const legend = Object.keys(D.doctorsKey).map((k) => `<li>${docBadge(k)}<span>${D.doctorsKey[k].name}</span></li>`).join("") + `<li>${dermDot}<span>皮膚科陳律安醫師</span></li>`;
  return `<div class="sch" data-sch>
      <div class="sch-grid" role="table" aria-label="門診時間表">${head}${rows}</div>
      <div class="sch-mobile"><div class="day-tabs" role="tablist" aria-label="選擇星期">${tabs}</div>${panels}</div>
    </div>
    <ul class="legend">${legend}</ul>`;
}

// ---------- pages ----------
const reveal = (i = 0) => ` data-reveal style="--d:${i}"`;
const secHead = (no, zh, en, lede) => `<header class="sec-hd">
      <p class="eyebrow"${reveal()}><span class="no">${no}</span><span>${en}</span></p>
      <h2${reveal(1)}>${zh}</h2>
      ${lede ? `<p class="lede"${reveal(2)}>${lede}</p>` : ""}
    </header>`;

function home() {
  const hero = `<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="hero-kicker"${reveal()}><span class="kicker-dot"></span>新北市三重區・仁愛街 517 號</p>
      <h1${reveal(1)}><span class="h1-brand">宏謙聯合診所</span><span class="h1-line">親切、活力、</span><span class="h1-line">專業的<span class="mark">好厝邊<svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 16c46-9 96-11 148-8s98 4 144-2"/></svg></span>。</span></h1>
      <ul class="hero-tags"${reveal(2)}><li>家醫科</li><li>皮膚科</li><li>慢性病</li><li class="hl"><a href="${S.slim}">健康減重門診</a></li></ul>
      <div class="hero-cta"${reveal(3)}>
        <a class="btn btn-line lg" href="${S.line}" target="_blank" rel="noopener">${I.line}<span>用 LINE 預約／詢問</span></a>
        <a class="btn btn-ghost lg" href="#hours"><span>看門診時間</span>${I.down}</a>
      </div>
      <div class="status"${reveal(4)} data-status aria-live="polite">
        <span class="status-dot"></span>
        <div><b data-status-title>門診時間</b><span data-status-sub>早診 08:30–12:00・午診 14:30–17:30・晚診 18:30–21:30</span></div>
      </div>
    </div>
    <div class="hero-art"${reveal(2)}>
      <div class="arch">
        <picture><img src="assets/img/clinic-1400.webp" srcset="assets/img/clinic-800.webp 800w, assets/img/clinic-1400.webp 1400w, assets/img/clinic-2200.webp 2200w" sizes="(max-width: 820px) 90vw, 44vw" alt="宏謙聯合診所明亮的候診空間" width="1400" height="933" fetchpriority="high"></picture>
      </div>
      <img class="toon toon-a" src="assets/img/toon-a-240.webp" srcset="assets/img/toon-a-240.webp 240w, assets/img/toon-a-433.webp 433w" sizes="170px" alt="" width="240" height="399">
    </div>
  </div>
</section>`;

  const hours = `<section class="sec hours" id="hours">
  <div class="wrap">
    ${secHead("01", "門診時間", "Clinic Hours", "早診、午診、晚診，一週七天都有門診。<span class=\"nb\">彩色字是當班醫師，紫點代表皮膚科陳律安醫師同時段看診。</span>")}
    <div${reveal(1)}>${schedule()}</div>
    <ul class="notes"${reveal(2)}>${D.scheduleNotes.map((n) => `<li>${I.spark}<span>${n}</span></li>`).join("")}</ul>
  </div>
</section>`;

  const doctors = `<section class="sec doctors" id="doctors">
  <div class="wrap">
    ${secHead("02", "醫師團隊", "Our Doctors", "家醫科與皮膚科醫師，陪您照顧一家人的健康。")}
    <div class="doc-grid">
      ${D.doctors.map((d, i) => `<article class="dr"${reveal(i)}>
        <div class="dr-arch"><img src="assets/img/${d.img}-480.webp" alt="${d.name}醫師" width="480" height="600" loading="lazy" style="object-position:${d.pos}"></div>
        <div class="dr-body">
          <p class="dr-role">${d.role}</p>
          <h3>${d.name}<span>醫師</span></h3>
          <ul>${d.creds.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  const services = `<section class="sec services" id="services">
  <div class="wrap">
    ${secHead("03", "診療服務項目", "Services", "從感冒到三高、從健檢到體重管理，一次在社區診所處理好。")}
    <div class="svc-grid">
      ${D.services.map((s, i) => s.feature
        ? `<a class="svc feature" href="${S.slim}"${reveal(i)}>
          <span class="svc-no">0${i + 1}</span>
          ${SVC[s.id]}
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <span class="svc-more">前往健康減重衛教專區${I.arrow}</span>
          ${SVC.weight.replace("svc-ic", "svc-mark")}
        </a>`
        : `<article class="svc"${reveal(i)}>
          <span class="svc-no">0${i + 1}</span>
          ${SVC[s.id]}
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
        </article>`).join("")}
    </div>
  </div>
</section>`;

  const env = `<section class="sec env" id="clinic">
  <div class="wrap">
    ${secHead("04", "診所環境與設備", "The Clinic", "")}
    <figure class="env-photo"${reveal(1)}>
      <img src="assets/img/clinic-1400.webp" srcset="assets/img/clinic-800.webp 800w, assets/img/clinic-1400.webp 1400w, assets/img/clinic-2200.webp 2200w" sizes="(max-width: 1320px) 94vw, 1240px" alt="宏謙聯合診所候診區與檢查設備" width="1400" height="933" loading="lazy">
    </figure>
    <div class="env-body">
      <p class="env-quote"${reveal()}>${D.environment[0]}</p>
      <div class="env-text"${reveal(1)}>${D.environment.slice(1).map((p) => `<p>${p}</p>`).join("")}</div>
    </div>
    <ul class="equip"${reveal(2)}>${D.equipment.map((e) => `<li>${e}</li>`).join("")}</ul>
  </div>
</section>`;

  const visit = `<section class="sec visit" id="visit">
  <div class="wrap">
    ${secHead("05", "交通與位置", "Getting Here", "")}
    <div class="visit-grid">
      <div class="map"${reveal()}>
        <iframe title="宏謙聯合診所 地圖" src="${S.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <ol class="route">
        <li${reveal(1)}>${I.pin}<div><h3>地址</h3><p>${S.address}</p><a class="lnk" href="${S.mapPlace}" target="_blank" rel="noopener">在 Google 地圖開啟${I.ext}</a></div></li>
        <li${reveal(2)}>${I.train}<div><h3>搭捷運</h3><p>可搭到<b>徐匯中學捷運站</b>。從二號出口左轉約五十公尺後，再左轉進入仁愛街，走約 600 公尺，宏謙診所就在您的正前方。</p><a class="lnk" href="${S.mapMrt}" target="_blank" rel="noopener">捷運步行路線${I.ext}</a></div></li>
        <li${reveal(3)}>${I.park}<div><h3>開車</h3><p>停車可停加油站旁邊的 <b>Times 停車場</b>。</p></div></li>
      </ol>
    </div>
  </div>
</section>`;

  const contact = `<section class="sec contact" id="contact">
  <div class="wrap contact-in">
    <div class="contact-copy">
      <p class="eyebrow"${reveal()}><span class="no">06</span><span>Contact</span></p>
      <h2${reveal(1)}>聯絡我們</h2>
      <p class="lede"${reveal(2)}>追蹤各個平台，以了解最新現況！</p>
      <a class="big-phone"${reveal(3)} href="tel:${S.tel}">${I.phone}<span>${S.phone}</span></a>
    </div>
    <div class="contact-cards">
      <a class="cc cc-line" href="${S.line}" target="_blank" rel="noopener"${reveal(1)}>
        <span class="cc-ic">${I.line}</span><span class="cc-t"><b>LINE 官方帳號</b><span>${S.lineId}</span></span>
        <img class="cc-qr" src="assets/img/line-qr.png" alt="LINE QR Code" width="96" height="96" loading="lazy">
      </a>
      <a class="cc cc-ig" href="${S.ig}" target="_blank" rel="noopener"${reveal(2)}>
        <span class="cc-ic">${I.ig}</span><span class="cc-t"><b>Instagram</b><span>${S.igId}</span></span>${I.arrow}
      </a>
      <a class="cc cc-fb" href="${S.fb}" target="_blank" rel="noopener"${reveal(3)}>
        <span class="cc-ic">${I.fb}</span><span class="cc-t"><b>Facebook 粉絲專頁</b><span>${S.fbId}</span></span>${I.arrow}
      </a>
    </div>
  </div>
</section>`;

  const jsonld = {
    "@context": "https://schema.org", "@type": "MedicalClinic", name: S.name, url: S.url, telephone: "+886-2-2987-7666",
    image: `${S.url}/assets/img/og.png`, medicalSpecialty: ["PrimaryCare", "Dermatology"],
    address: { "@type": "PostalAddress", streetAddress: "仁愛街517號1、2樓", addressLocality: "三重區", addressRegion: "新北市", postalCode: "241", addressCountry: "TW" },
    sameAs: [S.fb, S.ig],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:30", closes: "17:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "18:30", closes: "21:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:30", closes: "12:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "14:30", closes: "17:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "08:30", closes: "12:00" },
    ],
  };
  const data = `<script type="application/json" id="sch-data">${JSON.stringify({ sessions: D.sessions, grid: D.grid, docs: D.doctorsKey })}</script>`;
  return layout({
    base: "", page: "home", canonical: "/",
    title: "宏謙聯合診所｜三重 家醫科・皮膚科・慢性病・健康減重門診",
    desc: "宏謙聯合診所位於新北市三重區仁愛街，提供家醫科、皮膚科、三高慢性病、超音波檢查、成人健檢與健康減重門診。親切、活力、專業的好厝邊。",
    body: hero + hours + doctors + services + env + visit + contact + data, jsonld,
  });
}

function fattyliver() {
  const b = "../";
  const img = (n, alt, cap) => `<figure class="art-fig"${reveal()}><img src="${b}assets/img/${n}-1400.webp" srcset="${b}assets/img/${n}-800.webp 800w, ${b}assets/img/${n}-1400.webp 1400w" sizes="(max-width: 860px) 92vw, 760px" alt="${alt}" loading="lazy" width="1400" height="1050"><figcaption>${cap}</figcaption></figure>`;
  const body = `<article class="art">
  <header class="art-hd wrap">
    <p class="eyebrow"${reveal()}><span class="no">活動紀實</span><span>2026.09.11</span></p>
    <h1${reveal(1)}>脂肪肝不再只是<br>一句「回去減肥」</h1>
    <p class="art-sub"${reveal(2)}>宏謙聯合診所攜手諾和諾德　成雙北首家脂肪肝篩檢專案合作診所</p>
    <dl class="art-meta"${reveal(3)}>
      <div><dt>日期</dt><dd>2026 年 9 月 11 日上午</dd></div>
      <div><dt>地點</dt><dd>宏謙聯合診所（三重仁愛街）</dd></div>
      <div><dt>合作單位</dt><dd>諾和諾德 Novo Nordisk</dd></div>
    </dl>
  </header>
  <figure class="art-hero wrap"${reveal(2)}><img src="${b}assets/img/fl-explain-1400.webp" srcset="${b}assets/img/fl-explain-800.webp 800w, ${b}assets/img/fl-explain-1400.webp 1400w" sizes="(max-width: 1320px) 94vw, 1240px" alt="院長在診間向民眾說明肝臟掃描報告" width="1400" height="1050"></figure>
  <div class="art-body">
    <div class="art-stats"${reveal()}>
      <div><b>30</b><span>位民眾完成肝臟掃描</span></div>
      <div><b>5–10</b><span>分鐘完成，不需抽血</span></div>
      <div><b>21</b><span>位需進一步評估肝纖維化風險</span></div>
    </div>
    <h2${reveal()}>篩檢日這天發生的事</h2>
    <p${reveal()}>健檢年年出現「脂肪肝」，除了少吃、多運動，下一步呢？9 月 11 日上午，宏謙聯合診所攜手諾和諾德舉辦脂肪肝掃描活動，成為該公司脂肪肝篩檢專案在雙北地區的首家合作診所。活動為約 30 位民眾完成肝臟掃描，每份報告均由家醫科院長親自判讀、當面解釋。</p>
    <p${reveal()}>此次採用 FibroScan 肝臟掃描，約 5 至 10 分鐘即可完成，不需抽血，以非侵入方式定量評估肝臟脂肪堆積與硬度，讓民眾透過數據了解肝臟「有多油、有多硬」，並由醫師判讀脂肪肝及肝纖維化風險。民眾完成掃描後，隨即回到診間，由院長結合病史與既有檢查資料，說明結果及後續處理方向。</p>
    ${img("fl-scan", "FibroScan 肝臟掃描現場", "FibroScan 肝臟掃描約 5 至 10 分鐘完成，不需抽血，一次量到肝臟的脂肪堆積與硬度。")}
    <blockquote class="pull"${reveal()}><p>「我們不希望病人每年都看到脂肪肝，卻每年都不知道該怎麼辦。看脂肪肝，不是只告訴病人『你太胖了，回去減肥』。我們要把三件事說清楚：目前風險在哪裡、需要怎麼處理、什麼時候回來追蹤。檢查只是開始，後面的照護才是重點。」</p><footer>家醫科院長　林禹喬醫師</footer></blockquote>
    <p${reveal()}>當天完成檢測的民眾中，有 21 位經醫師判讀需進一步評估肝纖維化風險，診所將依個別情況安排追蹤或轉介。</p>
    <p${reveal()}>有參與民眾聽到自己肝纖維化顯示中度風險的黃燈，當場驚問「那怎麼辦？」經醫師解說後，清楚了下一步目標。參與活動的黃小姐說：「以前早就知道有脂肪肝，但報告收起來就沒再管。這次醫師把數字代表什麼、接下來要做什麼講清楚。」</p>

    <h2${reveal()}>宏謙的脂肪肝與代謝照護</h2>
    <p${reveal()}>脂肪肝很少單獨出現，它和腰圍、血糖、血脂、血壓常常是同一件事的不同面向。宏謙聯合診所專精脂肪肝與代謝管理：從脂肪肝篩檢與風險評估開始，接著把體重管理、糖尿病與三高照護放進同一個計畫裡，一次處理。</p>
    <ul class="care"${reveal()}>
      <li><b>脂肪肝篩檢與評估</b><span>結合肝功能、血糖血脂、腹部超音波與病史，由醫師判讀脂肪肝與肝纖維化風險，並說清楚下一步。</span></li>
      <li><b>體重管理與健康減重門診</b><span>肥胖症專科認證醫師，依個別狀況安排飲食調整、治療評估與定期追蹤。</span></li>
      <li><b>糖尿病與三高整合照護</b><span>糖尿病、腎臟病與代謝症候群照護網責任診所，長期追蹤血糖、血壓、血脂與尿酸。</span></li>
    </ul>
    ${img("fl-report", "篩檢日每位受檢者拿到的行動卡", "篩檢日每位受檢者都拿到一張行動卡，用紅黃綠燈標示風險，清楚知道接下來該做什麼。")}

    <h2${reveal()}>我們看肝，也看腰圍、血糖、血脂和血壓</h2>
    <p${reveal()}>「脂肪肝往往牽涉一整組代謝問題。我們看肝，也看腰圍、血糖、血脂和血壓，把這些問題一起處理，才是完整的照護。」院長說。</p>
    <p${reveal()}>此次合作把肝臟掃描帶進社區，讓民眾在熟悉的診所完成檢測，並接續後續照護。</p>
    <p class="tags"${reveal()}><span>#脂肪肝</span><span>#體重管理</span><span>#代謝症候群</span><span>#三高照護</span></p>

    <div class="art-cta"${reveal()}>
      <h2>擔心脂肪肝？來宏謙聊聊下一步</h2>
      <p>適合安排評估的人：</p>
      <ul>
        <li>健檢報告寫著「脂肪肝」，但從來沒有人跟您說下一步</li>
        <li>腰圍偏粗、血糖或血脂偏高，或已在控制三高</li>
        <li>肝指數（ALT、AST）反覆偏高卻找不到原因</li>
        <li>正在減重，想知道肝臟有沒有跟著改善</li>
      </ul>
      <div class="hero-cta">
        <a class="btn btn-line lg" href="${S.line}" target="_blank" rel="noopener">${I.line}<span>用 LINE 詢問</span></a>
        <a class="btn btn-ghost lg on-dark" href="${b}#hours"><span>看門診時間</span>${I.arrow}</a>
      </div>
    </div>

    <h2${reveal()}>關於宏謙聯合診所</h2>
    <p${reveal()}>宏謙聯合診所榮獲「糖心胖三合守護計畫」全國特優，並獲國健署「代謝症候群防治」績優診所肯定、衛福部健保署「糖尿病及初期腎病照護」品質獎勵，以及「腎病識能友善績優診所」殊榮，持續深耕代謝健康與慢性病整合照護。</p>
    <p class="disc">本頁內容為健康衛教資訊，不能取代醫師診斷；檢查結果需搭配抽血、影像檢查與病史，由醫師綜合判斷。各項檢查與治療是否適合您，請至門診由醫師評估。</p>
  </div>
</article>`;
  return layout({
    base: b, page: "fattyliver", canonical: "/fattyliver/",
    title: "脂肪肝不再只是一句「回去減肥」｜宏謙聯合診所 活動紀實",
    desc: "2026 年 9 月 11 日，宏謙聯合診所攜手諾和諾德舉辦脂肪肝篩檢，約 30 位民眾完成 FibroScan 肝臟掃描，由院長親自判讀、當面說明下一步。",
    body,
  });
}

function notFound() {
  return layout({
    base: "/", page: "nf", canonical: "/404.html", title: "找不到頁面｜宏謙聯合診所", desc: "找不到這個頁面。",
    body: `<section class="sec nf"><div class="wrap"><p class="eyebrow"><span class="no">404</span><span>Not Found</span></p><h1>這個頁面不見了</h1><p class="lede">可能是網址打錯，或頁面已經搬家。</p><div class="hero-cta"><a class="btn btn-line lg" href="/">回到首頁</a><a class="btn btn-ghost lg" href="/#hours">看門診時間</a></div></div></section>`,
  });
}

w("index.html", home());
w("fattyliver/index.html", fattyliver());
w("404.html", notFound());
w(".nojekyll", "");
w("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${S.url}/sitemap.xml\n`);
w("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>${S.url}/</loc></url>\n<url><loc>${S.url}/fattyliver/</loc></url>\n</urlset>\n`);
console.log("built → docs/");
