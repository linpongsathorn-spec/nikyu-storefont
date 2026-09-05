/* ==========================================================================
   NIKYU storefront landing — behaviour
   Catalogue rail, category filter, language toggle, cart badge.
   Product data transcribed verbatim from "NIKYU Landing.dc.html".
   ========================================================================== */
(function () {
  "use strict";

  var IMG = {
    chuck:   "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/beef-chuck.png",
    ribeye:  "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/beef-ribeye.png",
    strip:   "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/beef-strip.png",
    shabu:   "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/set-shabu.png",
    yaki:    "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/set-yakiniku.png",
    fig:     "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/sauce-fig.png",
    bulgogi: "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/sauce-bulgogi.png",
    spicy:   "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/sauce-spicy.png",
    gravy:   "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/sauce-gravy.png",
    dashi:   "https://cdn.jsdelivr.net/gh/linpongsathorn-spec/nikyu-storefont@main/assets/img/soup-dashi.png"
  };

  var DATA = [
    {cat:"beef", img:"chuck", fit:"cover", name:"ชัคโรล", nameEn:"Chuck Roll", category:"เนื้อวัว", cut:"200g · 1 คน", price:490, desc:"นุ่ม ฉ่ำ ไขมันแทรกสวย · เหมาะสำหรับ Steak และ Yakiniku", video:true},
    {cat:"beef", img:"strip", fit:"cover", name:"สตริปลอยน์", nameEn:"Striploin", category:"เนื้อวัว", cut:"200g · 1 คน", price:620, desc:"เนื้อแน่น หอมมัน ขอบไขมันหวาน · เหมาะสำหรับ Steak และ Sukiyaki", video:true},
    {cat:"beef", img:"ribeye", fit:"cover", name:"ริบอาย", nameEn:"Ribeye", category:"เนื้อวัว", cut:"200g · 1 คน", price:690, desc:"ลายไขมันละเอียด ละลายในปาก · เหมาะสำหรับ Steak และ Yakiniku", video:true},
    {cat:"shabu", img:"shabu", fit:"cover", name:"ชุดชาบู", nameEn:"Shabu Set", category:"ชุดชาบู", cut:"400g · 1–2 คน", price:690, desc:"เนื้อสไลด์บาง น้ำซุปดาชิ และน้ำจิ้ม · เลือกส่วนเนื้อและขนาดชุดได้"},
    {cat:"yakiniku", img:"yaki", fit:"cover", name:"ชุดยากินิกุ", nameEn:"Yakiniku Set", category:"ชุดยากินิกุ", cut:"400g · 1–2 คน", price:790, desc:"เนื้อสไลด์หนา พร้อมซอสย่างและผัก · เลือกส่วนเนื้อและขนาดชุดได้"},
    {cat:"sauce", img:"fig", fit:"contain", name:"ซอสยากินิกุ มะเดื่อฝรั่งฟุกุโอกะ", nameEn:"Fukuoka Fig", category:"ซุปและซอส", cut:"200ml", price:290, desc:"หวานเค็มกลมกล่อม หอมผลไม้ และอูมามิ · ใช้มะเดื่อ Hakata Toyomitsuhime จากฟุกุโอกะ 100%"},
    {cat:"sauce", img:"bulgogi", fit:"contain", name:"ซอสบุลโกกิยาน รสเผ็ด", nameEn:"Spicy Bulgogiyan", category:"ซุปและซอส", cut:"400g", price:220, desc:"เผ็ดหอมกระเทียม ซีอิ๊วและมิโซะญี่ปุ่น · ใช้หมักเนื้อสไตล์เกาหลี"},
    {cat:"sauce", img:"spicy", fit:"contain", name:"ซอสยากินิกุรสเผ็ด", nameEn:"Spicy Yakiniku", category:"ซุปและซอส", cut:"200ml", price:180, desc:"เผ็ดกลมกล่อม สูตรดั้งเดิมกว่าครึ่งศตวรรษ · จิ้มหรือคลุกเนื้อย่าง"},
    {cat:"sauce", img:"gravy", fit:"contain", name:"ซูเปอร์เกรวี่ซอส", nameEn:"Super Gravy", category:"ซุปและซอส", cut:"1.8L · ประมาณ 25 ที่", price:240, desc:"เข้มข้น เผ็ดหอมงา · สำหรับเครื่องในย่างและปาร์ตี้ยากินิกุ"},
    {cat:"soup", img:"dashi", fit:"contain", name:"น้ำซุปดาชิปลาโทบิอุโอะ", nameEn:"Hyoshiro Ago Dashi", category:"ซุปและซอส", cut:"8g × 30 ซอง", price:590, desc:"หอมกลมกล่อมจากปลาบินและวัตถุดิบญี่ปุ่น 6 ชนิด · ใช้เป็นน้ำซุปชาบูหรือต้มจืด"}
  ];

  var TONE = { beef:"beef", shabu:"set", yakiniku:"set", sauce:"sauce", soup:"soup" };
  var SCROLL_STEP = 2;

  var rail       = document.querySelector("[data-rail]");
  var railCount  = document.querySelector("[data-rail-count]");
  var catTabs    = Array.prototype.slice.call(document.querySelectorAll(".cat-tab"));
  var state      = { cat: "all" };

  function match(p, key) {
    if (key === "all") return true;
    return key.split("+").indexOf(p.cat) !== -1;
  }

  function baht(n) { return "฿" + Number(n).toLocaleString("en-US"); }

  function cardEl(p) {
    var a = document.createElement("a");
    a.className = "product-card";
    a.href = "#shop";

    var tone = TONE[p.cat] || "beef";
    a.innerHTML =
      '<span class="product-card__media product-card__media--' + p.fit + '">' +
        '<span class="product-card__media-inner">' +
          '<img src="' + p.img + '" alt="" loading="lazy">' +
        '</span>' +
        (p.video ? '<span class="product-card__clip">▶ คลิปเมนู</span>' : '') +
      '</span>' +
      '<span class="product-card__body">' +
        '<span class="product-card__cat product-card__cat--' + tone + '">' + p.category + '</span>' +
        '<span class="product-card__name-row">' +
          '<span class="product-card__name">' + p.name + '</span>' +
          (p.nameEn ? '<span class="product-card__name-en">' + p.nameEn + '</span>' : '') +
        '</span>' +
        (p.cut ? '<span class="product-card__cut">' + p.cut + '</span>' : '') +
        '<span class="product-card__price">' +
          '<span class="product-card__price-prefix">เริ่มต้น</span>' +
          '<span class="product-card__price-amount">' + baht(p.price) + '</span>' +
        '</span>' +
        (p.desc ? '<span class="product-card__desc">' + p.desc + '</span>' : '') +
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
    if (railCount) railCount.textContent = shown.length + " รายการ";
    rail.scrollLeft = 0;
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
    btn.addEventListener("click", function () {
      Array.prototype.forEach.call(document.querySelectorAll(".lang-toggle__btn"), function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
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

  render();
})();
