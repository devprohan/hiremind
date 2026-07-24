


const { GoogleGenAI } = require("@google/genai");

console.log("Key loaded:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("AI initialized");

module.exports = ai;