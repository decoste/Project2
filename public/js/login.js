$(document).ready(function () {

  var loginForm = $(".login");
  var usernameInput = $("#username-input");
  var passwordInput = $("#password-input");

  //Validate that an username and password are entered when submit
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      alert("Invalid Username or Password")
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function () {
        window.location.href="/userAccount";
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
