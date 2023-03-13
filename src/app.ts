import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authorizationRoutes from "./routes/authorization.routes"
import healthcheck from "./endpoints/health/healthcheck.endpoint";

/**
 * Application configuration for routes and middlewares
 * @module app
 * @requires express
 * @requires morgan
 * @requires cors
 * @requires authorizationRoutes
 * @requires verifyToken
 * @requires healthcheck
 * **/

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//routes
app.use('/auth',authorizationRoutes)
app.use(healthcheck)


export default app