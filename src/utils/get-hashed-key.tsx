import CryptoJS from 'crypto-js';

// Function to convert a string to a unique 6-digit number
export const convertToSixDigitNumber = (inputString: string) => {
    // Hash the input string using deterministic SHA-256
    const hashedValue = CryptoJS.SHA256(inputString).toString(CryptoJS.enc.Hex);

    // Take the first 6 characters of the hash and convert to a decimal number
    const decimalNumber = parseInt(hashedValue.substring(0, 5), 16);

    // Return the unique 6-digit number
    return String(decimalNumber).padStart(5, '0');
};