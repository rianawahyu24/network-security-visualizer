/* interaction.js — tab, filter, dan panel yang bisa dibuka/tutup.
   Seluruh isi panel sudah ada di HTML; skrip ini hanya menampilkan atau menyembunyikannya. */
(function () {
  'use strict';

  function owner(el) { return el.closest('[data-panels]'); }

  function show(btn) {
    var root = owner(btn);
    if (!root) return;
    var id = btn.getAttribute('data-show');
    var target = null;
    root.querySelectorAll('[data-panel]').forEach(function (p) {
      if (owner(p) !== root) return;
      var on = p.getAttribute('data-panel') === id;
      p.hidden = !on;
      if (on) target = p;
    });
    root.querySelectorAll('[data-tab]').forEach(function (b) {
      if (owner(b) !== root) return;
      var on = b.getAttribute('data-show') === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (target) {
      var related = target.getAttribute('data-related');
      if (related !== null) markRelated(related);
      if (btn.hasAttribute('data-scroll') && target.scrollIntoView) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  function markRelated(list) {
    var ids = list ? list.split(',') : [];
    document.querySelectorAll('[data-ctl-index]').forEach(function (c) {
      c.classList.toggle('is-related', ids.indexOf(c.getAttribute('data-ctl-index')) !== -1);
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-show]');
    if (btn) {
      show(btn);
      if (btn.hasAttribute('data-top')) {
        var root = owner(btn);
        if (root && root.scrollIntoView) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    var f = e.target.closest('[data-filter]');
    if (f) {
      var v = f.getAttribute('data-filter');
      var scope = f.closest('[data-panels]') || document;
      scope.querySelectorAll('[data-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === f ? 'true' : 'false');
        b.classList.toggle('is-active', b === f);
      });
      scope.querySelectorAll('[data-mode]').forEach(function (it) {
        it.hidden = !(v === 'all' || it.getAttribute('data-mode').indexOf(v) !== -1);
      });
    }
  });
})();
