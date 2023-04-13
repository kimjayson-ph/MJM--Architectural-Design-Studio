const emailInput = document.getElementById("emailInput");
const sendEmailHandler = document.getElementById("sendEmailHandler");

(function () {
  emailjs.init("otei59u5tqV2CV1ig");
})();

sendEmailHandler.addEventListener("click", (e) => {
  e.preventDefault();
  let userEmail = emailInput.value;

  let serviceID = "service_bkog70i";
  let templateID = "template_uodaxm4";
  let templateParams = {
    from_name: "MJM Architectural design studio",
    send_to: userEmail,
    message: `Thank you for your interest in our newsletter! To stay up-to-date on our latest news, exclusive promotions, and special events, please click the link below to confirm your subscription:

    [https://kimjayson-ph.github.io/MJM-Architectural-Design-Studio/]
    
    Once you confirm your subscription, you will start receiving our newsletter in your inbox every [frequency of newsletter delivery] with all the latest updates.
    
    Thank you for subscribing!`,
  };
  let publicKey = "otei59u5tqV2CV1ig";

  emailjs.send(serviceID, templateID, templateParams, publicKey).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );

  alert("Subcribe");
  emailInput.value = "";
});
