module.exports = function (model) {
	let module = {};

	module.pages = require("./pages")(model);
	module.shortCode = require("./shortCode")(model);
	module.admin = require("./admin")(model);
	module.subadmin = require("./subadmin")(model);
	module.notification = require("./notification")(model);
	module.dashboard = require("./dashboard")(model);
	module.template = require("./template")(model);
	module.public = require("./public")(model);
	module.tags = require("./tags")(model);
	module.services = require("./services")(model);
	module.author = require("./author")(model);
	module.blog = require("./blog")(model);
	module.scholarship = require("./scholarship")(model);
	module.aboutus = require("./aboutus")(model);
	module.becomeaprovider = require("./becomeaprovider")(model);
	module.location = require("./location")(model);

	return module;
};
