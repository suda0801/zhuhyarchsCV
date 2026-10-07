const CONTACT = {
  wechat: "shirleygaveup",
  phone: "+86 18998789930",
  email: "zhuhyarchs@gmail.com",
  schoolEmail: "zhuhaoyi2022@email.szu.edu.cn",
};

const CARD_IMAGES = {
  ic2uhi: [{ src: "images/ic2uhi/微信图片_20261007130428_4_2.jpg", alt: "IC2UHI 2026" }],
  green: [
    { src: "images/绿建竞赛/微信图片_20261007131514_13_2.jpg", alt: "Green building competition board 01" },
    { src: "images/绿建竞赛/微信图片_20261007133047_14_2.png", alt: "Green building competition board 02" },
    { src: "images/绿建竞赛/微信图片_20261007133047_15_2.png", alt: "Green building competition board 03" },
  ],
  osaka: [{ src: "images/大阪SDG/微信图片_20261007130435_8_2.jpg", alt: "Osaka University SDGs video contest" }],
  club: [
    { src: "images/学生会/微信图片_20261007130432_6_2.jpg", alt: "Student union activity 01" },
    { src: "images/学生会/微信图片_20261007130434_7_2.jpg", alt: "Student union activity 02" },
  ],
};

const CARD_LINKS = {
  ic2uhi: [{ url: "https://www.ic2uhi2026.com/" }],
  chiba: [{ url: "https://www.udck.jp/reports/tCgvfJ2Y" }],
};

const LANGS = ["zh", "ja", "en"];
const LANG_LEVEL = { zh: ["100%", "100%", "88%", "82%"], ja: ["100%", "100%", "88%", "82%"], en: ["100%", "100%", "88%", "82%"] };

function detectLang() {
  const saved = localStorage.getItem("cv-lang");
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "zh").toLowerCase();
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("en")) return "en";
  return "zh";
}

let currentLang = detectLang();
let filter = "all";

function t() {
  return I18N[currentLang];
}

function el(html) {
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  return wrap.firstElementChild;
}

function render() {
  const d = t();
  document.documentElement.lang = d.meta.htmlLang;
  document.title = d.meta.title;

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === currentLang));
  });

  document.getElementById("lang-label").textContent = d.lang.label;
  document.getElementById("nav-about").textContent = d.nav.about;
  document.getElementById("nav-vision").textContent = d.nav.vision;
  document.getElementById("nav-timeline").textContent = d.nav.timeline;
  document.getElementById("sub-education").textContent = d.timeline.education;
  document.getElementById("sub-work").textContent = d.timeline.work;
  document.getElementById("sub-research").textContent = d.timeline.research;
  document.getElementById("nav-skills").textContent = d.nav.skills;
  document.getElementById("nav-awards").textContent = d.nav.awards;
  document.getElementById("nav-contact").textContent = d.nav.contact;

  document.getElementById("hero-kicker").textContent = d.hero.kicker;
  document.getElementById("hero-name").textContent = d.hero.name;
  document.getElementById("hero-ruby").textContent = d.hero.nameRuby;
  document.getElementById("hero-lead").textContent = d.hero.lead;
  document.getElementById("hero-role").innerHTML = `<strong>${d.hero.role}</strong>`;
  document.getElementById("hero-location").innerHTML = `<strong>${d.hero.location}</strong>`;
  document.getElementById("cta-primary").textContent = d.hero.ctaPrimary;
  document.getElementById("cta-secondary").textContent = d.hero.ctaSecondary;

  document.getElementById("keywords").innerHTML = KEYWORDS.map((k) => `<span class="chip">${k}</span>`).join("");

  document.getElementById("about-index").textContent = d.about.index;
  document.getElementById("about-title").textContent = d.about.title;
  document.getElementById("about-body").textContent = d.about.body;
  document.getElementById("about-facts").innerHTML = d.about.facts
    .map((f) => `<div class="fact"><span>${f.label}</span>${f.value}</div>`)
    .join("");

  document.getElementById("vision-index").textContent = d.vision.index;
  document.getElementById("vision-title").textContent = d.vision.title;
  document.getElementById("vision-caption").textContent = d.vision.caption;
  document.getElementById("vision-copy").innerHTML = `<p>${d.vision.p1}</p><p>${d.vision.p2}</p><p>${d.vision.p3}</p>`;

  document.getElementById("timeline-index").textContent = d.timeline.index;
  document.getElementById("timeline-title").textContent = d.timeline.title;
  document.getElementById("filter-hint").textContent = d.ui.filterHint;
  document.getElementById("f-all").textContent = d.timeline.all;
  document.getElementById("f-education").textContent = d.timeline.education;
  document.getElementById("f-work").textContent = d.timeline.work;
  document.getElementById("f-research").textContent = d.timeline.research;

  renderTimeline();

  document.getElementById("pub-index").textContent = d.publication.index;
  document.getElementById("pub-title").textContent = d.publication.title;
  document.getElementById("pub-venue").textContent = d.publication.venue;
  document.getElementById("pub-paper").textContent = d.publication.paper;
  document.getElementById("pub-meta").textContent = `${d.publication.authors} · ${d.publication.date}`;
  document.getElementById("pub-note").textContent = d.publication.note;

  document.getElementById("skills-index").textContent = d.skills.index;
  document.getElementById("skills-title").textContent = d.skills.title;
  document.getElementById("sk-design").textContent = d.skills.design;
  document.getElementById("sk-sim").textContent = d.skills.sim;
  document.getElementById("sk-comm").textContent = d.skills.comm;
  document.getElementById("sk-design-list").innerHTML = [
    d.skills.items.illustrator,
    d.skills.items.photoshop,
    d.skills.items.indesign,
    d.skills.items.rhino,
    d.skills.items.gh,
  ]
    .map((x) => `<li>${x}</li>`)
    .join("");
  document.getElementById("sk-sim-list").innerHTML = [
    d.skills.items.python,
    d.skills.items.ladybug,
    d.skills.items.energyplus,
    d.skills.items.bipv,
  ]
    .map((x) => `<li>${x}</li>`)
    .join("");
  document.getElementById("sk-comm-list").innerHTML = [d.skills.items.office, d.skills.items.web]
    .map((x) => `<li>${x}</li>`)
    .join("");

  document.getElementById("lang-heading").textContent = d.skills.langs;
  document.getElementById("lang-list").innerHTML = d.skills.languages
    .map(
      (l, i) => `<div class="lang-row"><strong>${l.name}</strong><span class="bar"><i style="width:${LANG_LEVEL[currentLang][i]}"></i></span><span>${l.level}</span></div>`
    )
    .join("");

  document.getElementById("awards-index").textContent = d.awards.index;
  document.getElementById("awards-title").textContent = d.awards.title;
  document.getElementById("award-grid").innerHTML = d.awards.items
    .map(
      (a, i) =>
        `<article class="card-lite" data-award="${i}" tabindex="0" role="button" aria-haspopup="dialog"><span class="period">${a.period}</span><h3>${a.title}</h3><p>${a.detail}</p><span class="card-more">${d.ui.view} →</span></article>`
    )
    .join("");

  document.getElementById("contact-index").textContent = d.contact.index;
  document.getElementById("contact-title").textContent = d.contact.title;
  document.getElementById("contact-text").textContent = d.contact.text;
  document.getElementById("label-wechat").textContent = d.contact.wechat;
  document.getElementById("label-phone").textContent = d.contact.phone;
  document.getElementById("label-email").textContent = d.contact.email;
  document.getElementById("label-email2").textContent = d.contact.email2;
  document.getElementById("copy-wechat").textContent = d.ui.copyWechat;
  document.getElementById("copy-phone").textContent = d.ui.copy;
  document.getElementById("copy-email").textContent = d.ui.copy;
  document.getElementById("copy-email2").textContent = d.ui.copy;
  document.getElementById("contact-loc").textContent = d.contact.location;

  document.getElementById("footer-text").textContent = d.footer;
  document.getElementById("footer-wechat").textContent = `${d.contact.wechat} · ${CONTACT.wechat}`;
  document.getElementById("footer-phone").textContent = CONTACT.phone;
  document.getElementById("footer-email").textContent = CONTACT.email;

  document.getElementById("modal-close").setAttribute("aria-label", d.ui.close);
}

function timelineEntry(item) {
  const d = t();
  if (item.type === "education") {
    const e = d.education[item.id];
    return {
      id: item.id,
      type: item.type,
      kind: d.timeline.education,
      title: e.org,
      org: e.role,
      period: e.period,
      body: e.summary,
      extra: e.duration,
    };
  }
  if (item.type === "work") {
    const w = item.id === "nikken" ? d.work.nikken : d.work.hellotalk;
    return {
      id: item.id,
      type: item.type,
      kind: d.timeline.work,
      title: w.org,
      org: w.role,
      period: w.period,
      body: w.summary,
      extra: w.current,
      tags: w.tags,
    };
  }
  const r = d.research.items[item.researchIndex];
  return {
    id: item.id,
    type: item.type,
    kind: r.kind,
    title: r.title,
    org: "",
    period: r.period,
    body: r.summary,
    images: CARD_IMAGES[item.id] || [],
    links: CARD_LINKS[item.id] || [],
  };
}

function cardShell(e, cls = "") {
  const d = t();
  const thumbs = (e.images || [])
    .slice(0, 3)
    .map((im) => `<img src="${im.src}" alt="${im.alt}" loading="lazy" />`)
    .join("");
  const card = el(`
    <article class="card ${cls}" ${e.type ? `data-type="${e.type}"` : ""} tabindex="0" role="button" aria-haspopup="dialog">
      <div class="card-top">
        <span class="kind">${e.kind}${e.extra ? ` · ${e.extra}` : ""}</span>
        <span class="period">${e.period}</span>
      </div>
      <h3>${e.title}</h3>
      ${e.org ? `<p class="org">${e.org}</p>` : ""}
      ${thumbs ? `<div class="card-thumbs">${thumbs}</div>` : ""}
      <span class="card-more">${d.ui.view} →</span>
    </article>
  `);
  card.addEventListener("click", () => openModal(e));
  card.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      openModal(e);
    }
  });
  return card;
}

function stopCarousel(root) {
  if (root && root._timer) {
    clearInterval(root._timer);
    root._timer = null;
  }
}

function startCarousel(root, interval = 3000) {
  const slides = Array.from(root.querySelectorAll(".slide"));
  if (slides.length < 2) return;
  const dots = Array.from(root.querySelectorAll(".dots button"));
  let i = 0;
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle("active", j === i));
    dots.forEach((d, j) => d.classList.toggle("active", j === i));
  };
  const stop = () => stopCarousel(root);
  const play = () => {
    stop();
    root._timer = setInterval(() => go(i + 1), interval);
  };
  dots.forEach((d, j) => d.addEventListener("click", () => { go(j); play(); }));
  const prev = root.querySelector(".prev");
  const next = root.querySelector(".next");
  if (prev) prev.addEventListener("click", () => { go(i - 1); play(); });
  if (next) next.addEventListener("click", () => { go(i + 1); play(); });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", play);
  go(0);
  play();
}

function renderMedia(media, imgs) {
  stopCarousel(media.querySelector(".carousel"));
  if (!imgs.length) {
    media.style.display = "none";
    media.innerHTML = "";
    return;
  }
  media.style.display = "";
  media.classList.toggle("multi", imgs.length > 1);
  if (imgs.length === 1) {
    media.innerHTML = `<img class="slide active" src="${imgs[0].src}" alt="${imgs[0].alt}" />`;
    return;
  }
  const slidesHtml = imgs
    .map((im, i) => `<img class="slide${i === 0 ? " active" : ""}" src="${im.src}" alt="${im.alt}" />`)
    .join("");
  const dotsHtml = imgs
    .map((_, i) => `<button type="button"${i === 0 ? ' class="active"' : ""} aria-label="Slide ${i + 1}"></button>`)
    .join("");
  media.innerHTML = `<div class="carousel"><div class="slides">${slidesHtml}<button class="car-arrow prev" type="button" aria-label="Previous">‹</button><button class="car-arrow next" type="button" aria-label="Next">›</button></div><div class="dots">${dotsHtml}</div></div>`;
  startCarousel(media.querySelector(".carousel"));
}

function renderTimeline() {
  const root = document.getElementById("timeline-list");
  root.innerHTML = "";
  TIMELINE.forEach((item) => {
    const e = timelineEntry(item);
    e.images = CARD_IMAGES[e.id] || [];
    const hidden = filter !== "all" && filter !== e.type;
    root.appendChild(cardShell(e, hidden ? "hidden" : ""));
  });
}

function openModal(e) {
  const d = t();
  document.getElementById("modal-kind").textContent = e.kind || "";
  document.getElementById("modal-period").textContent = e.period || "";
  document.getElementById("modal-title").textContent = e.title || "";
  const org = document.getElementById("modal-org");
  org.textContent = e.org || "";
  org.style.display = e.org ? "" : "none";
  document.getElementById("modal-text").textContent = e.body || "";
  const links = e.links || [];
  const linksEl = document.getElementById("modal-links");
  linksEl.innerHTML = links
    .map(
      (l) =>
        `<a class="ref-link" href="${l.url}" target="_blank" rel="noopener">${d.ui.reference} <span>↗</span></a>`
    )
    .join("");
  linksEl.style.display = links.length ? "" : "none";
  document.getElementById("modal-tags").innerHTML = (e.tags || [])
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
  const media = document.getElementById("modal-media");
  renderMedia(media, e.images || []);

  const modal = document.getElementById("modal");
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("open"));
  document.body.style.overflow = "hidden";
}

function closeModal() {
  stopCarousel(document.getElementById("modal-media").querySelector(".carousel"));
  const modal = document.getElementById("modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => {
    modal.hidden = true;
  }, 230);
}

async function copyValue(value, btn, defaultText) {
  if (btn.dataset.busy === "1") return;
  const original = defaultText ?? btn.textContent;
  const done = () => {
    btn.dataset.busy = "1";
    btn.classList.add("done");
    btn.textContent = t().ui.copied;
    setTimeout(() => {
      btn.classList.remove("done");
      btn.textContent = original;
      delete btn.dataset.busy;
    }, 2400);
  };
  let copied = false;
  try {
    const writeP = navigator.clipboard.writeText(value).then(
      () => true,
      () => false
    );
    const timeoutP = new Promise((resolve) => setTimeout(() => resolve("timeout"), 900));
    copied = (await Promise.race([writeP, timeoutP])) === true;
  } catch {}

  if (!copied) {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {}
    ta.remove();
  }
  done();
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("cv-lang", lang);
  const main = document.querySelector(".main");
  main.style.opacity = "0.35";
  requestAnimationFrame(() => {
    render();
    requestAnimationFrame(() => {
      main.style.transition = "opacity .25s ease";
      main.style.opacity = "1";
    });
  });
}

function openAward(index) {
  const d = t();
  const item = d.awards.items[index];
  if (!item) return;
  openModal({ kind: d.awards.title, period: item.period, title: item.title, body: item.detail });
}

function applyFilter(mode) {
  filter = mode;
  document.querySelectorAll("[data-filter]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
  });
  document.querySelectorAll("[data-subfilter]").forEach((a) => {
    a.classList.toggle("active", a.dataset.subfilter === filter);
  });
  renderTimeline();
}

function bind() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll("[data-subfilter]").forEach((link) => {
    link.addEventListener("click", () => applyFilter(link.dataset.subfilter));
  });

  document.getElementById("menu-btn").addEventListener("click", () => {
    document.getElementById("site-nav").classList.toggle("open");
  });

  const copyButtons = [
    ["copy-wechat", CONTACT.wechat],
    ["copy-phone", CONTACT.phone],
    ["copy-email", CONTACT.email],
    ["copy-email2", CONTACT.schoolEmail],
  ];
  copyButtons.forEach(([id, value]) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => copyValue(value, btn, btn.textContent));
  });

  const footerButtons = [
    ["footer-wechat", CONTACT.wechat, () => `${t().contact.wechat} · ${CONTACT.wechat}`],
    ["footer-phone", CONTACT.phone, () => CONTACT.phone],
    ["footer-email", CONTACT.email, () => CONTACT.email],
  ];
  footerButtons.forEach(([id, value, restore]) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => copyValue(value, btn, restore()));
  });

  const toTop = document.getElementById("to-top");
  const heroCarousel = document.getElementById("hero-carousel");
  if (heroCarousel) startCarousel(heroCarousel, 3000);
  const toggleTop = () => toTop.classList.toggle("show", window.scrollY > 420);
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !document.getElementById("modal").hidden) closeModal();
  });

  const awardGrid = document.getElementById("award-grid");
  awardGrid.addEventListener("click", (ev) => {
    const a = ev.target.closest("[data-award]");
    if (a) openAward(Number(a.dataset.award));
  });
  awardGrid.addEventListener("keydown", (ev) => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const a = ev.target.closest("[data-award]");
    if (a) {
      ev.preventDefault();
      openAward(Number(a.dataset.award));
    }
  });

  const sections = [...document.querySelectorAll("section[id]")];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav a").forEach((a) => {
          if (a.hasAttribute("data-subfilter")) return;
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s));
}

bind();
render();
document.querySelectorAll("[data-filter]").forEach((b) => {
  b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
});
