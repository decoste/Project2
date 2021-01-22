$(document).ready(function() {

    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.firstname);
      $("#id").text(data.id);
      console.log(data.id)
    });

    $.get("/api/user_data/balance").then(function(data) {
      
            $("#balance").text(data[0].account_Balance);
            console.log(parseFloat(amount) + data[0].account_Balance);
        });
       
  });