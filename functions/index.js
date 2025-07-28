const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { defineString } = require("firebase-functions/params");

admin.initializeApp();

setGlobalOptions({ region: "europe-west1" });

const GMAIL_USER = defineString("GMAIL_USER");
const GMAIL_PASS = defineString("GMAIL_PASS");
const TELEGRAM_TOKEN = defineString("TELEGRAM_TOKEN");
const TELEGRAM_CHAT_ID = defineString("TELEGRAM_CHAT_ID");

exports.submitContact = onRequest(
  { memory: "256MB", timeoutSeconds: 30, cors: true, invoker: "public" },
  async (req, res) => {
    // Transporter se vytváří až tady, při spuštění funkce
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER.value(),
        pass: GMAIL_PASS.value(),
      },
    });

    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    res.set("Access-Control-Allow-Origin", "*");

    if (req.method !== "POST") {
      return res.status(405).send("Only POST allowed");
    }

    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !email || !message) {
      return res
        .status(400)
        .send("Missing required fields: firstName, email, message.");
    }

    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    try {
      await admin.firestore().collection("form-table").add({
        Timestamp: admin.firestore.FieldValue.serverTimestamp(),
        firstName, lastName, email, phone, message,
        userAgent: req.headers["user-agent"] || "",
        referred: req.headers.referer || "Direct",
      });

      await transporter.sendMail({
        from: `"NextDrive Contact" <${GMAIL_USER.value()}>`,
        to: "nextdrive@nextdrive.app",
        subject: "New Contact Form Submission",
        html: `
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
      });

      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN.value()}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID.value(),
          text: `📬 New message from ${fullName}\\n📧 ${email}\\n📞 ${phone || "N/A"}\\n📝 ${message}`,
        }
      );

      return res
        .status(200)
        .send({ status: "success", message: "Form submitted successfully." });
    } catch (e) {
      console.error("Error processing form submission:", e);
      return res
        .status(500)
        .send({ status: "error", message: "Internal Server Error" });
    }
  }
);