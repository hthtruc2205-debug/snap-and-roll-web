// Thong tin san pham
var films = {
  "kodak-gold": ["Kodak Gold 200", 180000, "assets/kodak-gold-1-square.jpg"],
  "ultramax": ["Kodak UltraMax 400", 190000, "assets/ultramax-1-square.jpg"],
  "ilford-pan": ["Ilford Pan 400", 200000, "assets/ilford-1-square.jpg"],
  "fuji-200": ["Fujifilm 200", 140000, "assets/fuji-1-square.jpg"]
};

// Them san pham vao gio hang
var cart = JSON.parse(localStorage.getItem("cart") || "[]");

var product = document.querySelector("[data-product]");
if (product) {
  document.querySelectorAll(".add-cart, .buy-now").forEach(function(button) {
    button.onclick = function() {
      var id = product.dataset.product;
      var qty = Number(document.getElementById("quantity").value);
      if (qty < 1 || isNaN(qty)) qty = 1;
      var found = false;
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) { cart[i].qty += qty; found = true; }
      }
      if (!found) cart.push({id: id, qty: qty});
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Đã thêm vào giỏ hàng!");
      if (button.classList.contains("buy-now")) location.href = "checkout.html";
    };
  });
}

// Loc san pham theo thuong hieu
var filter = document.getElementById("brand-filter");
if (filter) {
  filter.onchange = function() {
    var cards = document.querySelectorAll(".product-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.display = filter.value === "all" || cards[i].dataset.brand === filter.value ? "block" : "none";
    }
  };
  document.getElementById("reset-filters").onclick = function() { filter.value = "all"; filter.onchange(); };
}

// Doi anh san pham
var mainImage = document.getElementById("main-image");
if (mainImage) {
  document.querySelectorAll(".thumbnail").forEach(function(button) {
    button.onclick = function() { mainImage.src = button.dataset.image; };
  });
}

// Hien thi gio hang va tinh tong tien
var cartArea = document.getElementById("cart-items");
if (cartArea) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var film = films[cart[i].id];
    if (film) {
      total += film[1] * cart[i].qty;
      cartArea.innerHTML += "<p>" + film[0] + " x " + cart[i].qty + " — " + (film[1] * cart[i].qty).toLocaleString("vi-VN") + "đ</p>";
    }
  }
  document.getElementById("cart-total").textContent = total.toLocaleString("vi-VN") + "đ";
  if (cart.length > 0) document.getElementById("empty-cart").style.display = "none";
}

// Xac nhan dat hang
var form = document.getElementById("checkout-form");
if (form) {
  form.onsubmit = function(event) {
    event.preventDefault();
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    location.reload();
  };
}
