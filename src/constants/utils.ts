import * as bcrypt from "bcrypt";

/**
 * This function encrypts the password using bcrypt library
 * @param password: string
 * **/
export const encryptPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

/**
 * Generate confirmation code
 */
export const generateConfirmationCode = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}