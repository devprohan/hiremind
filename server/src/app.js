const express = require("express");
const cors = require("cors");

const authRoutes = require("./Routes/auth.routes.js");
const userRoutes = require("./Routes/user.routes.js");
const resumeRoutes = require("./Routes/resume.routes.js");
const dashboardRoutes = require("./Routes/dashboard.routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("HireMind Backend Running");
});

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;

