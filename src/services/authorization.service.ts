import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {User} from "../entities/User";
import {sendEmail} from "./mail.service";
import {TOKEN_SECRET} from "../constants/constants";
import {encryptPassword, generateConfirmationCode} from "../constants/utils";

/**
 * This service is responsible for authenticating the user creating a JWT token with the user information
 * @param username: string
 * @param password: string
 * **/
export const login = async (username: string, password: string) => {
    try {
        const user:User | null = await User.findOne({where: {username: username}})
        if (!user) {
            throw new Error("Bad credentials")
        }
        if (!user.isConfirmed) {
            throw new Error("User not confirmed")
        }
        const isPasswordValid = await bcrypt.compare( password, user.password)
        if (!isPasswordValid) {
            throw new Error("Bad credentials")
        }
        // Create a JWT token with the user information and the secret key with expiration time of 1 hour
        const token = jwt.sign({name: user.username, id: user.id}, TOKEN_SECRET, {expiresIn: '1h'})
        user.token = token
        return await user.save()
    } catch (e) {
        throw new Error("Error logging in")
    }
}

/**
 * This service is responsible for registering a new user and verifying if the user is confirmed
 * @param newUser: User
 * **/
export const registerUser = async (newUser: User) => {
    try {
        const user: User = await User.create({
            person: {
                firstName: newUser.person.firstName,
                lastName: newUser.person.lastName,
                email: newUser.person.email,
                gender: newUser.person.gender,
                active: newUser.person.active,
            },
            username: newUser.username,
            password: await encryptPassword(newUser.password)
        })
        user.person = await user.person.save()
        await user.save()
        await sendConfirmationEmail(user)
        return user
    } catch (e) {
        throw new Error("User not created")
    }
}

/**
 * Verify if the user is confirmed using the confirmation code
 * @param userId: number
 * @param confirmationCode: string
 * **/
export const verifyUser = async (userId: number, confirmationCode: string) => {
    try {

        const user: User | null = await User.findOneBy({id: userId})

        if (!user) {
            throw new Error("User not found")
        }

        if (user.confirmationCode !== confirmationCode) {
            throw new Error("Confirmation code is not valid")
        }

        if (user.confirmationCodeExpires < new Date()) {
            throw new Error("Confirmation code expired")
        }

        user.isConfirmed = true

        await user.save()
    } catch (e) {
        throw new Error("Error verifying user")
    }
}

/**
 * Send email to user with confirmation code
 * @param user: User
 * **/
const sendConfirmationEmail = async (user: User) => {
    try {
        user.confirmationCode = generateConfirmationCode()
        // The user will have 24 hours to confirm his email
        user.confirmationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)
        await sendEmail(user)
        await user.save()
    } catch (e) {
        throw new Error("Error sending email")
    }
}
