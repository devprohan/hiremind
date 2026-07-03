const axios = require("axios");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (pdfUrl) => {
    try {
        console.log("PDF URL:", pdfUrl);

        const response = await axios.get(pdfUrl, {
            responseType: "arraybuffer",
        });

        console.log("Downloaded Successfully");

        const data = await pdf(response.data);

        console.log("Text Extracted");

        return data.text;

    } catch (error) {
        console.log(error);   
        throw new Error("Failed to extract PDF text");
    }
};

module.exports = extractTextFromPDF;