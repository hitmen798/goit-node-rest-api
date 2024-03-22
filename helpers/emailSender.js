const { join } = require("path");
const configPath = join(process.cwd(), ".env");
require("dotenv").config({ path: configPath });

const Mailjet = require("node-mailjet").apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);
const HTTPError = require("./HTTPError");

const message = {
  to: "",
  from: "hitmen798@gmail.com",
  subject: "Verification",
  html: "",
};

const sendEmail = async (data) => {
  const email = {
    Messages: [
      {
        From: { Email: "hitmen798@gmail.com", Name: "Your Name" },
        To: [{ Email: data.to }],
        Subject: "Verification",
        HTMLPart: data.html,
      },
    ],
  };

  try {
    await Mailjet.post("send", { version: "v3.1" }).request(email);
    return true;
  } catch (error) {
    console.error(error);
    throw new HTTPError(500, "Server error");
  }
};

module.exports = sendEmail;
