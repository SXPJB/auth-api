import * as bcrypt from "bcrypt";

/**
 * This function encrypts the password using bcrypt library
 * @param password: string
 * @returns {Promise<string>} - The encrypted password
 * **/
export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 * Generate confirmation code
 * @returns {string} - The confirmation code
 */
export const generateConfirmationCode = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}