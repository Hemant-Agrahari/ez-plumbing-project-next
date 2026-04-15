module.exports = function(app, model, controllers){
	let module = {};
	module.admin = require('./admin')(app, model, controllers);
	module.web = require('./web')(app, model, controllers);
	
	return module;
}