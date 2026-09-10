(function () {
  const CART_KEY = 'muyinza_cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = '(' + count + ')';
    });
  }

  function addItemToCart(item) {
    const cart = getCart();
    const existing = cart.find(function (i) {
      return i.name === item.name && i.size === item.size && i.color === item.color;
    });
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(Object.assign({ quantity: 1 }, item));
    }
    saveCart(cart);
  }

  function removeItemFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  function setItemQuantity(index, qty) {
    const cart = getCart();
    if (qty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = qty;
    }
    saveCart(cart);
  }

  window.MuyinzaCart = {
    getCart: getCart,
    saveCart: saveCart,
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
    setItemQuantity: setItemQuantity,
    updateCartBadge: updateCartBadge
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();

    const addBtn = document.querySelector('.add-to-cart-btn');
    if (addBtn && addBtn.tagName === 'BUTTON') {
      addBtn.addEventListener('click', function () {
        const sizeBtn = document.querySelector('.size-options button.selected');
        if (!sizeBtn) {
          alert('Please select a size before adding to cart.');
          return;
        }

        const nameEl = document.querySelector('.product-info h1');
        const priceEl = document.querySelector('.product-info .price');
        const imgEl = document.getElementById('main-product-image');
        const colorLabel = document.getElementById('selected-color-label');

        const item = {
          name: nameEl ? nameEl.textContent.trim() : 'Item',
          price: priceEl ? priceEl.textContent.trim() : '',
          img: imgEl ? imgEl.getAttribute('src') : '',
          size: sizeBtn.dataset.size,
          color: colorLabel ? colorLabel.textContent.trim() : null,
          checkoutLink: addBtn.dataset.checkoutLink || ''
        };

        addItemToCart(item);

        const original = addBtn.textContent;
        addBtn.textContent = 'Added ✓';
        addBtn.disabled = true;
        setTimeout(function () {
          addBtn.textContent = original;
          addBtn.disabled = false;
        }, 1400);
      });
    }
  });
})();
