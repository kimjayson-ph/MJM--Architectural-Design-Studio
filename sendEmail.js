const emailInput = document.getElementById("emailInput");
const sendEmailHandler = document.getElementById("sendEmailHandler");

(function () {
  emailjs.init("DzQp6S_m5gqqyCgr8");
})();

sendEmailHandler.addEventListener("click", (e) => {
  e.preventDefault();
  let userEmail = emailInput.value;

  let serviceID = "service_du75eqt";
  let templateID = "template_0mhodth";
  let templateParams = {
    from_name: "Jayson and El Designs",
    send_to: userEmail,
    message: "You are subscribe to our newsletter by jayson",
  };
  let publicKey = "DzQp6S_m5gqqyCgr8";

  emailjs.send(serviceID, templateID, templateParams, publicKey);
  /*
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "w3w2433@email.com",
    Password: "633E12ECEF93047BDD07B7F534EC1E8F2E2A",
    To: userEmail,
    From: "w3w2433@gmail.com",
    Subject: "This is the Test",
    Body: "This is not a Test",
  }).then((message) => alert(message));
  */
  alert("Subcribe");
  emailInput.value = "";
});
