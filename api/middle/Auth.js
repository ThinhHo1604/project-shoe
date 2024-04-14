const jwt = require("jsonwebtoken");
const AsynHandler = require("express-async-handler");
const User= require('../model/User')
const protect = AsynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        token= req.headers.authorization.split(" ")[1];
        const decodedToken= jwt.verify(token,process.env.JWT_SECRECT);
        req.user= await User.findById(decodedToken.id).select('-password');
        next();
    } catch (err) {
      console.log(err);
    }
  }
  if(!token){
    res.status(404)
    throw new Error("not authorize")
  }

});



module.exports= protect;