const express = require("express");
const connectDB = require("./config/db.js");
const app = require("./app.js")

const PORT = process.env.PORT || 8000;

// DB Connection
connectDB()


app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
