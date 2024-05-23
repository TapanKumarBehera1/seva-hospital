const express = require("express");
const doctorRoute = express.Router();
const multer = require("multer");
const { fetchAllDoctors, addANewDoctor } = require("../controller/doctors");
const { verifyToken, verifyAdminToken } = require("../middleware/common");
const upload=require("../config/multer")

doctorRoute.get("/", verifyToken, fetchAllDoctors);
doctorRoute.post("/add", verifyAdminToken, upload.single("photo"),addANewDoctor);

module.exports = doctorRoute;
