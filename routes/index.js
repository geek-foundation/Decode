var express = require("express");
var router = express.Router();

//Configure helpers
var userHelpers = require("../helpers/userHelpers");

/* GET home page. */
router.get("/", (req, res, next) => {
	if (req.session.loggedIn) {
		res.render("index", { title: "DECODE", loggedIn: true });
	} else {
		res.render("index", { title: "DECODE", loggedIn: false });
	}
});

router.post("/login", (req, res, next) => {
	if (req.session.loggedIn) {
		res.redirect("/users/dashboard");
	} else {
		data = req.body;
		userHelpers.login(data).then((response) => {
			if (response.status) {
				req.session.loggedIn = true;
				req.session.user = response.user;
				res.redirect("/users/dashboard");
			} else {
				res.redirect("/");
			}
		});
	}
});

router.post("/signup", (req, res, next) => {
	if (req.session.loggedIn) {
		res.redirect("/users/dashboard");
	} else {
		userData = req.body;
		userHelpers.signUp(userData).then((data) => {
			if(data){
				req.session.loggedIn = true;
				req.session.user = data;
				res.redirect("/users/dashboard");
			}else{
				req.session.loggedIn = false;
				res.redirect("/");
			}
		});
	}
});

router.get("/logout", (req, res, next) => {
	req.session.destroy();
	res.redirect("/");
});

module.exports = router;
