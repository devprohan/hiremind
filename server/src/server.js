const express = require("express");
const connectDB = require("./config/db.js");
const app = require("./app.js")
const cron = require("node-cron");

// const sendWeeklyTips = require("./jobs/weeklyTips.job.js");

const PORT = process.env.PORT || 8000;

// DB Connection
connectDB()


app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));

// cron.schedule("0 10 * * 1", async () => {
//   console.log("Running weekly resume tips...");
//   await sendWeeklyTips();
// });

const startWeeklyTipsScheduler = require("./jobs/weeklyTips.scheduler.js");

startWeeklyTipsScheduler();
