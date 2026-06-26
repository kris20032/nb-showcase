// STOLBASZ — drobna interaktywność (nav mobile + reveal)
(function () {
  // mobilne menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // reveal przy scrollu
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// nav kondensuje się po przewinięciu (cienka linia + niższy pasek) — addytywne, lekkie
(function () {
  var nav = document.querySelector('.nav') || document.querySelector('header');
  if (!nav) return;
  var ticking = false;
  function upd() { nav.classList.toggle('is-stuck', window.scrollY > 24); ticking = false; }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(upd); }
  }, { passive: true });
  upd();
})();

/* === rodzina: auto === */
/* === rodzina AUTO (detailing/powłoki) ===
   (1) nav chowa się przy scrollu w DÓŁ, wjeżdża przy scrollu w GÓRĘ (współgra z is-stuck z base.js);
   (2) suwak PRZED/PO (before/after) - przeciąganie wskaźnikiem/dotykiem. */

/* --- (1) auto-hide nav --- */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var last = window.scrollY || 0;
  var TH = 8;            // próg, żeby nie migało przy mikro-ruchu
  var SHOW_NEAR = 120;   // blisko góry zawsze widoczny
  var ticking = false;
  function upd() {
    var y = window.scrollY || 0;
    if (y < SHOW_NEAR) {
      nav.classList.remove('nav-hidden');
    } else if (y > last + TH) {
      nav.classList.add('nav-hidden');
    } else if (y < last - TH) {
      nav.classList.remove('nav-hidden');
    }
    last = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(upd); ticking = true; }
  }, { passive: true });
})();

/* --- (2) suwak before/after --- */
(function () {
  var sliders = document.querySelectorAll('[data-ba]');
  if (!sliders.length) return;
  sliders.forEach(function (s) {
    var dragging = false;
    function setPos(clientX) {
      var r = s.getBoundingClientRect();
      var p = ((clientX - r.left) / r.width) * 100;
      p = Math.max(3, Math.min(97, p));
      s.style.setProperty('--ba-pos', p + '%');
    }
    function down(e) {
      dragging = true;
      setPos(e.touches ? e.touches[0].clientX : e.clientX);
    }
    function move(e) {
      if (!dragging) return;
      setPos(e.touches ? e.touches[0].clientX : e.clientX);
    }
    function up() { dragging = false; }
    s.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    // fallback dotykowy (starsze przeglądarki bez Pointer Events)
    s.addEventListener('touchstart', down, { passive: true });
    s.addEventListener('touchmove', move, { passive: true });
    s.addEventListener('touchend', up);
  });
})();
