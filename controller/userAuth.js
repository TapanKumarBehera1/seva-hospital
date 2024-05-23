let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../model/userDB");
const { sendMail } = require("../services/common");
const sanitizeUser = require("../middleware/sanitizeUser");

async function signup(req, res) {
  try {
    const { name, dob, gender, phone, email, password } = req.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(401).json({ existingUser: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
    });

    const sanitizeData = sanitizeUser(user);
    const token = jwt.sign(sanitizeData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 60000 * 60),
        httpOnly: true,
      })
      .json({ message: "success", data: sanitizeData, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ emailError: "Invalid email/password" });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ emailError: "Invalid email/password" });
    }
    const sanitizeData = sanitizeUser(user);
    const token = jwt.sign(sanitizeData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 60000 * 60),
        httpOnly: true,
      })
      .json(sanitizeData);
  } catch (err) {
    return res.status(500).json({ message: "error", err });
  }
}
async function adminLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(401).json({ emailError: "Invalid email/password" });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ emailError: "Invalid email/password" });
    }
    const sanitizeData = sanitizeUser(user);
    const token = jwt.sign(sanitizeData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 60000 * 60),
        httpOnly: true,
      })
      .json(sanitizeData);
  } catch (err) {
    return res.status(500).json({ message: "error", err });
  }
}

async function accessUser(req, res) {
  const { id } = req.user;
  let user = await User.findById(id, "-password");
  const sanitizeData = sanitizeUser(user);
  res.status(200).json(sanitizeData);
}

function logout(req, res) {
  res.clearCookie("jwt").status(200).json("user logout");
}

async function registerANewAdmin(req, res) {
  try {
    const { name, dob, gender, phone, email, password, role } = req.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(401).json({ existingUser: "Email Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      dob,
      gender,
      role,
    });

    const sanitizeData = sanitizeUser(user);
    res
      .status(201)
      .json({
        message: "success! new admin registration successful",
        data: sanitizeData,
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function adminFullDataFromDB(req, res) {
  const { id } = req.user;
  let user = await User.findById(id, "-password");
  res.status(200).json(user);
}

module.exports = {
  signup,
  login,
  accessUser,
  logout,
  adminLogin,
  registerANewAdmin,
  adminFullDataFromDB,
};
