import {Request, Response, Router} from "express";

const router = Router();

router.get('/todo', (req:Request, res:Response) => {
    res.send('Todo route');
});


export default router