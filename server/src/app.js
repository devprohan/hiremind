const express = require("express");
const cors = require("cors");

const authRoutes = require("./Routes/auth.routes.js");
const userRoutes = require("./Routes/user.routes.js");
const resumeRoutes = require("./Routes/resume.routes.js");
const dashboardRoutes = require("./Routes/dashboard.routes.js")
const jobRoutes = require("./Routes/job.routes.js");
const interviewRoutes = require("./Routes/interview.routes.js")
const careerRoutes = require("./Routes/career.routes.js")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("HireMind Backend Running");
});

// Routes Middleware
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/resume/", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/job", jobRoutes);
 app.use("/api/interview", interviewRoutes)
app.use("/api/career", careerRoutes)


module.exports = app;

