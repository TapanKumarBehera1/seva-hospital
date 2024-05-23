const { Message } = require("../model/messageDB");

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

const sendMessage = async (req, res) => {
  try {
    const saveMessage = await Message.create(req.body);
    res
      .status(200)
      .json({ status: "success", message: "Message Sent Successfully" });
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};




module.exports = { fetchAllMessages, sendMessage ,deleteMessage};
