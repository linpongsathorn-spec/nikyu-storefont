/* ==========================================================================
   NIKYU storefront landing — behaviour
   Catalogue rail, category filter, TH/EN language toggle, cart badge.
   Thai copy transcribed verbatim from "NIKYU Landing.dc.html";
   English copy is a secondary layer for the language toggle.
   ========================================================================== */
(function () {
  "use strict";

  var IMG = {
    chuck:   "assets/img/beef-chuck.jpg",
    ribeye:  "assets/img/beef-ribeye.jpg",
    strip:   "assets/img/beef-strip.jpg",
    shabu:   "assets/img/set-shabu.jpg",
    yaki:    "assets/img/set-yakiniku.jpg",
    fig:     "assets/img/sauce-fig.jpg",
    bulgogi: "assets/img/sauce-bulgogi.jpg",
    spicy:   "assets/img/sauce-spicy.jpg",
    gravy:   "assets/img/sauce-gravy.jpg",
    dashi:   "assets/img/soup-dashi.jpg"
  };

  var DATA = [
    {cat:"beef", img:"chuck", fit:"cover", video:true, price:490,
      name:"ชัคโรล", nameEn:"Chuck Roll",
      category:"เนื้อวัว", categoryEn:"Beef",
      cut:"200g · 1 คน", cutEn:"200g · serves 1",
      desc:"นุ่ม ฉ่ำ ไขมันแทรกสวย · เหมาะสำหรับ Steak และ Yakiniku",
      descEn:"Tender, juicy, beautifully marbled · great for steak and yakiniku"},
    {cat:"beef", img:"strip", fit:"cover", video:true, price:620,
      name:"สตริปลอยน์", nameEn:"Striploin",
      category:"เนื้อวัว", categoryEn:"Beef",
      cut:"200g · 1 คน", cutEn:"200g · serves 1",
      desc:"เนื้อแน่น หอมมัน ขอบไขมันหวาน · เหมาะสำหรับ Steak และ Sukiyaki",
      descEn:"Firm and rich with a sweet fat cap · great for steak and sukiyaki"},
    {cat:"beef", img:"ribeye", fit:"cover", video:true, price:690,
      name:"ริบอาย", nameEn:"Ribeye",
      category:"เนื้อวัว", categoryEn:"Beef",
      cut:"200g · 1 คน", cutEn:"200g · serves 1",
      desc:"ลายไขมันละเอียด ละลายในปาก · เหมาะสำหรับ Steak และ Yakiniku",
      descEn:"Fine marbling that melts in the mouth · great for steak and yakiniku"},
    {cat:"shabu", img:"shabu", fit:"cover", price:690,
      name:"ชุดชาบู", nameEn:"Shabu Set",
      category:"ชุดชาบู", categoryEn:"Shabu Set",
      cut:"400g · 1–2 คน", cutEn:"400g · serves 1–2",
      desc:"เนื้อสไลด์บาง น้ำซุปดาชิ และน้ำจิ้ม · เลือกส่วนเนื้อและขนาดชุดได้",
      descEn:"Thinly sliced beef, dashi broth and dipping sauce · choose the cut and set size"},
    {cat:"yakiniku", img:"yaki", fit:"cover", price:790,
      name:"ชุดยากินิกุ", nameEn:"Yakiniku Set",
      category:"ชุดยากินิกุ", categoryEn:"Yakiniku Set",
      cut:"400g · 1–2 คน", cutEn:"400g · serves 1–2",
      desc:"เนื้อสไลด์หนา พร้อมซอสย่างและผัก · เลือกส่วนเนื้อและขนาดชุดได้",
      descEn:"Thick-sliced beef with grilling sauce and vegetables · choose the cut and set size"},
    {cat:"sauce", img:"fig", fit:"contain", price:290,
      name:"ซอสยากินิกุ มะเดื่อฝรั่งฟุกุโอกะ", nameEn:"Fukuoka Fig",
      category:"ซุปและซอส", categoryEn:"Soups & Sauces",
      cut:"200ml", cutEn:"200ml",
      desc:"หวานเค็มกลมกล่อม หอมผลไม้ และอูมามิ · ใช้มะเดื่อ Hakata Toyomitsuhime จากฟุกุโอกะ 100%",
      descEn:"Balanced sweet-savoury with fruity aroma and umami · 100% Hakata Toyomitsuhime figs from Fukuoka"},
    {cat:"sauce", img:"bulgogi", fit:"contain", price:220,
      name:"ซอสบุลโกกิยาน รสเผ็ด", nameEn:"Spicy Bulgogiyan",
      category:"ซุปและซอส", categoryEn:"Soups & Sauces",
      cut:"400g", cutEn:"400g",
      desc:"เผ็ดหอมกระเทียม ซีอิ๊วและมิโซะญี่ปุ่น · ใช้หมักเนื้อสไตล์เกาหลี",
      descEn:"Spicy with garlic, Japanese soy sauce and miso · for marinating beef Korean-style"},
    {cat:"sauce", img:"spicy", fit:"contain", price:180,
      name:"ซอสยากินิกุรสเผ็ด", nameEn:"Spicy Yakiniku",
      category:"ซุปและซอส", categoryEn:"Soups & Sauces",
      cut:"200ml", cutEn:"200ml",
      desc:"เผ็ดกลมกล่อม สูตรดั้งเดิมกว่าครึ่งศตวรรษ · จิ้มหรือคลุกเนื้อย่าง",
      descEn:"Well-rounded heat from a recipe over half a century old · as a dip or tossed through grilled beef"},
    {cat:"sauce", img:"gravy", fit:"contain", price:240,
      name:"ซูเปอร์เกรวี่ซอส", nameEn:"Super Gravy",
      category:"ซุปและซอส", categoryEn:"Soups & Sauces",
      cut:"1.8L · ประมาณ 25 ที่", cutEn:"1.8L · approx. 25 servings",
      desc:"เข้มข้น เผ็ดหอมงา · สำหรับเครื่องในย่างและปาร์ตี้ยากินิกุ",
      descEn:"Rich, spicy and sesame-fragrant · for grilled offal and yakiniku parties"},
    {cat:"soup", img:"dashi", fit:"contain", price:590,
      name:"น้ำซุปดาชิปลาโทบิอุโอะ", nameEn:"Hyoshiro Ago Dashi",
      category:"ซุปและซอส", categoryEn:"Soups & Sauces",
      cut:"8g × 30 ซอง", cutEn:"8g × 30 sachets",
      desc:"หอมกลมกล่อมจากปลาบินและวัตถุดิบญี่ปุ่น 6 ชนิด · ใช้เป็นน้ำซุปชาบูหรือต้มจืด",
      descEn:"Fragrant depth from flying fish and six Japanese ingredients · use as shabu broth or clear soup"}
  ];

  /* English strings for static markup (Thai stays in the DOM as the default) */
  var EN = {
    cart: "Cart",
    shopTitle: "All Products",
    "cat.all": "All",
    "cat.beef": "Beef",
    "cat.shabu": "Shabu Sets",
    "cat.yakiniku": "Yakiniku Sets",
    "cat.saucesoup": "Soups & Sauces",
    railPrev: "Previous",
    railNext: "Next",
    coldTitle: "Frozen at −21°C\nto your door",
    coldSub: "Every cut and meal set is frozen at −21°C, packed in a cooler box with dry ice, and shipped in temperature-controlled vehicles the whole way.",
    tempNote: "A constant temperature from our warehouse to your hands",
    feat1: "Cooler box<br>with dry ice",
    feat2: "Nationwide delivery<br>all 77 provinces",
    step1Title: "Frozen at −21°C",
    step1Body: "Beef is portioned and flash-frozen right after cutting, then vacuum-sealed piece by piece",
    step1Note: "Keeps the meat fresh and its marbling intact",
    step2Title: "Cooler box",
    step2Body: "A foam box with dry ice holds temperature for up to 24 hours",
    step2Note: "0–4°C throughout transit",
    step3Title: "Refrigerated vehicles",
    step3Body: "Delivered by refrigerated van across Bangkok and its metropolitan area",
    step3Note: "Bangkok: 1 day",
    step4Title: "Nationwide shipping",
    step4Body: "Track status and delivery times through our official LINE account",
    step4Note: "Other provinces: 1–3 days",
    lineTitle: "Order and ask questions on LINE",
    lineSub: "Add @nikyu on LINE for new arrivals, special prices, and delivery updates",
    footPromise: "Good beef, easy to choose, delivered cold to your door — for everyone's best meals",
    footLegal: "Connect Asia Interfood Co., Ltd. · EST. 2016",
    navAbout: "About us",
    navContact: "Contact",
    navPrivacy: "Privacy Policy",
    navTerms: "Terms of Service",
    footTop: "Back to top ↑"
  };

  var UI = {
    th: { pricePrefix: "เริ่มต้น", clip: "▶ คลิปเมนู", count: function (n) { return n + " รายการ"; } },
    en: { pricePrefix: "from", clip: "▶ Menu clip", count: function (n) { return n + (n === 1 ? " item" : " items"); } }
  };

  var TONE = { beef:"beef", shabu:"set", yakiniku:"set", sauce:"sauce", soup:"soup" };
  var SCROLL_STEP = 2;
  var LANG_KEY = "nikyu-lang";

  var rail      = document.querySelector("[data-rail]");
  var railCount = document.querySelector("[data-rail-count]");
  var catTabs   = Array.prototype.slice.call(document.querySelectorAll(".cat-tab"));

  var state = { cat: "all", lang: "th" };

  /* Cache the original Thai content so we can switch back to it */
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
    el._th = el.textContent;
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-html]"), function (el) {
    el._thHtml = el.innerHTML;
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (el) {
    el._thAria = el.getAttribute("aria-label");
  });

  function match(p, key) {
    if (key === "all") return true;
    return key.split("+").indexOf(p.cat) !== -1;
  }

  function baht(n) { return "฿" + Number(n).toLocaleString("en-US"); }

  function cardEl(p) {
    var en = state.lang === "en";
    var a = document.createElement("a");
    a.className = "product-card";
    a.href = "#shop";

    var tone = TONE[p.cat] || "beef";
    var primary = en ? p.nameEn : p.name;
    var secondary = en ? p.name : p.nameEn;
    var cat = en ? p.categoryEn : p.category;
    var cut = en ? p.cutEn : p.cut;
    var desc = en ? p.descEn : p.desc;

    a.innerHTML =
      '<span class="product-card__media product-card__media--' + p.fit + '">' +
        '<span class="product-card__media-inner">' +
          '<img src="' + p.img + '" alt="" loading="lazy">' +
        '</span>' +
        (p.video ? '<span class="product-card__clip">' + UI[state.lang].clip + '</span>' : '') +
      '</span>' +
      '<span class="product-card__body">' +
        '<span class="product-card__cat product-card__cat--' + tone + '">' + cat + '</span>' +
        '<span class="product-card__name-row">' +
          '<span class="product-card__name">' + primary + '</span>' +
          (secondary ? '<span class="product-card__name-en">' + secondary + '</span>' : '') +
        '</span>' +
        (cut ? '<span class="product-card__cut">' + cut + '</span>' : '') +
        '<span class="product-card__price">' +
          '<span class="product-card__price-prefix">' + UI[state.lang].pricePrefix + '</span>' +
          '<span class="product-card__price-amount">' + baht(p.price) + '</span>' +
        '</span>' +
        (desc ? '<span class="product-card__desc">' + desc + '</span>' : '') +
      '</span>';

    a.querySelector("img").src = IMG[p.img];
    return a;
  }

  function render() {
    var shown = DATA.filter(function (p) { return match(p, state.cat); });
    rail.innerHTML = "";
    shown.forEach(function (p) {
      var slot = document.createElement("div");
      slot.className = "rail__slot";
      slot.appendChild(cardEl(p));
      rail.appendChild(slot);
    });
    if (railCount) railCount.textContent = UI[state.lang].count(shown.length);
    rail.scrollLeft = 0;
  }

  function applyLang(lang) {
    state.lang = lang === "en" ? "en" : "th";
    var en = state.lang === "en";
    document.documentElement.lang = state.lang;

    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = en && EN[key] != null ? EN[key] : el._th;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-html]"), function (el) {
      var key = el.getAttribute("data-i18n-html");
      el.innerHTML = en && EN[key] != null ? EN[key] : el._thHtml;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (el) {
      var key = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", en && EN[key] != null ? EN[key] : el._thAria);
    });

    Array.prototype.forEach.call(document.querySelectorAll(".lang-toggle__btn"), function (b) {
      var on = b.getAttribute("data-lang") === state.lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try { localStorage.setItem(LANG_KEY, state.lang); } catch (e) {}
    render();
  }

  /* ---- category tabs ---- */
  catTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      state.cat = tab.getAttribute("data-cat");
      catTabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      render();
    });
  });

  /* ---- rail arrows ---- */
  function scrollRail(dir) { rail.scrollLeft += dir * 252 * SCROLL_STEP; }
  var prev = document.querySelector("[data-rail-prev]");
  var next = document.querySelector("[data-rail-next]");
  if (prev) prev.addEventListener("click", function () { scrollRail(-1); });
  if (next) next.addEventListener("click", function () { scrollRail(1); });

  /* ---- language toggle ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".lang-toggle__btn"), function (btn) {
    btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang")); });
  });

  /* ---- cart badge (demo) ---- */
  var cart = 2;
  function paintCart() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-cart-count]"), function (el) {
      el.textContent = cart;
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-cart-open]"), function (btn) {
    btn.addEventListener("click", function () { /* cart drawer not part of this landing page */ });
  });
  paintCart();

  /* ---- init: restore saved language ---- */
  var saved = "th";
  try { saved = localStorage.getItem(LANG_KEY) || "th"; } catch (e) {}
  applyLang(saved);
})();
