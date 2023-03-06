import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authorizationRoutes from "./routes/authorization.routes"
import verifyToken from "./routes/verifyToken.routes";
import todoRoutes from "./routes/todo.routes";

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//routes
app.use('/auth',authorizationRoutes)
app.use('/api',verifyToken,todoRoutes)

export default app