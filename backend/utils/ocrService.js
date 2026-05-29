const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');

/**
 * Extracts text from a given file (supports Images and PDFs).
 * @param {string} filePath - Absolute or relative path to the file
 * @returns {Promise<string>} - Extracted text (converted to uppercase for easier matching)
 */
const extractTextFromFile = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text ? data.text.toUpperCase() : '';
    } else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const { data: { text } } = await Tesseract.recognize(filePath, 'eng', { logger: m => {} });
      return text ? text.toUpperCase() : '';
    } else {
      console.log(`Unsupported file type for OCR: ${ext}`);
      return '';
    }
  } catch (error) {
    console.error(`OCR failed for file ${filePath}:`, error.message);
    return ''; // Return empty string on failure (e.g. unreadable scanned PDF)
  }
};

/**
 * Matches extracted document texts against provided target strings.
 * @param {Array<{text: string, target: string}>} documents - Array of extracted texts and their target string
 * @returns {boolean} - True if 'most' documents matched (e.g. >= 2 matches out of 3)
 */
const shouldAutoApprove = (documents) => {
  let matchCount = 0;
  
  documents.forEach(doc => {
    if (doc.text && doc.target) {
      // Remove spaces/special chars from both text and target for fuzzy matching
      const cleanText = doc.text.replace(/[^A-Z0-9]/ig, '');
      const cleanTarget = doc.target.toUpperCase().replace(/[^A-Z0-9]/ig, '');
      
      // Ensure target is not empty or just special characters to prevent false positives
      if (cleanTarget.length >= 3 && cleanText.includes(cleanTarget)) {
        matchCount++;
      }
    }
  });

  // If we have at least 2 matches out of 3 documents, we auto-approve
  const requiredMatches = Math.max(1, Math.floor(documents.length * 0.6));
  return matchCount >= requiredMatches;
};

module.exports = { extractTextFromFile, shouldAutoApprove };
