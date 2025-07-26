const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

// 🔐 Email setup (Gmail or SendGrid)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "businessdrawe044@gmail.com",
    pass: "pprklnezfbxrvknj"  // Not your normal password!
  }
});

// 🔐 Telegram setup
const TELEGRAM_BOT_TOKEN = "7714290424:AAFi7C-OyDmSDHvn3eXI9kpA65MhMmz_kR8";
const TELEGRAM_CHAT_ID = "your_chat_id";  // Use @userinfobot to get this

exports.submitForm = functions.https.onRequest(async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to Firestore
    await db.collection("messages").add({
      name,
      email,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    // Send Email
    await transporter.sendMail({
      from: `"NextDrive Contact" <davidvrba42@gmail.com>`,
      to: "nextdrive@nextdrive.app",
      subject: "New Contact form",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    // Send Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: `📬 New message from ${name}\n📧 ${email}\n📝 ${message}`
    });

    res.status(200).send("Success");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error");
  }
});
