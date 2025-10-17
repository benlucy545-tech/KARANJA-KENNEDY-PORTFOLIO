const express = require("express");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors");

const serviceAccount = require("./google-services.json"); // Ensure correct path

const port = 3000;

(express()).use(express.json());
(express()).use(cors());

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Test Firebase connection
(express()).get("/test-firebase", async (req, res) => {
    try {
        const user = await admin.auth().getUser("some-user-id"); // Replace with valid ID
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
(express()).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your.email@example.com",
        pass: "yourpassword"
    }
});

(express()).post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
    const mailOptions = {
        from: email,
        to: "your.email@example.com",
        subject: `New Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        res.send("Email sent: " + info.response);
    });
});

(express()).listen(3000, () => console.log("Server running on port 3000"));
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASk1A-yZufR6m386zLTcjUELBDXuL9q_g",
  authDomain: "keny-d2d47.firebaseapp.com",
  projectId: "keny-d2d47",
  storageBucket: "keny-d2d47.firebasestorage.app",
  messagingSenderId: "757384050433",
  appId: "1:757384050433:web:daf1e155ee621398868d00",
  measurementId: "G-W0BCVBQB66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(express());