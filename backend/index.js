const path = require("path");
const express = require("express");
const app = express();
global.constants = require('./config/constants.js');
const moment = require("moment")
const nodemailer = require("nodemailer")
global.config = require("./config/constants.js");
global.moment = require("moment");
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); 
const fileUpload = require('express-fileupload');
const cron = require('node-cron');
app.use(cors());


let server = require("http").createServer(app);

app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload())
app.listen(constants.port, () => {
	console.log("(---------------------------------------------------------------)");
	console.log("|                    Server Started...                        |");
	console.log("|                 "+ constants.baseUrl);
	console.log("(---------------------------------------------------------------)");
});


require("./config/logconfig.js");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

global.mongoose = require("./config/database.js")(mongoose);
global.helper = require("./app/helpers/helpers.js");


let controllers = require("./app/controllers/index.js")(mongoose, moment, nodemailer);
require("./app/routes/index.js")(app, mongoose, controllers);

app.get("/", (req, res) => {
	res.send("Hello Backend");
});

app.use(function (req, res, next) {
	res.status(404).send({
		status: 404,
		message: 'Route Not Found!'
	});
})

cron.schedule('0 0 * * *', async () => {
	// cron.schedule('*/5 * * * * *', async () => {
	console.log('Running a task every 24 hours');
	helper.updateViews("1")
});

module.exports = { app: app, server: server };

