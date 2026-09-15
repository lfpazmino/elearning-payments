/* Payments Academy — application shell, routing and progress */
(function () {
  "use strict";

  var C = window.COURSE;
  var STORE_PROGRESS = "payments-academy.progress.v1";
  var STORE_THEME = "payments-academy.theme.v1";

  /* ---------- flat unit index ---------- */
  var FLAT = [];
  C.modules.forEach(function (m, mi) {
    m.units.forEach(function (u, ui) {
      FLAT.push({ key: m.id + "/" + u.id, mod: m, unit: u, mi: mi, ui: ui });
    });
  });
  function indexOfKey(key) {
    for (var i = 0; i < FLAT.length; i++) if (FLAT[i].key === key) return i;
    return -1;
  }

  /* ---------- storage (defensive: private mode can throw) ---------- */
  function loadDone() {
    try {
      var raw = localStorage.getItem(STORE_PROGRESS);
      if (!raw) return {};
      var arr = JSON.parse(raw);
      var o = {};
      if (Array.isArray(arr)) arr.forEach(function (k) { o[k] = true; });
      return o;
    } catch (e) { return {}; }
  }
  function saveDone() {
    try { localStorage.setItem(STORE_PROGRESS, JSON.stringify(Object.keys(done))); } catch (e) {}
  }
  var done = loadDone();

  function isDone(key) { return !!done[key]; }
  function setDone(key, val) {
    if (val) done[key] = true; else delete done[key];
    saveDone();
    renderRail();
    renderGauge();
  }

  function moduleStats(m) {
    var total = m.units.length, n = 0;
    m.units.forEach(function (u) { if (isDone(m.id + "/" + u.id)) n++; });
    return { done: n, total: total, pct: total ? Math.round((n / total) * 100) : 0 };
  }
  function overall() {
    var n = 0;
    FLAT.forEach(function (f) { if (isDone(f.key)) n++; });
    return { done: n, total: FLAT.length, pct: FLAT.length ? Math.round((n / FLAT.length) * 100) : 0 };
  }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
    var b = document.getElementById("themeBtn");
    if (b) b.textContent = t === "light" ? "LIGHT" : t === "dark" ? "DARK" : "AUTO";
  }
  var theme = "system";
  try { theme = localStorage.getItem(STORE_THEME) || "system"; } catch (e) {}

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

  /* ---------- block rendering ---------- */
  function renderBlocks(blocks) {
    var frag = document.createDocumentFragment();
    (blocks || []).forEach(function (b) {
      var n;
      switch (b.t) {
        case "h": n = el("h3", null, b.v); break;
        case "p": n = el("p", null, b.v); break;
        case "note": n = el("p", "note", b.v); break;
        case "ul":
          n = el("ul");
          b.v.forEach(function (i) { n.appendChild(el("li", null, i)); });
          break;
        case "ol":
          n = el("ol");
          b.v.forEach(function (i) { n.appendChild(el("li", null, i)); });
          break;
        case "callout":
          n = el("div", "callout");
          n.appendChild(el("span", "ct", b.title));
          n.appendChild(el("p", null, b.v));
          break;
        case "table":
          n = el("div", "tscroll");
          var t = el("table");
          var thead = el("thead"), tr = el("tr");
          b.head.forEach(function (h) { tr.appendChild(el("th", null, h)); });
          thead.appendChild(tr); t.appendChild(thead);
          var tb = el("tbody");
          b.rows.forEach(function (r) {
            var row = el("tr");
            r.forEach(function (c) { row.appendChild(el("td", null, c)); });
            tb.appendChild(row);
          });
          t.appendChild(tb); n.appendChild(t);
          break;
        case "stats":
          n = el("div", "stats");
          b.v.forEach(function (s) {
            var d = el("div", "stat" + (s.hi ? " hi" : ""));
            d.appendChild(el("b", null, s.n));
            d.appendChild(el("span", "c", s.c));
            d.appendChild(el("span", "s", s.s));
            n.appendChild(d);
          });
          break;
        case "qa":
          n = el("div", "qa");
          b.v.forEach(function (x) {
            var d = el("details");
            d.appendChild(el("summary", null, x.q));
            d.appendChild(el("div", "a", x.a));
            n.appendChild(d);
          });
          break;
        case "beats":
          n = el("div", "beats");
          b.v.forEach(function (x) {
            var d = el("div", "beat");
            d.appendChild(el("span", "t", x.t));
            d.appendChild(el("p", null, x.v));
            n.appendChild(d);
          });
          break;
        case "gloss":
          n = el("dl", "gloss");
          b.v.forEach(function (g) {
            var d = el("div");
            d.appendChild(el("dt", null, g.term));
            d.appendChild(el("dd", null, g.def));
            n.appendChild(d);
          });
          break;
        default:
          n = el("p", null, b.v || "");
      }
      frag.appendChild(n);
    });
    return frag;
  }

  function renderResources(list) {
    var ul = el("ul", "res");
    list.forEach(function (r) {
      var li = el("li");
      var a = el("a", "r");
      a.href = r.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.appendChild(el("span", "tag t-" + slug(r.tag), r.tag));
      var mid = el("span");
      mid.appendChild(el("span", "r-t", r.title));
      if (r.note) mid.appendChild(el("span", "r-n", r.note));
      a.appendChild(mid);
      a.appendChild(el("span", "r-x", "↗"));
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  /* ---------- sidebar ---------- */
  var railEl;
  function renderRail() {
    if (!railEl) return;
    var cur = currentRoute();
    railEl.innerHTML = "";

    // On first paint with nothing open, expand the module you would resume into
    // so the units are visible rather than hidden behind a click.
    if (!railEl._seeded) {
      railEl._seeded = true;
      var seed = firstIncomplete() || FLAT[0];
      if (cur.type !== "unit" && seed) seed.mod._open = true;
    }

    C.modules.forEach(function (m) {
      var st = moduleStats(m);
      var isCur = cur.type === "unit" && cur.mod === m.id;
      var wrap = el("div", "mod" + (st.done === st.total ? " complete" : "") + (isCur || m._open ? " open" : ""));

      var head = el("button", "mod-head");
      head.type = "button";
      head.setAttribute("aria-expanded", wrap.classList.contains("open") ? "true" : "false");
      head.appendChild(el("span", "n", m.n));
      head.appendChild(el("span", null, m.title));
      head.appendChild(el("span", "cnt", st.done + "/" + st.total));
      head.addEventListener("click", function () {
        m._open = !wrap.classList.contains("open");
        renderRail();
      });
      wrap.appendChild(head);

      var ul = el("ul", "mod-units");
      m.units.forEach(function (u) {
        var key = m.id + "/" + u.id;
        var li = el("li");
        var b = el("button", "unit-link" + (isDone(key) ? " done" : ""));
        b.type = "button";
        if (cur.type === "unit" && cur.mod === m.id && cur.unit === u.id) b.setAttribute("aria-current", "true");
        var tick = el("span", "tick", "✓");
        b.appendChild(el("span", "label", u.title));
        b.appendChild(tick);
        // put tick first visually via grid order
        b.insertBefore(tick, b.firstChild);
        b.addEventListener("click", function () {
          location.hash = "#/u/" + m.id + "/" + u.id;
          closeRail();
        });
        li.appendChild(b);
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
      railEl.appendChild(wrap);
    });

    var foot = el("div", "rail-foot");
    var lib = el("button", "iconbtn");
    lib.type = "button"; lib.textContent = "RESOURCE LIBRARY";
    lib.style.width = "100%";
    lib.addEventListener("click", function () { location.hash = "#/library"; closeRail(); });
    foot.appendChild(lib);

    var reset = el("button", "iconbtn");
    reset.type = "button"; reset.textContent = "RESET PROGRESS";
    reset.style.width = "100%";
    reset.addEventListener("click", function () {
      if (!Object.keys(done).length) return;
      done = {}; saveDone(); renderRail(); renderGauge(); route();
    });
    foot.appendChild(reset);
    railEl.appendChild(foot);
  }

  function renderGauge() {
    var o = overall();
    var fill = document.getElementById("gaugeFill");
    var pct = document.getElementById("gaugePct");
    if (fill) fill.style.width = o.pct + "%";
    if (pct) pct.textContent = o.pct + "%";
    var lbl = document.getElementById("gaugeLbl");
    if (lbl) lbl.textContent = o.done + " of " + o.total + " units complete";
  }

  function closeRail() {
    document.getElementById("rail").classList.remove("open");
    document.getElementById("scrim").classList.remove("on");
  }

  /* ---------- routing ---------- */
  function currentRoute() {
    var h = location.hash.replace(/^#/, "");
    var parts = h.split("/").filter(Boolean);
    if (parts[0] === "u" && parts[1] && parts[2]) return { type: "unit", mod: parts[1], unit: parts[2] };
    if (parts[0] === "library") return { type: "library" };
    return { type: "home" };
  }

  var mainEl;

  function route() {
    var r = currentRoute();
    if (r.type === "unit") {
      var i = indexOfKey(r.mod + "/" + r.unit);
      if (i < 0) { location.hash = "#/"; return; }
      renderUnit(i);
    } else if (r.type === "library") {
      renderLibrary();
    } else {
      renderHome();
    }
    renderRail();
    window.scrollTo(0, 0);
  }

  /* ---------- home ---------- */
  function renderHome() {
    mainEl.innerHTML = "";
    var pane = el("div", "pane");

    var hero = el("div", "hero");
    hero.appendChild(el("span", "eyebrow", "Fast-enablement programme"));
    hero.appendChild(el("h1", null, C.meta.title));
    hero.appendChild(el("p", "lede", C.meta.tagline + ". Nine modules, " + FLAT.length + " units, every linked resource free."));
    hero.appendChild(el("p", "meta", C.meta.event + " · Figures verified " + C.meta.verified));
    pane.appendChild(hero);

    var o = overall();
    var status = el("p", "note");
    status.id = "homeStatus";
    status.textContent = o.done === 0
      ? "No units completed yet. Start with Orientation — it frames everything that follows."
      : o.done === o.total
        ? "All " + o.total + " units complete. Go back to module 08 and rehearse out loud."
        : o.done + " of " + o.total + " units complete (" + o.pct + "%). Pick up where you left off below.";
    status.style.marginTop = "26px";
    pane.appendChild(status);

    var resume = firstIncomplete();
    if (resume) {
      var rbtn = el("button", "btn");
      rbtn.type = "button";
      rbtn.textContent = (o.done ? "Resume: " : "Start: ") + resume.unit.title;
      rbtn.style.marginTop = "18px";
      rbtn.addEventListener("click", function () { location.hash = "#/u/" + resume.key; });
      pane.appendChild(rbtn);
    }

    var grid = el("div", "modgrid");
    C.modules.forEach(function (m) {
      var st = moduleStats(m);
      var card = el("button", "modcard");
      card.type = "button";
      card.appendChild(el("span", "n", "MODULE " + m.n));
      card.appendChild(el("h3", null, m.title));
      card.appendChild(el("p", null, m.subtitle));
      var bar = el("div", "bar");
      var i = el("i"); i.style.width = st.pct + "%"; bar.appendChild(i);
      card.appendChild(bar);
      card.appendChild(el("span", "st", st.done + " / " + st.total + " units"));
      card.addEventListener("click", function () {
        location.hash = "#/u/" + m.id + "/" + m.units[0].id;
      });
      grid.appendChild(card);
    });
    pane.appendChild(grid);

    mainEl.appendChild(pane);
  }

  function firstIncomplete() {
    for (var i = 0; i < FLAT.length; i++) if (!isDone(FLAT[i].key)) return FLAT[i];
    return null;
  }

  /* ---------- unit ---------- */
  function renderUnit(i) {
    var f = FLAT[i];
    var m = f.mod, u = f.unit, key = f.key;
    mainEl.innerHTML = "";
    var pane = el("div", "pane");

    var crumb = el("div", "crumb");
    crumb.appendChild(el("span", "m", "Module " + m.n + " · " + m.title));
    crumb.appendChild(el("span", "sep", "—"));
    crumb.appendChild(el("span", "t", "Unit " + (f.ui + 1) + " of " + m.units.length + " · " + u.mins + " min"));
    pane.appendChild(crumb);

    pane.appendChild(el("h1", "unit-title", u.title));
    pane.appendChild(el("p", "objective", "<strong>Objective.</strong> " + u.objective));

    var body = el("div", "body");
    body.appendChild(renderBlocks(u.blocks));
    pane.appendChild(body);

    if (u.resources && u.resources.length) {
      pane.appendChild(el("span", "sect-label", "Free resources"));
      pane.appendChild(renderResources(u.resources));
    }

    if (u.check && u.check.length) {
      pane.appendChild(el("span", "sect-label", "Prove it"));
      var pv = el("div", "prove");
      pv.appendChild(el("span", "pt", "Self-check before moving on"));
      var ol = el("ol");
      u.check.forEach(function (c) { ol.appendChild(el("li", null, c)); });
      pv.appendChild(ol);
      pane.appendChild(pv);
    }

    /* footer */
    var foot = el("div", "unitfoot");

    var complete = isDone(key);
    var main = el("button", "btn" + (complete ? " done-state" : ""));
    main.type = "button";
    main.textContent = complete
      ? "✓ Completed — mark as not done"
      : (i < FLAT.length - 1 ? "Mark complete and continue" : "Mark complete — finish course");
    main.addEventListener("click", function () {
      if (isDone(key)) {
        setDone(key, false);
        renderUnit(i);
      } else {
        setDone(key, true);
        if (i < FLAT.length - 1) location.hash = "#/u/" + FLAT[i + 1].key;
        else renderUnit(i);
      }
    });
    foot.appendChild(main);

    var pair = el("div", "navpair");
    if (i > 0) {
      var prev = el("button", "btn ghost");
      prev.type = "button"; prev.textContent = "← Previous";
      prev.addEventListener("click", function () { location.hash = "#/u/" + FLAT[i - 1].key; });
      pair.appendChild(prev);
    }
    if (i < FLAT.length - 1) {
      var next = el("button", "btn ghost");
      next.type = "button"; next.textContent = "Next →";
      next.addEventListener("click", function () { location.hash = "#/u/" + FLAT[i + 1].key; });
      pair.appendChild(next);
    }
    foot.appendChild(pair);
    pane.appendChild(foot);

    mainEl.appendChild(pane);
  }

  /* ---------- library ---------- */
  var libFilter = "All";

  /* Each resource keeps its own precise tag; the library filters by family so the
     chip row stays readable instead of listing twenty near-synonyms. */
  var FAMILIES = [
    { name: "Standards & rulebooks", tags: ["Standard", "Rulebook", "Spec", "Docs"] },
    { name: "Regulators & operators", tags: ["Regulator", "Operator", "Timeline"] },
    { name: "Vendor & reference", tags: ["Vendor", "Reference", "Core", "Course", "Pattern"] },
    { name: "Primers & analysis", tags: ["Primer", "Analysis", "Report", "Trade", "News", "Agenda", "Event", "Webinar"] }
  ];
  function familyOf(tag) {
    for (var i = 0; i < FAMILIES.length; i++) {
      if (FAMILIES[i].tags.indexOf(tag) > -1) return FAMILIES[i].name;
    }
    return "Primers & analysis";
  }

  function allResources() {
    var out = [];
    C.modules.forEach(function (m) {
      m.units.forEach(function (u) {
        (u.resources || []).forEach(function (r) {
          out.push({ r: r, m: m, u: u });
        });
      });
    });
    return out;
  }

  function renderLibrary() {
    mainEl.innerHTML = "";
    var pane = el("div", "pane");

    var hero = el("div", "hero");
    hero.appendChild(el("span", "eyebrow", "Every source in one place"));
    hero.appendChild(el("h1", null, "Resource library"));
    var all = allResources();
    hero.appendChild(el("p", "lede", all.length + " resources across " + C.modules.length + " modules. All free to access; a few vendor documents ask for an email address."));
    pane.appendChild(hero);

    var counts = {};
    all.forEach(function (x) {
      var f = familyOf(x.r.tag);
      counts[f] = (counts[f] || 0) + 1;
    });
    var groups = ["All"];
    FAMILIES.forEach(function (f) { if (counts[f.name]) groups.push(f.name); });

    var filters = el("div", "filters");
    groups.forEach(function (t) {
      var c = el("button", "chip");
      c.type = "button";
      c.textContent = t === "All" ? "All " + all.length : t + " " + counts[t];
      c.setAttribute("aria-pressed", libFilter === t ? "true" : "false");
      c.addEventListener("click", function () { libFilter = t; renderLibrary(); });
      filters.appendChild(c);
    });
    pane.appendChild(filters);

    var any = false;
    C.modules.forEach(function (m) {
      var items = [];
      m.units.forEach(function (u) {
        (u.resources || []).forEach(function (r) {
          if (libFilter === "All" || familyOf(r.tag) === libFilter) items.push(r);
        });
      });
      if (!items.length) return;
      any = true;
      var g = el("div", "libgroup");
      g.appendChild(el("span", "eyebrow", "Module " + m.n));
      g.appendChild(el("h3", null, m.title));
      g.appendChild(renderResources(items));
      pane.appendChild(g);
    });
    if (!any) pane.appendChild(el("p", "empty", "No resources in that group."));

    mainEl.appendChild(pane);
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    railEl = document.getElementById("railInner");
    mainEl = document.getElementById("main");

    applyTheme(theme);
    document.getElementById("themeBtn").addEventListener("click", function () {
      theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
      try { localStorage.setItem(STORE_THEME, theme); } catch (e) {}
      applyTheme(theme);
    });

    document.getElementById("menuBtn").addEventListener("click", function () {
      var r = document.getElementById("rail");
      var s = document.getElementById("scrim");
      r.classList.toggle("open");
      s.classList.toggle("on", r.classList.contains("open"));
    });
    document.getElementById("scrim").addEventListener("click", closeRail);
    document.getElementById("homeLink").addEventListener("click", function (e) {
      e.preventDefault(); location.hash = "#/";
    });

    document.addEventListener("keydown", function (e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var r = currentRoute();
      if (r.type !== "unit") return;
      var i = indexOfKey(r.mod + "/" + r.unit);
      if (e.key === "ArrowRight" && i < FLAT.length - 1) location.hash = "#/u/" + FLAT[i + 1].key;
      if (e.key === "ArrowLeft" && i > 0) location.hash = "#/u/" + FLAT[i - 1].key;
    });

    window.addEventListener("hashchange", route);
    renderGauge();
    route();
  });
})();
