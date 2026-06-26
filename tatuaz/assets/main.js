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

/* === rodzina: studio === */
/* === rodzina STUDIO: lightbox portfolio === */
/* Zbiera kafle w kolejnosci DOM (krytyk: column-count uklada kolumnami, lightbox MUSI isc po DOM). */
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.studio-gallery .tile img'));
  if (!imgs.length) return;

  var ov = document.createElement('div');
  ov.className = 'sl-overlay';
  ov.innerHTML =
    '<span class="sl-count"></span>' +
    '<button class="sl-btn sl-close" aria-label="Zamknij">&times;</button>' +
    '<button class="sl-btn sl-prev" aria-label="Poprzednie">&#8249;</button>' +
    '<img alt="">' +
    '<button class="sl-btn sl-next" aria-label="Nastepne">&#8250;</button>';
  document.body.appendChild(ov);

  var big = ov.querySelector('img');
  var count = ov.querySelector('.sl-count');
  var cur = 0;

  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    big.src = imgs[cur].src;
    big.alt = imgs[cur].alt || '';
    count.textContent = (cur + 1) + ' / ' + imgs.length;
  }
  function open(i) { show(i); ov.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { ov.classList.remove('open'); document.body.style.overflow = ''; }

  imgs.forEach(function (im, i) {
    im.addEventListener('click', function () { open(i); });
  });
  ov.querySelector('.sl-close').addEventListener('click', close);
  ov.querySelector('.sl-prev').addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
  ov.querySelector('.sl-next').addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
  ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  document.addEventListener('keydown', function (e) {
    if (!ov.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(cur - 1);
    else if (e.key === 'ArrowRight') show(cur + 1);
  });
})();

/* === rodzina STUDIO: nav chowa się przy scrollu w DÓŁ, wjeżdża w GÓRĘ (jak gastro) === */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var last = window.scrollY || 0;
  var TH = 8, SHOW_NEAR = 120, ticking = false;
  function upd() {
    var y = window.scrollY || 0;
    if (y < SHOW_NEAR) nav.classList.remove('nav-hidden');
    else if (y > last + TH) nav.classList.add('nav-hidden');
    else if (y < last - TH) nav.classList.remove('nav-hidden');
    last = y; ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(upd); ticking = true; }
  }, { passive: true });
})();

/* === NAV NOBU kontroler (silnik) === */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var last = window.scrollY || 0, TOP = 8, TH = 6, ticking = false;
  function upd() {
    var y = window.scrollY || 0;
    if (y <= TOP) { nav.classList.remove('nav-hidden', 'nav-solid'); last = y; ticking = false; return; }
    var d = y - last;
    if (Math.abs(d) <= TH) { ticking = false; return; }
    if (d > 0) nav.classList.add('nav-hidden');
    else { nav.classList.remove('nav-hidden'); nav.classList.add('nav-solid'); }
    last = y; ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; window.requestAnimationFrame(upd); } }, { passive: true });
  upd();
})();
