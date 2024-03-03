import * as bcrypt from 'bcrypt';

/**
 * This function encrypts the password using bcrypt library
 * @returns {Promise<string>} - The encrypted password
 * @param password
 * **/
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Generate confirmation code
 * @returns {string} - The confirmation code
 */
export const generateConfirmationCode = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
