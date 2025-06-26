const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // <-- ADD THIS

app.post("/submit-form", async (req, res) => {
  const { name, phone, email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "desk@shinobiforce.com",
      pass: "cjox jiph qlro tpjv",
    },
  });

  let mailOptions = {
    from: "desk@shinobiforce.com",
    to: "desk@shinobiforce.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
