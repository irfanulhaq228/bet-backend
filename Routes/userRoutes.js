const express = require("express");
const { createUser, loginUser, getAllUsers } = require("../Controllers/UserController.js");

const UserRouter = express.Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUsers);
UserRouter.post("/login", loginUser);

module.exports = UserRouter;