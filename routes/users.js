var express = require("express");
var router = express.Router();
var { render } = require("../app");
var projectHelpers = require("../helpers/projectHelpers");
var userHelpers = require("../helpers/userHelpers");

router.get("/dashboard", (req, res, next) => {
	let loggedIn = req.session.loggedIn;
	let user = req.session.user;
	if (loggedIn) {
		res.render("dashboard", { user, title: "Dashboard", loggedIn: true });
	} else {
		res.redirect("/");
	}
});

router.get("/addProject", (req, res, next) => {
	if (req.session.loggedIn) {
		res.render("addProject");
	} else {
		res.redirect("/");
	}
});

router.post("/addProject", (req, res, next) => {
	if (req.session.loggedIn) {
		projectHelpers.addProject(req.body, (data) => {
			res.redirect("users/dashboard/projects");
		});
	} else {
		res.redirect("/");
	}
});

router.get("/projects", (req, res, next) => {
	if (req.session.loggedIn) {
		let user = req.session.user;
		projects = projectHelpers.getProjects(user._id);
		res.render("projects", { projects, isloggedIn: true });
	} else {
		res.redirect("/");
	}
});

module.exports = router;
