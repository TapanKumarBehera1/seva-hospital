const express = require("express");
const appointmentRoute = express.Router();
const {
  fetchMyAppointments,
  createAnAppointment,
  updateAppointment,
  fetchAllAppointments,
} = require("../controller/appointment");
const { verifyToken, verifyAdminToken } = require("../middleware/common");

appointmentRoute
  .get("/own", verifyToken, fetchMyAppointments)
  .get("/", verifyAdminToken, fetchAllAppointments)
  .post("/", verifyToken, createAnAppointment)
  .patch("/:id", verifyAdminToken, updateAppointment)
  .patch("/own/:id", verifyToken, updateAppointment);
module.exports = appointmentRoute;
