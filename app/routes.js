// app/routes.js

var request = require("request");
var Cryptocoins = require("./models/cryptocoins");

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});


	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/arbitage', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/arbitage', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
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

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	
};


// route middleware to make sure
function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
