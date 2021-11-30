function login(){

    var usernamme = document.getElementById("username");
    var password = document.getElementById("password");

    if(usernamme.value == ""){
        alert("Please Enter Username");
    } else if(password.value == ""){
        alert("Please Enter Password");
    } else if(usernamme.value == "admin" && password.value == "admin"){
        window.location.href = "welcome.html";
    } else {
        alert("Please Enter Correct Username or Password");
    }
}