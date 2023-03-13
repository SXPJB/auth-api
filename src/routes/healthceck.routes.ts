import {Router} from "express";
import healthcheckEndpoint from "../endpoints/health/healthcheck.endpoint";

/**
 * Healthcheck routes
 * @module routes/healthcheck
 * @requires express
 * @requires healthcheckEndpoint
 * */

const router = Router();

router.get('/healthcheck',healthcheckEndpoint)

export default router;