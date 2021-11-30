const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const path = require('path');

app.set('port', port);
app.use(express.static('public'));
app.use(cors({origin: 'http://localhost:3000'}));

console.log(`Connecting to database`)
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
		rejectUnauthorized: false
    }
});

client.connect();

async function email_api_req(req_email){
	var temp;
	
	var mail_link = "https://gamers-matchmaking.herokuapp.com/email?email=" + req_email + 
	"&user-id=raistlynniyn&api-key=lOjqSRTgCzTKJukkST33lnAiOSSuzLhMAXBT33Vu45jdWWIL";
	
	await fetch(mail_link)
	.then(async function(response) {
		temp = await response.json();
	});
	
	function wait_on(variable){
		if(variable == "")
			setTimeout(() => {wait_on(variable);}, 300);
	}
	wait_on(temp);
	
	return temp;
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/help', (req, res) => {
  res.send('Hello World help!')
})

app.get('/username', (req, res) => {
	var req_name = req.query.name;
	var temp;
	client.query('SELECT count(*) FROM user_password WHERE username = \''+ req_name +'\';', (err, ret) => {
		if (err) throw err;
		for (let row of ret.rows) {
			temp = JSON.stringify(row);
		}
		console.log(temp);
		res.send(temp);
	});
})

app.get('/email', (req, res) => {
	var req_name = req.query.email;
	var temp;
	console.log(req_name);
	client.query('SELECT count(*) FROM user_profile WHERE email = \''+ req_name +'\';', (err, ret) => {
		if (err) throw err;
		for (let row of ret.rows) {
			temp = JSON.stringify(row);
		}
		console.log(temp);
		res.send(temp);
	});
})

app.get('/email-api', (req, res) => {
	var req_email = req.query.email;
	var temp = "";
	
	temp = email_api_req(req_email);
	
	function wait_on(variable){
		if(variable == "")
			setTimeout(() => {wait_on(variable);}, 300);
	}
	wait_on(temp);
	
	res.send(temp);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;