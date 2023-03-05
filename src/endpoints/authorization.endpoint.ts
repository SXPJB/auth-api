import {Request, Response} from 'express';
import {registerUser, verifyUser} from "../services/authorization.service";
import {User} from "../entities/User";

export const register = async (req: Request, res: Response) => {
    let user: User | null = null
    try {
        user = await registerUser(req.body)
    } catch (e) {
        res.json({
            message: 'User not created',
            data: e,
            status: 500
        })
    }
    res.json({
        message: 'User created',
        data: user,
        status: 200
    })
}



export const verify = async (req: Request, res: Response) => {
    try {
        const {userId, confirmationCode} = req.params
        if (!userId || !confirmationCode) {
            res.json({
                message: 'User not verified',
                data: 'Missing parameters',
                status: 400
            })
        }
        await verifyUser(parseInt(userId),confirmationCode)
    } catch (e) {
        res.json({
            message: 'User not verified',
            data: e,
            status: 500
        })
    }
    res.json({
        message: 'User verified',
        status: 200
    })
}
