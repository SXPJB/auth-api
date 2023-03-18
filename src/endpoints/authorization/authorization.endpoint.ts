import {Request, Response} from 'express';
import {registerUser, verifyUser,login} from "../../services/authorization/authorization.service";
import {IUser} from "../../types";


/**
 * This an endpoint for register a user in the system
 * @param {Request} req - The request object {username, password} in the body
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The response object with the user registered
 * **/
export const loginSystem = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.json({
                message: 'Bad credentials',
                data: 'Missing parameters',
                status: 400
            })
        }
        const user = await login(username, password)
        return res.json({
            message: 'User logged in',
            data: user,
            status: 200
        })
    }catch (e) {
        return res.status(500).json({
            message: 'Error logging in',
            data: e,
            status: 500
        })
    }
}

/**
 * The register endpoint is used to register a user in the system and send the confirmation email
 * @param {Request} req - The request object {User} in the body
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The response object with the user registered
 * **/
export const register = async (req: Request, res: Response) => {
    let user: IUser | null = null
    try {
        user = await registerUser(req.body)
    } catch (e) {
        return res.status(500).json({
            message: 'User not created',
            data: e,
            status: 500
        })
    }
    return res.json({
        message: 'User created',
        data: user,
        status: 200
    })
}

/**
 * To verify endpoint is used to verify a user in the system with the confirmation code sent by email
 * @param {Request} req - The request object {userId, confirmationCode} in the body
 * @param {Response} res - The response object
 * @returns {Promise<Response>} - The response object with the user verified
 * **/
export const verify = async (req: Request, res: Response) => {
    try {
        const {userId, confirmationCode} = req.params
        if (!userId || !confirmationCode) {
            return res.json({
                message: 'User not verified',
                data: 'Missing parameters',
                status: 400
            })
        }
        await verifyUser(parseInt(userId),confirmationCode)
    } catch (e) {
        return res.status(500).json({
            message: 'User not verified',
            data: e,
            status: 500
        })
    }
    return res.json({
        message: 'User verified',
        status: 200
    })
}
