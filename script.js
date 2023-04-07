// Validation
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Register Function
const submitButton = document.querySelector(".buttonregister");
const errorbox = document.getElementById("errorbox");

submitButton?.addEventListener("click", (e) => {
  e.preventDefault();
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const cpass = document.getElementById("cpass").value;

  localStorage.setItem("FirstName", fname);
  localStorage.setItem("LastName", lname);
  localStorage.setItem("Email", email);
  localStorage.setItem("Password", pass);
  localStorage.setItem("Cpassword", cpass);
  if (fname == "" && lname == "" && email == "" && pass == "") {
    errorbox.innerHTML = `<div class="alert alert-danger" role="alert">
    Input field has no value!
  </div>`;
  } else {
    if (pass.length >= 6 && pass.length <= 20) {
      if (pass !== cpass) {
        errorbox.innerHTML = `<div class="alert alert-danger" role="alert">
        Password not matching!
      </div>`;
      } else {
        errorbox.innerHTML = `<div class="alert alert-success" role="alert">
        Register successful!
      </div>`;
        setTimeout(() => {
          location.href = "Login-page.html";
        }, 1500);
      }
    } else {
      errorbox.innerHTML = `<div class="alert alert-danger" role="alert">
      Input min six digit password!
    </div>`;
    }
  }
});

//Login Function

const loginButton = document.querySelector(".loginbutton");
loginButton?.addEventListener("click", (e) => {
  e.preventDefault();

  // cautch the valu which is type user login page
  const emailAddress = document.getElementById("emailAddress").value;
  const passWord = document.getElementById("passWord").value;

  // let's get value in localstorage which store user in registration field
  const Email = localStorage.getItem("Email");
  const Password = localStorage.getItem("Password");

  if (emailAddress == "" && passWord == "") {
    errorbox.innerHTML = `<div class="alert alert-danger" role="alert">
    Input field has no value!
  </div>`;
  } else {
    if (emailAddress == Email && passWord == Password) {
      errorbox.innerHTML = `<div class="alert alert-success" role="alert">
      Login successful!
    </div>`;
      setTimeout(() => {
        location.href = "index.html";
      }, 1500);
    } else {
      errorbox.innerHTML = `<div class="alert alert-danger" role="alert">
      Email and Password wrong!
    </div>`;
    }
  }
});

// Add to cart

// SELECT ELEMENTS
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const checkOut = document.querySelector(".checkOut");
const cartEmpty = document.querySelector(".cartEmpty");

// RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    <div class="card rounded-0" style="width: 345px; height: 350px">
    <img style="width:343px;height: 200px" src="${product.imgSrc}" alt="${product.name}">
        <div>${product.name}</div>
        <p>&#8369;${product.price}</p>
        <div>${product.description}</div>
        <div class="add-to-cart" onclick="addToCart(${product.id})">
        <button class ="btn btncolor rounded-0"  data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight">Add to Cart</button>
        </div>
     </div>
     
        `;
  });
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
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
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `<h5> Subtotal (${totalItems} items): &#8369;${totalPrice.toFixed(
    2
  )}</h5> `;

  totalItemsInCartEl.innerHTML = totalItems;
}
if (cart.length === 0) {
  subtotalEl.innerHTML = "";
  cartEmpty.innerHTML = `<p>YOUR CART IS EMPTY</p>`;
}

// render cart items
function renderCartItems() {
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
                <div class="btn minus d-inline-block" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number d-inline-block">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
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
