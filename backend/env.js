let envJson = {
  localhost: { 
    port: "3000",
    baseUrl: "http://localhost:3007/",
    siteName: "AIS CMS",
    jwt_secret: "aiscmsjwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
  },
  staging: {
    port: "1188",
    baseUrl: "http://ezheatandairapi.aistechnolabs.pro",
    siteName: "ezheatandair",
    jwt_secret: "ezplumbingusajwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
  },
  production: {
    port: "251",
    baseUrl: "http://ezapi.ezheatandair.com",
    siteName: "ezheatandair",
    jwt_secret: "aiscmsjwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
  },
  
};

module.exports = () => {
  let env = process.env.NODE_ENV || "staging";
  return envJson[env];
};
