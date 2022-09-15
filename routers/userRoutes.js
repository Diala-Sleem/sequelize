const route = require("express").Router();
//............................
const {
  requireController,
  loginController,
  findUserByIdController,
  createUserController,
  findAllUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");

//............................

route.post("/register", requireController);

route.post("/login", loginController);

route.post("/createuser", createUserController);

route.get("/user/:id", findUserByIdController);

route.get("/users", findAllUserController);

route.patch("/usersupdate/:id", updateUserController);

route.delete("/usersdelete/:id", deleteUserController);

module.exports = route;
