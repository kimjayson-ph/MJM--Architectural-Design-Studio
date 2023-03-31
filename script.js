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
    errorbox.innerHTML = "input field has no value!";
  } else {
    if (pass.length >= 6 && pass.length <= 20) {
      if (pass !== cpass) {
        errorbox.innerHTML = "Password not matching!";
      } else {
        alert("Register successful!");
        setTimeout(() => {
          location.href = "Login-page.html";
        }, 1000);
      }
    } else {
      errorbox.innerHTML = "Input min six digit password!";
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
    errorbox.innerHTML = "input field has no value!";
  } else {
    if (emailAddress == Email && passWord == Password) {
      alert("login successful!");
      setTimeout(() => {
        location.href = "index.html";
      }, 1000);
    } else {
      errorbox.innerHTML = "email and password wrong!";
    }
  }
});
