require("dotenv").config();
const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const databaseConnect = require("./config/database");
const doctorRoute = require("./routes/doctorRoute");
const authRoute = require("./routes/authRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const messageRoute = require("./routes/messageRoute");
const callbackRoute = require("./routes/callbackRoute");
databaseConnect().catch((error) => console.log(error));

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/auth", authRoute);
server.use("/doctor", doctorRoute);
server.use("/appointment", appointmentRoute);
server.use("/message", messageRoute);
server.use("/callback", callbackRoute);

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
