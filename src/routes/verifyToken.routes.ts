import * as jwt from 'jsonwebtoken';
import {Request, Response,NextFunction} from "express";
import {TOKEN_SECRET} from "../constants/constants";

//Middleware to verify the token
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