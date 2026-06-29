const express = require("express");
const connectDB = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, rea) => {
    res.send("HireMind Backend Running");
});

// DB Connection
connectDB()

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
