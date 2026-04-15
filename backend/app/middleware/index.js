module.exports = function (model) {
	let module = {};

	module.admin = require('./admin')(model);
	return module;
}