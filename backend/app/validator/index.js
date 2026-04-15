module.exports = function(model){
	let module = {};
	module.admin = require('./admin')(model);
	module.web = require('./web')(model);
	
	return module;
}