$(document).ready(function () {

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.firstname);
    $("#id").text(data.id);
    console.log(data)
  });

  $.get("/api/user_data/balance").then(function (data) {
console.log("DATA:" +data)
    $("#balance").text(data.balance);

    $("#withdrawal").on("click", function (event) {
      event.preventDefault();
      withdrawAmount = $("#withdrawal-amount").val().trim(),
        console.log(data.balance + parseFloat(withdrawAmount));
      newBal1 = data.balance - parseFloat(withdrawAmount);
      $.post("/api/user_data/balance", 
      {account_Balance: newBal1})
        .then(function (data) {
          window.location.href = "/userAccount";
        })
    });

    $("#deposit").on("click", function (event) {
      event.preventDefault();
      depositAmount = $("#deposit-amount").val().trim(),
        console.log(data.balance + parseFloat(depositAmount));
      newBal = data.balance + parseFloat(depositAmount);
      $.post("/api/user_data/balance", 
      {account_Balance: newBal})
        .then(function (data) {
          window.location.href = "/userAccount";
        })
    });
  });
});