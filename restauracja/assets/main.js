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

/* === rodzina: gastro === */
/* === rodzina GASTRO: nav jak Nobu — po pierwszym scrollu w DÓŁ chowa się OD RAZU,
   przy scrollu w GÓRĘ wraca. BRAK strefy "blisko góry zawsze widoczny".
   Współgra z base.js (is-stuck = przezroczysty -> lity po scrollY>24). === */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var last = window.scrollY || 0;
  var H = 10;     // tuż pod górą chowamy OD RAZU przy scrollu w dół (nim base.js zdąży pokazać krem przy 24px - to był ten "zmienia kolor potem chowa")
  var TOP = 4;    // "sama góra" -> przezroczysty overlay nad hero, zawsze widoczny
  var TH = 6;     // martwa strefa na mikro-ruch, żeby nie migało
  var ticking = false;
  function upd() {
    var y = window.scrollY || 0;
    if (y <= TOP) {
      nav.classList.remove('nav-hidden');          // sama góra: overlay widoczny
    } else if (y > last + TH && y > H) {
      nav.classList.add('nav-hidden');             // scroll w DÓŁ pod paskiem -> chowaj od razu
    } else if (y < last - TH) {
      nav.classList.remove('nav-hidden');          // scroll w GÓRĘ -> pokaż (lity, bo is-stuck)
    }
    last = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(upd); }
  }, { passive: true });
  upd();
})();
