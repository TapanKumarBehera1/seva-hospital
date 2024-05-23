const express = require("express");
const appointmentRoute = express.Router();
const {
  createAnAppointment,
  updateAppointment,
  fetchAllAppointments,
} = require("../controller/appointment");
const { verifyToken, verifyAdminToken } = require("../middleware/common");

appointmentRoute
  .get("/",verifyAdminToken, fetchAllAppointments)
  .post("/",verifyToken, createAnAppointment)
  .patch("/:id", verifyAdminToken,updateAppointment);
  
module.exports = appointmentRoute;
