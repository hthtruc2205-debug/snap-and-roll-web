// Thong tin san pham
var films = {
  "kodak-gold": ["Kodak Gold 200", 255000, "assets/kodak-gold-1-square.png"],
  ultramax: ["Kodak UltraMax 400", 275000, "assets/ultramax-1-square.png"],
  "ilford-pan": ["Ilford Pan 400", 257000, "assets/ilford-1-square.png"],
  "fuji-200": ["Fujifilm 200", 260000, "assets/fuji-1-square.jpg"],
};

// Them san pham vao gio hang
var cart = JSON.parse(localStorage.getItem("cart") || "[]");

var product = document.querySelector("[data-product]");
if (product) {
  document.querySelectorAll(".add-cart, .buy-now").forEach(function (button) {
    button.onclick = function () {
      var id = product.dataset.product;
      var qty = Number(document.getElementById("quantity").value);
      if (qty < 1 || isNaN(qty)) qty = 1;
      var found = false;
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
          cart[i].qty += qty;
          found = true;
        }
      }
      if (!found) cart.push({ id: id, qty: qty });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Đã thêm vào giỏ hàng!");
      if (button.classList.contains("buy-now")) location.href = "checkout.html";
    };
  });
}

// Loc san pham theo thuong hieu
var filter = document.getElementById("brand-filter");
if (filter) {
  filter.onchange = function () {
    var cards = document.querySelectorAll(".product-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display =
        filter.value === "all" || cards[i].dataset.brand === filter.value
          ? "block"
          : "none";
    }
  };
  document.getElementById("reset-filters").onclick = function () {
    filter.value = "all";
    filter.onchange();
  };
}

// Doi anh san pham
var mainImage = document.getElementById("main-image");
if (mainImage) {
  document.querySelectorAll(".thumbnail").forEach(function (button) {
    button.onclick = function () {
      mainImage.src = button.dataset.image;
    };
  });
}

// Hien thi gio hang va tinh tong tien
var cartArea = document.getElementById("cart-items");

if (cartArea) {
  function renderCart() {
    var total = 0;
    cartArea.innerHTML = "";

    // Hien thi tung san pham trong gio
    cart.forEach(function (item) {
      var film = films[item.id];

      if (!film) return;

      item.qty = Math.max(1, parseInt(item.qty, 10) || 1);

      var subtotal = film[1] * item.qty;
      total += subtotal;

      cartArea.innerHTML += `
        <div class="cart-item">

          <img src="${film[2]}" alt="${film[0]}">

          <div class="cart-item-info">
            <strong>${film[0]}</strong>

            <p>${film[1].toLocaleString("vi-VN")}đ / sản phẩm</p>

            <div class="cart-controls">

              <button
                type="button"
                class="cart-qty-btn"
                data-cart-action="decrease"
                data-id="${item.id}"
                ${item.qty <= 1 ? "disabled" : ""}>
                −
              </button>

              <span class="cart-qty-value">${item.qty}</span>

              <button
                type="button"
                class="cart-qty-btn"
                data-cart-action="increase"
                data-id="${item.id}">
                +
              </button>

              <button
                type="button"
                class="remove-item"
                data-cart-action="remove"
                data-id="${item.id}">
                Xóa
              </button>

            </div>
          </div>

          <strong class="cart-line-total">
            ${subtotal.toLocaleString("vi-VN")}đ
          </strong>

        </div>
      `;
    });

    // Cap nhat tong tien
    document.getElementById("cart-total").textContent =
      total.toLocaleString("vi-VN") + "đ";

    // Cap nhat trang thai gio hang trong
    var emptyCart = document.getElementById("empty-cart");

    if (emptyCart) {
      emptyCart.style.display = cart.length === 0 ? "block" : "none";
    }

    // Luu du lieu moi
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Xu ly nut tang, giam va xoa san pham
  cartArea.addEventListener("click", function (event) {
    var button = event.target.closest("[data-cart-action]");

    if (!button) return;

    var id = button.dataset.id;
    var action = button.dataset.cartAction;

    var item = cart.find(function (product) {
      return product.id === id;
    });

    if (!item) return;

    if (action === "increase") {
      item.qty += 1;
    } else if (action === "decrease") {
      item.qty = Math.max(1, item.qty - 1);
    } else if (action === "remove") {
      cart = cart.filter(function (product) {
        return product.id !== id;
      });
    }

    renderCart();
  });

  // Hien thi gio hang khi mo trang
  renderCart();
}

// Xac nhan dat hang
var form = document.getElementById("checkout-form");
if (form) {
  form.onsubmit = function (event) {
    event.preventDefault();
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    location.reload();
  };
}
