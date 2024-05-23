const express = require("express");
const authRoute = express.Router();
const {
  signup,
  login,
  accessUser,
  logout,
  adminLogin,
  registerANewAdmin,
  adminFullDataFromDB
} = require("../controller/userAuth");
const { verifyToken, verifyAdminToken } = require("../middleware/common");

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/user/check", verifyToken, accessUser);
authRoute.post("/admin/register", verifyAdminToken, registerANewAdmin);
authRoute.post("/admin/login", adminLogin);
authRoute.get("/admin/check", verifyAdminToken, accessUser);
authRoute.get("/logout", logout);
authRoute.get("/admin/profiledata", verifyAdminToken, adminFullDataFromDB);  //

module.exports = authRoute;
