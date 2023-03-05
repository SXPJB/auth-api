import app from "./app";
import { PORT} from './constants/constants'

app.listen(PORT, ()=>console.log(`Server on PORT: ${PORT}`))