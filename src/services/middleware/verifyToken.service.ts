import * as jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../../constants/constants';

/**
 * Custom error class for unauthorized access
 * @extends {Error}
 */
class UnauthorizedError extends Error {
  /**
   * Creates an instance of UnauthorizedError.
   * @param {string} message - The error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Service to verify the provided token
 * @param {string} token - The token to verify
 * @throws {UnauthorizedError} If the token is invalid or expired
 */
export const verifyTokenService = (token: string) => {
  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    if (!verified) {
      throw new UnauthorizedError('Access denied');
    }
  } catch (e) {
    console.error(e);
    if (e instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    if (e instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token: JWT error');
    }
    if (e instanceof UnauthorizedError) {
      throw new UnauthorizedError('Invalid token: Unauthorized error');
    }
  }
};