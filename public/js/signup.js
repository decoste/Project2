$(document).ready(function () {

  var signUpForm = $(".signup");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var firstNameInput = $("#firstName-input");
  var lastNameInput = $("#lastName-input");
  var address1Input = $("#Address1-input");
  var address2Input = $("#Address2-input");
  var cityInput = $("#city-input");
  var stateInput = $("#state-input");
  var zipInput = $("#zip-input");

  //  validate the email and password when sign up
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
      password: passwordInput.val().trim(),
    };
    if (!userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.firstname, userData.lastname, userData.address1,
       userData.address2, userData.city, userData.state,
        userData.zip, userData.email, userData.password);
    firstNameInput.val("");
    lastNameInput.val("");
    address1Input.val("");
    address2Input.val("");
    cityInput.val("");
    stateInput.val("");
    zipInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  //Post to the signup route.
  function signUpUser(firstname, lastname, address1, address2, city, state, zip, email, password) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      email: email,
      password: password
    })
      .then(function (data) {
        window.location.replace("/");
        // Handle it by throwing up an alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});