const axios = require("axios");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (pdfUrl) => {
  try {
    console.log("PDF URL:", pdfUrl);

    const response = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });

    console.log("Downloaded Successfully");

    console.log("Content-Type:", response.headers["content-type"]);
    console.log("First 10 bytes:", Buffer.from(response.data).slice(0, 10));

    const data = await pdf(response.data);

    console.log("Text Extracted");

    return data.text;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to extract PDF text");
  }
};

module.exports = extractTextFromPDF;
