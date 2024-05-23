const express = require("express");
const callbackRoute = express.Router();
const {
  fetchAllCallbackRequest,
  sendCallbackRequest,
  updateCallbackRequest,
  deleteCallbackRequest,
} = require("../controller/callback");
const { verifyAdminToken } = require("../middleware/common");

callbackRoute
  .post("/", sendCallbackRequest)
  .get("/", verifyAdminToken, fetchAllCallbackRequest)
  .patch("/:id", verifyAdminToken, updateCallbackRequest)
  .delete("/:id", verifyAdminToken, deleteCallbackRequest);

module.exports = callbackRoute;
