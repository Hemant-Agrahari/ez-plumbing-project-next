const jwt = require("jsonwebtoken");

module.exports = function (model) {
  let module = {};


  module.verifyUserToken = async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log("Auth Token :  ", token);
      if (!token)return res.status(401).send("Access Denied / Unauthorized request");
      console.log("After AUTH token",token);
      let verifiedUser = jwt.verify(token, config.jwt_secret);
      if (!verifiedUser) return res.status(401).send("Unauthorized request");
      
      req.query.userId = verifiedUser.id
      req.userFromjwt = verifiedUser;

      next();
    } catch (error) {
      console.error("updateDocument module error", error);
      res.status(400).send("Invalid Token");
    }
  };

  return module;
};
