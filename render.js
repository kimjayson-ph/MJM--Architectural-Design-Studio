if (cart.length === 0 || !userData) {
  subtotalEl.innerHTML = "";
  cartEmpty.innerHTML = `<p>YOUR CART IS EMPTY</p>`;
}

// calculate and render subtotal
function renderSubtotal() {
  if (userData) {
    let totalPrice = 0,
      totalItems = 0;

    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
    });

    subtotalEl.innerHTML = `<h5> Subtotal (${totalItems} items): &#8369;${totalPrice.toFixed(
      2
    )}</h5> `;
    totalItemsInCartEl.innerHTML = totalItems;
  } else {
    totalItemsInCartEl.innerHTML = 0;
  }
}

if (userData) {
  cart = cart.filter((cart) => cart.email === userData.email);
}
// render cart items

console.log(cart);
function renderCartItems() {
  if (!userData) {
    return;
  }
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item row mb-3">
            <div class="item-info col" >
                <img style="width:200px;height: 150px" src="${item.imgSrc}" alt="${item.name}">

            </div>
            <div class = "col">
            <div class="unit-price mt-2">
                <h5>${item.name}</h5>
                <small>&#8369</small>${item.price}
            </div>
            <div class="units text-center d-inline-block m-2" style="border: 1px solid; width: 100px">
                <div class="btn minus d-inline-block" onclick="minusCartQuantity(${item.id})">-</div>
                <div class="number d-inline-block">${item.quantity}</div>
                <div class="btn plus" onclick="addCartQuantity(${item.id})">+</div>
            </div>
            <div class="item-info d-inline-block" onclick="removeItemFromCart(${item.id})">
            <button type="button" class="btn btn-link text-black">REMOVE</button>
            </div>
            </div>
        </div>


      `;
    cartEmpty.innerHTML = ``;
    checkOut.innerHTML = `<a class="btn btncolor w-100 text-center text-space rounded-0"  href="checkout.html">CHECKOUT</a>`;
  });
}

function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

console.log(cart);
// updateCart();
renderSubtotal();
renderCartItems();
renderProducts();
