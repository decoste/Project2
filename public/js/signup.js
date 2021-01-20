$(document).ready(function () {
  var signUpForm = $(".signup");
  var usernameInput = $("#username-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var firstNameInput = $("#firstName-input");
  var lastNameInput = $("#lastName-input");
  var address1Input = $("#Address1-input");
  var address2Input = $("#Address2-input");
  var cityInput = $("#city-input");
  var stateInput = $("#state-input");
  var zipInput = $("#zip-input");

  //  validate the email and password when sign ups
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstname: firstNameInput.val().trim(),
      lastname: lastNameInput.val().trim(),
      address1: address1Input.val().trim(),
      address2: address2Input.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zip: zipInput.val().trim(),
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!userData.username || !userData.password) {
      return;
    }
    signUpUser(
      userData.firstname,
      userData.lastname,
      userData.address1,
      userData.address2,
      userData.city,
      userData.state,
      userData.zip,
      userData.email,
      userData.username,
      userData.password
    );
    firstNameInput.val("");
    lastNameInput.val("");
    address1Input.val("");
    address2Input.val("");
    cityInput.val("");
    stateInput.val("");
    zipInput.val("");
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");

    //Onclick event for sign up to Generate an account number.

    // Post this to DB
  });

  //Post to the signup route.
  function signUpUser(
    firstname,
    lastname,
    address1,
    address2,
    city,
    state,
    zip,
    email,
    username,
    password
  ) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      email: email,
      username: username,
      password: password,
    })
      .then(function (data) {
        window.location.href = "/login";
        // Handle it by throwing up an alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
