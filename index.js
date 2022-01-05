var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var alert = require('alert');

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Blood', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.get("/", function (req, res) {
	res.redirect("home.html");
});

var user;

app.post("/login.html", function (req, res) {
	loginDetails = {
		name: req.body.uname,
		password: req.body.pass
	};

	db.collection("users").find(loginDetails).toArray(function(err, data){
		if (err){
			console.log(err);
		}else{
			if (data.length == 0){
				console.log("could not find user");
				alert("User not found!");
				res.redirect("/login.html");
			}
			else{
				user = loginDetails.name;
				console.log("user logged in");
				res.send('<!DOCTYPE html><html lang="en"><head><title>Logged In</title>' + 
					'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans">' + 
					'<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">' + 
					'<link rel="stylesheet" href="style.css" type="text/css">' + 
					'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' +
					'</head><body><script src="dashboard.js"></script><div class="container"><div id="logo">' + 
					'<img src="images/logo.png" height="58.8px" width="60.13px"></div><div class="navbar">' + 
					'<a target="_self" href="home.html"><button>Home Page </button></a>' + 
					'<a target="_self" href="donor.html"><button>Be A Donor</button></a>' + 
					'<a target="_self" href="compatibility.html"><button>Compatibility</button></a>' + 
					'<a target="_self" href="contactus.html"><button>Contact Us</button></a>' +
					'<a target="_self" href="about.html"><button>About Us</button></a>' + 
					'<a target="_self" href="login.html"><button id="b1">Login</button></a>' + 
					'<a target="_self" href="signup.html"><button id="b2">Sign Up</button></a></div></div>' +
					'<h1 class="heading">Welcome ' + user + ' !</h1><div class="buttons"><span>' + 
					'<a data-tool-tip="Donate Blood" href="#"></a></span><span>' +
					'<a data-tool-tip="Request Blood" href="#"></a></span></div></body></html>'
				);
			}
		}
	});
});

app.post("/signup.html", function (req, res) {
	userDetails = {
		name: req.body.user,
		email: req.body.email,
		password: req.body.pass
	};

	db.collection("users").find({
		name: userDetails.name,
		password: userDetails.password
	}).toArray(function(err, data){
		if (err){
			console.log(err);
		}else{
			if (data.length == 0){
				db.collection("users").insertOne(userDetails, function(err, data){
					if (err){
						console.log(err);
					}else{
						alert("account successfully made! please login to proceed.");
						res.redirect("/login.html");
						console.log("user added");
					}
				});
			}
			else{
				alert("User already exists!");
				res.redirect("/signup.html");
				console.log("user not added");
			}
		}
	});
});

app.post("/donor.html", function (req, res) {
	donorDetails = {
		name: req.body.user,
		phone: req.body.phone,
		bg: req.body.bg,
		loc: req.body.loc
	};

	db.collection("donors").find({
		name: donorDetails.name,
		phone: donorDetails.phone,
		bg: donorDetails.bg
	}).toArray(function(err, data){
		if (err){
			console.log(err);
		}else{
			if (data.length == 0){
				db.collection("donors").insertOne(donorDetails, function(err, data){
					if (err){
						console.log(err);
					}else{
						alert("Donor registered successfully!");
						res.redirect("/donor.html");
						console.log("donor added");
					}
				});
			}
			else{
				alert("Donor already exists!");
				res.redirect("/donor.html");
				console.log("donor not added");
			}
		}
	});
});

app.post("/contactus.html", function (req, res) {
	contactDetails = {
		name: req.body.user,
		email: req.body.email,
		phone: req.body.phone,
		comment: req.body.comment
	};

	db.collection("contacts").find({$or:
		[
			{
				name: contactDetails.name,
				email: contactDetails.email
			},
			{
				name: contactDetails.name,
				phone: contactDetails.phone
			}
		]
	}).toArray(function(err, data){
		if (err){
			console.log(err);
		}else{
			if (data.length == 0){
				db.collection("contacts").insertOne(contactDetails, function(err, data){
					if (err){
						console.log(err);
					}else{
						alert("Contact information saved successfully!");
						res.redirect("/contactus.html");
						console.log("contact added");
					}
				});
			}
			else{
				alert("Contact information already saved!");
				res.redirect("/contactus.html");
				console.log("contact not added");
			}
		}
	});
});


app.get("/home", (req, res) => {
    return res.redirect('home.html');
});

app.get("/donate", (req, res) => {
    return res.redirect('donor.html');
});

app.get("/login", (req, res) => {
    return res.redirect('login.html');
});

app.get("/singup", (req, res) => {
    return res.redirect('signup.html');
});

app.get("/about", (req, res) => {
    return res.redirect('about.html');
});

app.get("/contact", (req, res) => {
    return res.redirect('contactus.html');
});

app.get("/compatibility", (req, res) => {
    return res.redirect('compatibility.html');
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('home.html');
}).listen(8080);