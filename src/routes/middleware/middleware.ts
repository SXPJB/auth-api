import {NextFunction, Request, Response} from "express";
import {verifyTokenService} from "../../services/middleware/verifyToken.service";

/**
 * This function is used to verify the token provided by the user in the request header and
 * if the token is valid, it will allow the user to access the protected routes
 * @function verifyToken
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param next
 * **/
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({message: 'Access denied. No token provided.'});
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).send({message: 'Invalid token format. It should be Bearer [token].'});
    }
    try {
        verifyTokenService(token);
        next();
    } catch (e: any) {
        return res.status(401).send({message: e.message});
    }
}

export default verifyToken;