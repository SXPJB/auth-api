import {Request, Response} from 'express';
import {registerUser, verifyUser,login} from "../services/authorization.service";
import {User} from "../entities/User";


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

export const register = async (req: Request, res: Response) => {
    let user: User | null = null
    try {
        user = await registerUser(req.body)
    } catch (e) {
        return res.json({
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
        return res.json({
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
