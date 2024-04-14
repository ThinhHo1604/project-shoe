const express = require("express");
const userRoute = express.Router();
const AsynHandler = require("express-async-handler");
const User = require("../model/User");
// const { Error } = require('mongoose');
const generateToken = require("../tokenGenerate");
const protect= require("../middle/Auth")
userRoute.post(
  "/login",
  AsynHandler(async (red, res) => {
    const { email, password } = red.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

//register route
userRoute.post(
  "/",
  AsynHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const exitUser = await User.findOne({ email });
    if (exitUser) {
      res.status(400);
      throw new Error("User Already exit");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (User) {
        res.status(201).json({
          _id: User._id,
          name: User.name,
          email: User.email,
          isAdmin: User.isAdmin,
          token: null,
          createdAt: User.createdAt,
        });
      } else {
        res.status(400);
        throw new Error("Invaid User Data");
      }
    }
  })
);

//profile data
userRoute.get(
  "/profile",
  protect,
  AsynHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: User._id,
        name: User.name,
        email: User.email,
        isAdmin: User.isAdmin,
        token: null,
        createdAt: User.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);
module.exports = userRoute;
