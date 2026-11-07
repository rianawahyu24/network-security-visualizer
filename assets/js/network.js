/* network.js — interaksi Network Explorer: pilih perangkat/garis, lapisan info,
   penanda, simulasi hak akses, dan zoom. Informasi sudah tertulis di HTML. */
(function () {
  'use strict';

  document.querySelectorAll('.ne').forEach(function (ne) {
    var infos = ne.querySelectorAll('.info');
    var zoom = 1;

    function showInfo(id) {
      infos.forEach(function (i) { i.hidden = i.id !== id; });
    }

    function select(el) {
      ne.querySelectorAll('.node.is-selected, .link.is-selected').forEach(function (x) {
        x.classList.remove('is-selected');
        x.removeAttribute('aria-pressed');
      });
      el.classList.add('is-selected');
      el.setAttribute('aria-pressed', 'true');
      showInfo(el.getAttribute('data-info'));
      if (window.innerWidth <= 1000) {
        var panel = ne.querySelector('.ne-info');
        if (panel && panel.scrollIntoView) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function setPm(nodeId, v) {
      ne.querySelectorAll('.node[data-id="' + nodeId + '"], .acv[data-for="' + nodeId + '"], .pm-out[data-for="' + nodeId + '"]')
        .forEach(function (x) { x.setAttribute('data-state', String(v)); });
      ne.querySelectorAll('[data-pm-node="' + nodeId + '"]').forEach(function (b) {
        var on = b.getAttribute('data-v') === String(v);
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    ne.addEventListener('click', function (e) {
      var t = e.target.closest('.node, .link');
      if (t && ne.contains(t) && t.closest('svg')) { select(t); return; }

      var b = e.target.closest('button');
      if (!b || !ne.contains(b)) return;

      if (b.hasAttribute('data-layer')) {
        ne.setAttribute('data-layer', b.getAttribute('data-layer'));
        ne.querySelectorAll('button[data-layer]').forEach(function (x) {
          var on = x === b;
          x.classList.toggle('is-active', on);
          x.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
      } else if (b.hasAttribute('data-markers')) {
        var on = ne.getAttribute('data-markers') !== 'on';
        ne.setAttribute('data-markers', on ? 'on' : 'off');
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.classList.toggle('is-active', on);
      } else if (b.hasAttribute('data-pm-node')) {
        setPm(b.getAttribute('data-pm-node'), parseInt(b.getAttribute('data-v'), 10));
      } else if (b.hasAttribute('data-zoom')) {
        zoom = Math.max(1, Math.min(2, zoom + parseInt(b.getAttribute('data-zoom'), 10) * 0.25));
        ne.querySelectorAll('.dg').forEach(function (d) { d.style.setProperty('--z', String(zoom)); });
      }
    });

    ne.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.node, .link')) {
        e.preventDefault();
        select(e.target);
      }
    });
  });
})();
