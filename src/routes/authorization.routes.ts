import {Router} from "express";
import {loginSystem, register, verify} from "../endpoints/authorization/authorization.endpoint";

/**
 *
 * In this file we define the routes for the authorization module and export the router
 * @module routes/authorization
 * @module routes/authorization
 * @requires express
 * @requires authorizationEndpoint
 *
 **/
const router = Router();

router.post('/login', loginSystem)
router.post('/register', register)
router.get('/verify/:userId/:confirmationCode', verify)

export default router