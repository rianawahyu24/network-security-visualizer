/* guide.js — tombol "Panduan" + pop-up panduan penggunaan.
   Dibuat dengan createElement/textContent (tanpa innerHTML). Buka juga lewat tombol/tautan apa pun
   yang diberi atribut data-guide-open (opsional: data-guide-open="network"). */
(function () {
  'use strict';

  var SECTIONS = [
    { id: 'mulai', label: 'Mulai', title: 'Cara memakai media ini', intro: 'Media ini untuk mengamati dan bereksplorasi. Jawabanmu ditulis sendiri di LKPD cetak.', steps: [
      'Buka Dashboard, lalu pilih kasus sesuai tugas kelompokmu (Kasus 1–6).',
      'Baca ringkasan di halaman Kasus. Catat mana fakta, dugaan, dan yang perlu dikonfirmasi.',
      'Jelajahi empat fitur lewat menu atas atau tab fitur: Network Explorer, Threat Explorer, Risk Visualizer, Security Principles.',
      'Pindah kasus kapan saja dengan tombol angka 1–6. Kasus terakhir yang kamu pilih diingat oleh semua halaman.',
      'Ikuti urutan LKPD bagian B sampai F. Catatan “✎ Catat di LKPD…” di tiap halaman menunjukkan bagian yang dimaksud.'
    ], tip: 'Di layar kecil, buka menu navigasi lewat tombol “Menu”. Tekan Esc untuk menutup menu atau panduan ini.' },

    { id: 'network', label: 'Network Explorer', page: 'network-explorer.html', title: 'Network Explorer', intro: 'Mengamati perangkat dan koneksi pada jaringan kasusmu.', steps: [
      'Klik sebuah perangkat atau garis koneksi pada diagram. Informasinya muncul di panel samping (di ponsel, di bawah diagram).',
      'Tombol “Koneksi” dan “Status perangkat” mengganti lapisan informasi yang ditampilkan.',
      '“Tampilkan penanda” menyorot bagian yang perlu diperhatikan. Matikan lagi dengan menekannya sekali lagi.',
      'Tombol + dan − memperbesar atau memperkecil diagram (sampai 2×).',
      'Pada kasus yang punya simulasi hak akses, pilih Tanpa akses, Hanya baca, atau Baca & ubah, lalu lihat hasil aksesnya.'
    ], tip: 'Bisa juga dengan keyboard: Tab ke perangkat atau garis, lalu tekan Enter atau Spasi.' },

    { id: 'threat', label: 'Threat Explorer', page: 'threat-explorer.html', title: 'Threat Explorer', intro: 'Mengenal enam ancaman dan membandingkan kondisi aman dengan kondisi berisiko.', steps: [
      'Filter kategori (Semua, Jaringan nirkabel, Jaringan kabel) mempersempit daftar ancaman.',
      'Pilih satu ancaman untuk membuka detailnya.',
      'Gunakan “Kondisi aman”, “Kondisi berisiko”, atau “Bandingkan” untuk melihat perbedaannya.',
      '“← Daftar ancaman” membawamu kembali ke daftar.'
    ], tip: 'Catat di LKPD bagian C: ancaman yang kamu pertimbangkan, dan mana yang bukti, mana yang baru indikasi.' },

    { id: 'risk', label: 'Risk Visualizer', page: 'risk-visualizer.html', title: 'Risk Visualizer', intro: 'Mengikuti hubungan sebab-akibat dalam empat tahap.', steps: [
      'Klik Tahap 1 sampai 4 berurutan: Masalah / Indikasi → Kemungkinan Ancaman → Risiko → Dampak.',
      'Diagram dan penjelasan berubah di setiap tahap. Label “Kemungkinan, belum terbukti” berarti itu simulasi, bukan kejadian.',
      'Kotak “Kemungkinan yang dapat dipertimbangkan” hanyalah petunjuk, bukan jawaban. Rumuskan sendiri dengan kalimatmu.'
    ], tip: 'Tulis di LKPD bagian D dengan kata “berpotensi”, dan beri label Fakta / Dugaan / Perlu dikonfirmasi.' },

    { id: 'principles', label: 'Security Principles', page: 'security-principles.html', title: 'Security Principles', intro: 'Prinsip CIA dan enam Security Controls.', steps: [
      'Klik Confidentiality, Integrity, atau Availability untuk melihat ilustrasi dan penjelasannya.',
      'Klik salah satu kartu Security Controls (Authentication, Access Control, Strong Password, Physical Security, Encryption, Software Updates).',
      'Bandingkan kondisi sebelum dan sesudah kontrol diterapkan.',
      'Kartu kontrol yang terkait dengan prinsip yang sedang dibuka akan ditandai.'
    ], tip: 'Prinsip CIA dicatat di LKPD bagian E; pilih 1–2 upaya pengamanan untuk bagian F.' },

    { id: 'lkpd', label: 'LKPD', page: 'lkpd.html', title: 'Alur LKPD (24 menit)', intro: 'Setiap bagian LKPD punya fitur dan peran sendiri.', steps: [
      'B. Memahami Kasus (3 menit): halaman Kasus.',
      'C. Investigasi Ancaman (6 menit): Network Explorer dan Threat Explorer.',
      'D. Risiko dan Dampak (5 menit): Risk Visualizer.',
      'E. Prinsip CIA (5 menit): Security Principles dan Network Explorer (tandai diagram di Lampiran).',
      'F. Rekomendasi (5 menit): Security Controls.'
    ], tip: 'Peran kelompok: operator media, analis ancaman dan risiko, analis CIA dan diagram jaringan, pencatat dan komunikator.' }
  ];

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text) n.textContent = text;
    return n;
  }

  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  function sectionFor(key) {
    for (var i = 0; i < SECTIONS.length; i++) {
      if (SECTIONS[i].id === key || SECTIONS[i].page === file && !key) return SECTIONS[i].id;
    }
    return 'mulai';
  }

  var dlg = el('dialog', { 'class': 'guide', 'aria-labelledby': 'guide-title' });
  var head = el('div', { 'class': 'guide-head' });
  head.appendChild(el('h2', { id: 'guide-title' }, 'Panduan Penggunaan'));
  var closeX = el('button', { type: 'button', 'class': 'guide-x', 'aria-label': 'Tutup panduan' }, '✕');
  head.appendChild(closeX);
  var tabs = el('div', { 'class': 'guide-tabs', role: 'tablist', 'aria-label': 'Topik panduan' });
  var body = el('div', { 'class': 'guide-body', tabindex: '0' });
  var foot = el('div', { 'class': 'guide-foot' });
  var done = el('button', { type: 'button', 'class': 'btn btn-primary' }, 'Mengerti');
  foot.appendChild(done);
  dlg.appendChild(head); dlg.appendChild(tabs); dlg.appendChild(body); dlg.appendChild(foot);

  var tabBtns = {};
  function render(id) {
    var s = SECTIONS.filter(function (x) { return x.id === id; })[0] || SECTIONS[0];
    Object.keys(tabBtns).forEach(function (k) {
      var on = k === s.id;
      tabBtns[k].classList.toggle('is-active', on);
      tabBtns[k].setAttribute('aria-selected', on ? 'true' : 'false');
      tabBtns[k].tabIndex = on ? 0 : -1;
    });
    while (body.firstChild) body.removeChild(body.firstChild);
    body.setAttribute('role', 'tabpanel');
    body.appendChild(el('h3', null, s.title));
    body.appendChild(el('p', { 'class': 'mut' }, s.intro));
    var ol = el('ol', { 'class': 'guide-steps' });
    s.steps.forEach(function (t) { ol.appendChild(el('li', null, t)); });
    body.appendChild(ol);
    if (s.tip) body.appendChild(el('p', { 'class': 'lk-note' }, '💡 ' + s.tip));
    body.scrollTop = 0;
  }

  SECTIONS.forEach(function (s) {
    var b = el('button', { type: 'button', role: 'tab', 'aria-selected': 'false' }, s.label);
    b.addEventListener('click', function () { render(s.id); });
    b.addEventListener('keydown', function (e) {
      var i = SECTIONS.indexOf(s), d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var nx = SECTIONS[(i + d + SECTIONS.length) % SECTIONS.length];
      render(nx.id); tabBtns[nx.id].focus();
    });
    tabBtns[s.id] = b;
    tabs.appendChild(b);
  });

  var fab = el('button', { type: 'button', 'class': 'guide-fab', 'aria-haspopup': 'dialog' });
  fab.appendChild(el('span', { 'aria-hidden': 'true' }, '?'));
  fab.appendChild(document.createTextNode(' Panduan'));

  var lastFocus = null;
  function open(key) {
    lastFocus = document.activeElement;
    render(sectionFor(key));
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function close() {
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }

  fab.addEventListener('click', function () { open(); });
  closeX.addEventListener('click', close);
  done.addEventListener('click', close);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); }); /* klik latar */
  dlg.addEventListener('close', function () { if (lastFocus && lastFocus.focus) lastFocus.focus(); });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-guide-open]');
    if (t) { e.preventDefault(); open(t.getAttribute('data-guide-open') || undefined); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '?' && !/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || '')) && !dlg.open) open();
  });

  document.body.appendChild(fab);
  document.body.appendChild(dlg);
})();
