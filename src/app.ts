import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authorizationRoutes from "./routes/authorization.routes"

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//routes
app.use('/auth',authorizationRoutes)

export default app