import {Router} from "express";
import {loginSystem, register, verify} from "../endpoints/authorization.endpoint";

const router = Router();

router.post('/login', loginSystem)
router.post('/register', register)
router.get('/verify/:userId/:confirmationCode', verify)

export default router