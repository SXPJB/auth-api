import * as bcrypt from 'bcrypt';
import {User} from "../entities/User";
import {sendEmail} from "./mail.service";

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
 * **/
export const verifyUser = async (userId:number, confirmationCode:string) => {
    try {

        const user:User | null = await User.findOneBy({id: userId})

        if(!user) {
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
 * **/
export const sendConfirmationEmail = async (user: User) => {
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

/**
 * Generate confirmation code
 */
export const generateConfirmationCode = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const encryptPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}