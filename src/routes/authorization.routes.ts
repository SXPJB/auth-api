import {Router} from "express";
import {register, verify} from "../endpoints/authorization.endpoint";

const router = Router();

router.post('/register', register)
router.get('/verify/:userId/:confirmationCode', verify)

export default router