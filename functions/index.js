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
      return res.status(405).send("Only POST allowed lol");
    }

    // PŘÍJÍMÁME data přesně tak, jak je posílá frontend.
    // POZOR: req.body bude obsahovat:
    // { "1_Timestamp": null, "2_Name": { FirstName: ..., LastName: ... }, "3_Email": ..., ... }
    const { "2_Name": nameData, "3_Email": email, "4_Phone": phone, "5_Msg": message } = req.body;

    // Kontrola požadovaných polí (upraveno pro nové názvy)
    if (!nameData || !nameData.FirstName || !email || !message) {
      return res
        .status(400)
        .send("Missing required fields: firstName, email, message.");
    }

    // Sestavíme fullName z dat přijatých z frontendu
    const fullName = `${nameData.FirstName || ""} ${nameData.LastName || ""}`.trim();

    try {
      // Vytvoříme objekt, který PŘESNĚ odpovídá formátu pro databázi
      const dataForFirestore = {
        "1_Timestamp": admin.firestore.FieldValue.serverTimestamp(), // Serverový timestamp
        "2_Name": {
          FirstName: nameData.FirstName,
          LastName: nameData.LastName
        },
        "3_Email": email,
        "4_Phone": phone || "N/A", // Pokud phone není, ulož "N/A"
        "5_Msg": message,
        "6_userAgent": req.headers["user-agent"] || "", // Získáváme z hlaviček požadavku
        "7_reffered": req.headers.referer || "Direct", // Získáváme z hlaviček požadavku
      };

      // Uložíme data do Firestore v požadovaném formátu
      await admin.firestore().collection("form-table").add(dataForFirestore);

      // Odeslání e-mailu (používá data z původního req.body pro text, ale je to funkční)
      await transporter.sendMail({
        from: `"NextDrive Contact" <${GMAIL_USER.value()}>`, // Z TVÉHO účtu
        replyTo: `${fullName} <${email}>`, // <----- DŮLEŽITÉ: ZDE JE ZMĚNA! Nastaví email odesílatele formuláře pro funkci "Odpovědět"
        to: "nextdrive@nextdrive.app", // Tvoje adresa, kam to má přijít
        subject: `New Contact Form from ${fullName} (${email})`, // <----- VOLITELNÁ ZMĚNA: Předmět e-mailu pro lepší přehled
        html: `
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong><br>${message}</p>
        `,
      });

      // Odeslání zprávy přes Telegram bota (používá data z původního req.body pro text, ale je to funkční)
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN.value()}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID.value(),
          text: `📬 New message from ${fullName}\n📧 ${email}\n📞 ${phone || "N/A"}\n📝 ${message}`,
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