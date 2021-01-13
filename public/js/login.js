$(document).ready(function () {

  var loginForm = $(".login");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");

  //Validate that an email and password are entered when submit
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      alert("Invalid Username or Password")
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/accounts");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
