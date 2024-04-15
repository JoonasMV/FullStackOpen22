const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Token } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const codedToken = authorization.substring(7) 
      req.token = codedToken
      const token = await Token.findByPk(codedToken)

      if (token && token.disabled) {
        return res.status(401).json({ error: "expired token" })
      }

      console.log(codedToken);
      req.decodedToken = jwt.verify(codedToken, SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor }