const express = require("express")
const cors = require("cors")
const authRoutes = require("./Routes/auth.routes.js")
const userRoutes = require("./Routes/user.routes.js")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, rea) => {
    res.send("HireMind Backend Running");
});

// Routes Middleware
app.use("/api/auth/v1", authRoutes)
app.use("/api/users/v1", userRoutes)

module.exports = app