const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const checkOut = document.querySelector(".checkOut");
const cartEmpty = document.querySelector(".cartEmpty");

// cart array
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

// calculate and render subtotal
// function renderSubtotal() {
//   let totalPrice = 0,
//     totalItems = 0;

//   cart.forEach((item) => {
//     totalPrice += item.price * item.numberOfUnits;
//     totalItems += item.numberOfUnits;
//   });

//   subtotalEl.innerHTML = `<h5> Subtotal (${totalItems} items): &#8369;${totalPrice.toFixed(
//     2
//   )}</h5> `;

//   totalItemsInCartEl.innerHTML = totalItems;
// }
// if (cart.length === 0) {
//   subtotalEl.innerHTML = "";
//   cartEmpty.innerHTML = `<p>YOUR CART IS EMPTY</p>`;
// }

// render cart items
// function renderCartItems() {
//   cartItemsEl.innerHTML = ""; // clear cart element
//   cart.forEach((item) => {
//     cartItemsEl.innerHTML += `
//         <div class="cart-item row mb-3">
//             <div class="item-info col" >
//                 <img style="width:200px;height: 150px" src="${item.imgSrc}" alt="${item.name}">

//             </div>
//             <div class = "col">
//             <div class="unit-price mt-2">
//                 <h5>${item.name}</h5>
//                 <small>&#8369</small>${item.price}
//             </div>
//             <div class="units text-center d-inline-block m-2" style="border: 1px solid; width: 100px">
//                 <div class="btn minus d-inline-block" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
//                 <div class="number d-inline-block">${item.numberOfUnits}</div>
//                 <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
//             </div>
//             <div class="item-info d-inline-block" onclick="removeItemFromCart(${item.id})">
//             <button type="button" class="btn btn-link text-black">REMOVE</button>
//             </div>
//             </div>
//         </div>

//       `;
//     cartEmpty.innerHTML = ``;
//     checkOut.innerHTML = `<a class="btn btncolor w-100 text-center text-space rounded-0"  href="checkout.html">CHECKOUT</a>`;
//   });
// }

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  checkOut.innerHTML = ``;
  cartEmpty.innerHTML = `<p>YOUR CART IS EMPTY</p>`;

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// edit address
const editPhone = document.getElementById("editPhone").value;
const editMyAddress = document.getElementById("editMyAddress").value;
