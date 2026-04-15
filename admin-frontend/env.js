let envJson = {
  localhost: { 
    port: "3000",
    baseUrl: "http://localhost:3000/",
    siteName: "AIS CMS",
    jwt_secret: "aiscmsjwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
  },
  production: {
    port: "1130",
    baseUrl: "https://ezadmin.ezheatandair.com/",
    siteName: "AIS CMS",
    jwt_secret: "aiscmsjwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
  },
  
};

module.exports = () => {
  let env = process.env.NODE_ENV || "production";
  return envJson[env];
};
