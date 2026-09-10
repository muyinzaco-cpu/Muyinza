(function () {
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof window.inventoryData === 'undefined') return;
    const inv = window.inventoryData;
    const isColorPage = document.querySelector('.color-swatch') !== null;

    function sizeMapFor(color) {
      if (isColorPage) return inv[color] || {};
      return inv['__single__'] || {};
    }

    function totalFor(sizeMap) {
      return Object.values(sizeMap).reduce(function (sum, q) { return sum + q; }, 0);
    }

    function applySizeAvailability(color) {
      const sizeMap = sizeMapFor(color);
      document.querySelectorAll('.size-options button').forEach(function (btn) {
        const qty = sizeMap[btn.dataset.size] || 0;
        if (qty > 0) {
          btn.classList.remove('sold-out');
          btn.disabled = false;
        } else {
          btn.classList.add('sold-out');
          btn.disabled = true;
          btn.classList.remove('selected');
        }
      });
    }

    function applyColorAvailability() {
      document.querySelectorAll('.color-swatch').forEach(function (btn) {
        const color = btn.dataset.color;
        const total = totalFor(inv[color] || {});
        if (total > 0) {
          btn.classList.remove('sold-out');
          btn.disabled = false;
        } else {
          btn.classList.add('sold-out');
          btn.disabled = true;
        }
      });
    }

    function grandTotal() {
      if (isColorPage) {
        return Object.values(inv).reduce(function (sum, sizeMap) { return sum + totalFor(sizeMap); }, 0);
      }
      return totalFor(inv['__single__'] || {});
    }

    function applyOverallAvailability() {
      if (grandTotal() > 0) return;
      const addBtn = document.querySelector('.add-to-cart-btn');
      if (!addBtn) return;
      addBtn.disabled = true;
      addBtn.classList.add('btn-sold-out');
      addBtn.textContent = 'Sold Out';
    }

    // Initial pass
    if (isColorPage) {
      applyColorAvailability();
      const activeSwatch = document.querySelector('.color-swatch.active') || document.querySelector('.color-swatch');
      if (activeSwatch) applySizeAvailability(activeSwatch.dataset.color);

      // Re-check sizes whenever a color is picked (runs alongside the page's own gallery script)
      document.querySelectorAll('.color-swatch').forEach(function (btn) {
        btn.addEventListener('click', function () {
          applySizeAvailability(btn.dataset.color);
        });
      });
    } else {
      applySizeAvailability(null);
    }

    applyOverallAvailability();
  });
})();
