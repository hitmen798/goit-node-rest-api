const { join } = require("path");
require('dotenv').config()
const configPath = join(process.cwd(), "config", ".env");
// require("dotenv").config({ path: configPath });
const sg = require("@sendgrid/mail");
const HTTPError = require("./HTTPError");
sg.setApiKey(process.env.SENDGRID_API_KEY);
const message = {
  to: "",
  from: "polianskyi2005@gmail.com",
  subject: "Verification",
  html: "",
};

const sendEmail = async (data) => {
  const email = { ...data, from: "polianskyi2005@gmail.com" };
  try {
    sg.send(email);
    return true;
  } catch (error) {
    HTTPError(500, "Server error");
  }
};

module.exports = sendEmail;
