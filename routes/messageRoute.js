const express = require("express");
const messageRoute = express.Router();
const { sendMessage, fetchAllMessages,deleteMessage } = require("../controller/message");
const { verifyAdminToken } = require("../middleware/common");

messageRoute
  .post("/", sendMessage)
  .get("/", verifyAdminToken, fetchAllMessages)
  .delete("/:id", verifyAdminToken, deleteMessage);

module.exports = messageRoute;
