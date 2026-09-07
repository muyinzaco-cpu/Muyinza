(function () {
  // Works on both page types: angle-only pages use .swatch buttons (static),
  // color pages use .angle-thumb buttons (re-rendered whenever a color swatch is picked).
  // Always querying fresh means this stays correct after a color switch.
  function getThumbs() {
    return Array.prototype.slice.call(document.querySelectorAll('.swatch, .angle-thumb'));
  }

  function currentIndex(thumbs) {
    var idx = thumbs.findIndex(function (t) { return t.classList.contains('active'); });
    return idx === -1 ? 0 : idx;
  }

  function showAt(idx) {
    var thumbs = getThumbs();
    if (!thumbs.length) return;
    idx = (idx + thumbs.length) % thumbs.length;
    thumbs.forEach(function (t) { t.classList.remove('active'); });
    thumbs[idx].classList.add('active');
    var mainImg = document.getElementById('main-product-image');
    if (mainImg) mainImg.src = thumbs[idx].dataset.image;
  }

  function next() { var t = getThumbs(); showAt(currentIndex(t) + 1); }
  function prev() { var t = getThumbs(); showAt(currentIndex(t) - 1); }

  document.addEventListener('DOMContentLoaded', function () {
    var mainImageBox = document.querySelector('.main-image');
    if (!mainImageBox) return;

    // Left/right click zones for cycling through the gallery
    var leftZone = document.createElement('div');
    leftZone.className = 'img-nav-zone left';
    leftZone.setAttribute('aria-label', 'Previous image');
    leftZone.innerHTML = '<span class="img-nav-arrow">&#8249;</span>';

    var rightZone = document.createElement('div');
    rightZone.className = 'img-nav-zone right';
    rightZone.setAttribute('aria-label', 'Next image');
    rightZone.innerHTML = '<span class="img-nav-arrow">&#8250;</span>';

    mainImageBox.appendChild(leftZone);
    mainImageBox.appendChild(rightZone);

    leftZone.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    rightZone.addEventListener('click', function (e) { e.stopPropagation(); next(); });

    // Zoom overlay, built once and reused
    var overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.innerHTML = '<button class="zoom-close" aria-label="Close zoom">&times;</button><img id="zoom-image" src="" alt="">';
    document.body.appendChild(overlay);
    var zoomImg = document.getElementById('zoom-image');

    var mainImg = document.getElementById('main-product-image');
    if (mainImg) {
      mainImg.addEventListener('click', function () {
        zoomImg.src = mainImg.src;
        overlay.classList.add('open');
      });
    }

    overlay.addEventListener('click', function () { overlay.classList.remove('open'); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { overlay.classList.remove('open'); return; }
      if (overlay.classList.contains('open')) return; // don't cycle the gallery while zoomed in
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  });
})();
