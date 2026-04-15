const envType = process.env.NODE_ENV || "staging";
console.log('ENV',envType);
let config = {
  production: {
    port: 251,
    baseUrl: "http://ezapi.ezheatandair.com",
    siteName: "EZheatair",
    jwt_secret: "aiscmsjwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
    jiraAllEmpCommonTeam: 475,
    smtp_service : "gmail",
    smtp_host : "mail.ezheatandair.com",
    smtp_port : 587,
    smtp_email : 'mail.ezheatandair.com',
    smtp_password : 'hEMVqum7',
    smtp_user:'noreply@ezheatandair.com'
  },
  staging: {
    port: 1188,
    baseUrl: "http://ezheatandairapi.aistechnolabs.pro",
    siteName: "EZheatair",
    jwt_secret: "ezplumbingusajwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
    smtp_service: "gmail",
    smtp_host: "smtp.gmail.com",
    smtp_port: 465,
    smtp_email: "node2022test@gmail.com",
    smtp_password: "jpcfhjtkamavbymu",
    jiraAllEmpCommonTeam: 475,
  },
  localhost: {
    port: 3007,
    baseUrl: "http://localhost:3007/",
    siteName: "AIS CMS",
    jwt_secret: "aiscmsjwttokenfetyuhgbcase45w368w3q",
    jwt_expire: "24h",
    smtp_service : "gmail",
    smtp_host : "smtp.gmail.com",
    smtp_port : 465,
    smtp_email : 'testnode45@gmail.com',
    smtp_password : 'hxupclqckqwljqxj',
    jiraAllEmpCommonTeam: 475,
  },
};
console.log("PORT",config[envType].port);
module.exports = config[envType];
