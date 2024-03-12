const express = require("express");
const { loginController } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/login", loginController);

module.exports = { userRouter };
