const { Appointment } = require("../model/appointmentDB");
const { User } = require("../model/userDB");
const {
  sendMail,
  confirmAppointmentTemplate,
  cencelledAppointmentTemplate,
} = require("../services/common");

const fetchMyAppointments = async (req, res) => {
  const { id } = req.user;
  try {
    const userAppointments = await Appointment.find({ user: id }).populate({
      path: 'doctor',
      select: "-email -mobile -experience -rating -fee -gender -age -photo"}).sort({ createdAt: -1 }); 
    res.status(200).json(userAppointments);
  } catch (err) {
    res.status(400).json(err);
  }
};

const createAnAppointment = async (req, res) => {
  const { id } = req.user;
  try {
    const appointment = await Appointment.create({ ...req.body, user: id });
    const doctorData = await Appointment.findById(appointment._id).populate(
      "doctor"
    );
    const user = await User.findOne({ _id: id }, "-password");

    appointment.doctor = doctorData.doctor;

    sendMail({
      to: user.email,
      subject: "Appointment Booked",
      html: confirmAppointmentTemplate(appointment),
    });
    res.status(200).json({ message: true, appointment });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate("doctor");
    const userId = await updatedAppointment.user;
    const findUserEmail = await User.findOne({ _id: userId });
    await sendMail({
      to: findUserEmail.email,
      subject: "Appointment Cancelled",
      html: cencelledAppointmentTemplate(updatedAppointment),
    });
    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const fetchAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).populate("doctor");
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  fetchMyAppointments,
  createAnAppointment,
  updateAppointment,
  fetchAllAppointments,
};
