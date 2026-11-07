/* main.js — navigasi, pemilih kasus. Tidak membuat konten halaman; hanya mengatur tampilan. */
(function () {
  'use strict';
  var KEY = 'nsv-case';

  function fromHash() {
    var m = location.hash.match(/^#kasus-([1-6])$/);
    return m ? parseInt(m[1], 10) : 0;
  }
  function stored() {
    try {
      var s = parseInt(localStorage.getItem(KEY), 10);
      if (s >= 1 && s <= 6) return s;
    } catch (e) { /* abaikan */ }
    return 0;
  }
  function store(n) {
    try { localStorage.setItem(KEY, String(n)); } catch (e) { /* abaikan */ }
  }

  function updateLinks(n) {
    document.querySelectorAll('a[data-keep-case]').forEach(function (a) {
      var base = a.getAttribute('data-base');
      if (!base) {
        base = a.getAttribute('href').split('#')[0];
        a.setAttribute('data-base', base);
      }
      a.setAttribute('href', base + '#kasus-' + n);
    });
  }

  function showCase(n) {
    document.querySelectorAll('.case-panel').forEach(function (p) {
      p.hidden = parseInt(p.getAttribute('data-case'), 10) !== n;
    });
    document.querySelectorAll('[data-case-link]').forEach(function (a) {
      var on = parseInt(a.getAttribute('data-case-link'), 10) === n;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-case-show]').forEach(function (s) {
      s.hidden = parseInt(s.getAttribute('data-case-show'), 10) !== n;
    });
    updateLinks(n);
  }

  var hasPanels = document.querySelector('.case-panel') !== null;
  var current = fromHash() || stored() || 1;
  showCase(current);
  if (hasPanels && !fromHash() && window.history && history.replaceState) {
    history.replaceState(null, '', '#kasus-' + current);
  }
  window.addEventListener('hashchange', function () {
    var n = fromHash();
    if (n) { store(n); showCase(n); }
  });
  if (fromHash()) store(fromHash());

  /* menu mobile */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
})();
