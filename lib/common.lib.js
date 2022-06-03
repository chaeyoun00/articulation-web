//const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'KERI-Articulation';


async function Encrypt(data) {
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY);
    return encrypted.toString();
}

async function Decrypt(encryptData) {
    const decrypted = CryptoJS.AES.decrypt(encryptData, ENCRYPTION_KEY);
    const original = decrypted.toString(CryptoJS.enc.Utf8);

    return original;
}


module.exports.Encrypt = Encrypt;
module.exports.Decrypt = Decrypt;