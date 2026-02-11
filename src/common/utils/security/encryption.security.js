import crypto from 'crypto';
import { ENC_BYTE } from '../../../../config/config.service.js';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(ENC_BYTE);
const iv_length = 16;

export const encrypt = async (decryptedText) => {
    const iv = crypto.randomBytes(iv_length);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptionText = cipher.update(decryptedText, "utf-8", "hex");
    encryptionText += cipher.final("hex");
    return `${iv.toString("hex")}:${encryptionText}`;
}


export const decrypt = async (encryptedText) => {
    const [iv, text] = encryptedText.split(":");
    const binaryLikeIv = Buffer.from(iv, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, binaryLikeIv);
    let decryptionText = decipher.update(text, "hex", "utf-8");
    decryptionText += decipher.final("utf-8");
    return decryptionText;
}