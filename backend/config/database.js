const env = process.env.NODE_ENV || "staging";
module.exports = function (mongoose) {

  let database = "";
  let username = "";
  let password = "";
  let port = "";
  let host = "";
  let user = "";

  if (env == "localhost") {
    host = 'localhost'
    port = 27017
    user = 'root'
    password = ''
    database = 'migrate'

  } else if (env == "staging") {
    host = '192.168.1.4'
    port = 27314
    user = 'ais_ezheatandair_stg'
    password = 'YVEzFDHz'
    database = 'ais_ezheatandair_stg'
  } 
  else if (env == "production") {
    database = "ais_ezheatandair_stg";
    user = "ais_ezheatandair_stg";
    password = "YVEzFDHz";
    host = "ezheatandairnextjs_mongo_db";
    port = "27017";

  }

  let option = {
    autoIndex: false,
    // useNewUrlParser: true,
  }

  let dbURI = ''
  if (env == 'localhost') {
    dbURI = 'mongodb://localhost:' + port + '/' + database;
  } else {
    dbURI = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + database;
  }
  console.log('dbURI', dbURI);
  mongoose.connect(dbURI, option).then(() => {
    console.log("connected to database");
  }).catch((error) => {
    console.error("not connected to database", error);
  })

  return mongoose;
};
