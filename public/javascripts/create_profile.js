async function create_profile(){
    var username = document.getElementById("username").value;    
	var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var age = document.getElementById("age").value;
	
	var name_resp = "";
	var name_link = "https://gamers-matchmaking.herokuapp.com/username?name=" + username;
	var mail_resp = "";
	var mail_link = "https://gamers-matchmaking.herokuapp.com/email?email=" + email;
	var mail_api_resp = "";
	var mail_api_link = "https://gamers-matchmaking.herokuapp.com/email-api?email=" + email;
	
	await fetch(name_link)
	.then(async function(response) {
		name_resp = await response.json();
	});
	
	await fetch(mail_link)
	.then(async function(response) {
		mail_resp = await response.json();
	});
	
	await fetch(mail_api_link)
	.then(async function(response) {
		mail_resp = await response.json();
	});
	
	function wait_on(variable){
		if(variable == "")
			setTimeout(() => {wait_on(variable);}, 300);
	}
	wait_on(name_resp);
	wait_on(mail_resp);
	wait_on(mail_api_resp);
	
	console.log(name_resp);
	console.log(mail_resp);
	console.log(mail_api_resp);
	
	if(username == "")
		alert("Please enter a username");
	else if(password == "")
		alert("Please enter a password");
	else if(email == "")
		alert("Please enter an email address");
	else if(name_resp.count != "0")
		alert("Chosen username not available.");
	else if(mail_resp.count != "0")
		alert("Email is already associated with an account.");
	else if(mail_api_resp.valid == "false")
		alert("Please enter a valid email");
	
	

}


