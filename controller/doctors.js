const { Doctor } = require("../model/doctorDB");
const uploadAtCloudinary = require("../config/cloudinary");

const fetchAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};
const addANewDoctor = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ photo: false, message: "doctor photo not available" });
  }
  const { doctor, email, mobile, age, experience, fee, gender, department } =
    req.body;
  const file = req.file.path;
  try {
    const docPic = await uploadAtCloudinary(file);
    const newAddedDoc = await Doctor.create({
      doctor,
      email,
      mobile,
      age,
      experience,
      fee,
      gender,
      department,
      photo: docPic,
    });
    res.status(200).json(newAddedDoc);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

module.exports = { fetchAllDoctors, addANewDoctor };
