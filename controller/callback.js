const { Callback } = require("../model/callbackDB");

const fetchAllCallbackRequest = async (req, res) => {
  try {
    const calls = await Callback.find({});
    res.status(200).json(calls);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

const sendCallbackRequest = async (req, res) => {
  try {
    const callRequest = await Callback.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Callback request sent successfully",
    });
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

const updateCallbackRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const callRequest = await Callback.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Callback request status updated successfully",
      updated: callRequest,
    });
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};



const deleteCallbackRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const callRequest = await Callback.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Callback request deleted successfully",
    });
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

module.exports = {
  fetchAllCallbackRequest,
  sendCallbackRequest,
  updateCallbackRequest,
  deleteCallbackRequest,
};
