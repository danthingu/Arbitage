// app/routes.js

var request = require("request");
var Cryptocoins = require("./models/cryptocoins");

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});


	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/arbitage', 
		failureRedirect : '/login', 
		failureFlash : true 
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/arbitage', 
		failureRedirect : '/signup', 
		failureFlash : true 
	}));

	app.get('/arbitage', isLoggedIn, function(req, res) {
		var query = req.query.search;
    console.log("hello");
    var url = "https://api.coinmarketcap.com/v1/ticker/?limit=20";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            
			for (var i = 0; i < data.length; i++) {
            	console.log(data[i]["name"]);
	            Cryptocoins.create({name: data[i]["name"]}, function(err, coin){
	            	if (err) {
	            		console.log(err)
	            	}
	            })
    		
    		}
        }
        });
        res.render("arbitage.ejs");
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	
};

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
