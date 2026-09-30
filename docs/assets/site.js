/* 宏謙聯合診所 — site.js */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const shot = location.search.includes("shot");
  if (shot) document.documentElement.classList.add("shot");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || shot;

  /* header shadow on scroll */
  const hdr = $("[data-hdr]");
  const onScroll = () => hdr && hdr.classList.toggle("is-stuck", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* mobile drawer */
  const btn = $("[data-menu]"), drawer = $("[data-drawer]");
  if (btn && drawer) {
    const icon = btn.innerHTML;
    const set = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      drawer.hidden = !open;
      document.body.classList.toggle("menu-open", open);
      btn.innerHTML = open ? '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg><span class="sr">關閉選單</span>' : icon;
    };
    btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => set(false)));
    addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
    matchMedia("(min-width: 1041px)").addEventListener("change", (m) => m.matches && set(false));
  }

  /* reveal on scroll */
  const items = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) items.forEach((el) => el.classList.add("is-in"));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    items.forEach((el) => io.observe(el));
  }

  /* active nav link */
  const links = $$('.nav a[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      const a = map.get(e.target.id); if (!a) return;
      if (e.isIntersecting) { links.forEach((l) => l.classList.remove("is-active")); a.classList.add("is-active"); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* schedule: today, now, status */
  const raw = $("#sch-data");
  if (!raw) return;
  const data = JSON.parse(raw.textContent);
  const WD = ["一", "二", "三", "四", "五", "六", "日"];
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const nowTPE = () => {
    const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Taipei", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    const g = (t) => p.find((x) => x.type === t).value;
    const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(g("weekday"));
    return { day, min: (+g("hour") % 24) * 60 + +g("minute") };
  };
  const cellAt = (sid, d) => data.grid[sid][d];
  const isOpen = (c) => c && !c.closed && !c.line;
  const who = (c) => {
    if (c.rot) return "醫師輪診";
    const names = c.d.map((k) => data.docs[k].name);
    let s = names.join("／");
    if (c.derm) s += "・皮膚科陳律安醫師";
    return s;
  };

  function paint() {
    const { day, min } = nowTPE();
    $$(".is-today, .is-now").forEach((el) => el.classList.remove("is-today", "is-now"));
    $$(`.sch-day[data-day="${day}"], .sch-cell[data-day="${day}"], .day-tab[data-tab="${day}"]`).forEach((el) => el.classList.add("is-today"));

    let current = null;
    for (const s of data.sessions) {
      if (min >= toMin(s.start) && min < toMin(s.end) && isOpen(cellAt(s.id, day))) current = s;
    }
    if (current) {
      $$(`[data-day="${day}"][data-sess="${current.id}"]`).forEach((el) => el.classList.add("is-now"));
      $$(`.sch-sess[data-sess="${current.id}"]`).forEach((el) => el.classList.add("is-now"));
    }

    const st = $("[data-status]");
    if (st) {
      const t = $("[data-status-title]", st), sub = $("[data-status-sub]", st);
      if (current) {
        st.classList.add("is-open");
        t.textContent = `看診中・${current.name} ${current.start}–${current.end}`;
        sub.textContent = who(cellAt(current.id, day));
      } else {
        st.classList.remove("is-open");
        let next = null;
        for (let k = 0; k < 8 && !next; k++) {
          const d = (day + k) % 7;
          for (const s of data.sessions) {
            if (k === 0 && toMin(s.start) <= min) continue;
            if (isOpen(cellAt(s.id, d))) { next = { d, k, s }; break; }
          }
        }
        t.textContent = "目前休診中";
        if (next) {
          const when = next.k === 0 ? "今天" : next.k === 1 ? "明天" : `週${WD[next.d]}`;
          sub.textContent = `下一診：${when} ${next.s.name} ${next.s.start} 開始・${who(cellAt(next.s.id, next.d))}`;
        }
      }
    }
    return day;
  }

  const today = paint();
  setInterval(paint, 60 * 1000);

  /* mobile day tabs */
  const tabs = $$(".day-tab"), panels = $$(".day-panel");
  const pick = (i) => {
    tabs.forEach((b) => b.setAttribute("aria-selected", String(+b.dataset.tab === i)));
    panels.forEach((p) => (p.hidden = +p.dataset.panel !== i));
  };
  tabs.forEach((b) => b.addEventListener("click", () => pick(+b.dataset.tab)));
  pick(today < 0 ? 0 : today);

  /* hero image settle */
  const art = $(".hero-art");
  if (art) requestAnimationFrame(() => setTimeout(() => art.classList.add("is-in"), 80));
})();
