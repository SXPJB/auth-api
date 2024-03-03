import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {User} from '../../entities/User';
import {sendEmail} from '../mail/mail.service';
import {TOKEN_SECRET} from '../../constants/constants';
import {encryptPassword, generateConfirmationCode} from '../../constants/utils';
import {IUser} from '../../types';

/**
 * This service is responsible for authenticating the user creating a JWT token with the user information
 * @returns {Promise<IUser>} - The user with the token
 * @param username
 * @param password
 * **/
export const login = async (username: string, password: string):Promise<IUser> => {
  try {
    const user:User | null = await User.findOne({where: {username: username}});
    if (!user) {
      throw new Error('Bad credentials');
    }
    const isPasswordValid = await bcrypt.compare( password, user.password);
    if (!isPasswordValid) {
      throw new Error('Bad credentials');
    }
    if (!user.isConfirmed) {
      throw new Error('User not confirmed');
    }
    // Create a JWT token with the user information and the secret key with expiration time of 1 hour
    user.token = jwt.sign({name: user.username, id: user.id}, TOKEN_SECRET, {expiresIn: '2m'});
    return await user.save();
  } catch (e:any) {
    throw new Error('Error logging in: ' + e.message);
  }
};

/**
 * This service is responsible for registering a new user and verifying if the user is confirmed
 * @returns {Promise<IUser>} - The user created
 * @param newUser
 * **/
export const registerUser = async (newUser: IUser):Promise<IUser> => {
  try {
    const user: User = User.create({
      person: {
        firstName: newUser.person.firstName,
        lastName: newUser.person.lastName,
        email: newUser.person.email,
        gender: newUser.person.gender,
        active: newUser.person.active,
      },
      username: newUser.username,
      password: await encryptPassword(newUser.password),
    });
    user.person = await user.person.save();
    await user.save();
    await sendConfirmationEmail(user);
    return user;
  } catch (e) {
    throw new Error('User not created');
  }
};

/**
 * Verify if the user is confirmed using the confirmation code
 * @returns {Promise<void>}
 * @param userId
 * @param confirmationCode
 * **/
export const verifyUser = async (userId: number, confirmationCode: string):Promise<void> => {
  try {

    const user: User | null = await User.findOneBy({id: userId});

    if (!user) {
      throw new Error('User not found');
    }

    if (user.confirmationCode !== confirmationCode) {
      throw new Error('Confirmation code is not valid');
    }

    if (user.confirmationCodeExpires < new Date()) {
      throw new Error('Confirmation code expired');
    }

    user.isConfirmed = true;

    await user.save();
  } catch (e) {
    throw new Error('Error verifying user');
  }
};

/**
 * Send email to user with confirmation code
 * @param user
 * **/
const sendConfirmationEmail = async (user: User):Promise<void> => {
  try {
    user.confirmationCode = generateConfirmationCode();
    // The user will have 24 hours to confirm his email
    user.confirmationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await sendEmail(user);
    await user.save();
  } catch (e) {
    throw new Error('Error sending email');
  }
};
