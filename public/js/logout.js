setTimeout(function(){
    window.location.href = './home.html';
 }, 6000);
 
 let timeleft = 5;
 setInterval(function(){
     document.getElementById('countdown').innerHTML = timeleft
     timeleft -= 1;
 }, 1000);