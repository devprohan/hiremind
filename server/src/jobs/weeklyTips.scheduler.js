const cron = require("node-cron");
const sendWeeklyTips = require("./weeklyTips.job.js");

const startWeeklyTipsScheduler = () => {
  // Every Monday at 9:00 AM
  cron.schedule("0 9 * * 1", async () => {
    console.log("Running scheduled weekly resume tips...");

    await sendWeeklyTips();
  });

  console.log("Weekly tips scheduler started.");
};

module.exports = startWeeklyTipsScheduler;