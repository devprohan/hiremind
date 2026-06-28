const express = require("express")

const app = express()

const PORT = 8080

app.get("/", (req, res) => {
    res.send("Welcome to HireMind Backend")
})

app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`);
})