import * as jwt from 'jsonwebtoken';
import {Request, Response,NextFunction} from "express";
import {TOKEN_SECRET} from "../constants/constants";

/**
 * This function is used to verify the token provided by the user in the request header and
 * if the token is valid, it will allow the user to access the protected routes
 * @function verifyToken
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Response} - The response object
 * **/
const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, TOKEN_SECRET);
        if(!verified){
            return res.status(401).json({message: 'Access denied'});
        }
        next();
    } catch (err:any) {
        return res.status(400).json({message: 'Invalid token', error: err});
    }
}

export default verifyToken;